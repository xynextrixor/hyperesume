import React from 'react';
import {
  Check,
  Eye,
  LayoutTemplate,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  FileText,
} from 'lucide-react';
import { TEMPLATES } from './templateConfig';

export default function TemplateSelection({
  selectedTemplateId,
  onSelectTemplate,
  onPreviewTemplate,
  onBackToBuilder,
}) {
  const templatesList = Object.values(TEMPLATES);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Phase 4 Template Gallery
            </span>
            <span className="text-xs text-neutral-400">• Data Preserved</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">
            Choose Your Resume Template
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
            Select from three distinct, professionally engineered layouts. Switching templates updates your document presentation instantly while keeping 100% of your entered details intact.
          </p>
        </div>

        {onBackToBuilder && (
          <button
            onClick={onBackToBuilder}
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors self-start sm:self-auto"
          >
            Back to Editor
          </button>
        )}
      </div>

      {/* 3 Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templatesList.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;

          return (
            <div
              key={tpl.id}
              className={`bg-white rounded-2xl border transition-all flex flex-col overflow-hidden shadow-sm hover:shadow-md ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {/* Thumbnail Mockup */}
              <div
                onClick={() => onPreviewTemplate(tpl.id)}
                className="bg-neutral-100 p-6 flex items-center justify-center border-b border-neutral-100 cursor-pointer group relative overflow-hidden h-64"
              >
                {/* Visual Thumbnail Representation of the layout */}
                <div className="w-44 h-56 bg-white rounded-lg shadow-md border border-neutral-300 p-3 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                  {tpl.id === 'modern' && (
                    <div className="space-y-2 h-full flex flex-col">
                      <div className="flex items-center gap-2 border-b border-emerald-500 pb-1.5">
                        <div className="w-5 h-5 rounded-md bg-emerald-600 flex-shrink-0" />
                        <div className="space-y-1 flex-1">
                          <div className="w-16 h-1.5 bg-neutral-900 rounded" />
                          <div className="w-10 h-1 bg-emerald-500 rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-1.5 flex-1">
                        <div className="col-span-5 bg-neutral-50 p-1 rounded space-y-1">
                          <div className="w-6 h-1 bg-emerald-600 rounded" />
                          <div className="w-full h-1 bg-neutral-200 rounded" />
                          <div className="w-8 h-1 bg-neutral-200 rounded" />
                          <div className="w-6 h-1 bg-emerald-600 rounded mt-1.5" />
                          <div className="w-full h-1 bg-neutral-200 rounded" />
                        </div>
                        <div className="col-span-7 space-y-1.5 p-0.5">
                          <div className="w-8 h-1 bg-emerald-600 rounded" />
                          <div className="w-full h-1 bg-neutral-200 rounded" />
                          <div className="w-12 h-1 bg-neutral-200 rounded" />
                          <div className="w-10 h-1 bg-emerald-600 rounded mt-1" />
                          <div className="w-full h-1 bg-neutral-200 rounded" />
                          <div className="w-14 h-1 bg-neutral-200 rounded" />
                        </div>
                      </div>
                    </div>
                  )}

                  {tpl.id === 'professional' && (
                    <div className="space-y-2 h-full flex flex-col text-center">
                      <div className="space-y-1 border-b border-neutral-300 pb-1.5">
                        <div className="w-20 h-2 bg-neutral-900 rounded mx-auto" />
                        <div className="w-14 h-1 bg-neutral-600 rounded mx-auto" />
                        <div className="w-24 h-0.5 bg-neutral-400 rounded mx-auto" />
                      </div>
                      <div className="space-y-2 flex-1 text-left px-1">
                        <div className="border-b border-neutral-800 pb-0.5">
                          <div className="w-12 h-1 bg-neutral-800 rounded" />
                        </div>
                        <div className="w-full h-1 bg-neutral-200 rounded" />
                        <div className="border-b border-neutral-800 pb-0.5 mt-1">
                          <div className="w-14 h-1 bg-neutral-800 rounded" />
                        </div>
                        <div className="w-full h-1 bg-neutral-200 rounded" />
                        <div className="w-16 h-1 bg-neutral-200 rounded" />
                      </div>
                    </div>
                  )}

                  {tpl.id === 'ats' && (
                    <div className="space-y-2 h-full flex flex-col font-mono text-left">
                      <div className="space-y-1 border-b border-black pb-1">
                        <div className="w-20 h-1.5 bg-black rounded" />
                        <div className="w-28 h-0.5 bg-neutral-700 rounded" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="w-14 h-1 bg-black rounded border-b border-black" />
                        <div className="w-full h-0.5 bg-neutral-600 rounded" />
                        <div className="w-full h-0.5 bg-neutral-600 rounded" />
                        <div className="w-16 h-1 bg-black rounded border-b border-black mt-1" />
                        <div className="w-full h-0.5 bg-neutral-600 rounded" />
                        <div className="w-20 h-0.5 bg-neutral-600 rounded" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-neutral-800 shadow-sm flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Quick Preview
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-neutral-900 text-base">{tpl.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        tpl.id === 'modern'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tpl.id === 'professional'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {tpl.badge}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed min-h-[36px]">
                    {tpl.description}
                  </p>

                  <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Best for: <strong className="text-neutral-700">{tpl.bestFor}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTemplate(tpl.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Selected
                      </>
                    ) : (
                      'Use Template'
                    )}
                  </button>

                  <button
                    onClick={() => onPreviewTemplate(tpl.id)}
                    className="p-2 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors"
                    title="Live Preview with Your Data"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
