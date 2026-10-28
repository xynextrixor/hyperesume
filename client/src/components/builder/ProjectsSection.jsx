import React from 'react';
import {
  Code2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  GitBranch,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { validateUrl } from './builderState';

export default function ProjectsSection({
  data,
  onChange,
  onAiEnhanceProject,
  isAiLoading,
}) {
  const projectList = data.projects || [];

  const handleUpdate = (index, field, value) => {
    const updated = [...projectList];
    updated[index] = { ...updated[index], [field]: value };
    onChange('projects', updated);
  };

  const handleAdd = () => {
    const newEntry = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      problemSolved: '',
      technologies: '',
      contributions: '',
      githubUrl: '',
      liveUrl: '',
      results: '',
    };
    onChange('projects', [...projectList, newEntry]);
  };

  const handleRemove = (index) => {
    const updated = projectList.filter((_, i) => i !== index);
    onChange('projects', updated);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...projectList];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange('projects', updated);
  };

  const handleMoveDown = (index) => {
    if (index === projectList.length - 1) return;
    const updated = [...projectList];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange('projects', updated);
  };

  const triggerEnhance = (index) => {
    const item = projectList[index];
    onAiEnhanceProject({
      title: item.title,
      description: item.description,
      problemSolved: item.problemSolved,
      technologies: item.technologies,
      contributions: item.contributions,
      results: item.results,
      projectIndex: index,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-600" />
            Technical & Academic Projects
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Showcase coursework, hackathon apps, open-source work, and personal software builds.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-semibold transition-colors shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* List */}
      {projectList.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-8 text-center space-y-3">
          <Code2 className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-medium text-neutral-600">No projects added yet.</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Projects are essential for students and professionals to demonstrate hands-on coding and real problem-solving capabilities.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {projectList.map((item, index) => {
            const isGithubValid = validateUrl(item.githubUrl);
            const isLiveValid = validateUrl(item.liveUrl);

            return (
              <div
                key={item.id || index}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-neutral-300 transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {item.title || `Project #${index + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveUp(index)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 rounded-lg hover:bg-neutral-100 transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === projectList.length - 1}
                      onClick={() => handleMoveDown(index)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 rounded-lg hover:bg-neutral-100 transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-1"
                      title="Remove Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Name */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleUpdate(index, 'title', e.target.value)}
                      placeholder="e.g. AI Resume Analyzer"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Technologies Used */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Technologies & Libraries Used
                    </label>
                    <input
                      type="text"
                      value={item.technologies || ''}
                      onChange={(e) => handleUpdate(index, 'technologies', e.target.value)}
                      placeholder="e.g. React, Node.js, Express, Tailwind CSS, Gemini API"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Problem Solved */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Problem Solved
                    </label>
                    <input
                      type="text"
                      value={item.problemSolved || ''}
                      onChange={(e) => handleUpdate(index, 'problemSolved', e.target.value)}
                      placeholder="e.g. Helps job seekers identify resume weaknesses and improve ATS compatibility"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Project Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Overview / Brief Summary
                    </label>
                    <textarea
                      rows={2}
                      value={item.description || ''}
                      onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                      placeholder="A modern web app that parses resumes, analyzes content with Google Gemini, and generates targeted improvement suggestions."
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Key Features and Contributions with AI Enhance button */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-neutral-700">
                        Key Features & Your Technical Contributions
                      </label>
                      <button
                        type="button"
                        onClick={() => triggerEnhance(index)}
                        disabled={isAiLoading || (!item.title && !item.description && !item.problemSolved)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        AI Enhance Project
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={item.contributions || ''}
                      onChange={(e) => handleUpdate(index, 'contributions', e.target.value)}
                      placeholder="• Implemented multipart PDF and Word document extraction in Node.js&#10;• Integrated Google Gemini 2.5 Flash with structured JSON schemas&#10;• Designed responsive UI in Tailwind CSS with live progress indicators"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Measurable Results */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Measurable Results / Impact (Optional)
                    </label>
                    <input
                      type="text"
                      value={item.results || ''}
                      onChange={(e) => handleUpdate(index, 'results', e.target.value)}
                      placeholder="e.g. Achieved 98% parsing accuracy across 50+ resume formats; deployed with 100+ active users"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* GitHub URL */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" />
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={item.githubUrl || ''}
                      onChange={(e) => handleUpdate(index, 'githubUrl', e.target.value)}
                      placeholder="github.com/username/project"
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        isGithubValid
                          ? 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                          : 'border-red-400 text-red-900 focus:ring-red-400'
                      }`}
                    />
                    {!isGithubValid && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Please enter a valid URL
                      </p>
                    )}
                  </div>

                  {/* Live Demo URL */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={item.liveUrl || ''}
                      onChange={(e) => handleUpdate(index, 'liveUrl', e.target.value)}
                      placeholder="https://my-app.vercel.app"
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        isLiveValid
                          ? 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                          : 'border-red-400 text-red-900 focus:ring-red-400'
                      }`}
                    />
                    {!isLiveValid && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Please enter a valid URL
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
