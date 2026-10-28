import React from 'react';
import { formatResumeDate } from './templateConfig';

export default function MinimalAtsTemplate({ data }) {
  const { personalInfo = {}, education = [], experience = [], projects = [], skills = {}, additional = {} } = data || {};

  const validEducation = education.filter((e) => e.degree?.trim() || e.institution?.trim());
  const validExperience = experience.filter((e) => e.jobTitle?.trim() || e.company?.trim());
  const validProjects = projects.filter((p) => p.title?.trim());

  // Clean contact pieces
  const contactParts = [];
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/i, ''));
  if (personalInfo.github) contactParts.push(personalInfo.github.replace(/^https?:\/\/(www\.)?/i, ''));
  if (personalInfo.portfolio) contactParts.push(personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/i, ''));

  return (
    <div
      className="w-full bg-white text-black p-8 sm:p-14 space-y-5"
      style={{
        fontFamily: "'Times New Roman', Times, serif, system-ui",
        color: '#000000',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 1. Header: Single-column pure text */}
      <header className="border-b border-black pb-2 text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight uppercase">
          {personalInfo.fullName || 'CANDIDATE NAME'}
        </h1>

        {personalInfo.headline && (
          <p className="text-xs font-semibold uppercase">{personalInfo.headline}</p>
        )}

        {contactParts.length > 0 && (
          <p className="text-xs">
            {contactParts.join(' | ')}
          </p>
        )}
      </header>

      {/* 2. Professional Summary */}
      {personalInfo.summary && (
        <section className="space-y-1 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs leading-relaxed whitespace-pre-wrap">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* 3. Core Competencies & Skills */}
      {(skills.programmingLanguages || skills.frameworks || skills.databasesTools || skills.softSkills || additional.coursework) && (
        <section className="space-y-1 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
            AREAS OF EXPERTISE & TECHNICAL SKILLS
          </h2>
          <div className="space-y-0.5 text-xs">
            {skills.programmingLanguages && (
              <p>
                <strong>Programming Languages: </strong>
                {skills.programmingLanguages}
              </p>
            )}
            {skills.frameworks && (
              <p>
                <strong>Frameworks & Libraries: </strong>
                {skills.frameworks}
              </p>
            )}
            {skills.databasesTools && (
              <p>
                <strong>Databases & Developer Tools: </strong>
                {skills.databasesTools}
              </p>
            )}
            {skills.softSkills && (
              <p>
                <strong>Professional Strengths: </strong>
                {skills.softSkills}
              </p>
            )}
            {additional.coursework && (
              <p>
                <strong>Relevant Coursework: </strong>
                {additional.coursework}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4. Work Experience */}
      {validExperience.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3">
            {validExperience.map((exp, idx) => (
              <div key={idx} className="space-y-0.5 page-break-avoid">
                <div className="flex justify-between text-xs">
                  <span>
                    <strong>{exp.jobTitle}</strong>, {exp.company}
                    {exp.employmentType ? ` (${exp.employmentType})` : ''}
                  </span>
                  <span>
                    {formatResumeDate(exp.startDate)} – {exp.current ? 'Present' : formatResumeDate(exp.endDate)}
                  </span>
                </div>

                {exp.technologies && (
                  <p className="text-xs italic">
                    Technologies: {exp.technologies}
                  </p>
                )}

                {exp.responsibilities && (
                  <div className="text-xs pl-4 whitespace-pre-wrap leading-relaxed">
                    {exp.responsibilities}
                  </div>
                )}

                {exp.achievements && (
                  <p className="text-xs pl-4">
                    Key Result: {exp.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Projects */}
      {validProjects.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {validProjects.map((proj, idx) => (
              <div key={idx} className="space-y-0.5 page-break-avoid">
                <div className="flex justify-between text-xs">
                  <span>
                    <strong>{proj.title}</strong>
                    {proj.technologies ? ` | ${proj.technologies}` : ''}
                  </span>
                  <div className="text-xs">
                    {proj.githubUrl && <span>Code: {proj.githubUrl.replace(/^https?:\/\//i, '')} </span>}
                    {proj.liveUrl && <span>| Demo: {proj.liveUrl.replace(/^https?:\/\//i, '')}</span>}
                  </div>
                </div>

                {proj.problemSolved && (
                  <p className="text-xs italic">Problem Solved: {proj.problemSolved}</p>
                )}

                {proj.description && (
                  <p className="text-xs leading-relaxed">{proj.description}</p>
                )}

                {proj.contributions && (
                  <div className="text-xs pl-4 whitespace-pre-wrap leading-relaxed">
                    {proj.contributions}
                  </div>
                )}

                {proj.results && (
                  <p className="text-xs pl-4">Impact: {proj.results}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Education */}
      {validEducation.length > 0 && (
        <section className="space-y-1 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {validEducation.map((edu, idx) => (
              <div key={idx} className="text-xs space-y-0.5">
                <div className="flex justify-between">
                  <span>
                    <strong>{edu.degree}</strong>
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''} — {edu.institution}
                  </span>
                  <span>
                    {formatResumeDate(edu.startDate)} – {edu.current ? 'Present' : formatResumeDate(edu.endDate)}
                  </span>
                </div>
                {edu.grade && <p className="text-xs">Grade/GPA: {edu.grade}</p>}
                {edu.coursework && <p className="text-xs italic">Coursework: {edu.coursework}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Certifications & Additional */}
      {((additional.certifications?.length || 0) > 0 ||
        (additional.publications?.length || 0) > 0 ||
        (additional.achievements?.length || 0) > 0 ||
        (additional.codingProfiles?.length || 0) > 0 ||
        (additional.languages?.length || 0) > 0) && (
        <section className="space-y-1 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5">
            CERTIFICATIONS & HONORS
          </h2>
          <div className="space-y-0.5 text-xs">
            {additional.certifications?.map((c, i) => (
              <p key={i}>
                • {c.name} — {c.issuer} {c.issueDate ? `(${c.issueDate})` : ''}
              </p>
            ))}
            {additional.publications?.map((pub, i) => (
              <p key={i}>
                • {pub.title} — {pub.publisher} {pub.date ? `(${pub.date})` : ''}
              </p>
            ))}
            {additional.achievements?.map((ach, i) => (
              <p key={i}>
                • {ach.title} {ach.date ? `(${ach.date})` : ''}: {ach.description}
              </p>
            ))}
            {additional.codingProfiles?.map((cp, i) => (
              <p key={i}>
                • {cp.platform}: {cp.highlight || cp.username}
              </p>
            ))}
            {additional.languages?.length > 0 && (
              <p>
                • Languages: {additional.languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
