/**
 * Default empty state and utilities for Resume Builder
 */

export const STORAGE_KEY = 'resumeai_builder_draft_v1';

export const initialResumeState = {
  personalInfo: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      coursework: '',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: '',
      company: '',
      employmentType: 'Full-time',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
      achievements: '',
      technologies: '',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: '',
      description: '',
      problemSolved: '',
      technologies: '',
      contributions: '',
      githubUrl: '',
      liveUrl: '',
      results: '',
    },
  ],
  skills: {
    programmingLanguages: '',
    frameworks: '',
    databasesTools: '',
    softSkills: '',
  },
  additional: {
    certifications: [],
    achievements: [],
    publications: [],
    codingProfiles: [],
    volunteer: [],
    coursework: '',
    languages: [],
  },
  targetJob: {
    targetTitle: '',
    jobDescription: '',
  },
};

/**
 * Validate email address format
 */
export function validateEmail(email) {
  if (!email || !email.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validate URL format
 */
export function validateUrl(url) {
  if (!url || !url.trim()) return true;
  try {
    const withProtocol = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    const parsed = new URL(withProtocol);
    return parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

/**
 * Validate start and end date ordering
 */
export function validateDateRange(startDate, endDate, current) {
  if (current || !startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
}

/**
 * Calculate completion score out of 100
 */
export function calculateCompletion(data) {
  let score = 0;
  if (!data) return 0;

  // Personal Info (30 pts)
  if (data.personalInfo?.fullName?.trim()) score += 10;
  if (data.personalInfo?.headline?.trim()) score += 5;
  if (data.personalInfo?.email?.trim()) score += 5;
  if (data.personalInfo?.summary?.trim()) score += 10;

  // Education (20 pts)
  const hasEdu = data.education?.some((e) => e.degree?.trim() && e.institution?.trim());
  if (hasEdu) score += 20;

  // Experience or Projects (30 pts)
  const hasExp = data.experience?.some((e) => e.jobTitle?.trim() && e.company?.trim());
  const hasProj = data.projects?.some((p) => p.title?.trim());
  if (hasExp && hasProj) {
    score += 30;
  } else if (hasExp || hasProj) {
    score += 20;
  }

  // Skills (15 pts)
  const hasSkills =
    data.skills?.programmingLanguages?.trim() ||
    data.skills?.frameworks?.trim() ||
    data.skills?.databasesTools?.trim();
  if (hasSkills) score += 15;

  // Additional (5 pts)
  const hasExtra =
    (data.additional?.certifications?.length || 0) > 0 ||
    (data.additional?.achievements?.length || 0) > 0 ||
    (data.additional?.codingProfiles?.length || 0) > 0 ||
    (data.additional?.publications?.length || 0) > 0 ||
    (data.additional?.volunteer?.length || 0) > 0 ||
    data.additional?.coursework?.trim() ||
    (data.additional?.languages?.length || 0) > 0;
  if (hasExtra) score += 5;

  return Math.min(100, score);
}

/**
 * Convert a fixed/rewritten resume (from Gemini Fix My Resume) into the structured
 * Resume Builder state format so it can be previewed in the 3 templates or customized.
 */
export function convertFixedResumeToBuilderData(fixedResume) {
  if (!fixedResume) return JSON.parse(JSON.stringify(initialResumeState));

  const draft = JSON.parse(JSON.stringify(initialResumeState));

  // 1. Personal Information
  draft.personalInfo.fullName = fixedResume.fullName || '';
  draft.personalInfo.summary = fixedResume.professionalSummary || '';

  if (fixedResume.contact) {
    draft.personalInfo.email = fixedResume.contact.email || '';
    draft.personalInfo.phone = fixedResume.contact.phone || '';
    draft.personalInfo.location = fixedResume.contact.location || '';
    draft.personalInfo.linkedin = fixedResume.contact.linkedin || '';
    draft.personalInfo.github = fixedResume.contact.github || '';
    draft.personalInfo.portfolio = fixedResume.contact.portfolio || '';
  }

  const sections = Array.isArray(fixedResume.sections) ? fixedResume.sections : [];

  const parsedEducation = [];
  const parsedExperience = [];
  const parsedProjects = [];
  const parsedCertifications = [];
  const parsedAchievements = [];

  for (const section of sections) {
    const heading = (section.heading || '').toLowerCase();
    const items = Array.isArray(section.items) ? section.items.filter(Boolean) : [];

    if (heading.includes('skill')) {
      for (const item of items) {
        const itemLower = item.toLowerCase();
        if (itemLower.startsWith('programming') || itemLower.startsWith('language')) {
          draft.skills.programmingLanguages = item.replace(/^[^:]+:\s*/i, '');
        } else if (itemLower.startsWith('framework') || itemLower.startsWith('libraries')) {
          draft.skills.frameworks = item.replace(/^[^:]+:\s*/i, '');
        } else if (itemLower.startsWith('database') || itemLower.startsWith('tool')) {
          draft.skills.databasesTools = item.replace(/^[^:]+:\s*/i, '');
        } else if (itemLower.startsWith('soft') || itemLower.startsWith('interpersonal')) {
          draft.skills.softSkills = item.replace(/^[^:]+:\s*/i, '');
        } else {
          if (!draft.skills.programmingLanguages) {
            draft.skills.programmingLanguages = item;
          } else if (!draft.skills.frameworks) {
            draft.skills.frameworks = item;
          } else {
            draft.skills.databasesTools = draft.skills.databasesTools
              ? `${draft.skills.databasesTools}, ${item}`
              : item;
          }
        }
      }
    } else if (heading.includes('education') || heading.includes('academic')) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parts = item.split(/[,|•-]/).map((s) => s.trim()).filter(Boolean);
        parsedEducation.push({
          id: `edu-${i + 1}`,
          degree: parts[0] || item,
          institution: parts[1] || 'University / Institution',
          fieldOfStudy: parts[2] || '',
          startDate: '',
          endDate: '',
          current: false,
          grade: '',
          coursework: '',
        });
      }
    } else if (
      heading.includes('experience') ||
      heading.includes('employment') ||
      heading.includes('work') ||
      heading.includes('intern')
    ) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parts = item.split(/[:|-]/).map((s) => s.trim()).filter(Boolean);
        parsedExperience.push({
          id: `exp-${i + 1}`,
          jobTitle: parts[0] || 'Role',
          company: parts[1] || 'Company',
          employmentType: 'Full-time',
          startDate: '',
          endDate: '',
          current: false,
          responsibilities: item,
          achievements: '',
          technologies: '',
        });
      }
    } else if (heading.includes('project')) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const parts = item.split(/[:|-]/).map((s) => s.trim()).filter(Boolean);
        parsedProjects.push({
          id: `proj-${i + 1}`,
          title: parts[0] || `Project ${i + 1}`,
          description: parts.slice(1).join(' - ') || item,
          problemSolved: '',
          technologies: '',
          contributions: '',
          githubUrl: '',
          liveUrl: '',
          results: '',
        });
      }
    } else if (heading.includes('certificat')) {
      items.forEach((item, idx) => {
        parsedCertifications.push({
          id: `cert-${idx + 1}`,
          name: item,
          issuer: '',
          date: '',
        });
      });
    } else if (heading.includes('achievement') || heading.includes('award') || heading.includes('honor')) {
      items.forEach((item, idx) => {
        parsedAchievements.push({
          id: `ach-${idx + 1}`,
          title: item,
          description: '',
        });
      });
    }
  }

  if (parsedEducation.length > 0) draft.education = parsedEducation;
  if (parsedExperience.length > 0) draft.experience = parsedExperience;
  if (parsedProjects.length > 0) draft.projects = parsedProjects;
  if (parsedCertifications.length > 0) draft.additional.certifications = parsedCertifications;
  if (parsedAchievements.length > 0) draft.additional.achievements = parsedAchievements;

  // Infer headline if blank
  if (!draft.personalInfo.headline) {
    if (draft.experience[0]?.jobTitle && draft.experience[0].jobTitle !== 'Role') {
      draft.personalInfo.headline = draft.experience[0].jobTitle;
    } else if (draft.education[0]?.degree) {
      draft.personalInfo.headline = `${draft.education[0].degree} Graduate`;
    }
  }

  return draft;
}
