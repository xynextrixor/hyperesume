import React, { useState } from 'react';
import {
  Download,
  Edit3,
  Eye,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ArrowLeft,
  Sparkles,
  FileDown,
  RotateCcw,
  LayoutTemplate,
} from 'lucide-react';
import { downloadResumePdfApi, downloadResumeDocxApi } from '../services/api';

export default function ResumePreviewEditor({
  fixedResume,
  onBackToAnalysis,
  onError,
  onOpenTemplates,
}) {
  const [resumeData, setResumeData] = useState(() => JSON.parse(JSON.stringify(fixedResume)));
  const [isEditing, setIsEditing] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState('');

  if (!resumeData) return null;

  const isExportingAny = isExportingPdf || isExportingDocx;

  // Handlers for editing
  const handleContactChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      contact: {
        ...(prev.contact || {}),
        [field]: value,
      },
    }));
  };

  const handleSectionHeadingChange = (index, value) => {
    setResumeData((prev) => {
      const nextSections = [...(prev.sections || [])];
      if (nextSections[index]) {
        nextSections[index].heading = value;
      }
      return { ...prev, sections: nextSections };
    });
  };

  const handleItemChange = (sectionIndex, itemIndex, value) => {
    setResumeData((prev) => {
      const nextSections = [...(prev.sections || [])];
      if (nextSections[sectionIndex]?.items) {
        nextSections[sectionIndex].items[itemIndex] = value;
      }
      return { ...prev, sections: nextSections };
    });
  };

  const handleAddItem = (sectionIndex) => {
    setResumeData((prev) => {
      const nextSections = [...(prev.sections || [])];
      if (nextSections[sectionIndex]?.items) {
        nextSections[sectionIndex].items.push('New achievement or description point');
      }
      return { ...prev, sections: nextSections };
    });
  };

  const handleRemoveItem = (sectionIndex, itemIndex) => {
    setResumeData((prev) => {
      const nextSections = [...(prev.sections || [])];
      if (nextSections[sectionIndex]?.items) {
        nextSections[sectionIndex].items.splice(itemIndex, 1);
      }
      return { ...prev, sections: nextSections };
    });
  };

  const handleAddSection = () => {
    setResumeData((prev) => ({
      ...prev,
      sections: [
        ...(prev.sections || []),
        {
          heading: 'New Section',
          items: ['Add descriptive points here...'],
        },
      ],
    }));
  };

  const handleRemoveSection = (sectionIndex) => {
    setResumeData((prev) => {
      const nextSections = [...(prev.sections || [])];
      nextSections.splice(sectionIndex, 1);
      return { ...prev, sections: nextSections };
    });
  };

  const handleResetToAI = () => {
    if (window.confirm('Reset all changes back to the initial AI-generated version?')) {
      setResumeData(JSON.parse(JSON.stringify(fixedResume)));
    }
  };

  // Export handlers
  const handleDownloadPdf = async () => {
    if (isExportingAny) return;
    try {
      setIsExportingPdf(true);
      setExportSuccessMsg('');
      await downloadResumePdfApi(resumeData);
      setExportSuccessMsg('PDF downloaded successfully!');
      setTimeout(() => setExportSuccessMsg(''), 4000);
    } catch (err) {
      onError(err.message || 'Failed to download PDF.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (isExportingAny) return;
    try {
      setIsExportingDocx(true);
      setExportSuccessMsg('');
      await downloadResumeDocxApi(resumeData);
      setExportSuccessMsg('DOCX downloaded successfully!');
      setTimeout(() => setExportSuccessMsg(''), 4000);
    } catch (err) {
      onError(err.message || 'Failed to download DOCX.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Compile formatted contact pieces for preview
  const contact = resumeData.contact || {};
  const contactParts = [];
  if (contact.email) contactParts.push(contact.email);
  if (contact.phone) contactParts.push(contact.phone);
  if (contact.location) contactParts.push(contact.location);
  if (contact.linkedin) contactParts.push(contact.linkedin.replace(/^https?:\/\/(www\.)?/i, ''));
  if (contact.github) contactParts.push(contact.github.replace(/^https?:\/\/(www\.)?/i, ''));
  if (contact.portfolio) contactParts.push(contact.portfolio.replace(/^https?:\/\/(www\.)?/i, ''));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-6 pb-20 animate-in fade-in duration-300">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onBackToAnalysis}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Analysis</span>
        </button>

        {/* View / Edit Mode Toggle & Download Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all shadow-sm ${
              isEditing
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            {isEditing ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Document View</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-neutral-600" />
                <span>Edit Resume</span>
              </>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleResetToAI}
              title="Reset edits to initial AI rewrite"
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors border border-neutral-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Choose Template & Style Button */}
          {onOpenTemplates && (
            <button
              type="button"
              onClick={() => onOpenTemplates(resumeData)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl transition-all shadow-sm"
              title="Apply professional templates and customize colors/fonts"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Choose Template & Preview</span>
            </button>
          )}

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingAny}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 active:scale-95 rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPdf ? 'Exporting PDF...' : 'Download PDF'}</span>
          </button>

          {/* Download DOCX Button */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingAny}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 active:scale-95 rounded-xl transition-all shadow-sm disabled:opacity-50"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isExportingDocx ? 'Exporting DOCX...' : 'Download DOCX'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {exportSuccessMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{exportSuccessMsg}</span>
        </div>
      )}

      {/* 1. What AI Improved Section */}
      {resumeData.changeSummary && resumeData.changeSummary.length > 0 && (
        <div className="mb-6 bg-white rounded-2xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/30 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900">What AI Improved</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resumeData.changeSummary.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. Missing Information Section */}
      {resumeData.missingInformation && resumeData.missingInformation.length > 0 && (
        <div className="mb-6 bg-white rounded-2xl border border-amber-200/80 bg-amber-50/30 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-neutral-900">Recommended Additions</h3>
          </div>
          <p className="text-xs text-neutral-600 mb-3">
            To make your resume even more competitive, consider completing these optional items in the editor below:
          </p>
          <ul className="space-y-1.5">
            {resumeData.missingInformation.map((info, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-amber-950">
                <span className="text-amber-500 font-bold">•</span>
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Main Resume Document / Editor Card */}
      <div className="bg-white rounded-2xl border border-neutral-300 shadow-lg p-5 sm:p-8 md:p-12 transition-all">
        {/* EDIT MODE FORM */}
        {isEditing ? (
          <div className="space-y-7">
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Editing Mode Active:</strong> Modify any field below. Changes are saved automatically and applied to your PDF/DOCX downloads.</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="font-semibold text-emerald-700 hover:underline flex-shrink-0 text-left sm:text-right"
              >
                Switch to Document View
              </button>
            </div>

            {/* Candidate Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={resumeData.fullName}
                onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                className="w-full text-lg sm:text-xl font-bold px-3.5 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Jane Doe"
              />
            </div>

            {/* Contact Details Grid */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] text-neutral-500">Email</span>
                  <input
                    type="text"
                    value={resumeData.contact?.email || ''}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500">Phone</span>
                  <input
                    type="text"
                    value={resumeData.contact?.phone || ''}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500">Location</span>
                  <input
                    type="text"
                    value={resumeData.contact?.location || ''}
                    onChange={(e) => handleContactChange('location', e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500">LinkedIn</span>
                  <input
                    type="text"
                    value={resumeData.contact?.linkedin || ''}
                    onChange={(e) => handleContactChange('linkedin', e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500">GitHub</span>
                  <input
                    type="text"
                    value={resumeData.contact?.github || ''}
                    onChange={(e) => handleContactChange('github', e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500"
                    placeholder="github.com/username"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500">Portfolio</span>
                  <input
                    type="text"
                    value={resumeData.contact?.portfolio || ''}
                    onChange={(e) => handleContactChange('portfolio', e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500"
                    placeholder="portfolio.dev"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                Professional Summary
              </label>
              <textarea
                rows={4}
                value={resumeData.professionalSummary}
                onChange={(e) => setResumeData({ ...resumeData, professionalSummary: e.target.value })}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                placeholder="High-impact summary..."
              />
            </div>

            {/* Sections Editor */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Resume Sections
                </label>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
              </div>

              {resumeData.sections &&
                resumeData.sections.map((section, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => handleSectionHeadingChange(sIdx, e.target.value)}
                        className="font-bold text-xs sm:text-sm text-neutral-900 bg-white px-3 py-1.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-emerald-500 flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(sIdx)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bullet items list */}
                    <div className="space-y-2 pl-1 sm:pl-2">
                      {section.items &&
                        section.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-start gap-2">
                            <span className="text-neutral-400 font-bold mt-2 text-xs">•</span>
                            <textarea
                              rows={2}
                              value={item}
                              onChange={(e) => handleItemChange(sIdx, iIdx, e.target.value)}
                              className="flex-1 text-xs text-neutral-800 p-2 rounded-lg border border-neutral-200 bg-white focus:ring-2 focus:ring-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(sIdx, iIdx)}
                              className="p-1 text-neutral-400 hover:text-rose-600 mt-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => handleAddItem(sIdx)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 pt-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add bullet point</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          /* PREVIEW MODE (Clean ATS Document Layout) */
          <div className="max-w-3xl mx-auto space-y-6 text-neutral-800 break-words">
            {/* Header: Full Name & Contact */}
            <div className="border-b border-neutral-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                {resumeData.fullName || 'Candidate Name'}
              </h1>
              {contactParts.length > 0 && (
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {contactParts.join('  •  ')}
                </p>
              )}
            </div>

            {/* Summary */}
            {resumeData.professionalSummary && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-justify">
                  {resumeData.professionalSummary}
                </p>
              </div>
            )}

            {/* Sections */}
            {resumeData.sections &&
              resumeData.sections.map((sec, sIdx) => (
                <div key={sIdx}>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                    {sec.heading}
                  </h2>
                  <div className="space-y-2">
                    {sec.items &&
                      sec.items.map((item, iIdx) => {
                        const trimmed = String(item).trim();
                        const isHeaderLine =
                          (trimmed.includes('|') || trimmed.includes('—') || trimmed.includes(' - ')) &&
                          trimmed.length < 90 &&
                          !trimmed.startsWith('•') &&
                          !trimmed.startsWith('-');

                        if (isHeaderLine) {
                          return (
                            <p key={iIdx} className="text-xs sm:text-sm font-bold text-neutral-900 pt-1">
                              {trimmed}
                            </p>
                          );
                        }

                        return (
                          <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 mt-2 flex-shrink-0" />
                            <span>{trimmed.replace(/^[•\-*]\s*/, '')}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Bottom Export Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
        <div>
          <p className="text-sm font-bold text-neutral-900">
            Satisfied with your improved resume?
          </p>
          <p className="text-xs text-neutral-500">
            Download your customized resume in standard PDF or editable Word (.docx) format.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingAny}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 active:scale-95 rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Exporting...' : 'Export PDF'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadDocx}
            disabled={isExportingAny}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 active:scale-95 rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <FileDown className="w-4 h-4 text-emerald-700" />
            <span>{isExportingDocx ? 'Exporting...' : 'Export DOCX'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
