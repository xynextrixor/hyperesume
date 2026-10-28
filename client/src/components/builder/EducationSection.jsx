import React from 'react';
import {
  GraduationCap,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { validateDateRange } from './builderState';

export default function EducationSection({ data, onChange }) {
  const educationList = data.education || [];

  const handleUpdate = (index, field, value) => {
    const updated = [...educationList];
    updated[index] = { ...updated[index], [field]: value };
    onChange('education', updated);
  };

  const handleAdd = () => {
    const newEntry = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      coursework: '',
    };
    onChange('education', [...educationList, newEntry]);
  };

  const handleRemove = (index) => {
    const updated = educationList.filter((_, i) => i !== index);
    onChange('education', updated);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...educationList];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onChange('education', updated);
  };

  const handleMoveDown = (index) => {
    if (index === educationList.length - 1) return;
    const updated = [...educationList];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onChange('education', updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            Education
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Degrees, certifications, universities, GPA/CGPA, and relevant academic coursework.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-semibold transition-colors shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* List of Education Entries */}
      {educationList.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-8 text-center space-y-3">
          <GraduationCap className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-medium text-neutral-600">No education entries added yet.</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Adding your degree or qualification helps recruiters verify your academic background and foundational knowledge.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add First Education
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {educationList.map((item, index) => {
            const isDatesValid = validateDateRange(item.startDate, item.endDate, item.current);

            return (
              <div
                key={item.id || index}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-neutral-300 transition-all"
              >
                {/* Entry header with reorder & delete */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">
                      {item.degree || item.institution
                        ? `${item.degree || 'Degree'} ${item.institution ? `at ${item.institution}` : ''}`
                        : `Education Entry #${index + 1}`}
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
                      disabled={index === educationList.length - 1}
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

                {/* Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Degree */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Degree / Qualification
                    </label>
                    <input
                      type="text"
                      value={item.degree || ''}
                      onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                      placeholder="e.g. Bachelor of Science in Computer Science"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      value={item.institution || ''}
                      onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                      placeholder="e.g. University of California, Berkeley"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Field of study */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Field of Study / Major
                    </label>
                    <input
                      type="text"
                      value={item.fieldOfStudy || ''}
                      onChange={(e) => handleUpdate(index, 'fieldOfStudy', e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Grade / GPA */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      CGPA, GPA, or Percentage
                    </label>
                    <input
                      type="text"
                      value={item.grade || ''}
                      onChange={(e) => handleUpdate(index, 'grade', e.target.value)}
                      placeholder="e.g. 3.8 / 4.0 or 8.9 CGPA or 85%"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Dates */}
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          Graduation Date
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.current || false}
                            onChange={(e) => handleUpdate(index, 'current', e.target.checked)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                          />
                          Currently Enrolled
                        </label>
                      </div>
                      <input
                        type="month"
                        disabled={item.current}
                        value={item.current ? '' : item.endDate || ''}
                        onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                        placeholder={item.current ? 'Present / In Progress' : ''}
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
                          Start date must precede graduation date
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Relevant Coursework & Achievements */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Relevant Coursework & Academic Honors
                    </label>
                    <textarea
                      rows={2}
                      value={item.coursework || ''}
                      onChange={(e) => handleUpdate(index, 'coursework', e.target.value)}
                      placeholder="e.g. Data Structures & Algorithms, Database Management Systems, Distributed Systems. Dean's List (2024)."
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
