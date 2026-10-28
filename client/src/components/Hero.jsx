import React from 'react';
import { Target, Search, Zap, ShieldCheck, PenTool, ArrowRight } from 'lucide-react';

export default function Hero({ onBuildClick }) {
  return (
    <section className="pt-10 pb-8 sm:pt-14 sm:pb-12 text-center max-w-4xl mx-auto px-4">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-5 shadow-sm">
        <Zap className="w-3.5 h-3.5 text-emerald-600" />
        <span>Next-Generation Resume Intelligence</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.2]">
        Make Your Resume Better with{' '}
        <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-8">
          AI
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
        Upload your existing resume to identify weaknesses and get instant fixes, or build a fresh, recruiter-ready resume from scratch with Gemini assistance.
      </p>

      {/* Quick Action to Build if user has no resume */}
      {onBuildClick && (
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={onBuildClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 hover:border-emerald-500 rounded-full text-xs font-semibold text-neutral-700 hover:text-emerald-700 transition-all shadow-sm hover:shadow"
          >
            <PenTool className="w-3.5 h-3.5 text-emerald-600" />
            <span>Don't have a resume yet? Build one from scratch</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600" />
          </button>
        </div>
      )}

      {/* Feature Highlights with id="features" */}
      <div id="features" className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-600 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>ATS Readability Audit</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Weakness Detection</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Search className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Skill Gap Benchmarking</span>
        </div>
      </div>
    </section>
  );
}
