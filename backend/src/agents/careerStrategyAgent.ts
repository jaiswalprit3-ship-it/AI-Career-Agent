import { callAIWithRetry } from '../services/aiService';
import {
  ParsedResume,
  RecruiterEvaluation,
  SkillGapAnalysis,
  MarketIntelligence,
  CareerStrategy,
} from '../types';

export async function careerStrategyAgent(
  parsedResume: ParsedResume,
  recruiterEvaluation: RecruiterEvaluation,
  skillGapAnalysis: SkillGapAnalysis,
  marketIntelligence: MarketIntelligence
): Promise<CareerStrategy> {
  const prompt = `You are a senior career advisor. Based on the comprehensive analysis, create strategic career recommendations.

Resume Analysis:
${JSON.stringify(parsedResume, null, 2)}

Recruiter Feedback:
${JSON.stringify(recruiterEvaluation, null, 2)}

Skill Gaps:
${JSON.stringify(skillGapAnalysis, null, 2)}

Market Intelligence:
${JSON.stringify(marketIntelligence, null, 2)}

Provide strategy in this JSON format:
{
  "recommended_career_paths": [
    {
      "path_id": number,
      "role_title": "string",
      "feasibility_score": 0-100,
      "timeline": "string (e.g., '6-12 months')",
      "difficulty": "Easy/Moderate/Challenging",
      "key_actions": ["string"],
      "skills_to_acquire": ["string"],
      "expected_salary_range": "string",
      "pros": ["string"],
      "cons": ["string"],
      "first_steps": ["string"]
    }
  ],
  "immediate_actions": [
    {
      "action": "string",
      "priority": "Critical/High/Medium",
      "effort": "Low/Medium/High",
      "impact": "High/Medium/Low",
      "timeline": "string"
    }
  ],
  "3_month_plan": ["string"],
  "6_month_plan": ["string"],
  "1_year_vision": "string",
  "career_growth_potential": "High/Medium/Low",
  "strategic_summary": "string (3-4 paragraphs)"
}

Be specific, actionable, and realistic in your recommendations.`;

  const systemPrompt = 'You are a senior career advisor who creates strategic, actionable career development plans.';

  const response = await callAIWithRetry<CareerStrategy>(prompt, systemPrompt);
  return response.data;
}
