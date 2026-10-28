import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defensively look for .env in current working dir, server/.env, and root project .env
const candidateEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env'),     // server/.env
  path.resolve(__dirname, '../../../.env'),    // root .env
];

for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') {
      break;
    }
  }
}

let geminiClient = null;

export const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

/**
 * Returns the configured Gemini model name or fallback default
 * @returns {string} Model name
 */
export const getGeminiModel = () => {
  const model = process.env.GEMINI_MODEL;
  if (model && model.trim() !== '') {
    return model.trim();
  }
  return DEFAULT_GEMINI_MODEL;
};

/**
 * Returns an authenticated GoogleGenAI client instance
 * @returns {GoogleGenAI}
 */
export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    const error = new Error('GEMINI_API_KEY is not configured. Please add your Gemini API key in server/.env');
    error.statusCode = 503;
    throw error;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }

  return geminiClient;
};

/**
 * Checks whether a valid Gemini API key is present in environment
 * @returns {boolean}
 */
export const isGeminiConfigured = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(
    apiKey &&
    apiKey.trim() !== '' &&
    apiKey !== 'your_gemini_api_key_here' &&
    !apiKey.startsWith('your_')
  );
};
