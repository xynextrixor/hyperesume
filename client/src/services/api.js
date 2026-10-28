/**
 * API service for ResumeAI backend communications
 */

const API_BASE_URL = '/api';

/**
 * Upload resume file for analysis
 * @param {File} file - Resume file (PDF or DOCX)
 * @returns {Promise<object>} Analysis result
 */
export async function analyzeResumeApi(file) {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.error ||
        (response.status === 503
          ? 'Gemini API is not configured on the backend. Please check server/.env file.'
          : `Request failed with status ${response.status}`);
      throw new Error(errorMessage);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'Failed to analyze resume. Please try again.');
    }

    return data.data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to the backend server. Please make sure the backend is running on http://localhost:5000.'
      );
    }
    throw error;
  }
}

/**
 * Fix and rewrite resume using Gemini AI
 * @param {string} resumeText - Original resume text
 * @param {object} [analysisFeedback] - Analysis results to guide the rewrite
 * @returns {Promise<object>} Fixed structured resume
 */
export async function fixResumeApi(resumeText, analysisFeedback = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/fix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeText, analysisFeedback }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.error ||
        (response.status === 503
          ? 'Gemini API is not configured. Please add GEMINI_API_KEY to server/.env'
          : `Request failed with status ${response.status}`);
      throw new Error(errorMessage);
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'Failed to rewrite resume. Please try again.');
    }

    return data.data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to backend server. Please verify backend is running on http://localhost:5000.'
      );
    }
    throw error;
  }
}

/**
 * Trigger download of generated PDF
 * @param {object} resume - Edited resume data
 */
export async function downloadResumePdfApi(resume) {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/export/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume }),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => null);
      throw new Error(errorJson?.error || 'Failed to export PDF.');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (resume.fullName || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_');
    a.download = `${safeName}_Improved.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error('PDF Download Error:', err);
    throw err;
  }
}

/**
 * Trigger download of generated DOCX
 * @param {object} resume - Edited resume data
 */
export async function downloadResumeDocxApi(resume) {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/export/docx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume }),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => null);
      throw new Error(errorJson?.error || 'Failed to export DOCX.');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = (resume.fullName || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '_');
    a.download = `${safeName}_Improved.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error('DOCX Download Error:', err);
    throw err;
  }
}

/**
 * Request AI writing assistance or interview readiness for Resume Builder
 * @param {object} params
 * @param {'improve-summary'|'rewrite-bullet'|'enhance-project'|'interview-prep'} params.action
 * @param {object} params.data
 * @param {object} [params.targetJob]
 * @returns {Promise<object>}
 */
export async function builderAssistApi({ action, data, targetJob }) {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/builder-assist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, data, targetJob }),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        responseData?.error ||
        (response.status === 503
          ? 'Gemini API is not configured. Please add GEMINI_API_KEY in server/.env'
          : `AI assistant request failed with status ${response.status}`);
      throw new Error(errorMessage);
    }

    if (!responseData || !responseData.success) {
      throw new Error(responseData?.error || 'AI assistance failed. Please try again.');
    }

    return responseData.data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to backend server. Please verify backend is running on http://localhost:5000.'
      );
    }
    throw error;
  }
}

/**
 * Download styled builder resume as PDF from backend generator
 * @param {object} params
 * @param {object} params.resumeData
 * @param {'modern'|'professional'|'ats'} [params.templateId]
 * @param {object} [params.customization]
 */
export async function downloadBuilderPdfApi({ resumeData, templateId = 'modern', customization = {} }) {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/builder/export/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeData, templateId, customization }),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => null);
      throw new Error(errorJson?.error || 'Failed to export builder PDF.');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const rawName = resumeData?.personalInfo?.fullName || 'Resume';
    const safeName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').trim();
    a.download = `${safeName || 'Resume'}_Resume.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error('Builder PDF Download Error:', err);
    throw err;
  }
}

/**
 * Health check endpoint
 * @returns {Promise<object>} Health status
 */
export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      return { status: 'down', message: 'Backend unreachable' };
    }
    return await response.json();
  } catch (err) {
    return { status: 'down', message: err.message };
  }
}
