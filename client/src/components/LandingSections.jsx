import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Target,
  LayoutTemplate,
  ChevronDown,
  UploadCloud,
  Check,
  ArrowUp,
  FileCheck2,
} from 'lucide-react';

export default function LandingSections() {
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
    <div className="mt-16 sm:mt-20 space-y-20 max-w-5xl mx-auto px-4">
      {/* 1. Interactive Before vs After Showcase */}
      <section className="bg-gradient-to-b from-white to-neutral-50/80 rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
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

      {/* 2. Core Capabilities Grid */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intelligent Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-3 tracking-tight">
            What Happens Once You Upload
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            A complete 3-step AI enhancement pipeline that takes your raw resume and makes it interview-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              1
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              Instant Recruiter Scorecard
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Gemini audits your document across 6 sections, grading summary clarity, technical depth, education, and ATS layout readability.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              2
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              One-Click "Fix My Resume"
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              AI rewrites weak and passive points using high-impact recruiter verbs without inventing fake credentials or hallucinating metrics.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
              3
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
              Template Styling & PDF Export
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Preview your rewritten resume in Modern, Corporate, or ATS Minimal styles, fine-tune text in-browser, and download vector A4 PDF.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 3-Template Visual Showcase */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Export Ready
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-3 tracking-tight">
            Style Your Improved Resume in 3 Formats
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            After uploading and fixing your resume, select any of these three templates to export your final document.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Modern Tech */}
          <div className="rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between bg-neutral-50/40">
            <div>
              <div className="h-40 rounded-xl bg-white border border-neutral-200 p-3 mb-4 shadow-2xs overflow-hidden flex flex-col justify-between">
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
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <div className="h-1.5 w-14 bg-neutral-400 rounded" />
                    <div className="h-1 w-full bg-neutral-200 rounded" />
                    <div className="h-1 w-5/6 bg-neutral-200 rounded" />
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
                Asymmetric 2-column layout with emerald accents, avatar initials, and skill badges.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 text-[11px] font-medium text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Available immediately after upload</span>
            </div>
          </div>

          {/* Corporate Professional */}
          <div className="rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between bg-neutral-50/40">
            <div>
              <div className="h-40 rounded-xl bg-white border border-neutral-200 p-3 mb-4 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="text-center border-b border-neutral-300 pb-2">
                  <div className="h-2 w-20 bg-neutral-900 mx-auto rounded mb-1" />
                  <div className="h-1 w-28 bg-neutral-400 mx-auto rounded" />
                </div>
                <div className="space-y-2 flex-1 pt-2">
                  <div className="h-1.5 w-16 bg-neutral-800 border-b border-neutral-200 pb-1" />
                  <div className="h-1 w-full bg-neutral-200 rounded" />
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
                Traditional formal layout with centered contact line and solid section dividing rules.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 text-[11px] font-medium text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Available immediately after upload</span>
            </div>
          </div>

          {/* Minimal ATS-Friendly */}
          <div className="rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between bg-neutral-50/40">
            <div>
              <div className="h-40 rounded-xl bg-white border border-neutral-200 p-3 mb-4 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="border-b-2 border-black pb-1.5">
                  <div className="h-2 w-24 bg-black rounded mb-0.5" />
                  <div className="h-1 w-32 bg-neutral-600 rounded" />
                </div>
                <div className="space-y-1.5 flex-1 pt-1.5">
                  <div className="h-1.5 w-20 bg-black uppercase font-bold" />
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
                Single-column monochrome design with uppercase headings to pass enterprise ATS portals.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 text-[11px] font-medium text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Available immediately after upload</span>
            </div>
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

      {/* 5. Bottom Call to Action Banner (Single Clear Option) */}
      <section className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-emerald-400 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free & Private
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Optimize Your Resume?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg mx-auto">
            Upload your resume now to get actionable recruiter feedback, weakness fixes, and an interview-ready document.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={scrollToUpload}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Your Resume</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
