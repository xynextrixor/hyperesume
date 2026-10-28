import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck,
  Wand2,
  RotateCcw,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export default function AnalysisResults({ data, onReset, onFixResume, isFixing = false }) {
  if (!data) return null;

  const {
    overallScore = 0,
    summary = '',
    strengths = [],
    weaknesses = [],
    sections = [],
    atsFeedback = [],
    improvements = [],
    fileName,
    fileSize,
  } = data;

  // Formatting helpers
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getScoreBadge = (score) => {
    if (score >= 80) {
      return {
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        bar: 'bg-emerald-500',
        label: 'Strong & Competitive',
        subtext: 'Your resume meets or exceeds typical hiring manager benchmarks.',
      };
    }
    if (score >= 60) {
      return {
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        bar: 'bg-amber-500',
        label: 'Moderate Impact',
        subtext: 'Good foundation; targeted tweaks will significantly boost your interview response rate.',
      };
    }
    return {
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      bar: 'bg-rose-500',
      label: 'Needs Substantial Work',
      subtext: 'Notable gaps in metrics, formatting, or clarity were detected.',
    };
  };

  const getSectionBadge = (score) => {
    if (score >= 80) return { color: 'text-emerald-700 bg-emerald-50 border-emerald-200', bar: 'bg-emerald-500' };
    if (score >= 60) return { color: 'text-amber-700 bg-amber-50 border-amber-200', bar: 'bg-amber-500' };
    return { color: 'text-rose-700 bg-rose-50 border-rose-200', bar: 'bg-rose-500' };
  };

  const badge = getScoreBadge(overallScore);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8 pb-16 animate-in fade-in duration-300">
      {/* Top Banner / Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            AI Analysis Completed
          </span>
          {fileName && (
            <p className="text-xs text-neutral-500 mt-1">
              Document: <span className="font-semibold text-neutral-800">{fileName}</span>
              {fileSize && <span> ({formatFileSize(fileSize)})</span>}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:text-neutral-900 transition-all shadow-sm active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Upload Another Resume</span>
        </button>
      </div>

      {/* 1. Main Overall Score & Summary Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border mb-3 ${badge.bg} ${badge.color} ${badge.border}`}>
              <Award className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              Executive Evaluation
            </h2>

            <p className="mt-2 text-neutral-700 leading-relaxed text-sm sm:text-base">
              {summary || 'Your resume has been comprehensively evaluated using Gemini AI.'}
            </p>

            <p className="text-xs text-neutral-500 mt-3">{badge.subtext}</p>
          </div>

          {/* Visual Score Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 min-w-[170px] text-center self-stretch md:self-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Overall Score
            </span>
            <div className="flex items-baseline justify-center">
              <span className={`text-5xl font-black tracking-tight ${badge.color}`}>
                {overallScore}
              </span>
              <span className="text-neutral-400 font-semibold text-lg ml-1">/100</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-neutral-200 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${badge.bar}`}
                style={{ width: `${Math.min(Math.max(overallScore, 5), 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-neutral-400 mt-2">Recruiter Benchmark</span>
          </div>
        </div>

        {/* Advisory Disclaimer */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-start gap-2 text-xs text-neutral-400">
          <ShieldAlert className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
          <span>
            Advisory Notice: This evaluation is generated by AI based strictly on the text provided. It does not guarantee employment offers or algorithmic ATS passage.
          </span>
        </div>
      </div>

      {/* 2. Section-Level Breakdown Grid */}
      {sections && sections.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-neutral-900">Section-by-Section Quality</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((sec, idx) => {
              const secBadge = getSectionBadge(sec.score);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-neutral-200/80 p-5 shadow-sm hover:border-emerald-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-neutral-900 text-sm truncate">
                        {sec.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${secBadge.color}`}>
                        {sec.score}/100
                      </span>
                    </div>

                    <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full ${secBadge.bar}`}
                        style={{ width: `${Math.min(Math.max(sec.score, 5), 100)}%` }}
                      />
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {sec.feedback}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Strengths & Weaknesses 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Professional Strengths</h3>
              <p className="text-xs text-neutral-500">Elements working strongly in your favor</p>
            </div>
          </div>

          <div className="mt-4 space-y-3.5 flex-1">
            {strengths && strengths.length > 0 ? (
              strengths.map((item, idx) => {
                const title = typeof item === 'object' ? item.title : 'Key Strength';
                const description = typeof item === 'object' ? item.description : item;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100/80">
                    <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {title}
                    </h4>
                    <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                      {description}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-neutral-500 italic">No specific strengths identified.</p>
            )}
          </div>
        </div>

        {/* Weaknesses with Actionable Suggestions */}
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Weaknesses & Missing Details</h3>
              <p className="text-xs text-neutral-500">Gaps holding your resume back from top rankings</p>
            </div>
          </div>

          <div className="mt-4 space-y-3.5 flex-1">
            {weaknesses && weaknesses.length > 0 ? (
              weaknesses.map((item, idx) => {
                const title = typeof item === 'object' ? item.title : 'Improvement Area';
                const description = typeof item === 'object' ? item.description : item;
                const suggestion = typeof item === 'object' ? item.suggestion : null;

                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-100/80">
                    <h4 className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                      {title}
                    </h4>
                    <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                      {description}
                    </p>
                    {suggestion && (
                      <div className="mt-2.5 p-2 rounded-lg bg-white/90 border border-rose-200 text-[11px] text-neutral-800">
                        <span className="font-semibold text-emerald-800">💡 Suggested Fix: </span>
                        {suggestion}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-neutral-500 italic">No critical weaknesses detected.</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. ATS Readability & Formatting Suggestions */}
      {atsFeedback && atsFeedback.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">ATS Readability & Layout Guidance</h3>
              <p className="text-xs text-neutral-500">Document structure optimizations for automated applicant systems</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {atsFeedback.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-1.5 flex-shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Prioritized Actionable Improvement Suggestions */}
      {improvements && improvements.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Prioritized Recommendations</h3>
              <p className="text-xs text-neutral-500">Ordered by highest potential impact on your interview outcomes</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {improvements.map((action, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-200/70 hover:border-emerald-300 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Priority {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-800 mt-1 leading-relaxed font-medium">
                    {action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Call to Action: Fix My Resume */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Resume Optimizer</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
            Want Gemini to rewrite your resume with these fixes?
          </h3>
          <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-xl">
            Automatically transform weak bullet points, add quantifiable metric templates, and generate a polished, ATS-optimized version.
          </p>
        </div>

        {/* Fix My Resume Button */}
        <button
          type="button"
          onClick={onFixResume}
          disabled={isFixing}
          className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex-shrink-0 ${
            isFixing
              ? 'bg-emerald-500 text-white cursor-wait opacity-90'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white hover:shadow-md hover:shadow-emerald-200'
          }`}
        >
          {isFixing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Rewriting Resume with Gemini...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Fix My Resume (AI Rewrite)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
