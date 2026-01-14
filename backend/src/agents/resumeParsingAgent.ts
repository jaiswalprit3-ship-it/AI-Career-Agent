import { callAIWithRetry } from '../services/aiService';
import { ParsedResume } from '../types';

export async function parseResumeAgent(resumeText: string): Promise<ParsedResume> {
  const prompt = `You are a resume parsing expert. Extract the following information from this resume in JSON format:

{
  "personal_info": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string"
  },
  "summary": "string",
  "skills": {
    "technical": ["string"],
    "soft": ["string"],
    "tools": ["string"],
    "languages": ["string"]
  },
  "experience": [
    {
      "title": "string",
      "company": "string",
      "duration": "string",
      "responsibilities": ["string"],
      "achievements": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string",
      "gpa": "string"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string"],
      "link": "string"
    }
  ],
  "certifications": ["string"]
}

Resume Text:
${resumeText}

Return only valid JSON, no additional text.`;

  const systemPrompt = 'You are an expert at parsing resumes and extracting structured data. Always return valid JSON.';

  const response = await callAIWithRetry<ParsedResume>(prompt, systemPrompt);
  return response.data;
}
