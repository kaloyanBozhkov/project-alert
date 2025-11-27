"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelegramMessage = void 0;
const zod_1 = require("zod");
const env_1 = require("../env");
const helpers_1 = require("../helpers");
const telegramMessageOptionsSchema = zod_1.z.object({
    projectName: zod_1.z.string().min(1),
    type: zod_1.z.enum(['error', 'info', 'warn', 'celebrate']),
    payload: zod_1.z.record(zod_1.z.unknown()).optional(),
    datetime: zod_1.z.string(),
});
const getTypeEmoji = (type) => {
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
const sendTelegramMessage = async (options) => {
    const validated = telegramMessageOptionsSchema.parse(options);
    const { projectName, type, payload, datetime } = validated;
    const emoji = getTypeEmoji(type);
    const formattedDate = (0, helpers_1.formatDateHumanReadable)(datetime);
    let message = `${emoji} <b>${type.toUpperCase()}</b> - ${projectName}\n`;
    message += `📅 ${formattedDate}\n`;
    if (payload) {
        message += `\n<b>Payload:</b>\n${(0, helpers_1.formatJsonToHtml)(payload)}`;
    }
    const url = `https://api.telegram.org/bot${env_1.env.BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: env_1.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
        }),
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to send Telegram message: ${error}`);
    }
};
exports.sendTelegramMessage = sendTelegramMessage;
//# sourceMappingURL=telegram.js.map