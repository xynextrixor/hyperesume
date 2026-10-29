import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  FileCheck,
  ArrowDown,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-10 pb-6 sm:pt-14 sm:pb-8 text-center max-w-4xl mx-auto px-4">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90 mb-5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>Powered by Google Gemini 2.5 • Free & 100% Private</span>
      </div>

      {/* Main Bold Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 leading-[1.15]">
        Make Your Resume{' '}
        <span className="relative whitespace-nowrap">
          <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            Recruiter-Ready
          </span>
          <span className="absolute bottom-1.5 left-0 w-full h-3 bg-emerald-100 -z-0 rounded-sm transform -rotate-1 hidden sm:block opacity-60" />
        </span>{' '}
        with AI
      </h1>

      {/* Single-Focused Subtitle */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
        Upload your resume to uncover hidden weaknesses, receive an objective recruiter score, and get a professionally rewritten version with ATS-ready templates.
      </p>

      {/* Trust & Performance Proof Badges */}
      <div className="mt-8 pt-6 border-t border-neutral-200/70 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-neutral-600 font-medium">
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/70 border border-neutral-200/60 shadow-xs">
          <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Instant Score (0-100)</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/70 border border-neutral-200/60 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Zero Data Retention</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/70 border border-neutral-200/60 shadow-xs">
          <Target className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>ATS Optimized</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/70 border border-neutral-200/60 shadow-xs">
          <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>PDF & DOCX Export</span>
        </div>
      </div>

      {/* Single Option Guide Indicator */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700">
        <span>Upload your resume below to begin</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
