import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
  AlignmentType,
} from 'docx';

/**
 * Generates an editable Microsoft Word (.docx) document from resume data
 * @param {object} resume - Structured resume data (fullName, contact, professionalSummary, sections)
 * @returns {Promise<Buffer>}
 */
export async function generateResumeDocx(resume) {
  if (!resume || typeof resume !== 'object') {
    throw new Error('Invalid resume data provided for DOCX generation.');
  }

  const fullName = typeof resume.fullName === 'string' && resume.fullName.trim() ? resume.fullName.trim() : 'Resume';
  const professionalSummary = typeof resume.professionalSummary === 'string' ? resume.professionalSummary.trim() : '';
  const sections = Array.isArray(resume.sections) ? resume.sections : [];

  // Defensive contact resolution: handles null, undefined, or malformed contact objects
  const safeContact = resume.contact && typeof resume.contact === 'object' ? resume.contact : {};

  const children = [];

  // 1. Header: Full Name
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: fullName,
          bold: true,
          size: 36, // 18pt
          color: '111827',
          font: 'Calibri',
        }),
      ],
    })
  );

  // 2. Contact Information Line
  const contactPieces = [];
  if (typeof safeContact.email === 'string' && safeContact.email) contactPieces.push(safeContact.email);
  if (typeof safeContact.phone === 'string' && safeContact.phone) contactPieces.push(safeContact.phone);
  if (typeof safeContact.location === 'string' && safeContact.location) contactPieces.push(safeContact.location);
  if (typeof safeContact.linkedin === 'string' && safeContact.linkedin) {
    contactPieces.push(safeContact.linkedin.replace(/^https?:\/\/(www\.)?/i, ''));
  }
  if (typeof safeContact.github === 'string' && safeContact.github) {
    contactPieces.push(safeContact.github.replace(/^https?:\/\/(www\.)?/i, ''));
  }
  if (typeof safeContact.portfolio === 'string' && safeContact.portfolio) {
    contactPieces.push(safeContact.portfolio.replace(/^https?:\/\/(www\.)?/i, ''));
  }

  if (contactPieces.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 240 },
        children: [
          new TextRun({
            text: contactPieces.join('   •   '),
            size: 19, // 9.5pt
            color: '4B5563',
            font: 'Calibri',
          }),
        ],
      })
    );
  }

  // Helper function to create section headings with a bottom border
  const createSectionHeading = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: {
          color: 'D1D5DB',
          space: 4,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: String(title).toUpperCase(),
          bold: true,
          size: 22, // 11pt
          color: '111827',
          font: 'Calibri',
        }),
      ],
    });
  };

  // 3. Professional Summary
  if (professionalSummary) {
    children.push(createSectionHeading('Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 160, line: 276 },
        children: [
          new TextRun({
            text: professionalSummary,
            size: 20, // 10pt
            color: '1F2937',
            font: 'Calibri',
          }),
        ],
      })
    );
  }

  // 4. Custom Sections (Skills, Experience, Projects, Education, etc.)
  for (const sec of sections) {
    if (!sec || !sec.heading || !Array.isArray(sec.items) || sec.items.length === 0) {
      continue;
    }

    children.push(createSectionHeading(sec.heading));

    for (const item of sec.items) {
      if (!item) continue;
      const trimmed = String(item).trim();
      if (trimmed === '') continue;

      // Check if item looks like a sub-heading or role line
      const isHeaderLine =
        (trimmed.includes('|') || trimmed.includes('—') || trimmed.includes(' - ')) &&
        trimmed.length < 90 &&
        !trimmed.startsWith('•') &&
        !trimmed.startsWith('-');

      if (isHeaderLine) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({
                text: trimmed,
                bold: true,
                size: 20, // 10pt
                color: '111827',
                font: 'Calibri',
              }),
            ],
          })
        );
      } else {
        const cleanText = trimmed.replace(/^[•\-*]\s*/, '');
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 260 },
            children: [
              new TextRun({
                text: cleanText,
                size: 20, // 10pt
                color: '374151',
                font: 'Calibri',
              }),
            ],
          })
        );
      }
    }
  }

  // Create docx Document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
