import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownDisplayProps {
  markdown: string;
}

export function MarkdownDisplay({ markdown }: MarkdownDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Generated Markdown
        </h2>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
        <code className="text-sm text-gray-800 whitespace-pre-wrap">
          {markdown}
        </code>
      </pre>
    </div>
  );
}