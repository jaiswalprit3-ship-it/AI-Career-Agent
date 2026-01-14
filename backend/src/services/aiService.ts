import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_TEMPERATURE = 0.3;
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo'; // Default to a common OpenRouter model

// Lazy initialization of OpenAI client configured for OpenRouter
let openrouterInstance: OpenAI | null = null;

function getOpenRouterClient(): OpenAI {
  if (!openrouterInstance) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const baseURL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is missing. Please set it in your .env file.');
    }
    openrouterInstance = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    });
  }
  return openrouterInstance;
}

export interface AIResponse<T> {
  data: T;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callAI<T>(
  prompt: string,
  systemPrompt?: string,
  temperature: number = DEFAULT_TEMPERATURE
): Promise<AIResponse<T>> {
  try {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: prompt });

    const openai = getOpenRouterClient();

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages,
      temperature,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const parsedData = JSON.parse(content) as T;

    return {
      data: parsedData,
      usage: response.usage ? {
        prompt_tokens: response.usage.prompt_tokens || 0,
        completion_tokens: response.usage.completion_tokens || 0,
        total_tokens: response.usage.total_tokens || 0,
      } : undefined,
    };
  } catch (error) {
    console.error('AI API Error:', error);
    throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function callAIWithRetry<T>(
  prompt: string,
  systemPrompt?: string,
  maxRetries: number = 3
): Promise<AIResponse<T>> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callAI<T>(prompt, systemPrompt);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
}
