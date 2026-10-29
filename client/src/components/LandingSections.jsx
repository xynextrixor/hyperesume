import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  LayoutTemplate,
  HelpCircle,
  ChevronDown,
  UploadCloud,
  PenTool,
  Check,
  FileCode,
  Briefcase,
  Layers,
} from 'lucide-react';

export default function LandingSections({ onBuildClick, onSelectTemplate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToUpload = () => {
    const el = document.getElementById('upload-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'Is my resume data stored permanently or used to train AI?',
      a: 'No. All resumes are processed strictly in ephemeral RAM buffers during the request lifecycle and discarded immediately in finally blocks. No database, user accounts, or permanent file storage is used.',
    },
    {
      q: 'Will my resume pass Applicant Tracking Systems (ATS)?',
      a: 'Yes. All three templates (especially Minimal ATS-Friendly) use single-column or clean hierarchy structures with standard headings, UTF-8 typography, and zero unparsable graphics or tables.',
    },
    {
      q: 'Does Gemini AI invent or hallucinate fake credentials?',
      a: 'No. The AI prompts enforce strict factual grounding rules with low temperature (0.2). Gemini only rewrites and sharpens the experiences and facts you provide, inserting metric placeholders for numbers you can fill in.',
    },
    {
      q: 'Can I customize colors, fonts, and page size?',
      a: 'Yes. The live preview supports custom accent color palettes, multiple typography pairings (Plus Jakarta Sans, Georgia, Inter), font sizing (Compact, Standard, Spacious), and outputs clean vector A4 PDFs.',
    },
    {
      q: 'What document formats are supported?',
      a: 'You can upload PDF (.pdf) and Microsoft Word (.docx) resumes up to 5MB, and export your polished resumes as selectable vector A4 PDFs or editable Word (.docx) files.',
    },
  ];

  return (
    <div className="mt-20 space-y-24 max-w-5xl mx-auto px-4">
      {/* 1. Interactive Before vs After Showcase */}
      <section className="bg-gradient-to-b from-white to-neutral-50/80 rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Real Recruiter Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-3 tracking-tight">
            See the Difference AI Optimization Makes
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Recruiters spend an average of 6 seconds skimming a resume. Here is how Gemini transforms passive bullet points into high-impact achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Before Card */}
          <div className="rounded-2xl border border-red-200 bg-red-50/30 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-red-200/60 mb-3.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700">
                  <XCircle className="w-4 h-4 text-red-500" />
                  Before (Weak & Passive)
                </span>
                <span className="text-[11px] font-semibold text-red-600 bg-red-100/70 px-2 py-0.5 rounded-full">
                  Score: 48/100
                </span>
              </div>
              <p className="text-sm text-neutral-700 italic font-medium leading-relaxed">
                "Responsible for working on backend features, fixing tickets, and helping with the website for clients."
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-red-200/50 space-y-1.5 text-xs text-red-800">
              <div className="flex items-center gap-1.5">
                <span className="text-red-500">✗</span> Passive verb ("Responsible for")
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-red-500">✗</span> Vague claims with zero measurable outcomes
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-red-500">✗</span> No specific technical frameworks listed
              </div>
            </div>
          </div>

          {/* After Card */}
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200 mb-3.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  After (Gemini Optimized)
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  Score: 94/100
                </span>
              </div>
              <p className="text-sm text-neutral-900 font-semibold leading-relaxed">
                "Architected 6 RESTful microservices in Node.js and resolved 45+ critical production defects, reducing API response latency by 32%."
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-emerald-200/60 space-y-1.5 text-xs text-emerald-900">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Strong action verb ("Architected")
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Quantified impact metrics (32% latency reduction)
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Explicit technical competencies (Node.js REST microservices)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Feature Pillars Grid */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intelligent Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-3 tracking-tight">
            Everything You Need to Land Interviews
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Built as a comprehensive suite for students, freshers, and experienced engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              Recruiter Scoring
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Objective 0–100 benchmark evaluating Summary, Work Experience, Technical Skills, Education, and Grammar.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              Active-Voice AI Fixer
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Turns passive job descriptions into action-driven statements while strictly preserving verified factual history.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              3 Vetted Templates
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Choose from Modern Tech, Corporate Professional, or Minimal ATS-Friendly with live color and font customization.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              Interview Prep Kit
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Target specific roles by pasting job descriptions to get tailored technical interview questions and project talking points.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 3-Template Visual Showcase */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Professional Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-3 tracking-tight">
            Three Vetted Resume Templates
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Tailored layouts engineered to look outstanding to human recruiters and pass automated ATS parsers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Modern Tech */}
          <div className="rounded-2xl border border-neutral-200 hover:border-emerald-500 transition-all p-5 flex flex-col justify-between group hover:shadow-md bg-neutral-50/40">
            <div>
              <div className="h-44 rounded-xl bg-white border border-neutral-200 p-3 mb-4 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    JS
                  </div>
                  <div>
                    <div className="h-2 w-16 bg-neutral-900 rounded mb-1" />
                    <div className="h-1.5 w-10 bg-emerald-600 rounded" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 flex-1 pt-2">
                  <div className="col-span-1 border-r border-neutral-100 pr-1 space-y-1">
                    <div className="h-1.5 w-8 bg-neutral-300 rounded" />
                    <div className="h-1 w-full bg-neutral-200 rounded" />
                    <div className="h-1 w-full bg-neutral-200 rounded" />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <div className="h-1.5 w-14 bg-neutral-400 rounded" />
                    <div className="h-1 w-full bg-neutral-200 rounded" />
                    <div className="h-1 w-5/6 bg-neutral-200 rounded" />
                    <div className="h-1 w-4/6 bg-neutral-200 rounded" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-bold text-sm text-neutral-900">Modern Tech</h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Developers
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Asymmetric 2-column layout with emerald accents, avatar initials, and skill badges. Ideal for tech candidates.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectTemplate && onSelectTemplate('modern')}
              className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <span>Use Modern Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Corporate Professional */}
          <div className="rounded-2xl border border-neutral-200 hover:border-emerald-500 transition-all p-5 flex flex-col justify-between group hover:shadow-md bg-neutral-50/40">
            <div>
              <div className="h-44 rounded-xl bg-white border border-neutral-200 p-3 mb-4 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="text-center border-b border-neutral-300 pb-2">
                  <div className="h-2 w-20 bg-neutral-900 mx-auto rounded mb-1" />
                  <div className="h-1 w-28 bg-neutral-400 mx-auto rounded" />
                </div>
                <div className="space-y-2 flex-1 pt-2">
                  <div className="h-1.5 w-16 bg-neutral-800 border-b border-neutral-200 pb-1" />
                  <div className="h-1 w-full bg-neutral-200 rounded" />
                  <div className="h-1 w-11/12 bg-neutral-200 rounded" />
                  <div className="h-1.5 w-16 bg-neutral-800 border-b border-neutral-200 pb-1" />
                  <div className="h-1 w-full bg-neutral-200 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-bold text-sm text-neutral-900">Corporate Professional</h3>
                <span className="text-[10px] font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5 rounded-full">
                  Corporate
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Traditional structured formal layout with centered contact lines and solid section rules. Best for finance & corporate jobs.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectTemplate && onSelectTemplate('professional')}
              className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <span>Use Professional Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Minimal ATS-Friendly */}
          <div className="rounded-2xl border border-neutral-200 hover:border-emerald-500 transition-all p-5 flex flex-col justify-between group hover:shadow-md bg-neutral-50/40">
            <div>
              <div className="h-44 rounded-xl bg-white border border-neutral-200 p-3 mb-4 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="border-b-2 border-black pb-1.5">
                  <div className="h-2 w-24 bg-black rounded mb-0.5" />
                  <div className="h-1 w-32 bg-neutral-600 rounded" />
                </div>
                <div className="space-y-1.5 flex-1 pt-1.5">
                  <div className="h-1.5 w-20 bg-black uppercase font-bold" />
                  <div className="h-1 w-full bg-neutral-300 rounded" />
                  <div className="h-1 w-full bg-neutral-300 rounded" />
                  <div className="h-1.5 w-20 bg-black uppercase font-bold" />
                  <div className="h-1 w-11/12 bg-neutral-300 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-bold text-sm text-neutral-900">Minimal ATS-Friendly</h3>
                <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                  100% ATS Safe
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pure single-column monochrome design with uppercase headings. Eliminates tables and graphics for flawless machine parsing.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectTemplate && onSelectTemplate('ats')}
              className="mt-5 w-full inline-flex items-center justify-center gap-1.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <span>Use ATS Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-2xs transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-neutral-900 hover:bg-neutral-50/60 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform flex-shrink-0 ${
                    openFaq === idx ? 'transform rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom Call to Action Banner */}
      <section className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-emerald-400 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            Get Started in Seconds
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Build a Winning Resume?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg mx-auto">
            Audit your existing resume or craft an interview-ready version from scratch. 100% free with no sign-up or credit card required.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToUpload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Existing Resume</span>
            </button>

            {onBuildClick && (
              <button
                type="button"
                onClick={onBuildClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 rounded-xl text-xs sm:text-sm font-bold transition-all"
              >
                <PenTool className="w-4 h-4 text-emerald-400" />
                <span>Build from Scratch</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
