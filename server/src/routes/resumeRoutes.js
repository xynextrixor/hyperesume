import express from 'express';
import multer from 'multer';
import {
  analyzeResume,
  fixResume,
  exportResumePdf,
  exportResumeDocx,
  handleBuilderAssist,
  exportBuilderResumePdf,
} from '../controllers/resumeController.js';

const router = express.Router();

// 5 MB max file size limit
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Allowed MIME types and extensions
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/octet-stream',
]);

const ALLOWED_EXTENSIONS = new Set(['pdf', 'docx']);

// Ephemeral memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()?.toLowerCase();

    const isExtensionValid = ext && ALLOWED_EXTENSIONS.has(ext);
    const isMimeValid = ALLOWED_MIME_TYPES.has(file.mimetype);

    if (isExtensionValid && isMimeValid) {
      cb(null, true);
    } else {
      const err = new Error(
        `Invalid file type "${file.originalname}". Only PDF (.pdf) and Word documents (.docx) are supported.`
      );
      err.statusCode = 400;
      cb(err);
    }
  },
});

// Route: Analyze uploaded resume file
router.post(
  '/analyze',
  (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            error: 'File exceeds the 5MB size limit. Please upload a smaller resume.',
          });
        }
        return res.status(400).json({
          success: false,
          error: `Upload error: ${err.message}`,
        });
      }

      if (err) {
        return res.status(err.statusCode || 400).json({
          success: false,
          error: err.message,
        });
      }

      next();
    });
  },
  analyzeResume
);

// Route: Rewrite and fix resume using Gemini AI
router.post('/fix', fixResume);

// Route: AI assistance for Resume Builder (polishing, bullet rewrites, interview readiness)
router.post('/builder-assist', handleBuilderAssist);

// Route: Export builder resume as styled A4 PDF (Modern, Professional, ATS)
router.post('/builder/export/pdf', exportBuilderResumePdf);

// Route: Export resume as PDF
router.post('/export/pdf', exportResumePdf);

// Route: Export resume as DOCX
router.post('/export/docx', exportResumeDocx);

export default router;
