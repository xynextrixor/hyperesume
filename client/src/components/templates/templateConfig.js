/**
 * Template configuration and customization presets for Phase 4
 */

export const TEMPLATES = {
  modern: {
    id: 'modern',
    name: 'Modern Tech',
    badge: 'Popular',
    description: 'Dynamic asymmetric layout with crisp accent banners, skill tags, and modern typography. Excellent for software engineers, data scientists, and freshers.',
    bestFor: 'Developers, Tech Freshers, Students',
    defaultAccent: '#059669', // Emerald
    defaultFont: 'sans',
    defaultSize: 'normal',
    supportsColor: true,
  },
  professional: {
    id: 'professional',
    name: 'Corporate Professional',
    badge: 'Executive',
    description: 'Traditional, structured formal layout with centered typography, right-aligned dates, and classic horizontal rules. Built for corporate and management roles.',
    bestFor: 'Corporate Jobs, Internships, Experienced Hires',
    defaultAccent: '#1e293b', // Slate
    defaultFont: 'serif',
    defaultSize: 'normal',
    supportsColor: true,
  },
  ats: {
    id: 'ats',
    name: 'Minimal ATS-Friendly',
    badge: 'High Compliance',
    description: 'Strict single-column monochrome design with standard section headings and zero graphics, tables, or icons. Guarantees 100% ATS parser readability.',
    bestFor: 'Online Job Portals, Automated Screeners, Enterprise ATS',
    defaultAccent: '#000000',
    defaultFont: 'sans',
    defaultSize: 'normal',
    supportsColor: false, // Locked to black & white for ATS compliance
  },
};

export const ACCENT_COLORS = [
  { id: 'emerald', name: 'Emerald Green', hex: '#059669', bgLight: '#ecfdf5', borderLight: '#a7f3d0' },
  { id: 'blue', name: 'Ocean Blue', hex: '#2563eb', bgLight: '#eff6ff', borderLight: '#bfdbfe' },
  { id: 'navy', name: 'Deep Navy', hex: '#1e3a8a', bgLight: '#f0f4fc', borderLight: '#c7d2fe' },
  { id: 'burgundy', name: 'Crimson Wine', hex: '#991b1b', bgLight: '#fef2f2', borderLight: '#fecaca' },
  { id: 'charcoal', name: 'Charcoal Slate', hex: '#334155', bgLight: '#f8fafc', borderLight: '#cbd5e1' },
];

export const FONT_OPTIONS = [
  {
    id: 'sans',
    name: 'Modern Sans',
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    category: 'sans-serif',
  },
  {
    id: 'serif',
    name: 'Classic Serif',
    fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
    category: 'serif',
  },
  {
    id: 'inter',
    name: 'Clean Neutral',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    category: 'sans-serif',
  },
];

export const FONT_SIZES = [
  { id: 'compact', name: 'Compact (Fit more content)', scaleClass: 'text-[11px] leading-[1.4]' },
  { id: 'normal', name: 'Standard (Recommended)', scaleClass: 'text-xs leading-relaxed' },
  { id: 'spacious', name: 'Spacious (Relaxed reading)', scaleClass: 'text-sm leading-relaxed' },
];

export const DEFAULT_CUSTOMIZATION = {
  templateId: 'modern',
  accentColor: '#059669',
  fontFamily: 'sans',
  fontSize: 'normal',
};

/**
 * Format dates consistently (e.g., '2024-05' -> 'May 2024')
 */
export function formatResumeDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return '';
  const trimmed = dateStr.trim();
  if (!trimmed) return '';

  // If already standard text like 'Present', return
  if (/^[a-zA-Z]+$/i.test(trimmed)) return trimmed;

  // Handle YYYY-MM
  const match = trimmed.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = match[1];
    const monthIdx = parseInt(match[2], 10) - 1;
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${months[monthIdx]} ${year}`;
    }
  }

  return trimmed;
}
