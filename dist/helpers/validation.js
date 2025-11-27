"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendMessageSchema = zod_1.z.object({
    project_name: zod_1.z.string().min(1),
    type: zod_1.z.enum(['error', 'info', 'warn']),
    payload: zod_1.z.record(zod_1.z.unknown()).optional(),
    datetime: zod_1.z.string().datetime().optional().default(new Date().toISOString()),
});
//# sourceMappingURL=validation.js.map