import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ResumeUpload from './components/ResumeUpload';
import AnalysisResults from './components/AnalysisResults';
import ResumePreviewEditor from './components/ResumePreviewEditor';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorAlert from './components/ErrorAlert';
import ResumeBuilder from './components/builder/ResumeBuilder';
import TemplateSelection from './components/templates/TemplateSelection';
import ResumeLivePreview from './components/templates/ResumeLivePreview';
import { initialResumeState, STORAGE_KEY, convertFixedResumeToBuilderData } from './components/builder/builderState';
import { analyzeResumeApi, fixResumeApi } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('analyzer'); // 'analyzer' | 'builder' | 'templates' | 'preview'
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern');

  // Lifted builder draft state so builder, templates, and preview stay 100% in sync
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialResumeState,
          ...parsed,
          personalInfo: { ...initialResumeState.personalInfo, ...(parsed.personalInfo || {}) },
          skills: { ...initialResumeState.skills, ...(parsed.skills || {}) },
          additional: { ...initialResumeState.additional, ...(parsed.additional || {}) },
          targetJob: { ...initialResumeState.targetJob, ...(parsed.targetJob || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved resume draft:', e);
    }
    return initialResumeState;
  });

  // Keep localStorage updated whenever resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (err) {
      console.error('Failed to sync resumeData to storage:', err);
    }
  }, [resumeData]);

  // Analyzer States
  const [isLoading, setIsLoading] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [fixedResume, setFixedResume] = useState(null);
  const [showFixedView, setShowFixedView] = useState(false);
  const [error, setError] = useState(null);
  const [activeFile, setActiveFile] = useState(null);

  // 1. Initial Resume Analysis
  const handleAnalyze = async (file) => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    setFixedResume(null);
    setShowFixedView(false);
    setActiveFile(file);

    try {
      const data = await analyzeResumeApi(file);
      setAnalysisResult(data);
    } catch (err) {
      console.error('Resume analysis failed:', err);
      setError(err.message || 'An unexpected error occurred while analyzing the resume.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fix Resume with Gemini AI
  const handleFixResume = async () => {
    if (isFixing || !analysisResult) return;

    setError(null);
    setIsFixing(true);

    try {
      const resumeText = analysisResult.extractedText || '';
      const fixedData = await fixResumeApi(resumeText, analysisResult);
      setFixedResume(fixedData);
      setShowFixedView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Resume rewriting failed:', err);
      setError(err.message || 'Failed to rewrite resume with AI. Please try again.');
    } finally {
      setIsFixing(false);
    }
  };

  // 3. Reset application state
  const handleReset = () => {
    setAnalysisResult(null);
    setFixedResume(null);
    setShowFixedView(false);
    setError(null);
    setActiveFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 pb-16">
        {/* Error notification banner */}
        {error && currentView === 'analyzer' && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError(null)}
            onRetry={
              showFixedView
                ? handleFixResume
                : activeFile && !isLoading
                ? () => handleAnalyze(activeFile)
                : null
            }
          />
        )}

        {/* View 1: Resume Builder */}
        {currentView === 'builder' && (
          <ResumeBuilder
            resumeData={resumeData}
            setResumeData={setResumeData}
            onNavigate={setCurrentView}
            selectedTemplateId={selectedTemplateId}
          />
        )}

        {/* View 2: Template Selection Screen */}
        {currentView === 'templates' && (
          <TemplateSelection
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={(id) => {
              setSelectedTemplateId(id);
              setCurrentView('preview');
            }}
            onPreviewTemplate={(id) => {
              setSelectedTemplateId(id);
              setCurrentView('preview');
            }}
            onBackToBuilder={() => setCurrentView('builder')}
          />
        )}

        {/* View 3: Live Resume Preview, Customization & PDF Download */}
        {currentView === 'preview' && (
          <ResumeLivePreview
            data={resumeData}
            selectedTemplateId={selectedTemplateId}
            onBackToEditor={() => setCurrentView('builder')}
            onChangeTemplate={() => setCurrentView('templates')}
          />
        )}

        {/* View 4: Resume Analyzer */}
        {currentView === 'analyzer' &&
          (!analysisResult ? (
            <>
              <Hero onBuildClick={() => setCurrentView('builder')} />

              <ResumeUpload
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                onError={(msg) => setError(msg)}
              />

              {isLoading && <LoadingIndicator fileName={activeFile?.name} />}

              {/* How It Works Section */}
              {!isLoading && (
                <section id="how-it-works" className="max-w-4xl mx-auto px-4 mt-16 sm:mt-20">
                  <div className="text-center mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Simple 3-Step Process
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-2">
                      How ResumeAI Works
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-100">
                        1
                      </div>
                      <h3 className="font-bold text-neutral-900 text-sm mb-1.5">
                        Upload Resume
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Drop your existing resume in PDF or DOCX format. No sign-up or database storage required.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-100">
                        2
                      </div>
                      <h3 className="font-bold text-neutral-900 text-sm mb-1.5">
                        Gemini AI Audit
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Receive an objective overall score, strengths, weak points with suggested fixes, and section breakdown.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-100">
                        3
                      </div>
                      <h3 className="font-bold text-neutral-900 text-sm mb-1.5">
                        Rewrite, Edit & Export
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Click "Fix My Resume" to generate active bullet points, edit in-browser, and export to PDF or DOCX.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </>
          ) : showFixedView && fixedResume ? (
            /* View 4b: AI Improved Resume Preview & Editor */
            <ResumePreviewEditor
              fixedResume={fixedResume}
              onBackToAnalysis={() => setShowFixedView(false)}
              onError={(msg) => setError(msg)}
              onOpenTemplates={(currentResumeData) => {
                const converted = convertFixedResumeToBuilderData(currentResumeData);
                setResumeData(converted);
                setCurrentView('templates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            /* View 4a: Analysis Results Section with "Fix My Resume" CTA */
            <AnalysisResults
              data={analysisResult}
              onReset={handleReset}
              onFixResume={handleFixResume}
              isFixing={isFixing}
            />
          ))}
      </main>

      {/* Modern Minimal Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500 no-print">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ResumeAI. Modern AI Resume Analyzer & Optimizer.</p>
          <p className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="font-semibold text-neutral-800">Google Gemini API</span>
            <span>&</span>
            <span className="font-semibold text-neutral-800">React + Express</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
