import { callAIWithRetry } from '../services/aiService';
import {
  ParsedResume,
  RecruiterEvaluation,
  SkillGapAnalysis,
  MarketIntelligence,
  CareerStrategy,
  Explainability,
} from '../types';

export async function explainabilityAgent(
  parsedResume: ParsedResume,
  recruiterEvaluation: RecruiterEvaluation,
  skillGapAnalysis: SkillGapAnalysis,
  marketIntelligence: MarketIntelligence,
  careerStrategy: CareerStrategy
): Promise<Explainability> {
  const prompt = `You are an AI transparency expert. Explain the reasoning behind the career analysis in simple, clear language.

Analysis Results:
Resume: ${JSON.stringify(parsedResume, null, 2)}
Recruiter Evaluation: ${JSON.stringify(recruiterEvaluation, null, 2)}
Skill Gap Analysis: ${JSON.stringify(skillGapAnalysis, null, 2)}
Market Intelligence: ${JSON.stringify(marketIntelligence, null, 2)}
Career Strategy: ${JSON.stringify(careerStrategy, null, 2)}

Provide explanations in this JSON format:
{
  "key_questions": [
    {
      "question": "Why was my resume rejected/accepted?",
      "answer": "string (clear, specific explanation)",
      "evidence": ["string"]
    },
    {
      "question": "Why do these specific skills matter?",
      "answer": "string",
      "evidence": ["string"]
    },
    {
      "question": "Why were these career paths recommended?",
      "answer": "string",
      "evidence": ["string"]
    },
    {
      "question": "How accurate is this analysis?",
      "answer": "string",
      "evidence": ["string"]
    }
  ],
  "methodology": "string (explain how analysis was performed)",
  "data_sources": ["string"],
  "confidence_level": "High/Medium/Low",
  "limitations": ["string"],
  "how_to_use_report": "string (guidance paragraph)"
}

Be transparent, honest, and educational in your explanations.`;

  const systemPrompt = 'You are an AI transparency expert who explains complex analyses in simple, understandable terms.';

  const response = await callAIWithRetry<Explainability>(prompt, systemPrompt);
  return response.data;
}
