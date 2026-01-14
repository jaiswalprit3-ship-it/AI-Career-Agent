export interface ParsedResume {
  personal_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    responsibilities: string[];
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications?: string[];
}

export interface RecruiterEvaluation {
  decision: "ACCEPT" | "IMPROVE" | "REJECT";
  overall_score: number;
  ats_score: number;
  human_appeal_score: number;
  strengths: string[];
  weaknesses: string[];
  rejection_reasons?: string[];
  improvement_suggestions: string[];
  resume_quality: {
    formatting: "Good" | "Average" | "Poor";
    clarity: "Good" | "Average" | "Poor";
    impact: "Good" | "Average" | "Poor";
    keywords: "Good" | "Average" | "Poor";
  };
  hiring_likelihood: "High" | "Medium" | "Low";
  detailed_feedback: string;
}

export interface SkillGapAnalysis {
  current_skill_level: "Junior" | "Mid" | "Senior" | "Expert";
  target_role_requirements: {
    core_skills: string[];
    preferred_skills: string[];
    nice_to_have: string[];
  };
  skill_gaps: {
    critical_missing: string[];
    important_missing: string[];
    weak_skills: string[];
    outdated_skills: string[];
  };
  skill_strengths: string[];
  skill_match_percentage: number;
  learning_priority: Array<{
    skill: string;
    importance: "Critical" | "High" | "Medium";
    time_to_learn: string;
    recommended_resources: string[];
  }>;
  skill_development_roadmap: string;
}

export interface MarketIntelligence {
  market_demand: {
    overall_demand: "Very High" | "High" | "Medium" | "Low";
    demand_score: number;
    job_openings_found: number;
    demand_trend: "Growing" | "Stable" | "Declining";
  };
  salary_insights: {
    min: number;
    median: number;
    max: number;
    candidate_market_value: number;
    currency: string;
  };
  geographic_opportunities: Array<{
    location: string;
    job_count: number;
    avg_salary: number;
  }>;
  top_hiring_companies: string[];
  role_saturation: "Saturated" | "Competitive" | "Open";
  trending_skills_in_market: string[];
  career_feasibility: "Very High" | "High" | "Medium" | "Low";
  market_insights: string;
  recommendations: string[];
}

export interface CareerPath {
  path_id: number;
  role_title: string;
  feasibility_score: number;
  timeline: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  key_actions: string[];
  skills_to_acquire: string[];
  expected_salary_range: string;
  pros: string[];
  cons: string[];
  first_steps: string[];
}

export interface CareerStrategy {
  recommended_career_paths: CareerPath[];
  immediate_actions: Array<{
    action: string;
    priority: "Critical" | "High" | "Medium";
    effort: "Low" | "Medium" | "High";
    impact: "High" | "Medium" | "Low";
    timeline: string;
  }>;
  "3_month_plan": string[];
  "6_month_plan": string[];
  "1_year_vision": string;
  career_growth_potential: "High" | "Medium" | "Low";
  strategic_summary: string;
}

export interface Explainability {
  key_questions: Array<{
    question: string;
    answer: string;
    evidence: string[];
  }>;
  methodology: string;
  data_sources: string[];
  confidence_level: "High" | "Medium" | "Low";
  limitations: string[];
  how_to_use_report: string;
}

export interface CareerReport {
  session_id: string;
  parsed_resume: ParsedResume;
  recruiter_evaluation: RecruiterEvaluation;
  skill_gap_analysis: SkillGapAnalysis;
  market_intelligence: MarketIntelligence;
  career_strategy: CareerStrategy;
  explainability: Explainability;
  created_at: string;
}

export interface AgentProgress {
  agent_name: string;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  message: string;
}
