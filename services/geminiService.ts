import { GoogleGenAI, Type } from "@google/genai";
import { PromptOptions, PromptData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const promptGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        styleFormat: { type: Type.STRING, description: 'The artistic style and format, e.g., "Cinematic Film Still".' },
        sceneOutline: { type: Type.STRING, description: 'A detailed description of the main subject, their actions, and the environment.' },
        cameraShotComposition: { type: Type.STRING, description: 'The camera shot type and compositional rule, e.g., "Medium shot, rule of thirds".' },
        cameraAngleMovement: { type: Type.STRING, description: 'The camera angle, e.g., "Eye-level angle".' },
        lighting: { type: Type.STRING, description: 'The lighting style of the scene, e.g., "Golden hour, soft volumetric light".' },
        finalPalette: { type: Type.STRING, description: 'The color palette of the image, e.g., "Vibrant and saturated with deep blues and oranges".' },
        finalStyleNotes: { type: Type.STRING, description: 'Additional style keywords and technical details, e.g., "Hyperdetailed, 8K, sharp focus".' },
        fullPrompt: { type: Type.STRING, description: 'A complete, cohesive, single-paragraph prompt combining all elements above into a rich, comma-separated list of phrases.' }
    },
    required: ['styleFormat', 'sceneOutline', 'cameraShotComposition', 'cameraAngleMovement', 'lighting', 'finalPalette', 'finalStyleNotes', 'fullPrompt']
};

export const generateDetailedPrompt = async (options: PromptOptions): Promise<PromptData> => {
    const userOptionsString = Object.entries(options)
        .filter(([key, value]) => key !== 'baseIdea' && value !== '자동')
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n');

    const prompt = `
        You are an expert prompt engineer for advanced text-to-image AI models. 
        Your task is to take a user's simple idea, which will be in Korean, and expand it into a rich, detailed, and structured prompt in English.

        User's Core Idea (in Korean): "${options.baseIdea}"

        ${userOptionsString.length > 0 ? `The user has provided the following specific preferences (in Korean):\n${userOptionsString}` : ''}

        Your goal is to generate a detailed description in English for each prompt category. If a category was not specified by the user, you must creatively fill it in based on the core idea to produce the most visually stunning result. The final combined "fullPrompt" should be a cinematic, evocative, and visually descriptive single paragraph, formatted as a comma-separated list of keywords and phrases in English.

        IMPORTANT: All generated text in the JSON response, including all field values, MUST be in English. This is to ensure compatibility with English-based text-to-image AI models.

        Generate a JSON response that follows the provided schema.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: promptGenerationSchema
        }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as PromptData;
};