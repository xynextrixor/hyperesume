import React from 'react';
import { formatResumeDate } from './templateConfig';

export default function ProfessionalTemplate({ data, customization }) {
  const { personalInfo = {}, education = [], experience = [], projects = [], skills = {}, additional = {} } = data || {};
  const accentColor = customization?.accentColor || '#1e293b';

  const validEducation = education.filter((e) => e.degree?.trim() || e.institution?.trim());
  const validExperience = experience.filter((e) => e.jobTitle?.trim() || e.company?.trim());
  const validProjects = projects.filter((p) => p.title?.trim());

  // Contact list
  const contactItems = [];
  if (personalInfo.email) contactItems.push(personalInfo.email);
  if (personalInfo.phone) contactItems.push(personalInfo.phone);
  if (personalInfo.location) contactItems.push(personalInfo.location);
  if (personalInfo.linkedin) contactItems.push(personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/i, ''));
  if (personalInfo.github) contactItems.push(personalInfo.github.replace(/^https?:\/\/(www\.)?/i, ''));
  if (personalInfo.portfolio) contactItems.push(personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/i, ''));

  return (
    <div className="w-full bg-white text-neutral-900 p-8 sm:p-14 space-y-5">
      {/* 1. Classic Formal Centered Header */}
      <header className="text-center pb-4 border-b border-neutral-300 space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-neutral-900">
          {personalInfo.fullName || 'CANDIDATE NAME'}
        </h1>

        {personalInfo.headline && (
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-700 uppercase">
            {personalInfo.headline}
          </p>
        )}

        {contactItems.length > 0 && (
          <p className="text-xs text-neutral-600 font-normal pt-1">
            {contactItems.join('  •  ')}
          </p>
        )}
      </header>

      {/* 2. Professional Executive Summary */}
      {personalInfo.summary && (
        <section className="space-y-1.5 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-xs text-neutral-800 leading-relaxed text-justify whitespace-pre-wrap">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* 3. Core Competencies & Skills */}
      {(skills.programmingLanguages || skills.frameworks || skills.databasesTools || skills.softSkills || additional.coursework) && (
        <section className="space-y-1.5 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
          >
            Areas of Expertise & Technical Skills
          </h2>
          <div className="space-y-1 text-xs text-neutral-800">
            {skills.programmingLanguages && (
              <p>
                <strong className="font-semibold text-neutral-900">Programming Languages: </strong>
                {skills.programmingLanguages}
              </p>
            )}
            {skills.frameworks && (
              <p>
                <strong className="font-semibold text-neutral-900">Frameworks & Technologies: </strong>
                {skills.frameworks}
              </p>
            )}
            {skills.databasesTools && (
              <p>
                <strong className="font-semibold text-neutral-900">Tools, Systems & Databases: </strong>
                {skills.databasesTools}
              </p>
            )}
            {skills.softSkills && (
              <p>
                <strong className="font-semibold text-neutral-900">Professional Competencies: </strong>
                {skills.softSkills}
              </p>
            )}
            {additional.coursework && (
              <p>
                <strong className="font-semibold text-neutral-900">Academic Coursework: </strong>
                {additional.coursework}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4. Professional Work Experience */}
      {validExperience.length > 0 && (
        <section className="space-y-3">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {validExperience.map((exp, idx) => (
              <div key={idx} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">{exp.jobTitle}</span>
                    <span className="text-neutral-700"> — {exp.company}</span>
                    {exp.employmentType && (
                      <span className="text-neutral-500 italic text-[11px]"> ({exp.employmentType})</span>
                    )}
                  </div>
                  <span className="text-neutral-600 font-medium italic text-[11px] whitespace-nowrap">
                    {formatResumeDate(exp.startDate)} – {exp.current ? 'Present' : formatResumeDate(exp.endDate)}
                  </span>
                </div>

                {exp.technologies && (
                  <p className="text-[11px] text-neutral-600">
                    <span className="font-medium">Technologies:</span> {exp.technologies}
                  </p>
                )}

                {exp.responsibilities && (
                  <div className="text-xs text-neutral-800 pl-4 whitespace-pre-wrap leading-relaxed list-disc">
                    {exp.responsibilities}
                  </div>
                )}

                {exp.achievements && (
                  <p className="text-xs text-neutral-900 font-semibold pl-4">
                    Key Achievement: <span className="font-normal text-neutral-800">{exp.achievements}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Key Projects */}
      {validProjects.length > 0 && (
        <section className="space-y-3">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
          >
            Technical & Practical Projects
          </h2>
          <div className="space-y-3.5">
            {validProjects.map((proj, idx) => (
              <div key={idx} className="space-y-1 page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">{proj.title}</span>
                    {proj.technologies && (
                      <span className="text-neutral-600"> | {proj.technologies}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-600">
                    {proj.githubUrl && <span>Code: {proj.githubUrl.replace(/^https?:\/\//i, '')}</span>}
                    {proj.liveUrl && <span>Demo: {proj.liveUrl.replace(/^https?:\/\//i, '')}</span>}
                  </div>
                </div>

                {proj.problemSolved && (
                  <p className="text-xs text-neutral-700 italic">
                    Objective: {proj.problemSolved}
                  </p>
                )}

                {proj.description && (
                  <p className="text-xs text-neutral-800 leading-relaxed">{proj.description}</p>
                )}

                {proj.contributions && (
                  <div className="text-xs text-neutral-800 pl-4 whitespace-pre-wrap leading-relaxed">
                    {proj.contributions}
                  </div>
                )}

                {proj.results && (
                  <p className="text-xs text-neutral-900 font-medium pl-4">
                    Impact: {proj.results}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Education */}
      {validEducation.length > 0 && (
        <section className="space-y-2 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
          >
            Education & Academic Credentials
          </h2>
          <div className="space-y-2.5">
            {validEducation.map((edu, idx) => (
              <div key={idx} className="space-y-0.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-neutral-900">
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                  </span>
                  <span className="text-neutral-600 italic text-[11px]">
                    {formatResumeDate(edu.startDate)} – {edu.current ? 'Present' : formatResumeDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-700">
                  <span>{edu.institution}</span>
                  {edu.grade && <span className="font-semibold text-neutral-800">Grade: {edu.grade}</span>}
                </div>
                {edu.coursework && (
                  <p className="text-[11px] text-neutral-600 italic">
                    Focus: {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Certifications & Honors */}
      {((additional.certifications?.length || 0) > 0 ||
        (additional.publications?.length || 0) > 0 ||
        (additional.achievements?.length || 0) > 0 ||
        (additional.codingProfiles?.length || 0) > 0 ||
        (additional.languages?.length || 0) > 0) && (
        <section className="space-y-2 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
          >
            Certifications, Honors & Languages
          </h2>
          <div className="space-y-1 text-xs text-neutral-800">
            {additional.certifications?.map((c, i) => (
              <p key={i}>
                • <strong className="font-semibold text-neutral-900">{c.name}</strong> — {c.issuer}{' '}
                {c.issueDate ? `(${c.issueDate})` : ''}
              </p>
            ))}
            {additional.publications?.map((pub, i) => (
              <p key={i}>
                • <strong className="font-semibold text-neutral-900">{pub.title}</strong>{' '}
                {pub.publisher ? `— ${pub.publisher}` : ''} {pub.date ? `(${pub.date})` : ''}
              </p>
            ))}
            {additional.achievements?.map((ach, i) => (
              <p key={i}>
                • <strong className="font-semibold text-neutral-900">{ach.title}</strong>{' '}
                {ach.date ? `(${ach.date})` : ''}: {ach.description}
              </p>
            ))}
            {additional.codingProfiles?.map((cp, i) => (
              <p key={i}>
                • <strong className="font-semibold text-neutral-900">{cp.platform}</strong>: {cp.highlight || cp.username}
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
  );
}
