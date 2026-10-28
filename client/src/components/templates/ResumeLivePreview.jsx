import React, { useState } from 'react';
import {
  ArrowLeft,
  LayoutTemplate,
  FileDown,
  RotateCcw,
  Palette,
  Type,
  Maximize2,
  Check,
  ShieldCheck,
  Printer,
} from 'lucide-react';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import MinimalAtsTemplate from './MinimalAtsTemplate';
import {
  TEMPLATES,
  ACCENT_COLORS,
  FONT_OPTIONS,
  FONT_SIZES,
  DEFAULT_CUSTOMIZATION,
} from './templateConfig';
import { downloadBuilderPdfApi } from '../../services/api';

export default function ResumeLivePreview({
  data,
  selectedTemplateId = 'modern',
  onBackToEditor,
  onChangeTemplate,
}) {
  const activeTemplate = TEMPLATES[selectedTemplateId] || TEMPLATES.modern;

  // Customization state
  const [customization, setCustomization] = useState({
    accentColor: activeTemplate.defaultAccent,
    fontFamily: activeTemplate.defaultFont,
    fontSize: activeTemplate.defaultSize,
  });

  const [downloadNotice, setDownloadNotice] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Reset to current template defaults
  const handleResetDefaults = () => {
    setCustomization({
      accentColor: activeTemplate.defaultAccent,
      fontFamily: activeTemplate.defaultFont,
      fontSize: activeTemplate.defaultSize,
    });
  };

  // High-fidelity A4 vector PDF download via browser print engine
  const handleDownloadPdf = () => {
    const rawName = data?.personalInfo?.fullName?.trim() || 'Resume';
    const safeName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
    const filename = `${safeName || 'Resume'}_Resume`;

    const originalTitle = document.title;
    document.title = filename;

    setDownloadNotice(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
        setDownloadNotice(false);
      }, 1000);
    }, 250);
  };

  // Direct backend PDF file download
  const handleDirectDownload = async () => {
    setIsExporting(true);
    try {
      await downloadBuilderPdfApi({
        resumeData: data,
        templateId: selectedTemplateId,
        customization,
      });
    } catch (err) {
      console.warn('Direct PDF export encountered an issue, launching print-to-PDF:', err);
      handleDownloadPdf();
    } finally {
      setIsExporting(false);
    }
  };

  // Active font and size definitions
  const activeFont = FONT_OPTIONS.find((f) => f.id === customization.fontFamily) || FONT_OPTIONS[0];
  const activeSize = FONT_SIZES.find((s) => s.id === customization.fontSize) || FONT_SIZES[1];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col pb-16">
      {/* Top Sticky Action & Navigation Bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: Back & Template Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onBackToEditor && (
              <button
                onClick={onBackToEditor}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to</span> Editor
              </button>
            )}

            {onChangeTemplate && (
              <button
                onClick={onChangeTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors"
              >
                <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600" />
                <span>Change Template</span>
                <span className="hidden md:inline font-mono text-[11px] text-neutral-400">
                  ({activeTemplate.name})
                </span>
              </button>
            )}
          </div>

          {/* Right: Download PDF Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-semibold transition-colors"
              title="Open browser print preview to save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDirectDownload}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-200 active:scale-95 disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>{isExporting ? 'Exporting PDF...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="border-t border-neutral-100 bg-neutral-50/80 px-4 sm:px-6 py-2.5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* 1. Accent Color (if supported) */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-600 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-neutral-400" />
                Accent:
              </span>

              {activeTemplate.supportsColor ? (
                <div className="flex items-center gap-1.5">
                  {ACCENT_COLORS.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => setCustomization((prev) => ({ ...prev, accentColor: col.hex }))}
                      className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                      aria-label={`Select accent color ${col.name}`}
                    >
                      {customization.accentColor === col.hex && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="text-[11px] text-neutral-500 italic bg-neutral-200/60 px-2 py-0.5 rounded">
                  Monochrome (Locked for ATS Accuracy)
                </span>
              )}
            </div>

            {/* 2. Font Selector */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-600 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-neutral-400" />
                Font:
              </span>
              <select
                aria-label="Font family selection"
                value={customization.fontFamily}
                onChange={(e) => setCustomization((prev) => ({ ...prev, fontFamily: e.target.value }))}
                className="px-2.5 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Text Size */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-600">Size:</span>
              <select
                aria-label="Font size selection"
                value={customization.fontSize}
                onChange={(e) => setCustomization((prev) => ({ ...prev, fontSize: e.target.value }))}
                className="px-2.5 py-1 bg-white border border-neutral-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Reset Button */}
            <button
              onClick={handleResetDefaults}
              aria-label="Reset styling to template defaults"
              className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-800 font-medium px-2 py-1 rounded hover:bg-neutral-200/60 transition-colors ml-auto sm:ml-0"
              title="Reset styling to template defaults"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadNotice && (
        <div className="max-w-md mx-auto mt-4 px-4 py-2.5 bg-emerald-900 text-white rounded-xl text-xs flex items-center gap-2 shadow-lg animate-in fade-in no-print">
          <Printer className="w-4 h-4 text-emerald-300 flex-shrink-0 animate-pulse" />
          <span>Generating vector PDF. Select <strong>Save as PDF</strong> in your destination printer menu.</span>
        </div>
      )}

      {/* Main Document Preview Container (Realistic A4 Canvas) */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 flex justify-center">
        <div
          id="resume-print-area"
          className={`w-full max-w-[210mm] bg-white resume-paper-shadow rounded-xl border border-neutral-200 overflow-hidden ${activeSize.scaleClass}`}
          style={{ fontFamily: activeFont.fontFamily }}
        >
          {selectedTemplateId === 'modern' && (
            <ModernTemplate data={data} customization={customization} />
          )}

          {selectedTemplateId === 'professional' && (
            <ProfessionalTemplate data={data} customization={customization} />
          )}

          {selectedTemplateId === 'ats' && (
            <MinimalAtsTemplate data={data} customization={customization} />
          )}
        </div>
      </div>
    </div>
  );
}
