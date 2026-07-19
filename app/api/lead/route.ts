import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 80, phone: 32, city: 80, message: 600 } as const;

/** Naive fixed-window rate limit, keyed by IP. Resets on cold start. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/** Telegram MarkdownV2 is fussy; HTML parse_mode only needs these three. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return escapeHtml(value.trim().slice(0, max));
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      "[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured"
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: real users never fill a hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const city = clean(body.city, MAX.city);
  const message = clean(body.message, MAX.message);
  const quantity = Number(body.quantity) || 1;
  const locale = body.locale === "ru" ? "ru" : "uz";
  const page = clean(body.page, 200);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const stamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });

  const lines = [
    "🌿 <b>NUTRIWAY — новая заявка</b>",
    "",
    `👤 <b>Имя:</b> ${name}`,
    `📞 <b>Телефон:</b> ${phone}`,
    city ? `📍 <b>Город:</b> ${city}` : null,
    `📦 <b>Количество:</b> ${quantity} шт.`,
    message ? `💬 <b>Комментарий:</b> ${message}` : null,
    "",
    `🌐 <b>Язык сайта:</b> ${locale.toUpperCase()}`,
    page ? `🔗 <b>Страница:</b> ${page}` : null,
    `🕒 <b>Время:</b> ${stamp} (Ташкент)`,
  ].filter(Boolean);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
          ...(process.env.TELEGRAM_THREAD_ID
            ? { message_thread_id: Number(process.env.TELEGRAM_THREAD_ID) }
            : {}),
        }),
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("[lead] Telegram API rejected the message:", detail);
      return NextResponse.json(
        { ok: false, error: "telegram_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] Failed to reach Telegram:", error);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
