import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, GitBranch, Globe, ExternalLink } from 'lucide-react';
import { formatResumeDate } from './templateConfig';

export default function ModernTemplate({ data, customization }) {
  const { personalInfo = {}, education = [], experience = [], projects = [], skills = {}, additional = {} } = data || {};
  const accentColor = customization?.accentColor || '#059669';

  // Helper for initials
  const initials = (personalInfo.fullName || 'R')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const validEducation = education.filter((e) => e.degree?.trim() || e.institution?.trim());
  const validExperience = experience.filter((e) => e.jobTitle?.trim() || e.company?.trim());
  const validProjects = projects.filter((p) => p.title?.trim());

  return (
    <div className="w-full bg-white text-neutral-800 p-8 sm:p-12 space-y-6">
      {/* 1. Modern Header */}
      <header className="border-b-2 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: accentColor }}>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl text-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {initials}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            {personalInfo.headline && (
              <p className="text-sm font-semibold mt-0.5" style={{ color: accentColor }}>
                {personalInfo.headline}
              </p>
            )}
          </div>
        </div>

        {/* Contact Badges Row */}
        <div className="flex flex-col sm:items-end text-xs text-neutral-600 gap-1 font-medium">
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {personalInfo.location}
            </span>
          )}
          <div className="flex items-center gap-2 pt-0.5">
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:underline text-[11px]"
                style={{ color: accentColor }}
              >
                <LinkIcon className="w-3 h-3" />
                LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <a
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:underline text-[11px]"
                style={{ color: accentColor }}
              >
                <GitBranch className="w-3 h-3" />
                GitHub
              </a>
            )}
            {personalInfo.portfolio && (
              <a
                href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:underline text-[11px]"
                style={{ color: accentColor }}
              >
                <Globe className="w-3 h-3" />
                Portfolio
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 2. Professional Summary */}
      {personalInfo.summary && (
        <section className="bg-neutral-50/80 p-4 rounded-xl border-l-4 space-y-1" style={{ borderLeftColor: accentColor }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            About Me
          </h2>
          <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* 3. Modern Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column (4 cols): Skills, Education, Certs, Languages */}
        <aside className="md:col-span-4 space-y-6">
          {/* Technical Skills */}
          {(skills.programmingLanguages || skills.frameworks || skills.databasesTools || skills.softSkills || additional.coursework) && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Skills & Stack
              </h2>

              {skills.programmingLanguages && (
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-neutral-800 text-[11px] block">Languages:</span>
                  <div className="flex flex-wrap gap-1">
                    {skills.programmingLanguages.split(',').map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-800">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.frameworks && (
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-neutral-800 text-[11px] block">Frameworks & Libs:</span>
                  <div className="flex flex-wrap gap-1">
                    {skills.frameworks.split(',').map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-800">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.databasesTools && (
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-neutral-800 text-[11px] block">Tools & Databases:</span>
                  <div className="flex flex-wrap gap-1">
                    {skills.databasesTools.split(',').map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-800">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.softSkills && (
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-neutral-800 text-[11px] block">Core Strengths:</span>
                  <p className="text-[11px] text-neutral-600 leading-normal">{skills.softSkills}</p>
                </div>
              )}

              {additional.coursework && (
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-neutral-800 text-[11px] block">Coursework:</span>
                  <p className="text-[11px] text-neutral-600 leading-normal">{additional.coursework}</p>
                </div>
              )}
            </section>
          )}

          {/* Education */}
          {validEducation.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Education
              </h2>
              <div className="space-y-3">
                {validEducation.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5 text-xs">
                    <div className="font-bold text-neutral-900 leading-snug">
                      {edu.degree}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    </div>
                    <div className="text-neutral-600 text-[11px]">{edu.institution}</div>
                    <div className="text-neutral-400 text-[10px]">
                      {formatResumeDate(edu.startDate)} – {edu.current ? 'Present' : formatResumeDate(edu.endDate)}
                    </div>
                    {edu.grade && (
                      <div className="text-[10px] font-semibold text-neutral-700">GPA/Score: {edu.grade}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {(additional.certifications?.length || 0) > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs text-neutral-700">
                {additional.certifications.map((c, i) => (
                  <div key={i} className="text-[11px] leading-tight">
                    <span className="font-bold text-neutral-900 block">{c.name}</span>
                    <span className="text-neutral-500">{c.issuer} {c.issueDate ? `(${c.issueDate})` : ''}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {(additional.languages?.length || 0) > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Languages
              </h2>
              <div className="space-y-1 text-xs text-neutral-700">
                {additional.languages.map((l, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="font-semibold text-neutral-800">{l.language}</span>
                    <span className="text-neutral-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column (8 cols): Experience, Projects, Publications, Awards */}
        <main className="md:col-span-8 space-y-6">
          {/* Work Experience */}
          {validExperience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Work Experience
              </h2>
              <div className="space-y-4">
                {validExperience.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5 page-break-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                      <div>
                        <span className="font-bold text-neutral-900 text-sm">{exp.jobTitle}</span>
                        <span className="text-neutral-600 font-medium"> @ {exp.company}</span>
                        {exp.employmentType && (
                          <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                            {exp.employmentType}
                          </span>
                        )}
                      </div>
                      <span className="text-neutral-500 text-[11px] font-mono whitespace-nowrap">
                        {formatResumeDate(exp.startDate)} – {exp.current ? 'Present' : formatResumeDate(exp.endDate)}
                      </span>
                    </div>

                    {exp.technologies && (
                      <p className="text-[11px] text-neutral-500 italic">
                        Tech stack: {exp.technologies}
                      </p>
                    )}

                    {exp.responsibilities && (
                      <div className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-neutral-200">
                        {exp.responsibilities}
                      </div>
                    )}

                    {exp.achievements && (
                      <p className="text-xs text-neutral-800 font-medium pl-3">
                        ★ <span className="font-semibold">Result:</span> {exp.achievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Projects */}
          {validProjects.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Projects
              </h2>
              <div className="space-y-4">
                {validProjects.map((proj, idx) => (
                  <div key={idx} className="space-y-1.5 page-break-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-sm">{proj.title}</span>
                        {proj.technologies && (
                          <span className="text-[11px] text-neutral-500 font-mono">({proj.technologies})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-0.5"
                            style={{ color: accentColor }}
                          >
                            <span>Code</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center gap-0.5"
                            style={{ color: accentColor }}
                          >
                            <span>Demo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
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
                      <div className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap pl-3 border-l-2 border-neutral-200">
                        {proj.contributions}
                      </div>
                    )}

                    {proj.results && (
                      <p className="text-xs text-neutral-800 font-medium pl-3">
                        ★ {proj.results}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Publications & Coding Highlights */}
          {((additional.publications?.length || 0) > 0 || (additional.codingProfiles?.length || 0) > 0 || (additional.achievements?.length || 0) > 0) && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: accentColor, borderColor: '#e5e7eb' }}>
                Publications & Achievements
              </h2>
              <div className="space-y-2 text-xs text-neutral-700">
                {additional.publications?.map((pub, i) => (
                  <p key={i} className="leading-snug">
                    • <strong className="font-semibold text-neutral-900">{pub.title}</strong>{' '}
                    {pub.publisher ? `(${pub.publisher})` : ''} {pub.date ? `– ${pub.date}` : ''}
                  </p>
                ))}
                {additional.codingProfiles?.map((cp, i) => (
                  <p key={i} className="leading-snug">
                    • <strong className="font-semibold text-neutral-900">{cp.platform}</strong>:{' '}
                    {cp.highlight || cp.username}
                  </p>
                ))}
                {additional.achievements?.map((ach, i) => (
                  <p key={i} className="leading-snug">
                    • <strong className="font-semibold text-neutral-900">{ach.title}</strong>{' '}
                    {ach.date ? `(${ach.date})` : ''}: {ach.description}
                  </p>
                ))}
                {additional.volunteer?.map((v, i) => (
                  <p key={i} className="leading-snug">
                    • <strong className="font-semibold text-neutral-900">{v.role}</strong>{' '}
                    {v.organization ? `@ ${v.organization}` : ''}: {v.description}
                  </p>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
