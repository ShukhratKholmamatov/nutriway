<?php
/**
 * NUTRIWAY — contact form → Telegram relay (static-hosting version).
 *
 * The static site posts here instead of to the Node /api/lead route. The bot
 * token lives in this file, server-side: PHP is executed by Apache and its
 * source is never sent to browsers, so the token stays private — as long as
 * you don't commit the real token to a public git repo.
 *
 * SETUP: after uploading, edit the line below and paste your BotFather token.
 */

// ---- config -------------------------------------------------------------
$BOT_TOKEN = getenv('TELEGRAM_BOT_TOKEN') ?: 'PASTE_YOUR_BOT_TOKEN_HERE';
$CHAT_ID   = '-1004454698076';           // "Nutriway conversions" group
// $THREAD_ID = 12;                       // uncomment for forum topics
// -------------------------------------------------------------------------

// Fallbacks in case the mbstring extension isn't installed on the host.
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
  echo json_encode(['ok' => false, 'error' => $error]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'method_not_allowed');

if ($BOT_TOKEN === 'PASTE_YOUR_BOT_TOKEN_HERE' || $BOT_TOKEN === '') {
  fail(500, 'not_configured');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) fail(400, 'bad_json');

// Honeypot — bots fill the hidden "company" field.
if (!empty($data['company'])) { echo json_encode(['ok' => true]); exit; }

$clip = function ($v, $max) {
  $v = is_string($v) ? trim($v) : '';
  return mb_substr($v, 0, $max);
};

$name    = $clip($data['name']    ?? '', 80);
$phone   = $clip($data['phone']   ?? '', 32);
$city    = $clip($data['city']    ?? '', 80);
$message = $clip($data['message'] ?? '', 600);
$qty     = (int)($data['quantity'] ?? 1);
$locale  = ($data['locale'] ?? 'uz') === 'ru' ? 'ru' : 'uz';
$page    = $clip($data['page'] ?? '', 200);

if (mb_strlen($name) < 2) fail(400, 'invalid_name');
if (strlen(preg_replace('/\D/', '', $phone)) < 7) fail(400, 'invalid_phone');

// Regular closure (not an arrow fn) so this runs on older PHP too.
$esc = function ($s) { return htmlspecialchars($s, ENT_NOQUOTES, 'UTF-8'); };
$stamp = (new DateTime('now', new DateTimeZone('Asia/Tashkent')))->format('d.m.Y H:i');

$lines = [
  "🌿 <b>NUTRIWAY — новая заявка</b>", "",
  "👤 <b>Имя:</b> " . $esc($name),
  "📞 <b>Телефон:</b> " . $esc($phone),
];
if ($city)    $lines[] = "📍 <b>Город:</b> " . $esc($city);
$lines[] = "📦 <b>Количество:</b> " . $qty . " шт.";
if ($message) $lines[] = "💬 <b>Комментарий:</b> " . $esc($message);
$lines[] = "";
$lines[] = "🌐 <b>Язык сайта:</b> " . strtoupper($locale);
if ($page)    $lines[] = "🔗 <b>Страница:</b> " . $esc($page);
$lines[] = "🕒 <b>Время:</b> " . $stamp . " (Ташкент)";

$payload = [
  'chat_id' => $CHAT_ID,
  'text' => implode("\n", $lines),
  'parse_mode' => 'HTML',
  'disable_web_page_preview' => true,
];
if (isset($THREAD_ID)) $payload['message_thread_id'] = $THREAD_ID;

$url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";
$body = json_encode($payload, JSON_UNESCAPED_UNICODE);

$ok = false;
if (function_exists('curl_init')) {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
  ]);
  $resp = curl_exec($ch);
  $ok = $resp !== false && strpos($resp, '"ok":true') !== false;
  curl_close($ch);
} else {
  $ctx = stream_context_create(['http' => [
    'method' => 'POST',
    'header' => "Content-Type: application/json\r\n",
    'content' => $body,
    'timeout' => 10,
  ]]);
  $resp = @file_get_contents($url, false, $ctx);
  $ok = $resp !== false && strpos($resp, '"ok":true') !== false;
}

if ($ok) { echo json_encode(['ok' => true]); }
else { fail(502, 'telegram_failed'); }
