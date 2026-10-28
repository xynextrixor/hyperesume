# ResumeAI - AI-Powered Resume Analyzer & Optimizer

A modern, full-stack AI Resume Analyzer and Optimizer web application built as an academic college project. Powered by the **Google Gemini API**, the application enables users to upload resumes in **PDF** or **Word (.docx)** format, receive deep analytical feedback regarding recruiter readiness and ATS readability, automatically generate professionally rewritten versions, edit them in an interactive in-browser editor, and export the final result as a printable **PDF** or an editable **DOCX** document.

> 📖 **Looking for a user guide?** Read the comprehensive [**Step-by-Step User Guide (HOW_TO_USE.md)**](./HOW_TO_USE.md) for complete visual walkthroughs, template guides, and interview prep tutorials.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
5. [Prerequisites](#-prerequisites)
6. [Installation & Setup](#-installation--setup)
7. [Environment Variables](#-environment-variables)
8. [Running the Application](#-running-the-application)
9. [Step-by-Step User Workflow](#-step-by-step-user-workflow)
10. [Automated Testing](#-automated-testing)
11. [Resume Builder & Interview Readiness (Phase 3)](#-resume-builder--interview-readiness-phase-3)
12. [Templates, Live Preview & PDF Download (Phase 4)](#-templates-live-preview--pdf-download-phase-4)
13. [Security & Privacy Features](#-security--privacy-features)
14. [Troubleshooting & Common Errors](#-troubleshooting--common-errors)
15. [Academic College Demonstration Notes & Limitations](#-academic-college-demonstration-notes--limitations)

---

## 🎯 Project Overview

In today's competitive job market, candidates often struggle with passive bullet points, missing keywords, and poor document layout that causes resumes to fail initial screening. 

**ResumeAI** solves this challenge by serving as an automated resume critique and optimization assistant:
- **Instant Audit**: Extracts text from PDF and DOCX files without saving files to disk.
- **Deep Recruiter Scoring**: Grades the resume out of 100 with section-by-section breakdown (Summary, Experience, Skills, Education, Formatting & ATS, Grammar).
- **Action-Oriented AI Rewriting**: Rewrites weak bullet points using strong action verbs (*Architected*, *Spearheaded*, *Streamlined*) while strictly preserving the candidate's real, verified history (no hallucinations or fabricated metrics).
- **Interactive Editing & Export**: Allows the candidate to review, fine-tune contact details and content, and download the improved resume as a printable PDF or an editable DOCX file.

---

## ✨ Key Features

- **Multi-Format Document Support**: Seamless drag-and-drop text extraction for `.pdf` (via `unpdf`) and `.docx` (via `mammoth`).
- **Real-Time Backend Status**: Live health ping indicator in the navigation bar checking backend connectivity and Gemini configuration status.
- **AI Recruiter Scorecard**: Visual score gauge with status benchmarks (*Strong & Competitive*, *Moderate Impact*, *Needs Work*).
- **Weakness Detection with Suggested Fixes**: Each detected weakness is paired with a concrete, actionable recommendation.
- **Section-Level Grading**: Individual scores and mini progress bars for all core resume sections.
- **ATS Readability Guidance**: Clear document layout best practices tailored to automated applicant tracking systems.
- **"What AI Improved" Summary**: Bulleted list summarizing every grammatical, active voice, and formatting refinement made by Gemini.
- **"Recommended Additions" Checklist**: Identifies missing credentials or details for the candidate to fill in voluntarily.
- **In-Browser Document Preview & Editor**: Dual view mode (ATS Document Preview vs. Interactive Editor) allowing modification of any field.
- **Server-Side Dual Export**:
  - **Printable PDF**: Styled multi-page document using `pdfkit` with standard margins, headings, and clean bullet points.
  - **Editable Word (.docx)**: Microsoft Word document generated via `docx` with native headings, borders, and editable lists.
- **Defensive Security & Privacy**: In-memory ephemeral file processing with automatic buffer and temp file purging, strict extension checking, request body size limits, and security headers.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS (Modern minimal SaaS aesthetic with emerald brand accents)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans (Google Fonts)

### Backend
- **Platform**: Node.js (v20+ / v22+ / v24+) + Express.js
- **AI Engine**: Google Gemini API via official `@google/genai` JavaScript SDK
- **Model**: Configurable Gemini model (`gemini-2.5-flash` default)
- **Document Extractors**: `unpdf` (PDF) and `mammoth` (Word .docx)
- **Document Exporters**: `pdfkit` (PDF generation) and `docx` (Microsoft Word generation)
- **File Uploads**: `multer` with in-memory storage

---

## 📁 Project Architecture & Directory Structure

```text
college mini project/
├── client/                          # React + Vite Frontend
│   ├── public/
│   │   └── favicon.svg              # SVG brand favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Clean header with real-time API health status
│   │   │   ├── Hero.jsx             # Minimalist hero section & feature highlights
│   │   │   ├── ResumeUpload.jsx     # Drag-and-drop file uploader (PDF/DOCX, 5MB limit)
│   │   │   ├── AnalysisResults.jsx  # Score card, section quality, strengths, weaknesses & CTA
│   │   │   ├── ResumePreviewEditor.jsx # ATS document preview, in-browser editor & export bar
│   │   │   ├── LoadingIndicator.jsx # Live elapsed timer and AI progress feedback
│   │   │   └── ErrorAlert.jsx       # User-friendly error alert with configuration guide & retry
│   │   ├── services/
│   │   │   └── api.js               # API service connecting to Express backend (analyze, fix, export)
│   │   ├── App.jsx                  # Main view coordinator & state manager
│   │   ├── index.css                # Tailwind CSS imports and base styles
│   │   └── main.jsx                 # React root mount
│   ├── index.html                   # HTML template with Plus Jakarta Sans
│   ├── package.json                 # Client dependencies & scripts
│   ├── tailwind.config.js           # Tailwind theme customizations
│   └── vite.config.js               # Vite config with /api reverse proxy
│
├── server/                          # Express.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── gemini.js            # Gemini SDK client initialization & model resolution
│   │   ├── controllers/
│   │   │   └── resumeController.js  # Controller handling validation, extraction, rewrite, exports & cleanup
│   │   ├── routes/
│   │   │   ├── healthRoutes.js      # GET /api/health endpoint
│   │   │   └── resumeRoutes.js      # /analyze, /fix, /export/pdf, /export/docx endpoints
│   │   ├── services/
│   │   │   └── geminiService.js     # Analysis & Rewriting prompts, schema validation & normalization
│   │   ├── utils/
│   │   │   ├── fileExtractor.js     # Text extraction from PDF (unpdf) and DOCX (mammoth)
│   │   │   ├── pdfGenerator.js      # Multi-page printable PDF generation using pdfkit
│   │   │   └── docxGenerator.js     # ATS-compliant Microsoft Word (.docx) generation using docx
│   │   ├── app.js                   # Express app setup with security headers, CORS & error handlers
│   │   └── index.js                 # HTTP server entry point (Port 5000)
│   ├── test/
│   │   ├── test-suite.js            # Automated test suite (27 unit & integration tests)
│   │   └── createFixtures.js        # Synthetic PDF and DOCX generators for test isolation
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Ignore node_modules, .env, and uploads
│   └── package.json                 # Server dependencies & scripts
│
├── .gitignore                       # Root gitignore
├── package.json                     # Root orchestrator scripts (concurrently)
└── README.md                        # Project documentation
```

---

## 📋 Prerequisites

Before running the application, ensure you have installed:
- **Node.js**: v18.0.0 or higher (v20, v22, and v24 fully supported)
- **npm**: v9.0.0 or higher
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari)
- A **Google Gemini API Key** (free tier available at [Google AI Studio](https://aistudio.google.com/))

---

## ⚙️ Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd "college mini project"
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Install client & server dependencies**:
   ```bash
   npm run install:all
   ```

---

## 🔑 Environment Variables

The backend requires a Google Gemini API Key.

1. Navigate to the `server/` directory and create `.env` from the provided example:
   ```bash
   cp server/.env.example server/.env
   ```

2. Open `server/.env` and insert your API key:
   ```env
   # Server Configuration
   PORT=5000

   # Google Gemini API Key
   # Obtain your free API key from Google AI Studio: https://aistudio.google.com/
   GEMINI_API_KEY=your_gemini_api_key_here

   # Configurable Gemini Model (Default: gemini-2.5-flash)
   GEMINI_MODEL=gemini-2.5-flash
   ```

> ⚠️ **Important Security Note**: Never commit your `.env` file to Git or expose your API key to frontend code. The `.gitignore` file is already configured to exclude `.env`.

---

## 🏃 Running the Application

### Option A: Development Mode (Single Command with Live Reload)
From the root directory, start both the Express backend and the React Vite frontend concurrently with a single command:
```bash
npm run dev
```

- **Frontend Client (Hot-Reloading)**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

*(The frontend automatically proxies all `/api` requests to `http://localhost:5000` via Vite).*

---

### Option B: Unified Production Server (Single Port: 5000)
To build the React application and serve everything (frontend + backend APIs) from a single Express server on port 5000:
```bash
npm start
```

- **Unified Web Application**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### Option C: Run in Separate Terminals (Optional)

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```

---

## 🔄 Step-by-Step User Workflows

### Workflow 1: AI Resume Audit, Fix & Template Export
1. **Upload Resume**:
   - Drag and drop or browse for a `.pdf` or `.docx` resume (up to 5MB).
   - The UI validates file format and size, displaying the document name and formatted size.
2. **Analyze Resume**:
   - Click **Analyze Resume**.
   - An animated progress indicator provides live elapsed time while text is extracted and audited by Gemini.
3. **Review Audit Scorecard**:
   - View the overall score (0–100), executive evaluation, section grades, and highlighted weaknesses with suggested fixes.
4. **Fix Resume with AI**:
   - Click **Fix My Resume (AI Rewrite)**.
   - The backend re-uses the original extracted text and analysis feedback without requiring re-uploading.
   - Gemini rewrites bullet points into active, result-oriented statements while strictly preserving verified factual history.
5. **Interactive Preview & Edit**:
   - Review the rewritten resume in a clean ATS-friendly sheet layout.
   - Read **What AI Improved** and review **Recommended Additions**.
   - Toggle to **Edit Resume** to modify the Full Name, Contact Details, Professional Summary, or Section Bullets in real-time.
   - Or click **Download PDF / DOCX** for immediate document export.
6. **Choose Template & Style**:
   - Click **Choose Template & Preview** to transition the rewritten resume directly into the template engine.
   - Switch between **Modern Tech**, **Corporate Professional**, and **Minimal ATS-Friendly** templates.
   - Customize accent colors (Emerald, Ocean Blue, Navy, Wine, Charcoal) and typography (*Plus Jakarta Sans*, *Georgia*, *Inter*).
   - Download high-fidelity selectable vector A4 PDF via **Download PDF** or the browser print engine.

---

### Workflow 2: Manual Resume Builder & Interview Readiness
1. **Navigate to Build Resume**: Click **Build Resume** in the top navigation or hero banner.
2. **Complete Guided Form**:
   - Fill in Personal Information, Education, Work Experience, Projects, and Skills.
   - Use **AI Polish Summary**, **AI Rewrite Bullet**, or **AI Enhance Project** for instant phrasing assistance.
3. **Target Role & Interview Prep**:
   - Enter target job title or paste a job description.
   - Click **Generate Interview Prep** to receive tailored interview questions, technical topics to review, and project talking points.
4. **Select Template & Export**:
   - Click **Templates** or **Preview Resume**.
   - Select your preferred design and export a vector A4 PDF. Draft is auto-saved in `localStorage`.

---

## 🧪 Automated Testing

The project includes comprehensive automated test suites verifying file extraction, schema validation, PDF/DOCX generation, and HTTP endpoints.

Run the test suites from the root directory:
```bash
npm test
```

### Test Coverage (58 Passing Tests):
- **Configuration & Health**: Verified model resolution (`gemini-2.5-flash`) and key configuration status.
- **Schema Normalization**: Tested response normalization, missing field fallbacks, and score clamping (0–100).
- **Document Extraction**: Verified plain text extraction from authentic `.docx` (`mammoth`) and `.pdf` (`unpdf`) files.
- **Security & Content Validation**: Tested rejection of 0-byte files (400), unsupported types like `.txt` (400), corrupted documents (422), and oversized payloads (400).
- **Document Generation**: Verified multi-page printable PDF generation (`pdfkit`) and Word document generation (`docx`), including defensive handling when contact info is null or omitted.
- **HTTP Endpoints**: Tested `/api/health`, `/api/resume/analyze`, `/api/resume/fix`, `/api/resume/export/pdf`, `/api/resume/export/docx`, `/api/resume/builder-assist`, and `/api/resume/builder/export/pdf`.
- **Template Matrix (15 tests)**: Modern, Professional, and ATS templates verified across Student, Fresher, Experienced, Empty Optional, and Multi-Page candidate profiles.
- **Workflow Bridge (5 tests)**: Schema conversion from Gemini fixed resume to Resume Builder state, verifying clean A4 PDF generation across all templates.

To build the client for production:
```bash
npm run build
```

---

## 🛠️ Resume Builder & Interview Readiness (Phase 3)

In addition to analyzing pre-existing resumes, **ResumeAI** provides a complete, beginner-friendly **Resume Builder** for students, freshers, and experienced professionals:

- **Multi-Section Interactive Form**:
  - **Personal Info**: Full name (mandatory), headline, email, phone, location, LinkedIn, GitHub, portfolio, and summary.
  - **Education**: Degree, university, field of study, start/grad dates, current student toggle, CGPA/GPA, and coursework. Reorder entries with Up/Down controls.
  - **Work Experience**: Job title, employer, employment type, date ranges, current job toggle, responsibilities, quantifiable achievements, and tools used.
  - **Projects**: Project title, problem solved, overview, technical contributions, technologies used, GitHub repository URL, and live demo link.
  - **Skills & Extra Highlights**: Categorized skills (Languages, Frameworks, Databases & Tools, Soft Skills), Certifications, Hackathons & Coding Handles, Honors & Awards, Volunteer, and Languages Spoken.
- **AI Writing Assistance via Gemini (`POST /api/resume/builder-assist`)**:
  - **AI Polish Summary**: Formulates an impactful summary using candidate background, headline, and top skills.
  - **AI Rewrite Bullet**: Converts responsibilities into high-impact, action-verb driven achievements (*Architected*, *Implemented*, *Optimized*).
  - **AI Enhance Project**: Synthesizes project details into clear technical statements and bulleted contributions based strictly on user inputs.
  - **Strict Factual Guardrails**: The AI only works with user-supplied facts; it never invents employers, credentials, or metrics.
- **Target Role & Interview Readiness Kit**:
  - Optional target role title and job description field.
  - Analyzes alignment without falsely claiming missing skills if merely unlisted.
  - Generates 4–6 likely interview questions grounded in actual candidate projects.
  - Provides core technical topics to master and suggestions for describing technical architectural trade-offs.
  - Prominent disclaimer: Advisory practice tool that does not guarantee job placement.
- **Data Persistence & Workflow**:
  - Auto-saved locally in the browser (`localStorage`).
  - "Preview Resume" modal for real-time ATS document preview with text copy.
  - "Clear Draft" with safety confirmation dialog.

---

## 🎨 Templates, Live Preview & PDF Download (Phase 4)

Phase 4 introduces multi-template visual rendering, live customization controls, and selectable vector A4 PDF downloading:

### 1. Three Distinct Resume Templates
- **Template 1: Modern Tech**:
  - Asymmetric two-column split layout with customizable accent header bar and initials badge.
  - Left column houses skill tags, education, languages, and certifications.
  - Right column features professional summary, work experience, and technical projects.
  - Built for software engineers, data science students, and tech freshers.
- **Template 2: Corporate Professional**:
  - Traditional, formal corporate layout.
  - Centered formal header with inline bullets (`•`) for contact channels.
  - Full-width sections separated by horizontal solid rules with right-aligned dates.
  - Built for corporate jobs, management consulting, finance, and experienced hires.
- **Template 3: Minimal ATS-Friendly**:
  - Strict single-column, monochrome design (`#000000` text on `#ffffff`).
  - Standard uppercase headings (`SUMMARY`, `AREAS OF EXPERTISE`, `WORK EXPERIENCE`, `PROJECTS`, `EDUCATION`, `CERTIFICATIONS & HONORS`).
  - Zero tables, graphics, or icons that could interfere with applicant tracking systems.
  - Maximum machine-readability across enterprise ATS portals (Workday, Taleo, Greenhouse, Lever).

### 2. Live Customization Controls
- **Accent Color Picker**: Emerald Green, Ocean Blue, Deep Navy, Crimson Wine, and Charcoal Slate (automatically locked to black & white when ATS template is active).
- **Typography Selector**: Modern Sans (*Plus Jakarta Sans*), Classic Serif (*Georgia/Times*), and Clean Neutral (*Inter*).
- **Text Size**: Compact (fit more content on 1 page), Standard, and Spacious.
- **Reset to Defaults**: One-click restore to the active template's default styles.

### 3. High-Fidelity PDF Export
- **Selectable Vector Text**: Output is pure selectable text with genuine fonts and clickable hyperlinks, not an image screenshot.
- **Dual Export Pipelines**:
  - **Browser Vector Print-to-PDF**: High-precision multi-page rendering using `@page { size: A4 portrait; margin: 10mm 12mm; }` with `page-break-avoid` rules.
  - **Direct Server PDF Download**: `POST /api/resume/builder/export/pdf` powered by `pdfkit` for immediate direct file downloads.
- **Automatic Filename Sanitization**: Formatted as `${Candidate_Name}_Resume.pdf` (or `Resume.pdf` if name is empty).
- **Data Integrity**: Switching templates or customizations preserves 100% of candidate data in browser memory and `localStorage`.

---

## 🔒 Security & Privacy Features

- **No Permanent Document Storage**: Resumes are held ephemerally in RAM memory buffers and immediately dereferenced for garbage collection in `finally` blocks.
- **No Personal Data Logging**: The server only logs safe metadata (file name, file size, MIME type). Full resume text and candidate contact details are never logged.
- **Prompt Injection Defense**: Resume content is framed as untrusted data within strict system boundaries, preventing resume text from overriding rewriting instructions.
- **API Key Isolation**: API keys remain strictly on the backend. The Vite frontend never accesses or bundles API secrets.
- **Request Size Limiting**: Express JSON and URL-encoded parsers are restricted to `2mb` to prevent memory flooding.
- **Security Headers**: Standard headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`) are enabled.

---

## ❓ Troubleshooting & Common Errors

| Issue / Error | Cause | Resolution |
| :--- | :--- | :--- |
| **"Gemini API key is not configured" (503)** | Missing or placeholder `GEMINI_API_KEY` in `server/.env`. | Open `server/.env`, insert your API key from Google AI Studio, and restart the backend. |
| **"Unable to connect to backend server"** | Backend server is not running on port 5000. | Verify the backend is active by running `npm run server` or checking `http://localhost:5000/api/health`. |
| **"Unsupported file format" (400)** | Uploaded file is not `.pdf` or `.docx`. | Upload a standard PDF or Microsoft Word `.docx` document. |
| **"Unable to extract readable text" (422)** | Scanned photocopy or image-only PDF. | Provide a text-searchable PDF or export the document from Google Docs / Microsoft Word. |
| **"Rate limit exceeded" (429)** | Exceeded free-tier Gemini API quota. | Wait 30–60 seconds before retrying, or switch to another Gemini API key. |

---

## 🎓 Academic College Demonstration Notes & Limitations

- **AI Model Guidance**: This application uses **Google Gemini 2.5 Flash** via the official `@google/genai` JavaScript SDK for high speed and reliable structured JSON outputs.
- **No Database Required**: Designed stateless for simplicity; ideal for academic evaluation, peer review, and viva demonstration.
- **ATS Advisory Disclaimer**: All scoring and feedback are heuristic advisory assessments. No software can guarantee employment offers or algorithmic ATS passage.
- **Browser Downloads**: PDF and DOCX downloads are triggered on demand in the browser via standard `Blob` and `URL.createObjectURL`.

---

## 🎤 5-Minute College Viva & Demo Script

When demonstrating this project to external examiners or professors, follow this structured walkthrough:

1. **Architecture Pitch (1 min)**:
   > *"ResumeAI is a modern, decoupled web application built with React, Vite, and Tailwind CSS on the frontend, and Node.js with Express on the backend. It integrates the official Google Gemini SDK (`@google/genai`) to provide objective recruiter-level resume critique and generative rewriting without hallucinating facts or compromising student privacy."*

2. **Workflow 1 Demo: Upload, Audit & AI Fix (2 mins)**:
   - Upload a sample PDF or DOCX resume.
   - Point out that the file is processed in RAM (no permanent disk storage).
   - Show the Gemini Analysis Scorecard: overall score, executive summary, section grades, and highlighted weaknesses with suggested improvements.
   - Click **Fix My Resume (AI Rewrite)**. Show how Gemini rewrites passive statements into action-driven statements with metric placeholders.
   - Show the in-browser document editor, toggle between Document View and Edit mode.
   - Click **Choose Template & Preview** to show how the rewritten resume seamlessly loads into the template engine.

3. **Workflow 2 Demo: Resume Builder & Templates (1.5 mins)**:
   - Navigate to **Build Resume**. Show the sectioned form (Personal, Education, Experience, Projects, Skills).
   - Demonstrate the **AI Writing Assistant** (AI Polish Summary, AI Rewrite Bullet, AI Enhance Project).
   - Show **Target Role & Interview Prep**: enter a job title, click **Generate Interview Prep**, and show the predicted technical questions and project talking points.
   - Open **Templates**: switch between **Modern Tech**, **Corporate Professional**, and **Minimal ATS-Friendly**.
   - Customize accent colors and font sizes in real time.
   - Click **Download PDF** to generate a clean, selectable vector A4 PDF.

4. **Technical Q&A Preparation (30 secs)**:
   - *Q: How do you prevent Gemini from hallucinating candidate details?*  
     *A: Strict system instructions with low temperature (0.2), schema enforcement via Type schemas, and explicit prompt rules forbidding the generation of unlisted credentials or fake metrics.*
   - *Q: How is candidate privacy handled?*  
     *A: Resumes are stored purely in ephemeral RAM buffers during the request lifecycle and cleaned up immediately in finally blocks. No database, authentication, or permanent files are retained.*
   - *Q: Why use `unpdf` instead of legacy `pdf-parse`?*  
     *A: `unpdf` is fully compatible with modern Node.js runtimes (Node 20, 22, and 24) without deprecation warnings or memory leaks.*
