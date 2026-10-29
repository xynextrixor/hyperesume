import React from 'react';
import {
  Sparkles,
  UploadCloud,
  PenTool,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  FileCheck,
} from 'lucide-react';

export default function Hero({ onBuildClick }) {
  const scrollToUpload = () => {
    const el = document.getElementById('upload-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-10 pb-6 sm:pt-16 sm:pb-10 text-center max-w-4xl mx-auto px-4">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90 mb-6 shadow-sm hover:bg-emerald-100/70 transition-colors">
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

      {/* Persuasive Subtitle */}
      <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
        Upload your existing resume to discover weaknesses and get instant fixes, or craft a clean, ATS-compliant resume from scratch with 3 professional templates.
      </p>

      {/* Dual Primary Call-to-Action Buttons */}
      <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
        <button
          type="button"
          onClick={scrollToUpload}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md hover:shadow-emerald-200"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Audit Existing Resume</span>
        </button>

        {onBuildClick && (
          <button
            type="button"
            onClick={onBuildClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 border border-neutral-300 hover:border-neutral-400 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <PenTool className="w-4 h-4 text-emerald-600" />
            <span>Build from Scratch</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        )}
      </div>

      {/* Trust & Performance Proof Badges */}
      <div className="mt-10 pt-6 border-t border-neutral-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-neutral-600 font-medium">
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/60 border border-neutral-200/60 shadow-xs">
          <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Instant Scoring (0-100)</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/60 border border-neutral-200/60 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Zero Data Retention</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/60 border border-neutral-200/60 shadow-xs">
          <Target className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>ATS Optimized</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/60 border border-neutral-200/60 shadow-xs">
          <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Vector A4 PDF Export</span>
        </div>
      </div>
    </section>
  );
}
