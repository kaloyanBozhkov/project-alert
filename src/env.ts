import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  BOT_NAME: z.string().min(1),
  BOT_TOKEN: z.string().min(1),
  API_KEY: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);
