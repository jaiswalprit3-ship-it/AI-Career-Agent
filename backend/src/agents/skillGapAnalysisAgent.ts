import { callAIWithRetry } from '../services/aiService';
import { ParsedResume, SkillGapAnalysis } from '../types';

export async function skillGapAnalysisAgent(
  parsedResume: ParsedResume
): Promise<SkillGapAnalysis> {
  const currentRole = parsedResume.experience[0]?.title || 'Software Developer';
  const targetRole = currentRole; // Can be made configurable

  const prompt = `You are a career development expert. Analyze this candidate's skills against their target role requirements.

Candidate Skills:
${JSON.stringify(parsedResume.skills, null, 2)}

Current Role: ${currentRole}
Target Role: ${targetRole}

Provide analysis in this JSON format:
{
  "current_skill_level": "Junior/Mid/Senior/Expert",
  "target_role_requirements": {
    "core_skills": ["string"],
    "preferred_skills": ["string"],
    "nice_to_have": ["string"]
  },
  "skill_gaps": {
    "critical_missing": ["string"],
    "important_missing": ["string"],
    "weak_skills": ["string"],
    "outdated_skills": ["string"]
  },
  "skill_strengths": ["string"],
  "skill_match_percentage": 0-100,
  "learning_priority": [
    {
      "skill": "string",
      "importance": "Critical/High/Medium",
      "time_to_learn": "string",
      "recommended_resources": ["string"]
    }
  ],
  "skill_development_roadmap": "string (detailed paragraph)"
}`;

  const systemPrompt = 'You are a career development expert who provides actionable skill gap analysis and learning recommendations.';

  const response = await callAIWithRetry<SkillGapAnalysis>(prompt, systemPrompt);
  return response.data;
}
