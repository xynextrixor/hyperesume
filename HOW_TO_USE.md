# 📖 How to Use ResumeAI (HypeResume)
### Comprehensive Step-by-Step User Guide & Walkthrough

Welcome to **ResumeAI**! Whether you want to audit an existing resume, rewrite weak bullet points, create a new resume from scratch, or prepare for technical interviews, this guide walks you through every feature.

---

## 📑 Table of Contents
1. [⚡ Quick Start in 60 Seconds](#-quick-start-in-60-seconds)
2. [🔍 Feature 1: Analyze & Audit an Existing Resume](#-feature-1-analyze--audit-an-existing-resume)
3. [✨ Feature 2: "Fix My Resume" (AI Rewrite Engine)](#-feature-2-fix-my-resume-ai-rewrite-engine)
4. [🛠️ Feature 3: Resume Builder (Build from Scratch)](#-feature-3-resume-builder-build-from-scratch)
5. [🤖 Feature 4: AI Writing Assistant in the Builder](#-feature-4-ai-writing-assistant-in-the-builder)
6. [🎯 Feature 5: Job Matching & AI Interview Preparation](#-feature-5-job-matching--ai-interview-preparation)
7. [🎨 Feature 6: Choose & Customize Resume Templates](#-feature-6-choose--customize-resume-templates)
8. [📥 Feature 7: High-Fidelity PDF & DOCX Export](#-feature-7-high-fidelity-pdf--docx-export)
9. [🔄 Feature 8: The Combined Workflow (Audit → Fix → Template Export)](#-feature-8-the-combined-workflow-audit--fix--template-export)
10. [❓ Frequently Asked Questions & Troubleshooting](#-frequently-asked-questions--troubleshooting)

---

## ⚡ Quick Start in 60 Seconds

### Step 1: Start the Application
Open your terminal in the project root and run:
```bash
npm run dev
```

### Step 2: Open in Your Browser
- Web Application: **[http://localhost:5173](http://localhost:5173)**
- Check the top navbar: you should see a green badge saying **`● API Connected (gemini-2.5-flash)`**.

---

## 🔍 Feature 1: Analyze & Audit an Existing Resume

Use this feature to discover why your resume might be getting rejected by recruiters or applicant tracking systems (ATS).

```
[ Upload PDF/DOCX ] ──► [ Gemini AI Audit ] ──► [ Scorecard & Actionable Fixes ]
```

### Steps:
1. On the Home page, look at the **Upload Resume** section.
2. Drag and drop your resume file, or click inside the box to browse:
   - **Supported formats**: PDF (`.pdf`) or Microsoft Word (`.docx`).
   - **Maximum file size**: `5 MB`.
3. Verify that the file name and size appear in the upload card.
4. Click **"Analyze Resume"**.
5. Wait a few seconds while Gemini AI reads the document in ephemeral RAM.

### What You Will Receive:
- **Overall Quality Score (0–100)**: Evaluated against industry recruiter standards.
  - `85–100`: *Strong & Highly Competitive*
  - `70–84`: *Good Base — Needs Polishing*
  - `<70`: *Needs Substantial Work*
- **Executive Summary**: A recruiter's first impression of your profile.
- **Top Strengths**: Highlights of what makes your resume stand out.
- **Critical Weaknesses**: Identified gaps, passive phrasing, or missing metrics.
- **Concrete Fixes**: Exact instructions on how to remedy each weakness.
- **Section-by-Section Quality**: Individual scores and feedback for Summary, Experience, Skills, Education, Formatting & Grammar.
- **ATS Readability Guidance**: Document formatting suggestions for automated applicant portals.

---

## ✨ Feature 2: "Fix My Resume" (AI Rewrite Engine)

After reviewing your analysis, let Gemini professionally rewrite your resume.

### Steps:
1. At the bottom of your analysis results, click the green **"Fix My Resume"** button.
2. Gemini rewrites your bullet points using:
   - **Strong Action Verbs**: *Architected*, *Spearheaded*, *Engineered*, *Optimized*.
   - **Metric Placeholders**: Flags opportunities to insert concrete numbers (e.g., `[X% latency reduction]`).
   - **Active Voice & Brevity**: Eliminates filler words and passive statements.
   - **Zero Hallucination Guardrails**: Strictly retains your real work history, dates, degrees, and companies.
3. You will be taken to the **Interactive Document Editor**:
   - **"What AI Improved"**: Bulleted list of every refinement made.
   - **"Recommended Additions"**: Details you may want to voluntarily provide.

### Editing Your Rewritten Resume:
- **Toggle View Mode**: Click **"Edit Resume"** in the top action bar.
- Edit your Full Name, Email, Phone, LinkedIn, GitHub, or Summary.
- Edit any bullet point directly, add new points, or reorder sections.
- Click the **Reset** button anytime if you want to restore the initial AI rewrite.
- Click **"Download PDF"** or **"Download DOCX"** for instant files.

---

## 🛠️ Feature 3: Resume Builder (Build from Scratch)

If you don't have an existing resume, or want to create a fresh one tailored for college campus placements or internships:

### Steps:
1. Click **"Build Resume"** in the top navigation bar.
2. Complete the 5 guided sections using the left sidebar:
   - **Personal Info**: Full name (required), target headline, email, phone, location, LinkedIn, GitHub, portfolio, and career objective.
   - **Education**: Degree, university, field of study, start & graduation dates, current student toggle, CGPA/GPA, and relevant coursework. Reorder entries with Up/Down buttons.
   - **Work Experience**: Job title, employer, employment type, dates, responsibilities, and quantified achievements.
   - **Projects**: Project title, problem solved, technical overview, technologies used, GitHub link, and live demo link.
   - **Skills & Extra Highlights**: Categorized skills (Programming Languages, Frameworks, Databases & Tools, Soft Skills), Certifications, Coding Handles (LeetCode/Codeforces), and Awards.
3. **Auto-Saving**:
   - All inputs are continuously saved in your browser's `localStorage` under the key `resumeai_builder_draft_v1`.
   - Refreshing or closing the tab will **never** lose your progress.
   - To start fresh, click **"Reset Draft"** in the sidebar.

---

## 🤖 Feature 4: AI Writing Assistant in the Builder

Inside the Resume Builder, look for the purple/emerald **Sparkles (`✨`)** buttons:

### 1. AI Polish Summary:
- In the **Personal Information** tab, write a rough 1-2 sentence description.
- Click **"AI Polish Summary"**.
- Gemini uses your background, target headline, and skills to generate a compelling 3-sentence recruiter summary.

### 2. AI Rewrite Bullet:
- In the **Work Experience** tab, type a rough bullet point (e.g., *"helped build an api and fixed bugs"*).
- Click **"AI Rewrite"**.
- Gemini transforms it into an impactful achievement (e.g., *"Engineered RESTful microservices and resolved 40+ critical production defects, improving service reliability"*).

### 3. AI Enhance Project:
- In the **Projects** tab, enter your project title and technologies.
- Click **"AI Enhance Project"**.
- Gemini structures your description into a clear problem statement, technical architecture overview, and bulleted contributions.

---

## 🎯 Feature 5: Job Matching & AI Interview Preparation

Prepare for technical screenings based directly on your resume and target role:

### Steps:
1. In the Resume Builder, click the **"Target Role & Interview"** section.
2. Enter your **Target Role Title** (e.g., *Frontend Engineer*, *Data Analyst*, *Full Stack Developer*).
3. Paste the **Job Description** (or leave empty for standard industry requirements).
4. Click **"Generate Interview Prep Kit"**.

### What You Receive:
- **Tailored Interview Questions**: 4–6 behavioral and technical questions grounded in the actual projects listed on your resume.
- **Core Topics to Master**: Key computer science and domain concepts recruiters will test for this role.
- **Project Talking Points**: Suggestions on how to explain your architectural decisions and trade-offs.

---

## 🎨 Feature 6: Choose & Customize Resume Templates

ResumeAI includes **three professionally designed templates**:

```
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│      MODERN TECH       │  │ CORPORATE PROFESSIONAL │  │  MINIMAL ATS-FRIENDLY  │
│  2-Column Green Accent │  │ Formal Centered Header │  │ Monochrome Single-Col  │
│  Initials Avatar Badge │  │ Clean Divider Lines    │  │ Uppercase Headers      │
│  Best for Developers   │  │ Best for Business/Corp │  │ 100% Machine Readable  │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

### How to Switch Templates:
1. Click **"Templates"** in the top navigation or click **"Preview Resume"** in the builder.
2. Select your desired template card:
   - **Modern Tech**: Asymmetric 2-column split with accent color badges. Ideal for software engineers, freshers, and data scientists.
   - **Corporate Professional**: Traditional structured formal layout with centered contact line. Ideal for finance, consulting, and corporate roles.
   - **Minimal ATS-Friendly**: Single-column pure black-and-white (`#000000` text on `#ffffff`). Avoids tables and icons to maximize parsing across enterprise ATS portals (Workday, Taleo, Greenhouse).

### Live Customization Controls:
- **Accent Color**: Choose from Emerald Green, Ocean Blue, Navy, Wine, or Charcoal (automatically disabled for the ATS template to maintain 100% monochrome compliance).
- **Typography**: Switch between *Modern Sans* (Plus Jakarta Sans), *Classic Serif* (Georgia/Times), and *Clean Neutral* (Inter).
- **Font Size**: Select *Compact* (fits more content on 1 page), *Standard*, or *Spacious*.
- **Reset Defaults**: Click to restore template defaults at any time.

---

## 📥 Feature 7: High-Fidelity PDF & DOCX Export

### Option A: Direct Backend Download (Recommended)
1. In the template preview bar, click the green **"Download PDF"** button.
2. The backend generates a crisp A4 vector document using `pdfkit`.
3. The file automatically saves as:
   ```text
   ${Candidate_Name}_Resume.pdf
   ```

### Option B: High-Precision Vector Print-to-PDF
1. Click **"Print / Save PDF"**.
2. The browser print modal will open automatically configured for:
   - Destination: **Save as PDF**
   - Paper Size: **A4**
   - Layout: **Portrait**
   - Margins: **Default / Minimum**
3. Text is 100% selectable and hyperlinks remain clickable.

### Option C: Editable Word Document (.docx)
1. In the "Fix My Resume" preview editor, click **"Download DOCX"**.
2. An editable Microsoft Word document is generated matching ATS single-column formatting.

---

## 🔄 Feature 8: The Combined Workflow (Audit → Fix → Template Export)

You can seamlessly bridge an uploaded resume into the modern template engine:

1. **Upload** an existing messy resume on the Home page.
2. Click **"Analyze Resume"** to audit weaknesses.
3. Click **"Fix My Resume"** to let Gemini rewrite weak bullet points.
4. In the Fix Editor, review your rewritten resume and click:
   👉 **"Choose Template & Preview"**
5. Your rewritten resume is automatically converted into the builder schema!
6. Select any of the 3 templates, pick your favorite accent color and font, and download your final vector PDF!

---

## ❓ Frequently Asked Questions & Troubleshooting

### Q: Why does the navbar say "API Key Not Configured" or show an error?
**A**: Ensure your Gemini API key is added to `server/.env`:
```env
PORT=5000
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
Then restart the development server with `npm run dev`.

### Q: Where do I get a free Gemini API key?
**A**: Visit **[Google AI Studio](https://aistudio.google.com/)**, sign in with your Google account, and click **"Create API Key"**. It is completely free with generous quotas.

### Q: Does the application store my resume or personal data?
**A**: **No.** Resumes are processed in RAM memory buffers and immediately deleted in `finally` blocks after extraction. No database or permanent storage is used.

### Q: Why did text extraction fail on my PDF?
**A**: If your PDF is a scanned photocopy or photograph, it does not contain digital text streams. Export your resume directly from Google Docs or Microsoft Word using **File → Download as PDF**.

### Q: How do I run both backend and frontend together?
**A**: Run `npm run dev` from the root directory. It starts both the Express server (port 5000) and the Vite frontend (port 5173) in a single terminal.

---

*Enjoy building and optimizing your resumes with **ResumeAI**!*
