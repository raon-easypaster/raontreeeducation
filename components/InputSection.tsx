import React from 'react';
import { PromptOptions } from '../types';
import { PROMPT_CATEGORIES } from '../constants';
import { SelectInput } from './SelectInput';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';

interface InputSectionProps {
  promptOptions: PromptOptions;
  setPromptOptions: React.Dispatch<React.SetStateAction<PromptOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ promptOptions, setPromptOptions, onGenerate, isLoading }) => {
  
  const handleOptionChange = (id: string, value: string) => {
    setPromptOptions(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-indigo-300">1. 기본 아이디어로 시작하기</h2>
        <p className="text-sm text-gray-400 mb-4">간단한 컨셉을 입력하면 AI가 이를 바탕으로 프롬프트를 구성합니다. 구체적일수록 좋습니다.</p>
        <textarea
          value={promptOptions.baseIdea}
          onChange={(e) => handleOptionChange('baseIdea', e.target.value)}
          placeholder="예: 마법 도서관에서 책을 읽는 늙고 현명한 부엉이, 해질녘의 미래 도시 스카이라인, 붉은 행성에 홀로 있는 우주비행사"
          className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-indigo-300">2. 프롬프트 맞춤 설정 (선택 사항)</h2>
        <p className="text-sm text-gray-400 mb-4">특정 속성을 선택하거나 '자동'으로 두어 AI가 결정하게 할 수 있습니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMPT_CATEGORIES.map(category => (
            <SelectInput
              key={category.id}
              label={category.label}
              value={promptOptions[category.id]}
              onChange={(e) => handleOptionChange(category.id, e.target.value)}
              options={category.options}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <Button onClick={onGenerate} disabled={isLoading || !promptOptions.baseIdea} className="w-full">
          {isLoading ? <><LoadingSpinner /> 설계 중...</> : '프롬프트 설계하기'}
        </Button>
      </div>
    </div>
  );
};