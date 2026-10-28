import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, ArrowRight, Check } from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

export default function ResumeUpload({ onAnalyze, isLoading, onError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const validateFile = (file) => {
    if (!file) return false;

    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!hasValidExtension) {
      onError('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
      return false;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      onError('File size exceeds the 5MB limit. Please upload a smaller resume.');
      return false;
    }

    if (file.size === 0) {
      onError('The selected file appears to be empty. Please select a valid document.');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent duplicate submission clicks
    if (!selectedFile) {
      onError('Please select or drop a resume file before analyzing.');
      return;
    }
    onAnalyze(selectedFile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-5 sm:p-8">
        {/* Upload Container */}
        {!selectedFile ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload resume file dropzone. Click or press Enter to browse for PDF or DOCX files."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              isDragOver
                ? 'border-emerald-500 bg-emerald-50/60 scale-[1.01]'
                : 'border-neutral-300 hover:border-emerald-400 hover:bg-neutral-50/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              aria-label="Upload resume in PDF or DOCX format"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-emerald-600">
              <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-neutral-800">
              Drop your resume here, or <span className="text-emerald-600 underline underline-offset-4">browse</span>
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500">
              Supports PDF and DOCX formats (up to 5MB)
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-600">
                .PDF
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-600">
                .DOCX
              </span>
            </div>
          </div>
        ) : (
          /* File Selected Preview State */
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-emerald-100/80 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-emerald-700">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                    {formatFileSize(selectedFile.size)} • {selectedFile.name.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Word Document'}
                  </p>
                </div>
              </div>

              {!isLoading && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  title="Remove file"
                  aria-label="Remove selected resume file"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="mt-3.5 pt-3.5 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium text-[11px] sm:text-xs">
                <Check className="w-3.5 h-3.5" /> File ready for AI analysis
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-neutral-800 underline transition-colors text-[11px] sm:text-xs"
              >
                Change file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                aria-label="Change uploaded resume file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs text-neutral-500 text-center sm:text-left">
            🔒 Secure processing: resumes are processed ephemerally in RAM and never stored permanently.
          </p>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile || isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm flex-shrink-0 ${
              !selectedFile || isLoading
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white hover:shadow-md hover:shadow-emerald-200'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Document...</span>
              </>
            ) : (
              <>
                <span>Analyze Resume</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
