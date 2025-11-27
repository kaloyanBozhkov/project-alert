"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const env_1 = require("../env");
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== env_1.env.API_KEY) {
        res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
        return;
    }
    next();
};
exports.apiKeyMiddleware = apiKeyMiddleware;
//# sourceMappingURL=api-key.js.map