import fs from 'fs';
import { extractTextFromFile } from '../utils/fileExtractor.js';
import {
  analyzeResumeWithGemini,
  fixResumeWithGemini,
  builderAssistWithGemini,
} from '../services/geminiService.js';
import { isGeminiConfigured } from '../config/gemini.js';
import { generateResumePdf, generateBuilderResumePdf } from '../utils/pdfGenerator.js';
import { generateResumeDocx } from '../utils/docxGenerator.js';

const MAX_RESUME_TEXT_CHARS = 50000;

/**
 * Helper to safely sanitize filenames for export
 */
function sanitizeFilename(name, fallback = 'Resume') {
  if (!name || typeof name !== 'string') return fallback;
  const cleaned = name.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

/**
 * Controller to handle resume upload, text extraction, and Gemini AI analysis
 */
export async function analyzeResume(req, res, next) {
  let tempFilePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No resume file uploaded. Please upload a PDF (.pdf) or Word document (.docx).',
      });
    }

    tempFilePath = req.file.path || null;

    if (!req.file.size || req.file.size === 0 || (req.file.buffer && req.file.buffer.length === 0)) {
      return res.status(400).json({
        success: false,
        error: 'The uploaded file is empty (0 bytes). Please upload a valid resume.',
      });
    }

    if (!isGeminiConfigured()) {
      return res.status(503).json({
        success: false,
        error:
          'Gemini API key is not configured. Please add a valid GEMINI_API_KEY in the server/.env file to enable AI analysis.',
      });
    }

    const { buffer, mimetype, originalname, size } = req.file;

    console.log(
      `[Resume Analysis Request] File: "${originalname}", Size: ${(size / 1024).toFixed(1)} KB, MIME: ${mimetype}`
    );

    const extractedText = await extractTextFromFile(buffer, mimetype, originalname);
    const analysis = await analyzeResumeWithGemini(extractedText);

    return res.status(200).json({
      success: true,
      data: {
        fileName: originalname,
        fileSize: size,
        analyzedAt: new Date().toISOString(),
        extractedText, // Retained so Phase 3 fix flow can reuse it without re-uploading
        ...analysis,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'An unexpected error occurred during resume analysis.';

    console.error(`[Resume Analysis Error - ${statusCode}]:`, errorMessage);

    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  } finally {
    if (tempFilePath) {
      try {
        if (fs.existsSync(tempFilePath)) {
          await fs.promises.unlink(tempFilePath);
        }
      } catch (cleanupErr) {
        console.error('Error cleaning up temporary file:', cleanupErr.message);
      }
    }

    if (req.file && req.file.buffer) {
      req.file.buffer = null;
    }
  }
}

/**
 * Controller to fix and rewrite a resume using original text and analysis feedback
 */
export async function fixResume(req, res, next) {
  try {
    const { resumeText, analysisFeedback } = req.body || {};

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        error: 'Original resume text (at least 50 characters) is required to fix the resume.',
      });
    }

    if (resumeText.length > MAX_RESUME_TEXT_CHARS) {
      return res.status(400).json({
        success: false,
        error: 'Resume text exceeds maximum allowed size (50,000 characters).',
      });
    }

    if (!isGeminiConfigured()) {
      return res.status(503).json({
        success: false,
        error:
          'Gemini API key is not configured. Please add a valid GEMINI_API_KEY in server/.env to enable resume fixing.',
      });
    }

    console.log(`[Resume Fix Request] Text length: ${resumeText.length} chars`);

    const fixedResume = await fixResumeWithGemini(resumeText, analysisFeedback);

    return res.status(200).json({
      success: true,
      data: fixedResume,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'An unexpected error occurred while rewriting the resume.';

    console.error(`[Resume Fix Error - ${statusCode}]:`, errorMessage);

    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  }
}

/**
 * Controller to export resume as a printable PDF
 */
export async function exportResumePdf(req, res, next) {
  try {
    const { resume } = req.body || {};

    if (!resume || typeof resume !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Valid resume object is required for PDF export.',
      });
    }

    const pdfBuffer = await generateResumePdf(resume);
    const filename = `${sanitizeFilename(resume.fullName, 'Resume')}_Improved.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.end(pdfBuffer);
  } catch (error) {
    console.error('[PDF Export Error]:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate PDF document. Please verify resume content and try again.',
    });
  }
}

/**
 * Controller to export resume as an editable Word document (.docx)
 */
export async function exportResumeDocx(req, res, next) {
  try {
    const { resume } = req.body || {};

    if (!resume || typeof resume !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Valid resume object is required for DOCX export.',
      });
    }

    const docxBuffer = await generateResumeDocx(resume);
    const filename = `${sanitizeFilename(resume.fullName, 'Resume')}_Improved.docx`;

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', docxBuffer.length);

    return res.end(docxBuffer);
  } catch (error) {
    console.error('[DOCX Export Error]:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate Word document. Please verify resume content and try again.',
    });
  }
}

/**
 * Controller to export Resume Builder content as an A4 PDF document
 */
export async function exportBuilderResumePdf(req, res, next) {
  try {
    const { resumeData, templateId, customization } = req.body || {};

    if (!resumeData || typeof resumeData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Valid resumeData object is required for builder PDF export.',
      });
    }

    const pdfBuffer = await generateBuilderResumePdf({
      resumeData,
      templateId: templateId || 'modern',
      customization: customization || {},
    });

    const candidateName = resumeData.personalInfo?.fullName || 'Resume';
    const filename = `${sanitizeFilename(candidateName, 'Resume')}_Resume.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.end(pdfBuffer);
  } catch (error) {
    console.error('[Builder PDF Export Error]:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate PDF document. Please verify resume content and try again.',
    });
  }
}

/**
 * Controller to provide AI writing assistance and interview readiness for Resume Builder
 */
export async function handleBuilderAssist(req, res, next) {
  try {
    const { action, data, targetJob } = req.body || {};

    const allowedActions = new Set([
      'improve-summary',
      'rewrite-bullet',
      'enhance-project',
      'interview-prep',
    ]);

    if (!action || !allowedActions.has(action)) {
      return res.status(400).json({
        success: false,
        error: `Invalid or missing assist action. Supported actions: ${Array.from(allowedActions).join(', ')}.`,
      });
    }

    const payloadString = JSON.stringify(req.body || {});
    if (payloadString.length > MAX_RESUME_TEXT_CHARS) {
      return res.status(400).json({
        success: false,
        error: 'Payload exceeds maximum allowed size (50,000 characters).',
      });
    }

    if (!isGeminiConfigured()) {
      return res.status(503).json({
        success: false,
        error:
          'Gemini API key is not configured. Please add a valid GEMINI_API_KEY in server/.env to enable AI builder assistance.',
      });
    }

    console.log(`[Builder Assist Request] Action: "${action}"`);

    const result = await builderAssistWithGemini({ action, data, targetJob });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'An error occurred during AI assistance.';

    console.error(`[Builder Assist Error - ${statusCode}]:`, errorMessage);

    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  }
}
