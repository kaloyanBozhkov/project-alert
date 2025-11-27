"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageHandler = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const uuid_1 = require("uuid");
const sendMessageHandler = async (req, res) => {
    try {
        const validation = helpers_1.sendMessageSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                error: 'Invalid request payload',
                details: validation.error.errors,
            });
            return;
        }
        const { project_name, type, payload, datetime } = validation.data;
        await (0, services_1.sendTelegramMessage)({
            projectName: project_name,
            type,
            payload,
            datetime,
        });
        const messageId = (0, uuid_1.v4)();
        res.status(200).json({
            success: true,
            message_id: messageId,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({
            error: 'Failed to send message',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
exports.sendMessageHandler = sendMessageHandler;
//# sourceMappingURL=send-message.js.map