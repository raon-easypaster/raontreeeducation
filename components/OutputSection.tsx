import React, { useState } from 'react';
import { PromptData } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { PROMPT_CATEGORIES } from '../constants';

interface OutputSectionProps {
  promptData: PromptData | null;
  isLoading: boolean;
  error: string | null;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ promptData, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const keyToLabelMap: Record<string, string> = PROMPT_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = cat.label;
    return acc;
  }, {} as Record<string, string>);


  const handleCopy = () => {
    if (promptData?.fullPrompt) {
      navigator.clipboard.writeText(promptData.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col gap-6 h-full">
       {isLoading && (
        <div className="absolute inset-0 bg-gray-800/80 rounded-xl flex flex-col items-center justify-center z-10">
          <LoadingSpinner />
          <p className="mt-4 text-gray-300">프롬프트를 설계하는 중입니다...</p>
        </div>
      )}
      <div className="flex-grow flex flex-col">
          <h2 className="text-xl font-semibold mb-3 text-indigo-300">설계된 프롬프트 세부 정보</h2>
          {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
          {promptData ? (
             <div className="flex flex-col h-full">
              <div className="space-y-3 text-sm flex-grow overflow-auto pr-2">
                {Object.entries(promptData).map(([key, value]) => {
                  if (key === 'fullPrompt') return null;
                  const formattedKey = keyToLabelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div key={key}>
                      <p className="font-semibold text-gray-300">{formattedKey}:</p>
                      <p className="text-gray-400">{value}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="font-semibold text-gray-300 mb-2">최종 프롬프트:</p>
                <textarea
                    readOnly
                    value={promptData.fullPrompt}
                    className="w-full h-24 p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-300 text-sm resize-none"
                />
                <button onClick={handleCopy} className="mt-2 w-full text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 rounded-md transition duration-200 font-semibold">
                  {copied ? '복사됨!' : '전체 프롬프트 복사'}
                </button>
              </div>
            </div>
          ) : !isLoading && (
            <div className="text-gray-500 text-center py-10 flex-grow flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-400">프롬프트 세부 정보가 여기에 표시됩니다.</h3>
                <p className="mt-1 text-sm text-gray-500">시작하려면 양식을 작성해주세요.</p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};