import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Code2,
  ShieldCheck,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { builderAssistApi } from '../../services/api';

export default function TargetRoleSection({ data, onChange }) {
  const targetJob = data.targetJob || {};
  const [prepResult, setPrepResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFieldChange = (field, value) => {
    onChange('targetJob', {
      ...targetJob,
      [field]: value,
    });
  };

  const handleGeneratePrep = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await builderAssistApi({
        action: 'interview-prep',
        data: {
          resumeData: data,
        },
        targetJob: {
          title: targetJob.targetTitle || 'Target Role',
          description: targetJob.jobDescription || 'Standard requirements for this field',
        },
      });

      setPrepResult(result);
    } catch (err) {
      console.error('Interview prep generation failed:', err);
      setError(err.message || 'Failed to generate interview preparation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          Target Role & AI Interview Readiness
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Benchmark your resume facts against a target role description and generate real interview prep questions based on your actual projects.
        </p>
      </div>

      {/* Inputs Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Target Job Title (Optional)
          </label>
          <input
            type="text"
            value={targetJob.targetTitle || ''}
            onChange={(e) => handleFieldChange('targetTitle', e.target.value)}
            placeholder="e.g. Associate Software Engineer / Frontend React Developer"
            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Job Description (Optional)
          </label>
          <textarea
            rows={4}
            value={targetJob.jobDescription || ''}
            onChange={(e) => handleFieldChange('jobDescription', e.target.value)}
            placeholder="Paste requirements, responsibilities, or desired qualifications from the job posting to receive role-tailored interview guidance..."
            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <p className="text-[11px] text-neutral-400 mt-1">
            Gemini will compare your actual resume data against these requirements without fabricating any background.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict factual check: No invented credentials.</span>
          </div>

          <button
            type="button"
            onClick={handleGeneratePrep}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing Role & Generating Prep...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Interview Prep Kit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block">Preparation Generation Error</span>
            <p className="mt-0.5">{error}</p>
          </div>
          <button
            onClick={handleGeneratePrep}
            className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Interview Prep Results View */}
      {prepResult && !isLoading && (
        <div className="space-y-6 pt-2">
          {/* 1. Alignment Overview */}
          {prepResult.roleAlignment && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-neutral-900">
                  Target Role Alignment & Resume Tailoring
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Strengths Match */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified Strengths Alignment
                  </div>
                  <ul className="space-y-1.5 text-neutral-700">
                    {prepResult.roleAlignment.strengthsMatch?.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas to Clarify */}
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Areas to Clarify in Interview
                  </div>
                  <ul className="space-y-1.5 text-neutral-700">
                    {prepResult.roleAlignment.areasToClarify?.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              {prepResult.roleAlignment.recommendations?.length > 0 && (
                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-800">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    Resume Phrasing Tweaks for this Role
                  </div>
                  <ul className="space-y-1 text-neutral-600">
                    {prepResult.roleAlignment.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 2. Likely Interview Questions */}
          {prepResult.likelyQuestions?.length > 0 && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">
                    Likely Interview Questions
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Directly inspired by the projects, technologies, and achievements you provided.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {prepResult.likelyQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0">
                          Q{idx + 1}
                        </span>
                        <span className="font-bold text-neutral-900 text-sm">{q.question}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded flex-shrink-0">
                        {q.category}
                      </span>
                    </div>

                    {q.whyAsked && (
                      <p className="text-neutral-500 italic pl-8">
                        Why interviewers ask this: {q.whyAsked}
                      </p>
                    )}

                    {q.talkingPoints?.length > 0 && (
                      <div className="pl-8 pt-1">
                        <span className="font-semibold text-neutral-700 block mb-1">
                          Key Talking Points from Your Background:
                        </span>
                        <ul className="space-y-1 text-neutral-600 list-disc pl-4">
                          {q.talkingPoints.map((tp, tpIdx) => (
                            <li key={tpIdx}>{tp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Topics to Explain & Project Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Topics to Explain */}
            {prepResult.topicsToExplain?.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-700">
                    Core Technical Topics to Master
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  {prepResult.topicsToExplain.map((top, idx) => (
                    <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                      <div className="font-bold text-neutral-900">{top.topic}</div>
                      <p className="text-neutral-500 text-[11px]">{top.relevance}</p>
                      <p className="text-emerald-800 text-[11px] font-medium pt-1">
                        Tip: {top.prepTips}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Decision Talking Points */}
            {prepResult.projectDecisions?.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-700">
                    Architectural & Trade-off Decisions
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  {prepResult.projectDecisions.map((dec, idx) => (
                    <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                      <div className="font-bold text-neutral-900">{dec.projectName}</div>
                      <p className="text-neutral-600 text-[11px]">{dec.decisionOrChallenge}</p>
                      <p className="text-blue-800 text-[11px] font-medium pt-1">
                        How to explain: {dec.howToExplain}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer Banner */}
          <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-3.5 text-center text-xs text-neutral-500">
            {prepResult.disclaimer ||
              'Notice: This interview readiness kit provides strategic educational practice based on your provided information. It does not guarantee job placement or interview invitations.'}
          </div>
        </div>
      )}
    </div>
  );
}
