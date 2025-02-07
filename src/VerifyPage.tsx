import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';

function VerifyPage() {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!code) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Code</h1>
          <p className="mt-4 text-gray-600">No verification code was provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Your Verification Code
        </h1>
        <div className="text-5xl font-mono font-bold text-indigo-600 tracking-wider mb-6">
          {code}
        </div>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
        <p className="mt-6 text-gray-600">
          Enter this code in the original window to verify your identity
        </p>
      </div>
    </div>
  );
}

export default VerifyPage;