
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeDisplayProps {
  code: string;
  isLoading: boolean;
  error: string | null;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (code) {
      setCopied(false);
    }
  }, [code]);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-700 rounded w-full mt-6"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mt-6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  );

  const InitialState = () => (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        <h3 className="text-lg font-semibold text-gray-300">Your generated C# code will appear here</h3>
        <p className="mt-1">Configure your PDF service on the left and click "Generate" to start.</p>
      </div>
  )

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg h-full min-h-[600px] flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-gray-700/50">
        <p className="text-sm font-medium text-gray-300">Generated C# Code</p>
        {code && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-colors bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
          >
            {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
          </button>
        )}
      </div>
      <div className="flex-grow p-1 relative overflow-auto">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="p-4 text-red-400">{error}</div>
        ) : code ? (
          <pre className="p-4 text-sm text-gray-200 whitespace-pre-wrap"><code className="language-csharp">{code}</code></pre>
        ) : (
          <InitialState />
        )}
      </div>
    </div>
  );
};

export default CodeDisplay;
