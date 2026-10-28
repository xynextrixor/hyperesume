import React from 'react';
import { AlertCircle, X, Key, RefreshCw, AlertTriangle, Clock } from 'lucide-react';

export default function ErrorAlert({ message, onDismiss, onRetry }) {
  if (!message) return null;

  const msgLower = message.toLowerCase();

  const isKeyError =
    msgLower.includes('gemini_api_key') ||
    msgLower.includes('gemini api key') ||
    msgLower.includes('api key');

  const isRateLimit =
    msgLower.includes('rate limit') ||
    msgLower.includes('quota') ||
    msgLower.includes('429');

  const isTimeout =
    msgLower.includes('timeout') ||
    msgLower.includes('timed out');

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-5 animate-in fade-in duration-200">
      <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-5 text-rose-950 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-700 flex-shrink-0 mt-0.5">
            {isKeyError ? (
              <Key className="w-5 h-5" />
            ) : isRateLimit ? (
              <AlertTriangle className="w-5 h-5" />
            ) : isTimeout ? (
              <Clock className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-rose-950">
              {isKeyError
                ? 'Gemini API Key Required'
                : isRateLimit
                ? 'Rate Limit Exceeded'
                : isTimeout
                ? 'Request Timed Out'
                : 'Action Notification'}
            </h4>

            <p className="mt-1 text-xs sm:text-sm text-rose-800 leading-relaxed break-words">
              {message}
            </p>

            {isKeyError && (
              <div className="mt-3 p-3 rounded-xl bg-white/90 border border-rose-200 text-xs text-neutral-800 space-y-1">
                <p className="font-semibold text-rose-900">How to configure:</p>
                <p className="text-neutral-600">
                  1. Get a free API key at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">Google AI Studio</a>.
                </p>
                <p className="text-neutral-600 font-mono bg-neutral-100 px-2 py-1 rounded text-[11px] inline-block">
                  GEMINI_API_KEY=your_key_here
                </p>
                <p className="text-neutral-500 text-[11px]">Paste it into <code className="font-mono font-semibold">server/.env</code> and restart the backend.</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-rose-700 text-white hover:bg-rose-800 active:scale-95 transition-all shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Analysis</span>
                </button>
              )}
            </div>
          </div>

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-100/60 transition-colors flex-shrink-0"
              title="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
