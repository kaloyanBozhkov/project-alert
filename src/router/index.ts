import { Router } from 'express';
import { sendMessageHandler } from '@/queries';

export const router = Router();

// Health check endpoint (no API key required)
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Send Telegram message
router.post('/send-message', (req, res) => {
  void sendMessageHandler(req, res);
});

