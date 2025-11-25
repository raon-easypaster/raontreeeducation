import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateDetailedPrompt } from './services/geminiService';
import { PromptOptions, PromptData } from './types';
import { PROMPT_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [promptOptions, setPromptOptions] = useState<PromptOptions>({
    baseIdea: '',
    ...Object.fromEntries(PROMPT_CATEGORIES.map(cat => [cat.id, '자동']))
  } as PromptOptions);
  const [generatedPrompt, setGeneratedPrompt] = useState<PromptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!promptOptions.baseIdea.trim()) {
      setError('이미지의 기본 아이디어를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt(null);

    try {
      const detailedPromptData = await generateDetailedPrompt(promptOptions);
      setGeneratedPrompt(detailedPromptData);
    } catch (err) {
      console.error(err);
      setError('프롬프트 생성에 실패했습니다. API 키를 확인하고 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [promptOptions]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection
            promptOptions={promptOptions}
            setPromptOptions={setPromptOptions}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <OutputSection
            promptData={generatedPrompt}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Google Gemini 제공</p>
      </footer>
    </div>
  );
};

export default App;