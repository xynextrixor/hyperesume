import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Clock } from 'lucide-react';

const PROGRESS_STAGES = [
  'Validating document format and structure...',
  'Extracting text streams from document...',
  'Connecting to Google Gemini API engine...',
  'Evaluating section-by-section depth & metrics...',
  'Auditing ATS readability and layout standards...',
  'Compiling prioritized improvement suggestions...',
];

export default function LoadingIndicator({ fileName }) {
  const [stageIdx, setStageIdx] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIdx((prev) => (prev + 1) % PROGRESS_STAGES.length);
    }, 2500);

    const secondsTimer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(stageTimer);
      clearInterval(secondsTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 my-8 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-8 text-center">
        {/* Animated Icon Ring */}
        <div className="relative w-16 h-16 mx-auto mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
          <Brain className="w-7 h-7 text-emerald-600 animate-pulse" />
        </div>

        {/* Title & Document */}
        <h3 className="text-lg font-bold text-neutral-900">
          Analyzing Your Resume with Gemini AI
        </h3>

        {fileName && (
          <p className="text-xs text-neutral-500 mt-1 truncate max-w-sm mx-auto">
            Processing: <span className="font-semibold text-neutral-700">{fileName}</span>
          </p>
        )}

        {/* Rotating Stage Message */}
        <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/70 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
          <span className="transition-all duration-300">
            {PROGRESS_STAGES[stageIdx]}
          </span>
        </div>

        {/* Elapsed Timer & Reassurance */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Elapsed time: {elapsedSeconds}s (typically takes 5–15 seconds)</span>
        </div>
      </div>
    </div>
  );
}
