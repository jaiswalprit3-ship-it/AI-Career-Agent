import { callAIWithRetry } from '../services/aiService';
import { ParsedResume, RecruiterEvaluation } from '../types';

export async function recruiterSimulationAgent(
  parsedResume: ParsedResume
): Promise<RecruiterEvaluation> {
  const prompt = `You are an experienced technical recruiter and ATS system. Evaluate this candidate's resume and provide a hiring decision.

Candidate Data:
${JSON.stringify(parsedResume, null, 2)}

Provide your evaluation in this JSON format:
{
  "decision": "ACCEPT" | "IMPROVE" | "REJECT",
  "overall_score": 0-100,
  "ats_score": 0-100,
  "human_appeal_score": 0-100,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "rejection_reasons": ["string"] (if applicable),
  "improvement_suggestions": ["string"],
  "resume_quality": {
    "formatting": "Good/Average/Poor",
    "clarity": "Good/Average/Poor",
    "impact": "Good/Average/Poor",
    "keywords": "Good/Average/Poor"
  },
  "hiring_likelihood": "High/Medium/Low",
  "detailed_feedback": "string (2-3 paragraphs)"
}

Be honest, direct, and actionable in your feedback.`;

  const systemPrompt = 'You are an experienced recruiter who evaluates resumes objectively and provides constructive feedback.';

  const response = await callAIWithRetry<RecruiterEvaluation>(prompt, systemPrompt);
  return response.data;
}
