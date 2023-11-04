import { createBot } from "./bot";
import { TELEGRAM_API_TOKEN } from "./env";

(async () => {
  const bot = createBot(TELEGRAM_API_TOKEN!);

  await bot.launch();

  console.log("bot started!");
})();
