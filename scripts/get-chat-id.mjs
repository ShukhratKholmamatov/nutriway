/**
 * Prints the Telegram chat id(s) your bot can see.
 *
 * Prerequisites:
 *   1. TELEGRAM_BOT_TOKEN is set in .env.local
 *   2. The bot has been added to your group AS AN ADMIN
 *   3. You have sent at least one message in that group
 *
 * Run:  node scripts/get-chat-id.mjs
 * Then copy the printed id into TELEGRAM_CHAT_ID in .env.local.
 */
import { readFileSync } from "node:fs";

function readEnv(key) {
  if (process.env[key]) return process.env[key];
  try {
    const file = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const line = file.split(/\r?\n/).find((l) => l.startsWith(`${key}=`));
    return line ? line.slice(key.length + 1).trim() : "";
  } catch {
    return "";
  }
}

const token = readEnv("TELEGRAM_BOT_TOKEN");
if (!token) {
  console.error("✗ TELEGRAM_BOT_TOKEN is not set in .env.local");
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();

if (!data.ok) {
  console.error("✗ Telegram error:", data.description);
  process.exit(1);
}

const chats = new Map();
for (const u of data.result) {
  const chat = u.message?.chat ?? u.channel_post?.chat;
  if (chat) chats.set(chat.id, chat);
}

if (chats.size === 0) {
  console.log(
    [
      "No chats found yet. Do this, then run me again:",
      "  1. Add your bot to the Telegram group.",
      "  2. Make the bot an ADMINISTRATOR.",
      "  3. Send any message in the group.",
    ].join("\n")
  );
  process.exit(0);
}

console.log("Found these chats:\n");
for (const chat of chats.values()) {
  console.log(`  id: ${chat.id}   (${chat.type})  ${chat.title ?? ""}`);
}
console.log("\nCopy the group id (starts with -100) into TELEGRAM_CHAT_ID.");
