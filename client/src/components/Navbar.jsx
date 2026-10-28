import React, { useState, useEffect } from 'react';
import { Sparkles, FileSearch, PenTool, LayoutTemplate, Eye } from 'lucide-react';
import { checkServerHealth } from '../services/api';

export default function Navbar({ currentView = 'analyzer', onViewChange }) {
  const [serverStatus, setServerStatus] = useState('checking'); // 'ok', 'error', 'checking'

  useEffect(() => {
    checkServerHealth()
      .then((data) => {
        if (data.status === 'ok') {
          setServerStatus('ok');
        } else {
          setServerStatus('error');
        }
      })
      .catch(() => setServerStatus('error'));
  }, []);

  return (
    <header className="border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo and Brand Name */}
        <div
          onClick={() => onViewChange && onViewChange('analyzer')}
          className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-200 flex-shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
              Resume<span className="text-emerald-600">AI</span>
            </span>
            <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Gemini 2.5
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        {onViewChange && (
          <nav className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200/80 overflow-x-auto">
            <button
              onClick={() => onViewChange('analyzer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentView === 'analyzer'
                  ? 'bg-white text-emerald-800 shadow-sm border border-neutral-200/60'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analyze Resume</span>
              <span className="sm:hidden">Analyze</span>
            </button>

            <button
              onClick={() => onViewChange('builder')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentView === 'builder'
                  ? 'bg-white text-emerald-800 shadow-sm border border-neutral-200/60'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Build Resume</span>
              <span className="sm:hidden">Builder</span>
            </button>

            <button
              onClick={() => onViewChange('templates')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentView === 'templates'
                  ? 'bg-white text-emerald-800 shadow-sm border border-neutral-200/60'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => onViewChange('preview')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentView === 'preview'
                  ? 'bg-white text-emerald-800 shadow-sm border border-neutral-200/60'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview & PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </nav>
        )}

        {/* Backend Status indicator */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs border border-neutral-200 bg-neutral-50 text-neutral-600 flex-shrink-0">
          <span
            className={`w-2 h-2 rounded-full ${
              serverStatus === 'ok'
                ? 'bg-emerald-500 animate-pulse'
                : serverStatus === 'checking'
                ? 'bg-amber-400'
                : 'bg-red-400'
            }`}
          />
          <span className="font-mono text-[11px] hidden md:inline">
            {serverStatus === 'ok'
              ? 'API Ready'
              : serverStatus === 'checking'
              ? 'Connecting...'
              : 'API Offline'}
          </span>
        </div>
      </div>
    </header>
  );
}
