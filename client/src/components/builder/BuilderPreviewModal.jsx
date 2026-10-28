import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  GitBranch,
  Globe,
  LayoutTemplate,
  FileText,
  ExternalLink,
} from 'lucide-react';

export default function BuilderPreviewModal({
  isOpen,
  onClose,
  data,
  onChooseTemplate,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const { personalInfo = {}, education = [], experience = [], projects = [], skills = {}, additional = {} } = data;

  const handleCopyText = () => {
    let plainText = '';
    if (personalInfo.fullName) plainText += `${personalInfo.fullName.toUpperCase()}\n`;
    if (personalInfo.headline) plainText += `${personalInfo.headline}\n`;

    const contacts = [
      personalInfo.email,
      personalInfo.phone,
      personalInfo.location,
      personalInfo.linkedin,
      personalInfo.github,
      personalInfo.portfolio,
    ].filter(Boolean);
    if (contacts.length > 0) plainText += `${contacts.join(' | ')}\n\n`;

    if (personalInfo.summary) {
      plainText += `PROFESSIONAL SUMMARY\n${personalInfo.summary}\n\n`;
    }

    if (experience.length > 0) {
      plainText += `WORK EXPERIENCE\n`;
      experience.forEach((exp) => {
        plainText += `${exp.jobTitle || 'Role'} - ${exp.company || 'Company'} (${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''})\n`;
        if (exp.responsibilities) plainText += `${exp.responsibilities}\n`;
        if (exp.achievements) plainText += `Achievement: ${exp.achievements}\n`;
        plainText += `\n`;
      });
    }

    if (projects.length > 0) {
      plainText += `PROJECTS\n`;
      projects.forEach((p) => {
        plainText += `${p.title || 'Project'} | ${p.technologies || ''}\n`;
        if (p.description) plainText += `${p.description}\n`;
        if (p.contributions) plainText += `${p.contributions}\n`;
        plainText += `\n`;
      });
    }

    if (education.length > 0) {
      plainText += `EDUCATION\n`;
      education.forEach((edu) => {
        plainText += `${edu.degree || 'Degree'} - ${edu.institution || 'University'} (${edu.startDate || ''} - ${edu.current ? 'Present' : edu.endDate || ''})\n`;
        if (edu.grade) plainText += `Grade/GPA: ${edu.grade}\n`;
        if (edu.coursework) plainText += `Coursework: ${edu.coursework}\n`;
        plainText += `\n`;
      });
    }

    navigator.clipboard.writeText(plainText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Resume Preview</h3>
              <p className="text-[11px] text-neutral-500">Live draft rendering based on your filled details</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied Text
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Text
                </>
              )}
            </button>

            <button
              onClick={onChooseTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600" />
              <span>Choose Template</span>
              <span className="text-[10px] bg-emerald-200/80 px-1 py-0.2 rounded font-mono">Phase 4</span>
            </button>

            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Paper Area */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-neutral-100 flex justify-center">
          <div className="bg-white border border-neutral-300 rounded-xl shadow-lg w-full max-w-3xl p-6 sm:p-10 space-y-6 text-neutral-800 font-sans text-xs sm:text-sm leading-normal min-h-[600px]">
            {/* Header: Name & Contact */}
            <header className="border-b-2 border-neutral-800 pb-4 text-center sm:text-left space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
                {personalInfo.fullName || 'YOUR NAME HERE'}
              </h1>
              {personalInfo.headline && (
                <p className="text-sm font-semibold text-emerald-800">{personalInfo.headline}</p>
              )}

              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-neutral-600 pt-1">
                {personalInfo.email && (
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    {personalInfo.email}
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {personalInfo.location}
                  </span>
                )}
                {personalInfo.linkedin && (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <LinkIcon className="w-3.5 h-3.5" />
                    LinkedIn
                  </span>
                )}
                {personalInfo.github && (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <GitBranch className="w-3.5 h-3.5" />
                    GitHub
                  </span>
                )}
                {personalInfo.portfolio && (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <Globe className="w-3.5 h-3.5" />
                    Portfolio
                  </span>
                )}
              </div>
            </header>

            {/* Professional Summary */}
            {personalInfo.summary && (
              <section className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {/* Technical Skills */}
            {(skills.programmingLanguages || skills.frameworks || skills.databasesTools || skills.softSkills || additional.coursework) && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Technical & Professional Skills
                </h2>
                <div className="space-y-1 text-xs">
                  {skills.programmingLanguages && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">Languages: </strong>
                      <span className="text-neutral-700">{skills.programmingLanguages}</span>
                    </p>
                  )}
                  {skills.frameworks && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">Frameworks & Libraries: </strong>
                      <span className="text-neutral-700">{skills.frameworks}</span>
                    </p>
                  )}
                  {skills.databasesTools && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">Databases & Tools: </strong>
                      <span className="text-neutral-700">{skills.databasesTools}</span>
                    </p>
                  )}
                  {skills.softSkills && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">Practices & Soft Skills: </strong>
                      <span className="text-neutral-700">{skills.softSkills}</span>
                    </p>
                  )}
                  {additional.coursework && (
                    <p>
                      <strong className="text-neutral-900 font-semibold">Core Coursework: </strong>
                      <span className="text-neutral-700">{additional.coursework}</span>
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Work Experience */}
            {experience.filter((e) => e.jobTitle || e.company).length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience
                    .filter((e) => e.jobTitle || e.company)
                    .map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                          <span className="font-bold text-neutral-900">
                            {exp.jobTitle}{' '}
                            <span className="font-normal text-neutral-600">
                              | {exp.company} ({exp.employmentType || 'Full-time'})
                            </span>
                          </span>
                          <span className="text-neutral-500 font-medium">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>

                        {exp.technologies && (
                          <p className="text-[11px] text-neutral-500 italic">
                            Tech stack: {exp.technologies}
                          </p>
                        )}

                        {exp.responsibilities && (
                          <div className="text-xs text-neutral-700 pl-4 whitespace-pre-wrap leading-relaxed">
                            {exp.responsibilities}
                          </div>
                        )}

                        {exp.achievements && (
                          <p className="text-xs text-neutral-800 font-medium pl-4">
                            ★ <span className="font-semibold">Key Achievement:</span> {exp.achievements}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.filter((p) => p.title).length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Key Projects
                </h2>
                <div className="space-y-3">
                  {projects
                    .filter((p) => p.title)
                    .map((proj, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                          <span className="font-bold text-neutral-900">
                            {proj.title}
                            {proj.technologies && (
                              <span className="font-normal text-neutral-600"> | {proj.technologies}</span>
                            )}
                          </span>
                          <div className="flex items-center gap-2 text-[11px] text-emerald-700">
                            {proj.githubUrl && <span>Code</span>}
                            {proj.liveUrl && <span>Live Demo</span>}
                          </div>
                        </div>

                        {proj.problemSolved && (
                          <p className="text-xs text-neutral-600 italic">
                            Problem Solved: {proj.problemSolved}
                          </p>
                        )}

                        {proj.description && (
                          <p className="text-xs text-neutral-700 leading-relaxed">{proj.description}</p>
                        )}

                        {proj.contributions && (
                          <div className="text-xs text-neutral-700 pl-4 whitespace-pre-wrap leading-relaxed">
                            {proj.contributions}
                          </div>
                        )}

                        {proj.results && (
                          <p className="text-xs text-neutral-800 font-medium pl-4">
                            Impact: {proj.results}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.filter((e) => e.degree || e.institution).length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {education
                    .filter((e) => e.degree || e.institution)
                    .map((edu, idx) => (
                      <div key={idx} className="space-y-0.5 text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <span className="font-bold text-neutral-900">
                            {edu.degree}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                          </span>
                          <span className="text-neutral-500">
                            {edu.startDate} – {edu.current ? 'Present / Expected' : edu.endDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-600">
                          <span>{edu.institution}</span>
                          {edu.grade && <span className="font-semibold text-neutral-800">Score: {edu.grade}</span>}
                        </div>
                        {edu.coursework && (
                          <p className="text-[11px] text-neutral-500 italic pt-0.5">
                            Relevant Coursework: {edu.coursework}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Additional Sections (Certifications, Hackathons, Awards, Publications, Languages, Volunteer) */}
            {((additional.certifications?.length || 0) > 0 ||
              (additional.codingProfiles?.length || 0) > 0 ||
              (additional.achievements?.length || 0) > 0 ||
              (additional.publications?.length || 0) > 0 ||
              (additional.volunteer?.length || 0) > 0 ||
              (additional.languages?.length || 0) > 0) && (
              <section className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1">
                  Certifications & Additional Highlights
                </h2>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {additional.certifications?.map((c, i) => (
                    <p key={i}>
                      • <strong className="font-semibold text-neutral-900">{c.name}</strong> - {c.issuer}{' '}
                      {c.issueDate ? `(${c.issueDate})` : ''}
                    </p>
                  ))}
                  {additional.codingProfiles?.map((cp, i) => (
                    <p key={i}>
                      • <strong className="font-semibold text-neutral-900">{cp.platform}</strong>:{' '}
                      {cp.highlight || cp.username}
                    </p>
                  ))}
                  {additional.publications?.map((pub, i) => (
                    <p key={i}>
                      • <strong className="font-semibold text-neutral-900">{pub.title}</strong>{' '}
                      {pub.publisher ? `(${pub.publisher})` : ''} {pub.date ? `– ${pub.date}` : ''}
                    </p>
                  ))}
                  {additional.achievements?.map((ach, i) => (
                    <p key={i}>
                      • <strong className="font-semibold text-neutral-900">{ach.title}</strong>{' '}
                      {ach.date ? `(${ach.date})` : ''}: {ach.description}
                    </p>
                  ))}
                  {additional.volunteer?.map((vol, i) => (
                    <p key={i}>
                      • <strong className="font-semibold text-neutral-900">{vol.role}</strong>{' '}
                      {vol.organization ? `at ${vol.organization}` : ''}: {vol.description}
                    </p>
                  ))}
                  {additional.languages?.length > 0 && (
                    <p>
                      • <strong className="font-semibold text-neutral-900">Languages: </strong>
                      {additional.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
                    </p>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50/80 flex items-center justify-between text-xs text-neutral-500">
          <span>Phase 3 Live Document Preview. Standard ATS format.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            Back to Editor
          </button>
        </div>
      </div>
    </div>
  );
}
