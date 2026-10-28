import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Save,
  RotateCcw,
  LayoutTemplate,
} from 'lucide-react';

import BuilderSidebar from './BuilderSidebar';
import PersonalInfoSection from './PersonalInfoSection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import SkillsAndExtraSection from './SkillsAndExtraSection';
import TargetRoleSection from './TargetRoleSection';
import BuilderPreviewModal from './BuilderPreviewModal';
import AiAssistModal from './AiAssistModal';
import ConfirmModal from './ConfirmModal';

import {
  initialResumeState,
  STORAGE_KEY,
  calculateCompletion,
} from './builderState';
import { builderAssistApi } from '../../services/api';

export default function ResumeBuilder({
  resumeData: externalResumeData,
  setResumeData: externalSetResumeData,
  onNavigate,
  selectedTemplateId = 'modern',
}) {
  // Load state from localStorage with fallback
  const [internalResumeData, setInternalResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialResumeState,
          ...parsed,
          personalInfo: { ...initialResumeState.personalInfo, ...(parsed.personalInfo || {}) },
          skills: { ...initialResumeState.skills, ...(parsed.skills || {}) },
          additional: { ...initialResumeState.additional, ...(parsed.additional || {}) },
          targetJob: { ...initialResumeState.targetJob, ...(parsed.targetJob || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved resume draft:', e);
    }
    return initialResumeState;
  });

  const resumeData = externalResumeData || internalResumeData;
  const setResumeData = externalSetResumeData || setInternalResumeData;

  const [activeSection, setActiveSection] = useState('personal');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isTemplateInfoOpen, setIsTemplateInfoOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(Date.now());

  // AI Assist Modal State
  const [aiModalState, setAiModalState] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    isLoading: false,
    error: null,
    data: null,
    actionType: null,
    targetContext: null, // extra info such as experienceIndex or projectIndex
  });

  // Auto-save to localStorage on resumeData change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      setLastSavedTime(Date.now());
    } catch (err) {
      console.error('Failed to auto-save resume draft:', err);
    }
  }, [resumeData]);

  // Handle section update
  const handleSectionChange = (sectionKey, updatedSectionData) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionKey]: updatedSectionData,
    }));
  };

  // Reset Draft
  const handleConfirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResumeData(initialResumeState);
    setActiveSection('personal');
    setIsResetConfirmOpen(false);
  };

  // Section completion status mapping
  const sectionStatuses = {
    personal: Boolean(resumeData.personalInfo?.fullName?.trim()),
    education: Boolean(resumeData.education?.some((e) => e.degree?.trim() || e.institution?.trim())),
    experience: Boolean(resumeData.experience?.some((e) => e.jobTitle?.trim() || e.company?.trim())),
    projects: Boolean(resumeData.projects?.some((p) => p.title?.trim())),
    skills: Boolean(
      resumeData.skills?.programmingLanguages?.trim() ||
      resumeData.skills?.frameworks?.trim() ||
      resumeData.skills?.databasesTools?.trim() ||
      resumeData.additional?.coursework?.trim() ||
      (resumeData.additional?.certifications?.length || 0) > 0 ||
      (resumeData.additional?.publications?.length || 0) > 0
    ),
    targetRole: Boolean(resumeData.targetJob?.targetTitle?.trim()),
  };

  const completionScore = calculateCompletion(resumeData);

  // Steps sequence for Next/Previous buttons
  const sectionSequence = ['personal', 'education', 'experience', 'projects', 'skills', 'targetRole'];
  const currentStepIdx = sectionSequence.indexOf(activeSection);

  const goToNextStep = () => {
    if (currentStepIdx < sectionSequence.length - 1) {
      setActiveSection(sectionSequence[currentStepIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStep = () => {
    if (currentStepIdx > 0) {
      setActiveSection(sectionSequence[currentStepIdx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // AI Assistant triggers
  const handleAiPolishSummary = async () => {
    setAiModalState({
      isOpen: true,
      title: 'AI Polish Summary',
      subtitle: 'Polishing your summary with recruiter-grade phrasing',
      isLoading: true,
      error: null,
      data: null,
      actionType: 'improve-summary',
      targetContext: null,
    });

    try {
      const skillsList = [
        resumeData.skills?.programmingLanguages,
        resumeData.skills?.frameworks,
        resumeData.skills?.databasesTools,
      ].filter(Boolean);

      const expSummary = resumeData.experience
        ?.filter((e) => e.jobTitle)
        .map((e) => `${e.jobTitle} at ${e.company}`)
        .join(', ');

      const result = await builderAssistApi({
        action: 'improve-summary',
        data: {
          currentSummary: resumeData.personalInfo?.summary || '',
          headline: resumeData.personalInfo?.headline || '',
          skills: skillsList,
          experienceSummary: expSummary,
        },
      });

      setAiModalState((prev) => ({
        ...prev,
        isLoading: false,
        data: result,
      }));
    } catch (err) {
      setAiModalState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Failed to polish summary.',
      }));
    }
  };

  const handleAiRewriteBullet = async (params) => {
    setAiModalState({
      isOpen: true,
      title: 'AI Rewrite Bullet Point',
      subtitle: 'Converting responsibilities into active, result-oriented statements',
      isLoading: true,
      error: null,
      data: null,
      actionType: 'rewrite-bullet',
      targetContext: { experienceIndex: params.experienceIndex },
    });

    try {
      const result = await builderAssistApi({
        action: 'rewrite-bullet',
        data: {
          bullet: params.bullet,
          role: params.role,
          company: params.company,
          technologies: params.technologies,
        },
      });

      setAiModalState((prev) => ({
        ...prev,
        isLoading: false,
        data: result,
      }));
    } catch (err) {
      setAiModalState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Failed to rewrite bullet point.',
      }));
    }
  };

  const handleAiEnhanceProject = async (params) => {
    setAiModalState({
      isOpen: true,
      title: 'AI Enhance Project',
      subtitle: 'Refining technical scope, problem statement, and key contributions',
      isLoading: true,
      error: null,
      data: null,
      actionType: 'enhance-project',
      targetContext: { projectIndex: params.projectIndex },
    });

    try {
      const result = await builderAssistApi({
        action: 'enhance-project',
        data: {
          title: params.title,
          description: params.description,
          problemSolved: params.problemSolved,
          technologies: params.technologies,
          contributions: params.contributions,
          results: params.results,
        },
      });

      setAiModalState((prev) => ({
        ...prev,
        isLoading: false,
        data: result,
      }));
    } catch (err) {
      setAiModalState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Failed to enhance project.',
      }));
    }
  };

  const handleApplyAiResult = (content) => {
    if (aiModalState.actionType === 'improve-summary') {
      handleSectionChange('personalInfo', {
        ...resumeData.personalInfo,
        summary: content,
      });
    } else if (aiModalState.actionType === 'rewrite-bullet') {
      const idx = aiModalState.targetContext?.experienceIndex;
      if (typeof idx === 'number' && resumeData.experience[idx]) {
        const updated = [...resumeData.experience];
        const existing = updated[idx].responsibilities ? `${updated[idx].responsibilities}\n• ${content}` : `• ${content}`;
        updated[idx] = { ...updated[idx], responsibilities: existing };
        handleSectionChange('experience', updated);
      }
    } else if (aiModalState.actionType === 'enhance-project') {
      const idx = aiModalState.targetContext?.projectIndex;
      if (typeof idx === 'number' && resumeData.projects[idx]) {
        const updated = [...resumeData.projects];
        updated[idx] = {
          ...updated[idx],
          ...(content.description ? { description: content.description } : {}),
          ...(content.problemSolved ? { problemSolved: content.problemSolved } : {}),
          ...(content.contributions ? { contributions: content.contributions } : {}),
        };
        handleSectionChange('projects', updated);
      }
    }

    setAiModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Resume Builder
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
              <Save className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved locally in browser</span>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-1">
            Build Your Professional Resume
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Designed for students, freshers, and experienced engineers. Grounded in 100% authentic candidate facts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => (onNavigate ? onNavigate('preview') : setIsPreviewOpen(true))}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" />
            Preview Resume
          </button>
          <button
            onClick={() => (onNavigate ? onNavigate('templates') : setIsTemplateInfoOpen(true))}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <LayoutTemplate className="w-4 h-4 text-emerald-600" />
            Templates <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-mono font-semibold">Live</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Sidebar / Step Navigation */}
        <BuilderSidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          completionScore={completionScore}
          onPreview={() => (onNavigate ? onNavigate('preview') : setIsPreviewOpen(true))}
          onChooseTemplate={() => (onNavigate ? onNavigate('templates') : setIsTemplateInfoOpen(true))}
          onResetDraft={() => setIsResetConfirmOpen(true)}
          sectionStatuses={sectionStatuses}
        />

        {/* Center / Main Form Area */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-neutral-200 p-5 sm:p-7 shadow-sm space-y-8 min-h-[500px]">
          {activeSection === 'personal' && (
            <PersonalInfoSection
              data={resumeData}
              onChange={handleSectionChange}
              onAiPolishSummary={handleAiPolishSummary}
              isAiLoading={aiModalState.isLoading}
            />
          )}

          {activeSection === 'education' && (
            <EducationSection
              data={resumeData}
              onChange={handleSectionChange}
            />
          )}

          {activeSection === 'experience' && (
            <ExperienceSection
              data={resumeData}
              onChange={handleSectionChange}
              onAiRewriteBullet={handleAiRewriteBullet}
              isAiLoading={aiModalState.isLoading}
            />
          )}

          {activeSection === 'projects' && (
            <ProjectsSection
              data={resumeData}
              onChange={handleSectionChange}
              onAiEnhanceProject={handleAiEnhanceProject}
              isAiLoading={aiModalState.isLoading}
            />
          )}

          {activeSection === 'skills' && (
            <SkillsAndExtraSection
              data={resumeData}
              onChange={handleSectionChange}
            />
          )}

          {activeSection === 'targetRole' && (
            <TargetRoleSection
              data={resumeData}
              onChange={handleSectionChange}
            />
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
            <button
              type="button"
              disabled={currentStepIdx === 0}
              onClick={goToPrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Section
            </button>

            <div className="text-xs text-neutral-400 hidden sm:block">
              Section {currentStepIdx + 1} of {sectionSequence.length}
            </div>

            {currentStepIdx < sectionSequence.length - 1 ? (
              <button
                type="button"
                onClick={goToNextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Next Section
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => (onNavigate ? onNavigate('preview') : setIsPreviewOpen(true))}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview Full Resume
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <BuilderPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={resumeData}
        onChooseTemplate={() => {
          setIsPreviewOpen(false);
          if (onNavigate) {
            onNavigate('templates');
          } else {
            setIsTemplateInfoOpen(true);
          }
        }}
      />

      {/* AI Assistant Modal */}
      <AiAssistModal
        isOpen={aiModalState.isOpen}
        onClose={() => setAiModalState((prev) => ({ ...prev, isOpen: false }))}
        title={aiModalState.title}
        subtitle={aiModalState.subtitle}
        isLoading={aiModalState.isLoading}
        error={aiModalState.error}
        data={aiModalState.data}
        actionType={aiModalState.actionType}
        onApply={handleApplyAiResult}
        onRetry={() => {
          if (aiModalState.actionType === 'improve-summary') handleAiPolishSummary();
        }}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Clear Draft & Start Fresh?"
        message="This will remove all entered details from your browser storage and reset the resume builder to a blank state. This action cannot be undone."
        confirmText="Yes, Clear All Data"
        cancelText="Keep My Draft"
        isDestructive={true}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />

      {/* Phase 4 Templates Info Dialog */}
      <ConfirmModal
        isOpen={isTemplateInfoOpen}
        title="Resume Templates (Phase 4)"
        message="The multi-template selector and styled PDF downloads are scheduled for Phase 4. In this phase, you can enter all resume sections, utilize Gemini AI writing assistance, and inspect your ATS draft via 'Preview Resume'."
        confirmText="Got It"
        cancelText="Close"
        isDestructive={false}
        onConfirm={() => setIsTemplateInfoOpen(false)}
        onCancel={() => setIsTemplateInfoOpen(false)}
      />
    </div>
  );
}
