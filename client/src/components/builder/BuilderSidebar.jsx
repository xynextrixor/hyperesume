import React from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Wrench,
  Sparkles,
  Eye,
  LayoutTemplate,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export default function BuilderSidebar({
  activeSection,
  onSelectSection,
  completionScore,
  onPreview,
  onChooseTemplate,
  onResetDraft,
  sectionStatuses,
}) {
  const navItems = [
    { id: 'personal', label: 'Personal Info', icon: User, required: true },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'skills', label: 'Skills & Extras', icon: Wrench },
    { id: 'targetRole', label: 'Target Role & Interview', icon: Sparkles },
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
      {/* 1. Progress & Score Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Resume Strength
          </span>
          <span
            className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${
              completionScore >= 80
                ? 'bg-emerald-100 text-emerald-800'
                : completionScore >= 50
                ? 'bg-amber-100 text-amber-800'
                : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            {completionScore}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              completionScore >= 80
                ? 'bg-emerald-500'
                : completionScore >= 50
                ? 'bg-amber-500'
                : 'bg-neutral-400'
            }`}
            style={{ width: `${Math.max(4, completionScore)}%` }}
          />
        </div>

        <p className="text-[11px] text-neutral-500 leading-normal">
          {completionScore < 50
            ? 'Add your education, top skills, or a project to unlock stronger recruiter appeal.'
            : completionScore < 80
            ? 'Great foundation! Polish your summary and detail key project contributions.'
            : 'Excellent! Your resume has strong breadth and structure.'}
        </p>

        {/* Actions inside sidebar */}
        <div className="pt-2 flex flex-col gap-2 border-t border-neutral-100">
          <button
            onClick={onPreview}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" />
            Preview Resume
          </button>

          <button
            onClick={onChooseTemplate}
            className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-100 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-neutral-500 group-hover:text-emerald-600" />
              Choose Template
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-semibold">
              3 Styles
            </span>
          </button>
        </div>
      </div>

      {/* 2. Step Navigation */}
      <nav className="bg-white rounded-2xl border border-neutral-200 p-3 shadow-sm flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isComplete = sectionStatuses[item.id];

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`flex items-center justify-between p-3 rounded-xl text-left transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">{item.label}</span>
                  {item.required && !isComplete && (
                    <span className="text-[10px] text-amber-600 font-normal">Required</span>
                  )}
                </div>
              </div>

              {isComplete && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Reset Option */}
      <div className="px-2">
        <button
          onClick={onResetDraft}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-600 transition-colors font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Draft & Start Fresh
        </button>
      </div>
    </aside>
  );
}
