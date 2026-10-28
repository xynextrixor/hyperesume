import React from 'react';
import { User, Sparkles, AlertCircle, ShieldAlert, Check } from 'lucide-react';
import { validateEmail, validateUrl } from './builderState';

export default function PersonalInfoSection({
  data,
  onChange,
  onAiPolishSummary,
  isAiLoading,
}) {
  const info = data.personalInfo || {};

  const handleFieldChange = (field, value) => {
    onChange('personalInfo', {
      ...info,
      [field]: value,
    });
  };

  const isEmailValid = validateEmail(info.email);
  const isLinkedinValid = validateUrl(info.linkedin);
  const isGithubValid = validateUrl(info.github);
  const isPortfolioValid = validateUrl(info.portfolio);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Personal Information
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Basic contact details recruiters need to get in touch with you.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg w-fit">
          <ShieldAlert className="w-3.5 h-3.5 text-neutral-500" />
          <span>No government IDs or sensitive data needed.</span>
        </div>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={info.fullName || ''}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            placeholder="e.g. Alex Johnson"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {!info.fullName?.trim() && (
            <p className="text-[11px] text-neutral-400 mt-1">Full name is recommended for recruiter contact.</p>
          )}
        </div>

        {/* Headline / Target Role */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Professional Headline / Target Role
          </label>
          <input
            type="text"
            value={info.headline || ''}
            onChange={(e) => handleFieldChange('headline', e.target.value)}
            placeholder="e.g. Aspiring Software Engineer | React, Node.js"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={info.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="alex.johnson@example.com"
            className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
              isEmailValid
                ? 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                : 'border-red-400 focus:ring-red-400 text-red-900'
            }`}
          />
          {!isEmailValid && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid email address (e.g. name@domain.com)
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={info.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+1 (555) 000-1234"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Location (City, Country)
          </label>
          <input
            type="text"
            value={info.location || ''}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA or London, UK"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* LinkedIn */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            value={info.linkedin || ''}
            onChange={(e) => handleFieldChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexjohnson"
            className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
              isLinkedinValid
                ? 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                : 'border-red-400 focus:ring-red-400 text-red-900'
            }`}
          />
          {!isLinkedinValid && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid profile URL
            </p>
          )}
        </div>

        {/* GitHub */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            GitHub Profile URL
          </label>
          <input
            type="url"
            value={info.github || ''}
            onChange={(e) => handleFieldChange('github', e.target.value)}
            placeholder="github.com/alexjohnson"
            className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
              isGithubValid
                ? 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                : 'border-red-400 focus:ring-red-400 text-red-900'
            }`}
          />
          {!isGithubValid && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid GitHub URL
            </p>
          )}
        </div>

        {/* Portfolio / Website */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Portfolio or Personal Website URL
          </label>
          <input
            type="url"
            value={info.portfolio || ''}
            onChange={(e) => handleFieldChange('portfolio', e.target.value)}
            placeholder="https://alexjohnson.dev"
            className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 ${
              isPortfolioValid
                ? 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                : 'border-red-400 focus:ring-red-400 text-red-900'
            }`}
          />
          {!isPortfolioValid && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please enter a valid website URL
            </p>
          )}
        </div>

        {/* Professional Summary */}
        <div className="sm:col-span-2 space-y-1.5 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-neutral-700">
              Professional Summary or Career Objective
            </label>
            <button
              type="button"
              onClick={onAiPolishSummary}
              disabled={isAiLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              AI Polish Summary
            </button>
          </div>
          <textarea
            rows={4}
            value={info.summary || ''}
            onChange={(e) => handleFieldChange('summary', e.target.value)}
            placeholder="Brief overview of your professional background, core technical strengths, and career aspirations. You can also click 'AI Polish Summary' to enhance your draft."
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <p className="text-[11px] text-neutral-500">
            Keep it to 2-4 sentences highlighting your background, primary technical skills, and career focus.
          </p>
        </div>
      </div>
    </div>
  );
}
