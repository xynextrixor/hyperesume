import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { validateDateRange } from './builderState';

export default function ExperienceSection({
  data,
  onChange,
  onAiRewriteBullet,
  isAiLoading,
}) {
  const experienceList = data.experience || [];
  const [selectedBulletText, setSelectedBulletText] = useState('');

  const handleUpdate = (index, field, value) => {
    const updated = [...experienceList];
    updated[index] = { ...updated[index], [field]: value };
    onChange('experience', updated);
  };

  const handleAdd = () => {
    const newEntry = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
      achievements: '',
      technologies: '',
    };
    onChange('experience', [...experienceList, newEntry]);
  };

  const handleRemove = (index) => {
    const updated = experienceList.filter((_, i) => i !== index);
    onChange('experience', updated);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...experienceList];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange('experience', updated);
  };

  const handleMoveDown = (index) => {
    if (index === experienceList.length - 1) return;
    const updated = [...experienceList];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange('experience', updated);
  };

  const triggerRewrite = (index) => {
    const item = experienceList[index];
    const bulletToRewrite = item.responsibilities || item.achievements || '';
    onAiRewriteBullet({
      bullet: bulletToRewrite,
      role: item.jobTitle,
      company: item.company,
      technologies: item.technologies,
      experienceIndex: index,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Work Experience & Internships
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Full-time, part-time, internships, or freelance roles with concrete responsibilities and achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-semibold transition-colors shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* List of Experience Entries */}
      {experienceList.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-8 text-center space-y-3">
          <Briefcase className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-medium text-neutral-600">No work experience added yet.</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Freshers and students can include internships, research positions, or campus roles. If you have none, feel free to skip to Projects!
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {experienceList.map((item, index) => {
            const isDatesValid = validateDateRange(item.startDate, item.endDate, item.current);

            return (
              <div
                key={item.id || index}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-neutral-300 transition-all"
              >
                {/* Entry Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {item.jobTitle || item.company
                        ? `${item.jobTitle || 'Role'} at ${item.company || 'Company'}`
                        : `Experience #${index + 1}`}
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
                      disabled={index === experienceList.length - 1}
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
                      title="Remove Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Job Title */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      value={item.jobTitle || ''}
                      onChange={(e) => handleUpdate(index, 'jobTitle', e.target.value)}
                      placeholder="e.g. Frontend Developer Intern"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={item.company || ''}
                      onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                      placeholder="e.g. TechCorp Solutions"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Employment Type */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={item.employmentType || 'Full-time'}
                      onChange={(e) => handleUpdate(index, 'employmentType', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={item.startDate || ''}
                        onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-neutral-700">
                          End Date
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.current || false}
                            onChange={(e) => handleUpdate(index, 'current', e.target.checked)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                          />
                          Currently Working Here
                        </label>
                      </div>
                      <input
                        type="month"
                        disabled={item.current}
                        value={item.current ? '' : item.endDate || ''}
                        onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                        placeholder={item.current ? 'Present' : ''}
                        className={`w-full px-3 py-2 bg-white border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                          item.current
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200'
                            : !isDatesValid
                            ? 'border-red-400 text-red-900 focus:ring-red-400'
                            : 'border-neutral-300 focus:ring-emerald-500 focus:border-emerald-500'
                        }`}
                      />
                      {!isDatesValid && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Start date must precede end date
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Technologies & Tools Used
                    </label>
                    <input
                      type="text"
                      value={item.technologies || ''}
                      onChange={(e) => handleUpdate(index, 'technologies', e.target.value)}
                      placeholder="e.g. React, TypeScript, Redux Toolkit, Jest, Git, Figma"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Responsibilities */}
                  <div className="sm:col-span-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-neutral-700">
                        Key Responsibilities & Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => triggerRewrite(index)}
                        disabled={isAiLoading || (!item.responsibilities && !item.achievements)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        AI Rewrite Bullet
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={item.responsibilities || ''}
                      onChange={(e) => handleUpdate(index, 'responsibilities', e.target.value)}
                      placeholder="• Built responsive UI components with React and Tailwind CSS&#10;• Collaborated with backend engineers to integrate REST APIs&#10;• Wrote unit tests achieving 85% code coverage"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Achievements and Measurable Results */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Key Achievements & Measurable Results (Optional)
                    </label>
                    <input
                      type="text"
                      value={item.achievements || ''}
                      onChange={(e) => handleUpdate(index, 'achievements', e.target.value)}
                      placeholder="e.g. Reduced initial page bundle size by 32%, improving mobile load speeds"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
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
