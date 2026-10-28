import assert from 'assert';
import http from 'http';
import app from '../src/app.js';
import {
  normalizeAndValidateAnalysis,
  normalizeAndValidateFixedResume,
} from '../src/services/geminiService.js';
import { extractTextFromFile } from '../src/utils/fileExtractor.js';
import { isGeminiConfigured, getGeminiModel } from '../src/config/gemini.js';
import { createSampleDocxBuffer, createSamplePdfBuffer } from './createFixtures.js';
import { generateResumePdf, generateBuilderResumePdf } from '../src/utils/pdfGenerator.js';
import { generateResumeDocx } from '../src/utils/docxGenerator.js';

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result
        .then(() => {
          console.log(`  ✓ ${name}`);
          passed++;
        })
        .catch((err) => {
          console.error(`  ✗ ${name}:`, err.message);
          failed++;
        });
    }
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
    failed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting ResumeAI Phase 3 Automated Test Suite');
  console.log('====================================================');

  // Group 1: Configuration & Health
  console.log('\n[1] Configuration & Health Tests:');
  it('Should report default or configured Gemini model', () => {
    const model = getGeminiModel();
    assert.ok(model && typeof model === 'string');
    assert.strictEqual(model, process.env.GEMINI_MODEL || 'gemini-2.5-flash');
  });

  it('Should safely check isGeminiConfigured without throwing', () => {
    const configured = isGeminiConfigured();
    assert.strictEqual(typeof configured, 'boolean');
  });

  // Group 2: Schema Normalization & Malformed Output Handling
  console.log('\n[2] Schema Normalization & Resilience Tests:');
  it('Should validate and normalize a standard valid AI analysis response', () => {
    const raw = {
      overallScore: 84,
      summary: 'Candidate demonstrates strong React and Node.js capabilities.',
      strengths: [{ title: 'Full Stack Skills', description: 'Strong grasp of frontend and backend technologies.' }],
      weaknesses: [{ title: 'Metrics Missing', description: 'No numbers in bullet points.', suggestion: 'Add percentages and impact figures.' }],
      sections: [{ name: 'Experience', score: 80, feedback: 'Good descriptions.' }],
      atsFeedback: ['Avoid two-column tables for better parser compatibility.'],
      improvements: ['Add quantifiable achievements to recent project roles.'],
    };

    const normalized = normalizeAndValidateAnalysis(raw);
    assert.strictEqual(normalized.overallScore, 84);
    assert.strictEqual(normalized.strengths.length, 1);
    assert.strictEqual(normalized.weaknesses.length, 1);
    assert.strictEqual(normalized.sections.length, 1);
    assert.strictEqual(normalized.atsFeedback.length, 1);
    assert.strictEqual(normalized.improvements.length, 1);
  });

  it('Should clamp out-of-range overallScore (e.g. 150 to 100, -20 to 0)', () => {
    const high = normalizeAndValidateAnalysis({ overallScore: 150 });
    assert.strictEqual(high.overallScore, 100);

    const low = normalizeAndValidateAnalysis({ overallScore: -20 });
    assert.strictEqual(low.overallScore, 0);
  });

  it('Should validate and normalize a structured fixed resume', () => {
    const sampleFixed = {
      fullName: 'Taylor Swift',
      professionalSummary: 'Experienced engineer with proven background in building scalable web apps.',
      contact: {
        email: 'taylor@example.com',
        phone: '123-456-7890',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/taylor',
        github: '',
        portfolio: '',
      },
      sections: [
        {
          heading: 'Technical Skills',
          items: ['React', 'Node.js', 'Express', 'PostgreSQL'],
        },
        {
          heading: 'Experience',
          items: ['Engineered scalable microservices handling 100k daily users.'],
        },
      ],
      missingInformation: ['Consider adding cloud certifications.'],
      changeSummary: ['Strengthened action verbs in experience section.'],
    };

    const normalized = normalizeAndValidateFixedResume(sampleFixed);
    assert.strictEqual(normalized.fullName, 'Taylor Swift');
    assert.strictEqual(normalized.contact.email, 'taylor@example.com');
    assert.strictEqual(normalized.sections.length, 2);
    assert.strictEqual(normalized.missingInformation.length, 1);
    assert.strictEqual(normalized.changeSummary.length, 1);
  });

  it('Should safely normalize missing or malformed fixed resume fields without crashing', () => {
    const malformed = {
      fullName: null,
      professionalSummary: undefined,
      contact: 'invalid',
      sections: null,
      missingInformation: null,
      changeSummary: null,
    };

    const normalized = normalizeAndValidateFixedResume(malformed);
    assert.strictEqual(normalized.fullName, 'Candidate Name');
    assert.strictEqual(typeof normalized.professionalSummary, 'string');
    assert.strictEqual(typeof normalized.contact, 'object');
    assert.ok(Array.isArray(normalized.sections));
    assert.ok(Array.isArray(normalized.missingInformation));
    assert.ok(Array.isArray(normalized.changeSummary));
  });

  // Group 3: File Extraction & Content Security Tests
  console.log('\n[3] File Extraction & Content Security Tests:');
  await it('Should extract readable text from a valid DOCX document', async () => {
    const docxBuffer = await createSampleDocxBuffer();
    const text = await extractTextFromFile(
      docxBuffer,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'alex_morgan.docx'
    );
    assert.ok(text.includes('Alex Morgan'));
    assert.ok(text.includes('Full Stack Engineer'));
    assert.ok(text.includes('React'));
  });

  await it('Should extract readable text from a valid PDF document', async () => {
    const pdfBuffer = await createSamplePdfBuffer();
    const text = await extractTextFromFile(pdfBuffer, 'application/pdf', 'jordan_lee.pdf');
    assert.ok(text.includes('Jordan Lee'));
    assert.ok(text.includes('Software Engineer'));
    assert.ok(text.includes('CloudNet Systems'));
  });

  await it('Should reject empty 0-byte buffer with 400 status', async () => {
    try {
      await extractTextFromFile(Buffer.alloc(0), 'application/pdf', 'resume.pdf');
      assert.fail('Should have thrown an error');
    } catch (err) {
      assert.strictEqual(err.statusCode, 400);
      assert.ok(err.message.includes('empty'));
    }
  });

  await it('Should reject unsupported file formats (.txt, .exe) with 400 status', async () => {
    try {
      await extractTextFromFile(Buffer.from('Hello text file'), 'text/plain', 'resume.txt');
      assert.fail('Should have thrown an error');
    } catch (err) {
      assert.strictEqual(err.statusCode, 400);
      assert.ok(err.message.includes('Unsupported file format'));
    }
  });

  await it('Should reject corrupted PDF documents with 422 status', async () => {
    const corruptedBuffer = Buffer.from('%PDF-1.4 Corrupted dummy binary content that cannot be parsed');
    try {
      await extractTextFromFile(corruptedBuffer, 'application/pdf', 'corrupted.pdf');
      assert.fail('Should have thrown an error');
    } catch (err) {
      assert.strictEqual(err.statusCode, 422);
      assert.ok(err.message.includes('Failed to parse PDF document'));
    }
  });

  // Group 4: Document Generation (PDF & DOCX Exports)
  console.log('\n[4] Document Generation & Export Tests:');
  const sampleResumeData = {
    fullName: 'Jane Doe',
    contact: {
      email: 'jane@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/janedoe',
      github: 'github.com/janedoe',
      portfolio: 'janedoe.dev',
    },
    professionalSummary:
      'Accomplished Software Engineer with 5+ years of experience designing scalable distributed web architectures and user-centric interfaces.',
    sections: [
      {
        heading: 'Technical Skills',
        items: ['Languages: JavaScript, TypeScript, Python', 'Frameworks: React, Node.js, Express', 'Databases: PostgreSQL, MongoDB'],
      },
      {
        heading: 'Professional Experience',
        items: [
          'Senior Developer | Acme Corp | 2021 - Present',
          'Spearheaded migration of legacy monolith to microservices architecture, decreasing deployment downtime by 40%.',
          'Mentored junior software engineers and established automated code review workflows.',
        ],
      },
      {
        heading: 'Education',
        items: ['Bachelor of Science in Computer Science, University of California, Berkeley, 2020'],
      },
    ],
  };

  await it('Should generate a valid, multi-page capable PDF buffer', async () => {
    const pdfBuffer = await generateResumePdf(sampleResumeData);
    assert.ok(Buffer.isBuffer(pdfBuffer));
    assert.ok(pdfBuffer.length > 500);
    // PDF files start with %PDF magic bytes
    assert.strictEqual(pdfBuffer.subarray(0, 4).toString(), '%PDF');
  });

  await it('Should generate a valid PDF buffer even when contact is null or omitted', async () => {
    const pdfBuffer = await generateResumePdf({ fullName: 'Defensive Test', contact: null });
    assert.ok(Buffer.isBuffer(pdfBuffer));
    assert.strictEqual(pdfBuffer.subarray(0, 4).toString(), '%PDF');
  });

  await it('Should generate a valid Microsoft Word (.docx) buffer', async () => {
    const docxBuffer = await generateResumeDocx(sampleResumeData);
    assert.ok(Buffer.isBuffer(docxBuffer));
    assert.ok(docxBuffer.length > 500);
    // DOCX files are zip archives starting with PK magic bytes
    assert.strictEqual(docxBuffer.subarray(0, 2).toString(), 'PK');
  });

  await it('Should generate a valid DOCX buffer even when contact is null or omitted', async () => {
    const docxBuffer = await generateResumeDocx({ fullName: 'Defensive Test', contact: null });
    assert.ok(Buffer.isBuffer(docxBuffer));
    assert.strictEqual(docxBuffer.subarray(0, 2).toString(), 'PK');
  });

  const sampleBuilderData = {
    personalInfo: {
      fullName: 'Aarav Sharma',
      headline: 'Full-Stack Developer',
      email: 'aarav@example.com',
      phone: '+1 555-0199',
      location: 'Boston, MA',
      summary: 'Passionate software engineering student with expertise in React and Node.js.',
    },
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'Boston University',
        startDate: '2023-09',
        endDate: '2027-05',
        current: true,
        grade: '3.9 GPA',
        coursework: 'Data Structures, Operating Systems',
      },
    ],
    experience: [
      {
        jobTitle: 'Software Engineering Intern',
        company: 'TechCorp Solutions',
        startDate: '2024-06',
        endDate: '2024-08',
        current: false,
        responsibilities: 'Built scalable API endpoints and React dashboards.',
        achievements: 'Decreased response latency by 35%.',
      },
    ],
    projects: [
      {
        title: 'CampusRide Platform',
        technologies: 'React, Node.js, MongoDB',
        problemSolved: 'Carpooling for college commuters.',
        description: 'Web application matching students sharing travel routes.',
        contributions: 'Engineered search algorithms and responsive UI.',
        results: '250+ active campus users.',
      },
    ],
    skills: {
      programmingLanguages: 'JavaScript, TypeScript, Python',
      frameworks: 'React, Node.js, Tailwind CSS',
      databasesTools: 'PostgreSQL, Docker, Git',
      softSkills: 'Team Collaboration, Problem Solving',
    },
    additional: {
      certifications: [{ name: 'AWS Cloud Practitioner', issuer: 'AWS', issueDate: '2024' }],
      languages: [{ language: 'English', proficiency: 'Fluent' }],
    },
  };

  await it('Should generate a valid Modern Template A4 PDF buffer from builder data', async () => {
    const pdf = await generateBuilderResumePdf({
      resumeData: sampleBuilderData,
      templateId: 'modern',
      customization: { accentColor: '#059669' },
    });
    assert.ok(Buffer.isBuffer(pdf));
    assert.ok(pdf.length > 500);
    assert.strictEqual(pdf.subarray(0, 4).toString(), '%PDF');
  });

  await it('Should generate a valid Professional Template A4 PDF buffer from builder data', async () => {
    const pdf = await generateBuilderResumePdf({
      resumeData: sampleBuilderData,
      templateId: 'professional',
      customization: { accentColor: '#1e293b' },
    });
    assert.ok(Buffer.isBuffer(pdf));
    assert.ok(pdf.length > 500);
    assert.strictEqual(pdf.subarray(0, 4).toString(), '%PDF');
  });

  await it('Should generate a valid Minimal ATS Template A4 PDF buffer from builder data', async () => {
    const pdf = await generateBuilderResumePdf({
      resumeData: sampleBuilderData,
      templateId: 'ats',
    });
    assert.ok(Buffer.isBuffer(pdf));
    assert.ok(pdf.length > 500);
    assert.strictEqual(pdf.subarray(0, 4).toString(), '%PDF');
  });

  await it('Should safely generate builder PDF even when optional sections are empty', async () => {
    const minimalData = { personalInfo: { fullName: 'Minimalist Dev' } };
    const pdf = await generateBuilderResumePdf({ resumeData: minimalData, templateId: 'ats' });
    assert.ok(Buffer.isBuffer(pdf));
    assert.strictEqual(pdf.subarray(0, 4).toString(), '%PDF');
  });

  // Group 5: HTTP Endpoints Tests (with live server on random test port)
  console.log('\n[5] HTTP Endpoints & Controller Security Tests:');
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await it('GET /api/health should return 200 with status ok and geminiModel', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.status, 'ok');
      assert.ok(data.geminiModel);
      assert.strictEqual(typeof data.geminiConfigured, 'boolean');
    });

    await it('POST /api/resume/analyze without multipart file should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/analyze`, { method: 'POST' });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('No resume file uploaded'));
    });

    await it('POST /api/resume/analyze with .txt file should return 400 Bad Request', async () => {
      const formData = new FormData();
      formData.append('resume', new Blob(['Some text resume content'], { type: 'text/plain' }), 'resume.txt');
      const res = await fetch(`${baseUrl}/api/resume/analyze`, { method: 'POST', body: formData });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Only PDF'));
    });

    await it('POST /api/resume/analyze with empty PDF should return 400 Bad Request', async () => {
      const formData = new FormData();
      formData.append('resume', new Blob([], { type: 'application/pdf' }), 'empty.pdf');
      const res = await fetch(`${baseUrl}/api/resume/analyze`, { method: 'POST', body: formData });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.toLowerCase().includes('empty'));
    });

    await it('POST /api/resume/fix without resumeText should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/fix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Original resume text'));
    });

    await it('POST /api/resume/fix with short text (<50 chars) should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/fix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: 'Too short text' }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
    });

    await it('POST /api/resume/fix with oversized text (>50,000 chars) should return 400 Bad Request', async () => {
      const hugeText = 'A'.repeat(50005);
      const res = await fetch(`${baseUrl}/api/resume/fix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: hugeText }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('exceeds maximum allowed size'));
    });

    await it('POST /api/resume/export/docx without resume body should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/export/docx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 400);
    });

    await it('POST /api/resume/export/pdf with valid resume should return 200 with PDF content-type', async () => {
      const res = await fetch(`${baseUrl}/api/resume/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: sampleResumeData }),
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'application/pdf');
      assert.ok(res.headers.get('content-disposition')?.includes('.pdf'));
      const buffer = await res.arrayBuffer();
      assert.ok(buffer.byteLength > 500);
    });

    await it('POST /api/resume/export/docx with valid resume should return 200 with Word content-type', async () => {
      const res = await fetch(`${baseUrl}/api/resume/export/docx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: sampleResumeData }),
      });
      assert.strictEqual(res.status, 200);
      assert.ok(res.headers.get('content-type')?.includes('wordprocessingml'));
      assert.ok(res.headers.get('content-disposition')?.includes('.docx'));
      const buffer = await res.arrayBuffer();
      assert.ok(buffer.byteLength > 500);
    });

    await it('POST /api/resume/export/pdf without resume body should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 400);
    });

    await it('POST /api/resume/builder-assist without action should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/builder-assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { bullet: 'Led team' } }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Invalid or missing assist action'));
    });

    await it('POST /api/resume/builder-assist with invalid action should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/builder-assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'hack-resume', data: {} }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Invalid or missing assist action'));
    });

    await it('POST /api/resume/builder-assist with oversized body should return 400 Bad Request', async () => {
      const oversizedString = 'x'.repeat(60000);
      const res = await fetch(`${baseUrl}/api/resume/builder-assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'improve-summary', data: { currentSummary: oversizedString } }),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Payload exceeds maximum'));
    });

    await it('POST /api/resume/builder/export/pdf without body should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/resume/builder/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Valid resumeData object is required'));
    });

    await it('POST /api/resume/builder/export/pdf with Modern template should return 200 with PDF content-type', async () => {
      const res = await fetch(`${baseUrl}/api/resume/builder/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: sampleBuilderData,
          templateId: 'modern',
          customization: { accentColor: '#059669' },
        }),
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'application/pdf');
      assert.ok(res.headers.get('content-disposition')?.includes('Aarav_Sharma_Resume.pdf'));
      const buffer = await res.arrayBuffer();
      assert.ok(buffer.byteLength > 500);
    });

    await it('POST /api/resume/builder/export/pdf with Professional template should return 200 with PDF content-type', async () => {
      const res = await fetch(`${baseUrl}/api/resume/builder/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: sampleBuilderData,
          templateId: 'professional',
        }),
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'application/pdf');
      const buffer = await res.arrayBuffer();
      assert.ok(buffer.byteLength > 500);
    });

    await it('POST /api/resume/builder/export/pdf with Minimal ATS template should return 200 with PDF content-type', async () => {
      const res = await fetch(`${baseUrl}/api/resume/builder/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: sampleBuilderData,
          templateId: 'ats',
        }),
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'application/pdf');
      const buffer = await res.arrayBuffer();
      assert.ok(buffer.byteLength > 500);
    });

    await it('GET /api/nonexistent should return 404 Route Not Found', async () => {
      const res = await fetch(`${baseUrl}/api/nonexistent`);
      assert.strictEqual(res.status, 404);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Route not found'));
    });
  } finally {
    server.close();
  }

  console.log('\n====================================================');
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
