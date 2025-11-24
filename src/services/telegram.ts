import { z } from 'zod';
import { env } from '@/env';
import { formatJsonToHtml, formatDateHumanReadable } from '@/helpers';

const telegramMessageOptionsSchema = z.object({
  projectName: z.string().min(1),
  type: z.enum(['error', 'info', 'warn', 'celebrate']),
  payload: z.record(z.unknown()).optional(),
  datetime: z.string(),
});

type TelegramMessageOptions = z.infer<typeof telegramMessageOptionsSchema>;

const getTypeEmoji = (type: TelegramMessageOptions['type']): string => {
  switch (type) {
    case 'error':
      return '🚨';
    case 'warn':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    case 'celebrate':
      return '🎉';
    default:
      return 'ℹ️';
  }
};

export const sendTelegramMessage = async (options: TelegramMessageOptions): Promise<void> => {
  const validated = telegramMessageOptionsSchema.parse(options);
  const { projectName, type, payload, datetime } = validated;
  const emoji = getTypeEmoji(type);
  const formattedDate = formatDateHumanReadable(datetime);
  
  let message = `${emoji} <b>${type.toUpperCase()}</b> - ${projectName}\n`;
  message += `📅 ${formattedDate}\n`;
  
  if (payload) {
    message += `\n<b>Payload:</b>\n${formatJsonToHtml(payload)}`;
  }

  const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send Telegram message: ${error}`);
  }
};

