import { callAIWithRetry } from '../services/aiService';
import { fetchJobMarketData } from '../services/jobMarketService';
import { ParsedResume, MarketIntelligence } from '../types';

export async function marketIntelligenceAgent(
  parsedResume: ParsedResume
): Promise<MarketIntelligence> {
  const currentRole = parsedResume.experience[0]?.title || 'Software Developer';
  const location = parsedResume.personal_info.location || 'Remote';

  // Fetch market data (mock or real API)
  const marketData = await fetchJobMarketData(currentRole, location);

  const prompt = `You are a labor market analyst. Based on this candidate's profile and current market data, provide intelligence.

Candidate Profile:
${JSON.stringify(parsedResume, null, 2)}

Market Data:
${JSON.stringify(marketData, null, 2)}

Provide analysis in this JSON format:
{
  "market_demand": {
    "overall_demand": "Very High/High/Medium/Low",
    "demand_score": 0-100,
    "job_openings_found": number,
    "demand_trend": "Growing/Stable/Declining"
  },
  "salary_insights": {
    "min": number,
    "median": number,
    "max": number,
    "candidate_market_value": number,
    "currency": "USD"
  },
  "geographic_opportunities": [
    {
      "location": "string",
      "job_count": number,
      "avg_salary": number
    }
  ],
  "top_hiring_companies": ["string"],
  "role_saturation": "Saturated/Competitive/Open",
  "trending_skills_in_market": ["string"],
  "career_feasibility": "Very High/High/Medium/Low",
  "market_insights": "string (detailed paragraph)",
  "recommendations": ["string"]
}`;

  const systemPrompt = 'You are a labor market analyst who provides data-driven insights about job market trends and opportunities.';

  const response = await callAIWithRetry<MarketIntelligence>(prompt, systemPrompt);
  
  // Enhance with real market data
  response.data.salary_insights = {
    ...response.data.salary_insights,
    ...marketData.salary_data,
  };
  response.data.trending_skills_in_market = marketData.trending_skills;
  response.data.market_demand.job_openings_found = marketData.job_postings.length;

  return response.data;
}
