"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const queries_1 = require("../queries");
exports.router = (0, express_1.Router)();
// Health check endpoint (no API key required)
exports.router.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Send Telegram message
exports.router.post('/send-message', (req, res) => {
    void (0, queries_1.sendMessageHandler)(req, res);
});
//# sourceMappingURL=index.js.map