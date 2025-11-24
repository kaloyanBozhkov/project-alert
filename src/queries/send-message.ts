import { Request, Response } from 'express';
import { sendMessageSchema } from '@/helpers';
import { sendTelegramMessage } from '@/services';
import { v4 as uuidv4 } from 'uuid';

export const sendMessageHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = sendMessageSchema.safeParse(req.body);
    
    if (!validation.success) {
      res.status(400).json({
        error: 'Invalid request payload',
        details: validation.error.errors,
      });
      return;
    }

    const { project_name, type, payload, datetime } = validation.data;

    await sendTelegramMessage({
      projectName: project_name,
      type,
      payload,
      datetime,
    });

    const messageId = uuidv4();

    res.status(200).json({
      success: true,
      message_id: messageId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

