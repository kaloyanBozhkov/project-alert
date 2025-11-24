import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import 'dotenv/config';

export const env = createEnv({
  server: {
    BOT_NAME: z.string().min(1),
    BOT_TOKEN: z.string().min(1),
    API_KEY: z.string().min(1),
    TELEGRAM_CHAT_ID: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

