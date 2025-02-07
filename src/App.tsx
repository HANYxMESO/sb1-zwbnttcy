import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function App() {
  const [currentCode, setCurrentCode] = useState(generateRandomCode());
  const [showInput, setShowInput] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    let timer: number;
    if (isCorrect === true) {
      timer = window.setTimeout(() => {
        setCurrentCode(generateRandomCode());
        setShowInput(false);
        setInputCode('');
        setIsCorrect(null);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isCorrect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = inputCode === currentCode;
    setIsCorrect(correct);
  };

  const handleGetCode = () => {
    const verifyUrl = new URL('/verify', window.location.href);
    verifyUrl.searchParams.set('code', currentCode);
    window.open(verifyUrl.toString(), '_blank');
    setShowInput(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Verification System
        </h1>

        <div className="flex flex-col items-center space-y-6">
          {!showInput ? (
            <div className="w-full">
              <button
                onClick={handleGetCode}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
              >
                <span>Get Verification Code</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-center mt-4 text-gray-600">
                Click to receive your verification code
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={() => setShowInput(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            </form>
          )}

          {isCorrect !== null && (
            <div
              className={`flex items-center space-x-2 ${
                isCorrect ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isCorrect ? (
                <span>Code verified successfully!</span>
              ) : (
                <span>Incorrect code, please try again</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App