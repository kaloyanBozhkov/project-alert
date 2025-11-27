"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.envSchema = void 0;
const zod_1 = require("zod");
require("dotenv/config");
exports.envSchema = zod_1.z.object({
    BOT_NAME: zod_1.z.string().min(1),
    BOT_TOKEN: zod_1.z.string().min(1),
    API_KEY: zod_1.z.string().min(1),
    TELEGRAM_CHAT_ID: zod_1.z.string().min(1),
});
exports.env = exports.envSchema.parse(process.env);
//# sourceMappingURL=env.js.map