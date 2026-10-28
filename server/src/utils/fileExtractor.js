import { extractText as extractPdfText } from 'unpdf';
import mammoth from 'mammoth';

const MIN_READABLE_TEXT_LENGTH = 80;
const MAX_TEXT_LENGTH = 50000; // Safeguard against abnormally huge files

/**
 * Sanitizes extracted plain text from resumes
 * @param {string} text
 * @returns {string} Cleaned text
 */
function sanitizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    // Remove null bytes and non-printable control characters except \r, \n, \t
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize excessive whitespace
    .replace(/[ \t]+/g, ' ')
    // Normalize excessive newlines
    .replace(/(\r\n|\n|\r){3,}/g, '\n\n')
    .trim();
}

/**
 * Extract plain text from an uploaded resume buffer (PDF or DOCX).
 * @param {Buffer} buffer - File buffer
 * @param {string} mimetype - MIME type of the uploaded file
 * @param {string} originalname - Original file name
 * @returns {Promise<string>} Extracted plain text
 */
export async function extractTextFromFile(buffer, mimetype, originalname = '') {
  if (!buffer || buffer.length === 0) {
    const err = new Error('The uploaded file is empty (0 bytes). Please upload a valid resume.');
    err.statusCode = 400;
    throw err;
  }

  const extension = originalname.split('.').pop()?.toLowerCase() || '';
  let rawText = '';

  // Handle PDF documents
  if (mimetype === 'application/pdf' || extension === 'pdf') {
    try {
      const uint8 = new Uint8Array(buffer);
      const { text } = await extractPdfText(uint8);
      rawText = Array.isArray(text) ? text.join('\n\n') : text || '';
    } catch (parseError) {
      console.error('PDF parsing error:', parseError.message);
      const err = new Error('Failed to parse PDF document. The file may be password protected, corrupted, or invalid.');
      err.statusCode = 422;
      throw err;
    }
  }
  // Handle DOCX documents (and legacy doc if mammoth can parse)
  else if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword' ||
    extension === 'docx' ||
    extension === 'doc'
  ) {
    try {
      // mammoth.extractRawText extracts raw document text and ignores macros/embedded scripts
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value || '';
    } catch (parseError) {
      console.error('DOCX parsing error:', parseError.message);
      const err = new Error('Failed to parse Word document. The file may be corrupted, encrypted, or in an unsupported format.');
      err.statusCode = 422;
      throw err;
    }
  } else {
    const err = new Error('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
    err.statusCode = 400;
    throw err;
  }

  const cleanedText = sanitizeText(rawText);

  // Validate that meaningful text was extracted
  if (cleanedText.length < MIN_READABLE_TEXT_LENGTH) {
    const err = new Error(
      'Unable to extract readable text from your document. If your resume is an image scan or photocopy, please provide a text-searchable PDF or Word (.docx) document.'
    );
    err.statusCode = 422;
    throw err;
  }

  // Cap max text length to avoid token explosion
  if (cleanedText.length > MAX_TEXT_LENGTH) {
    return cleanedText.substring(0, MAX_TEXT_LENGTH);
  }

  return cleanedText;
}
