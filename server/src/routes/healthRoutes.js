import express from 'express';
import { isGeminiConfigured, getGeminiModel } from '../config/gemini.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'ResumeAI backend is running smoothly',
    timestamp: new Date().toISOString(),
    geminiConfigured: isGeminiConfigured(),
    geminiModel: getGeminiModel(),
  });
});

export default router;
