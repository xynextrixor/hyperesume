import React, { useState } from 'react';
import { Sparkles, X, Check, Copy, AlertCircle, RefreshCw, Lightbulb, ShieldCheck } from 'lucide-react';

export default function AiAssistModal({
  isOpen,
  onClose,
  title,
  subtitle,
  isLoading,
  error,
  data,
  actionType,
  onApply,
  onRetry,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base flex items-center gap-2">
                {title || 'Gemini AI Assistant'}
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Factual
                </span>
              </h3>
              <p className="text-xs text-neutral-500">{subtitle || 'Grounded exclusively in your input facts'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-700">
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                <Sparkles className="w-5 h-5 text-emerald-600 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">Gemini AI is crafting your content...</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Applying active verbs, professional framing, and verifying factual integrity.
                </p>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">AI Assistance Error</h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Again
                </button>
              )}
            </div>
          )}

          {!isLoading && !error && data && (
            <>
              {/* 1. Summary Polish Result */}
              {actionType === 'improve-summary' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Recommended Version
                      </span>
                      <button
                        onClick={() => onApply(data.improvedSummary)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Apply to Summary
                      </button>
                    </div>
                    <p className="text-neutral-800 text-sm leading-relaxed whitespace-pre-wrap">
                      {data.improvedSummary}
                    </p>
                  </div>

                  {data.alternatives?.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Alternative Variations
                      </h4>
                      <div className="space-y-2">
                        {data.alternatives.map((alt, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-start justify-between gap-3 hover:border-emerald-300 transition-colors"
                          >
                            <p className="text-xs text-neutral-700 leading-relaxed flex-1">{alt}</p>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => handleCopy(alt, idx)}
                                title="Copy"
                                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-white"
                              >
                                {copiedIndex === idx ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => onApply(alt)}
                                className="px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded-md border border-emerald-200"
                              >
                                Use
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.tips?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-amber-900 text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block mb-1">Pro-Tip for Greater Impact:</span>
                        <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
                          {data.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Bullet Rewrite Result */}
              {actionType === 'rewrite-bullet' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          Action-Verb Rewrite
                        </span>
                        {data.actionVerbUsed && (
                          <span className="text-[11px] font-mono bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded">
                            {data.actionVerbUsed}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onApply(data.rewrittenBullet)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Apply Bullet
                      </button>
                    </div>
                    <p className="text-neutral-800 text-sm leading-relaxed">{data.rewrittenBullet}</p>
                  </div>

                  {data.alternatives?.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                        Alternative Phrasings
                      </h4>
                      <div className="space-y-2">
                        {data.alternatives.map((alt, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-start justify-between gap-3 hover:border-emerald-300 transition-colors"
                          >
                            <p className="text-xs text-neutral-700 leading-relaxed flex-1">{alt}</p>
                            <button
                              onClick={() => onApply(alt)}
                              className="px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded-md border border-emerald-200 flex-shrink-0"
                            >
                              Use
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.improvementTips?.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2 text-blue-900 text-xs">
                      <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block mb-0.5">Missing Metrics Tip:</span>
                        <p className="text-blue-800">{data.improvementTips.join(' ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Project Enhancement Result */}
              {actionType === 'enhance-project' && (
                <div className="space-y-4">
                  {data.enhancedDescription && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                          Enhanced Overview
                        </span>
                        <button
                          onClick={() => onApply({ description: data.enhancedDescription })}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          Apply Overview
                        </button>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">{data.enhancedDescription}</p>
                    </div>
                  )}

                  {data.enhancedProblemSolved && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                          Problem Solved Statement
                        </span>
                        <button
                          onClick={() => onApply({ problemSolved: data.enhancedProblemSolved })}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          Apply Problem
                        </button>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">{data.enhancedProblemSolved}</p>
                    </div>
                  )}

                  {data.keyBulletPoints?.length > 0 && (
                    <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          Key Technical Contributions
                        </span>
                        <button
                          onClick={() =>
                            onApply({
                              contributions: data.keyBulletPoints.map((b) => `• ${b}`).join('\n'),
                            })
                          }
                          className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Apply Contributions
                        </button>
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-800">
                        {data.keyBulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-right">
                    <button
                      onClick={() =>
                        onApply({
                          description: data.enhancedDescription,
                          problemSolved: data.enhancedProblemSolved,
                          contributions: data.keyBulletPoints?.map((b) => `• ${b}`).join('\n'),
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <Check className="w-4 h-4" />
                      Apply All to Project
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/60 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict factual integrity: No invented claims or metrics.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-neutral-200 font-medium hover:bg-white text-neutral-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
