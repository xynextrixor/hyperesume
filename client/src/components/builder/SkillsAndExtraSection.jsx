import React, { useState } from 'react';
import {
  Wrench,
  Award,
  BookOpen,
  Code2,
  Heart,
  Globe2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  FileCheck2,
} from 'lucide-react';

export default function SkillsAndExtraSection({ data, onChange }) {
  const skills = data.skills || {};
  const additional = data.additional || {};

  const [activeTab, setActiveTab] = useState('skills'); // 'skills', 'certifications', 'coding', 'achievements', 'publications', 'languages', 'volunteer'

  const handleSkillChange = (category, value) => {
    onChange('skills', {
      ...skills,
      [category]: value,
    });
  };

  const handleAdditionalListChange = (subListKey, updatedList) => {
    onChange('additional', {
      ...additional,
      [subListKey]: updatedList,
    });
  };

  const handleCourseworkChange = (value) => {
    onChange('additional', {
      ...additional,
      coursework: value,
    });
  };

  // Generic helpers for repeatable additional items
  const addItem = (key, defaultObj) => {
    const list = additional[key] || [];
    handleAdditionalListChange(key, [...list, { id: `${key}-${Date.now()}`, ...defaultObj }]);
  };

  const removeItem = (key, index) => {
    const list = additional[key] || [];
    handleAdditionalListChange(key, list.filter((_, i) => i !== index));
  };

  const updateItem = (key, index, field, value) => {
    const list = [...(additional[key] || [])];
    list[index] = { ...list[index], [field]: value };
    handleAdditionalListChange(key, list);
  };

  const moveItem = (key, index, direction) => {
    const list = [...(additional[key] || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    handleAdditionalListChange(key, list);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-emerald-600" />
          Skills & Additional Highlights
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Categorized technical competencies, certifications, hackathons, coding handles, publications, and languages.
        </p>
      </div>

      {/* Sub-tabs for clean organization */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'skills', label: 'Technical & Soft Skills', icon: Layers },
          { id: 'certifications', label: `Certifications (${additional.certifications?.length || 0})`, icon: Award },
          { id: 'coding', label: `Coding & Hackathons (${additional.codingProfiles?.length || 0})`, icon: Code2 },
          { id: 'achievements', label: `Awards & Honors (${additional.achievements?.length || 0})`, icon: BookOpen },
          { id: 'publications', label: `Research & Publications (${additional.publications?.length || 0})`, icon: FileCheck2 },
          { id: 'languages', label: `Languages (${additional.languages?.length || 0})`, icon: Globe2 },
          { id: 'volunteer', label: `Volunteer (${additional.volunteer?.length || 0})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Core Skills View */}
      {activeTab === 'skills' && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Programming Languages
              </label>
              <textarea
                rows={2}
                value={skills.programmingLanguages || ''}
                onChange={(e) => handleSkillChange('programmingLanguages', e.target.value)}
                placeholder="e.g. JavaScript, TypeScript, Python, C++, Java, SQL"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Frameworks & Libraries
              </label>
              <textarea
                rows={2}
                value={skills.frameworks || ''}
                onChange={(e) => handleSkillChange('frameworks', e.target.value)}
                placeholder="e.g. React, Next.js, Node.js, Express, Tailwind CSS, Redux"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Databases & Developer Tools
              </label>
              <textarea
                rows={2}
                value={skills.databasesTools || ''}
                onChange={(e) => handleSkillChange('databasesTools', e.target.value)}
                placeholder="e.g. PostgreSQL, MongoDB, Git, GitHub Actions, Docker, Linux, Postman"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Soft Skills & Methodologies
              </label>
              <textarea
                rows={2}
                value={skills.softSkills || ''}
                onChange={(e) => handleSkillChange('softSkills', e.target.value)}
                placeholder="e.g. Agile/Scrum, Problem Solving, Code Review, Team Leadership, Technical Documentation"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Relevant Coursework & Core Subjects
              </label>
              <input
                type="text"
                value={additional.coursework || ''}
                onChange={(e) => handleCourseworkChange(e.target.value)}
                placeholder="e.g. Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Certifications View */}
      {activeTab === 'certifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-500">
              Professional licenses, AWS/GCP badges, Coursera/Udemy certificates.
            </span>
            <button
              onClick={() => addItem('certifications', { name: '', issuer: '', issueDate: '', url: '' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Certification
            </button>
          </div>

          {(additional.certifications || []).length === 0 ? (
            <div className="p-8 border border-dashed border-neutral-300 rounded-2xl text-center text-xs text-neutral-400">
              No certifications added yet. Click above to add your first certificate.
            </div>
          ) : (
            (additional.certifications || []).map((item, idx) => (
              <div key={item.id || idx} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Certificate #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem('certifications', idx, -1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === additional.certifications.length - 1}
                      onClick={() => moveItem('certifications', idx, 1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem('certifications', idx)}
                      className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => updateItem('certifications', idx, 'name', e.target.value)}
                    placeholder="Certificate Name (e.g. AWS Certified Cloud Practitioner)"
                    className="sm:col-span-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.issuer || ''}
                    onChange={(e) => updateItem('certifications', idx, 'issuer', e.target.value)}
                    placeholder="Issuing Org (e.g. Amazon Web Services)"
                    className="sm:col-span-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.issueDate || ''}
                    onChange={(e) => updateItem('certifications', idx, 'issueDate', e.target.value)}
                    placeholder="Year or Date (e.g. 2024)"
                    className="sm:col-span-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. Coding Profiles & Hackathons */}
      {activeTab === 'coding' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-500">
              LeetCode, Codeforces, HackerRank, Kaggle, or Hackathon recognitions.
            </span>
            <button
              onClick={() => addItem('codingProfiles', { platform: '', username: '', highlight: '', link: '' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Profile / Hackathon
            </button>
          </div>

          {(additional.codingProfiles || []).length === 0 ? (
            <div className="p-8 border border-dashed border-neutral-300 rounded-2xl text-center text-xs text-neutral-400">
              No coding profiles or hackathons added.
            </div>
          ) : (
            (additional.codingProfiles || []).map((item, idx) => (
              <div key={item.id || idx} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Profile / Hackathon #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem('codingProfiles', idx, -1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === additional.codingProfiles.length - 1}
                      onClick={() => moveItem('codingProfiles', idx, 1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem('codingProfiles', idx)}
                      className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.platform || ''}
                    onChange={(e) => updateItem('codingProfiles', idx, 'platform', e.target.value)}
                    placeholder="Platform / Event (e.g. LeetCode / HackMIT)"
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.highlight || ''}
                    onChange={(e) => updateItem('codingProfiles', idx, 'highlight', e.target.value)}
                    placeholder="Highlight (e.g. 500+ Problems Solved / Top 5 Finalist)"
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.link || ''}
                    onChange={(e) => updateItem('codingProfiles', idx, 'link', e.target.value)}
                    placeholder="Profile URL or Project Link"
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 4. Achievements & Awards */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-500">
              Scholarships, competitions, publications, or organizational awards.
            </span>
            <button
              onClick={() => addItem('achievements', { title: '', description: '', date: '' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Achievement
            </button>
          </div>

          {(additional.achievements || []).length === 0 ? (
            <div className="p-8 border border-dashed border-neutral-300 rounded-2xl text-center text-xs text-neutral-400">
              No awards or achievements listed.
            </div>
          ) : (
            (additional.achievements || []).map((item, idx) => (
              <div key={item.id || idx} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Award #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem('achievements', idx, -1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === additional.achievements.length - 1}
                      onClick={() => moveItem('achievements', idx, 1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem('achievements', idx)}
                      className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateItem('achievements', idx, 'title', e.target.value)}
                    placeholder="Award Title (e.g. 1st Place National Hackathon)"
                    className="sm:col-span-2 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.date || ''}
                    onChange={(e) => updateItem('achievements', idx, 'date', e.target.value)}
                    placeholder="Year (e.g. 2024)"
                    className="sm:col-span-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => updateItem('achievements', idx, 'description', e.target.value)}
                    placeholder="Brief description of the honor and competitive selection"
                    className="sm:col-span-3 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. Research & Publications */}
      {activeTab === 'publications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-500">
              Journal papers, conference proceedings, or pre-prints.
            </span>
            <button
              onClick={() => addItem('publications', { title: '', publisher: '', date: '', url: '' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Publication
            </button>
          </div>

          {(additional.publications || []).length === 0 ? (
            <div className="p-8 border border-dashed border-neutral-300 rounded-2xl text-center text-xs text-neutral-400">
              No publications listed. Click above to add research papers or technical writing.
            </div>
          ) : (
            (additional.publications || []).map((item, idx) => (
              <div key={item.id || idx} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Publication #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem('publications', idx, -1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === additional.publications.length - 1}
                      onClick={() => moveItem('publications', idx, 1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem('publications', idx)}
                      className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateItem('publications', idx, 'title', e.target.value)}
                    placeholder="Paper Title (e.g. Distributed Consensus in Edge Networks)"
                    className="sm:col-span-2 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.date || ''}
                    onChange={(e) => updateItem('publications', idx, 'date', e.target.value)}
                    placeholder="Year / Date (e.g. 2024)"
                    className="sm:col-span-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.publisher || ''}
                    onChange={(e) => updateItem('publications', idx, 'publisher', e.target.value)}
                    placeholder="Conference / Journal (e.g. IEEE / ACM / arXiv)"
                    className="sm:col-span-2 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => updateItem('publications', idx, 'url', e.target.value)}
                    placeholder="Paper URL / DOI Link"
                    className="sm:col-span-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 6. Languages Spoken */}
      {activeTab === 'languages' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-500">
              Natural languages spoken and professional proficiency levels.
            </span>
            <button
              onClick={() => addItem('languages', { language: '', proficiency: 'Fluent' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Language
            </button>
          </div>

          {(additional.languages || []).length === 0 ? (
            <div className="p-8 border border-dashed border-neutral-300 rounded-2xl text-center text-xs text-neutral-400">
              No languages added.
            </div>
          ) : (
            (additional.languages || []).map((item, idx) => (
              <div key={item.id || idx} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={item.language || ''}
                    onChange={(e) => updateItem('languages', idx, 'language', e.target.value)}
                    placeholder="Language (e.g. English, Spanish, Hindi)"
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <select
                    value={item.proficiency || 'Fluent'}
                    onChange={(e) => updateItem('languages', idx, 'proficiency', e.target.value)}
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Native / Bilingual">Native / Bilingual</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional Working">Professional Working</option>
                    <option value="Conversational">Conversational</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveItem('languages', idx, -1)}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={idx === additional.languages.length - 1}
                    onClick={() => moveItem('languages', idx, 1)}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem('languages', idx)}
                    className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 7. Volunteer Experience */}
      {activeTab === 'volunteer' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-500">
              Community contributions, open-source mentoring, or student clubs.
            </span>
            <button
              onClick={() => addItem('volunteer', { role: '', organization: '', description: '' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" /> Add Volunteer Experience
            </button>
          </div>

          {(additional.volunteer || []).length === 0 ? (
            <div className="p-8 border border-dashed border-neutral-300 rounded-2xl text-center text-xs text-neutral-400">
              No volunteer experience added.
            </div>
          ) : (
            (additional.volunteer || []).map((item, idx) => (
              <div key={item.id || idx} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">Volunteer Entry #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveItem('volunteer', idx, -1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === additional.volunteer.length - 1}
                      onClick={() => moveItem('volunteer', idx, 1)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem('volunteer', idx)}
                      className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.role || ''}
                    onChange={(e) => updateItem('volunteer', idx, 'role', e.target.value)}
                    placeholder="Role (e.g. Peer Coding Mentor)"
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.organization || ''}
                    onChange={(e) => updateItem('volunteer', idx, 'organization', e.target.value)}
                    placeholder="Organization (e.g. Local Code Club)"
                    className="px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => updateItem('volunteer', idx, 'description', e.target.value)}
                    placeholder="Summary of volunteer contributions"
                    className="sm:col-span-2 px-3 py-2 border border-neutral-300 rounded-xl text-xs focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
