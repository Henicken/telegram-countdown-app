/* const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf("9070366949:AAEeKrF1oDNrNbduwXAwNj1dxiK-7Sj8r70");

bot.command("countdown", (ctx) => {
  return ctx.reply(
    "🚀 **Click the button below to open your custom HTML/CSS Countdown App:**",
    Markup.inlineKeyboard(
      [
        [
          Markup.button.url(
            "⏳ Open Countdown App",
            "https://telegram-countdown-app.onrender.com/",
          ),
        ],
      ],
      { parse_mode: "Markdown" },
    ),
  );
});

bot.launch();
console.log("Countdown Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
 */

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

/* const bot = new Telegraf("9070366949:AAEeKrF1oDNrNbduwXAwNj1dxiK-7Sj8r70");
 */
bot.command("startcountdown", async (ctx) => {
  const targetDate = new Date("January 7, 2027 00:00:00").getTime();

  const getCountdownText = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      return "🌟 **እንኳን አደረሳችሁ! መልካም የገና በዓል (Genna) 2019 E.C.!** 🌟";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return (
      `🎄 **የኢትዮጵያ የገና በዓል (Genna) 2019 እ.ኤ.አ / 2027** 🎄\n` +
      `*(ታኅሣሥ ፳፱ ቀን)*\n\n` +
      `• **${days}** Days\n` +
      `• **${hours}** Hours\n` +
      `• **${minutes}** Minutes\n` +
      `• **${seconds}** Seconds remaining!\n\n` +
      `✨ *መልካም የበዓል ዝግጅት!* ✨`
    );
  };

  try {
    const initialText = getCountdownText();
    const sentMessage = await ctx.reply(initialText, {
      parse_mode: "Markdown",
    });
    const chatId = sentMessage.chat.id;
    const messageId = sentMessage.message_id;

    await bot.telegram.pinChatMessage(chatId, messageId);

    // Clean interval set strictly to 10 seconds (10000 ms)
    const timerInterval = setInterval(async () => {
      try {
        const updatedText = getCountdownText();
        await bot.telegram.editMessageText(
          chatId,
          messageId,
          null,
          updatedText,
          { parse_mode: "Markdown" },
        );
      } catch (error) {
        if (error.response && error.response.error_code === 400) {
          return; // Safely ignore "message is not modified" if seconds overlap
        }
        console.log("Timer stopped:", error.message);
        clearInterval(timerInterval);
      }
    }, 2000); //UPDATES EVERY 2 SECONDS
  } catch (err) {
    console.log("Error starting countdown:", err.message);
    ctx.reply(
      "Failed to start countdown. Make sure I am an admin with permission to pin messages!",
    );
  }
});

bot.launch();
console.log("Ethiopian Christmas Countdown Bot is running smoothly...");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ethiopian Christmas Countdown Bot is alive and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
