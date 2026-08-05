<?php
/**
 * NUTRIWAY — contact form → Telegram relay (v2).
 * GET this file in a browser to see a diagnostics line (no secrets exposed).
 * SETUP: paste your BotFather token on the $BOT_TOKEN line below.
 */

// ---- config -------------------------------------------------------------
$BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN_HERE';   // <-- paste token between the quotes
$CHAT_ID   = '-1004454698076';              // "Nutriway conversions" group
// $THREAD_ID = 12;                          // uncomment for forum topics
// -------------------------------------------------------------------------

if (!function_exists('mb_substr')) {
  function mb_substr($s, $start, $len = null) {
    return $len === null ? substr($s, $start) : substr($s, $start, $len);
  }
}
if (!function_exists('mb_strlen')) {
  function mb_strlen($s) { return strlen($s); }
}

header('Content-Type: application/json; charset=utf-8');

function fail($code, $error) {
  http_response_code($code);
  echo json_encode(array('ok' => false, 'error' => $error));
  exit;
}

// A real bot token always looks like "12345:AA..." — it contains a colon.
// Checking for the colon (instead of comparing to the placeholder text) means
// pasting the token can never accidentally break this guard.
$token_ok = strpos($BOT_TOKEN, ':') !== false;

// --- Diagnostics: a plain GET reports what's live (used to debug setup). ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(array(
    'ok'              => true,
    'version'         => 'v4',
    'php'             => PHP_VERSION,
    'token_set'       => $token_ok,
    'curl'            => function_exists('curl_init'),
    'allow_url_fopen' => (bool) ini_get('allow_url_fopen'),
  ));
  exit;
}

if (!$token_ok) {
  fail(500, 'not_configured');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) fail(400, 'bad_json');

if (!empty($data['company'])) { echo json_encode(array('ok' => true)); exit; }

$clip = function ($v, $max) {
  $v = is_string($v) ? trim($v) : '';
  return mb_substr($v, 0, $max);
};

$name    = $clip(isset($data['name'])    ? $data['name']    : '', 80);
$phone   = $clip(isset($data['phone'])   ? $data['phone']   : '', 32);
$city    = $clip(isset($data['city'])    ? $data['city']    : '', 80);
$message = $clip(isset($data['message']) ? $data['message'] : '', 600);
$qty     = (int)(isset($data['quantity']) ? $data['quantity'] : 1);
$locale  = (isset($data['locale']) && $data['locale'] === 'ru') ? 'ru' : 'uz';
$page    = $clip(isset($data['page']) ? $data['page'] : '', 200);

if (mb_strlen($name) < 2) fail(400, 'invalid_name');
if (strlen(preg_replace('/\D/', '', $phone)) < 7) fail(400, 'invalid_phone');

$esc = function ($s) { return htmlspecialchars($s, ENT_NOQUOTES, 'UTF-8'); };
$stamp = date('d.m.Y H:i');

$lines = array(
  "🌿 <b>NUTRIWAY — новая заявка</b>", "",
  "👤 <b>Имя:</b> " . $esc($name),
  "📞 <b>Телефон:</b> " . $esc($phone),
);
if ($city)    $lines[] = "📍 <b>Город:</b> " . $esc($city);
$lines[] = "📦 <b>Количество:</b> " . $qty . " шт.";
if ($message) $lines[] = "💬 <b>Комментарий:</b> " . $esc($message);
$lines[] = "";
$lines[] = "🌐 <b>Язык сайта:</b> " . strtoupper($locale);
if ($page)    $lines[] = "🔗 <b>Страница:</b> " . $esc($page);
$lines[] = "🕒 <b>Время:</b> " . $stamp;

$payload = array(
  'chat_id' => $CHAT_ID,
  'text' => implode("\n", $lines),
  'parse_mode' => 'HTML',
  'disable_web_page_preview' => true,
);
if (isset($THREAD_ID)) $payload['message_thread_id'] = $THREAD_ID;

$url = "https://api.telegram.org/bot" . $BOT_TOKEN . "/sendMessage";
$body = json_encode($payload, JSON_UNESCAPED_UNICODE);

$resp = false;
if (function_exists('curl_init')) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 15);
  $resp = curl_exec($ch);
  $err  = curl_error($ch);
  curl_close($ch);
} else {
  $ctx = stream_context_create(array('http' => array(
    'method' => 'POST',
    'header' => "Content-Type: application/json\r\n",
    'content' => $body,
    'timeout' => 15,
  )));
  $resp = @file_get_contents($url, false, $ctx);
  $err = $resp === false ? 'file_get_contents_failed' : '';
}

if ($resp !== false && strpos($resp, '"ok":true') !== false) {
  echo json_encode(array('ok' => true));
} else {
  // Surface the reason so we can debug (e.g. blocked outbound, bad token).
  http_response_code(502);
  echo json_encode(array('ok' => false, 'error' => 'telegram_failed', 'detail' => $err ? $err : $resp));
}
