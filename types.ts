export interface PromptOptions {
  baseIdea: string;
  styleFormat: string;
  sceneOutline: string;
  cameraShotComposition: string;
  cameraAngleMovement: string;
  lighting: string;
  finalPalette: string;
  finalStyleNotes: string;
  aspectRatio: string;
  [key: string]: string;
}

export interface PromptData {
  styleFormat: string;
  sceneOutline: string;
  cameraShotComposition: string;
  cameraAngleMovement: string;
  lighting: string;
  finalPalette: string;
  finalStyleNotes: string;
  fullPrompt: string;
}

export interface PromptCategory {
    // Fix: Constrain `id` to be of type string. The index signature on `PromptOptions`
    // caused `keyof` to resolve to `string | number`, leading to a type error in
    // `components/InputSection.tsx` where a string was expected. `Extract` filters
    // the union type to only include strings.
    id: Extract<keyof Omit<PromptOptions, 'baseIdea'>, string>;
    label: string;
    placeholder: string;
    options: string[];
}