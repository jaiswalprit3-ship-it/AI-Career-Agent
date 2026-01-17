import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  MapPin,
  Building2,
  Target,
  Lightbulb,
  Mail,
} from 'lucide-react';
import { CareerReport as CareerReportType } from '../types';
import { getScoreColor, getDecisionColor, formatCurrency, cn } from '../utils/helpers';
import AgentCard from './AgentCard';
import SkillsChart from './SkillsChart';
import ReportDownload from './ReportDownload';
import ShareReport from './ShareReport';

interface CareerReportProps {
  report: CareerReportType;
  onNewAnalysis: () => void;
}

export default function CareerReport({ report, onNewAnalysis }: CareerReportProps) {
  const navigate = useNavigate();
  const [showDownload, setShowDownload] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const {
    parsed_resume,
    recruiter_evaluation,
    skill_gap_analysis,
    market_intelligence,
    career_strategy,
    explainability,
  } = report;

  const overallScore = recruiter_evaluation.overall_score;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                onNewAnalysis();
                navigate('/');
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>New Analysis</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowShare(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => setShowDownload(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div id="career-report-root">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">
                {parsed_resume.personal_info.name || 'Your Career Report'}
              </h1>
              <p className="text-xl text-gray-600">
                {parsed_resume.experience[0]?.title || 'Aspiring Professional'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                {parsed_resume.personal_info.location && (
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {parsed_resume.personal_info.location}</span>
                )}
                {parsed_resume.personal_info.email && (
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {parsed_resume.personal_info.email}</span>
                )}
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className={cn('text-6xl font-bold mb-2', getScoreColor(overallScore))}>
                {overallScore}
              </div>
              <div className="text-sm text-gray-500">Overall Career Score</div>
            </div>
          </div>
          {parsed_resume.summary && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <p className="text-gray-700 whitespace-pre-line">{parsed_resume.summary}</p>
            </div>
          )}
        </motion.div>

        {/* Recruiter Simulation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <AgentCard
            title="Recruiter Simulation"
            icon={<CheckCircle className="w-6 h-6" />}
            status={recruiter_evaluation.decision}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className={cn('px-4 py-2 rounded-full font-semibold', getDecisionColor(recruiter_evaluation.decision))}>
                  {recruiter_evaluation.decision}
                </span>
                <span className="text-gray-600">
                  Hiring Likelihood: <strong>{recruiter_evaluation.hiring_likelihood}</strong>
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {recruiter_evaluation.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {recruiter_evaluation.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{recruiter_evaluation.detailed_feedback}</p>
              </div>
            </div>
          </AgentCard>
        </motion.section>

        {/* Skill Gap Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <AgentCard
            title="Skill Gap Analysis"
            icon={<TrendingUp className="w-6 h-6" />}
            status="completed"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-xl font-semibold">{skill_gap_analysis.current_skill_level}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Skill Match</p>
                  <p className={cn('text-3xl font-bold', getScoreColor(skill_gap_analysis.skill_match_percentage))}>
                    {skill_gap_analysis.skill_match_percentage}%
                  </p>
                </div>
              </div>

              <div className="pt-4 pb-6">
                <SkillsChart skillGapAnalysis={skill_gap_analysis} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50/10 rounded-lg p-4 border border-red-200">
                  <h3 className="font-semibold mb-3 text-red-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> Critical Missing Skills
                  </h3>
                  <ul className="space-y-1">
                    {skill_gap_analysis.skill_gaps.critical_missing.length > 0 ? (
                      skill_gap_analysis.skill_gaps.critical_missing.map((skill, idx) => (
                        <li key={idx} className="text-sm text-red-700">• {skill}</li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-600">No critical missing skills identified.</li>
                    )}
                  </ul>
                </div>
                <div className="bg-green-50/10 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Your Strengths
                  </h3>
                  <ul className="space-y-1">
                    {skill_gap_analysis.skill_strengths.length > 0 ? (
                      skill_gap_analysis.skill_strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-green-700">• {strength}</li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-600">No specific strengths highlighted.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </AgentCard>
        </motion.section>

        {/* Market Intelligence */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <AgentCard
            title="Market Intelligence"
            icon={<MapPin className="w-6 h-6" />}
            status="completed"
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Market Demand</p>
                  <p className="text-2xl font-bold text-primary">{market_intelligence.market_demand.overall_demand}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Job Openings</p>
                  <p className="text-2xl font-bold text-success">{market_intelligence.market_demand.job_openings_found}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Market Value</p>
                  <p className="text-2xl font-bold text-secondary">
                    {formatCurrency(market_intelligence.salary_insights.candidate_market_value)}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Top Hiring Companies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {market_intelligence.top_hiring_companies.map((company, idx) => (
                    <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Salary Range</h3>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">
                    {formatCurrency(market_intelligence.salary_insights.min)} - {formatCurrency(market_intelligence.salary_insights.max)}
                  </span>
                  <span className="text-gray-500">Median: {formatCurrency(market_intelligence.salary_insights.median)}</span>
                </div>
              </div>
            </div>
          </AgentCard>
        </motion.section>

        {/* Career Strategy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <AgentCard
            title="Career Strategy"
            icon={<Target className="w-6 h-6" />}
            status="completed"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Recommended Career Paths</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {career_strategy.recommended_career_paths.map((path) => (
                  <div key={path.path_id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{path.role_title}</h4>
                      <span className={cn('px-3 py-1 rounded-full text-sm font-semibold', getScoreColor(path.feasibility_score))}>
                        {path.feasibility_score}% Feasible
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Timeline: {path.timeline}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">First Steps:</p>
                      <ul className="space-y-1">
                        {path.first_steps.slice(0, 3).map((step, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AgentCard>
        </motion.section>

        {/* Explainability */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <AgentCard
            title="AI Explainability"
            icon={<Lightbulb className="w-6 h-6" />}
            status="completed"
          >
            <div className="space-y-4">
              {explainability.key_questions.map((qa, idx) => (
                <details key={idx} className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer">{qa.question}</summary>
                  <div className="mt-3 text-gray-700">
                    <p className="mb-2">{qa.answer}</p>
                    {qa.evidence.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold mb-1">Evidence:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {qa.evidence.map((ev, evIdx) => (
                            <li key={evIdx}>{ev}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </AgentCard>
        </motion.section>
      </div>
    </div>
      
      {showDownload && (
        <ReportDownload onClose={() => setShowDownload(false)} />
      )}

      {showShare && (
        <ShareReport report={report} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Download,
//   Share2,
//   ArrowLeft,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   TrendingUp,
//   MapPin,
//   Building2,
//   Target,
//   Lightbulb,
//   Mail,
// } from 'lucide-react';
// import { CareerReport as CareerReportType } from '../types';
// import { getScoreColor, getDecisionColor, formatCurrency, cn } from '../utils/helpers';
// import AgentCard from './AgentCard';
// import SkillsChart from './SkillsChart';
// import ReportDownload from './ReportDownload';
// import ShareReport from './ShareReport';

// interface CareerReportProps {
//   report: CareerReportType;
//   onNewAnalysis: () => void;
// }

// export default function CareerReport({ report, onNewAnalysis }: CareerReportProps) {
//   const navigate = useNavigate();
//   const [showDownload, setShowDownload] = useState(false);
//   const [showShare, setShowShare] = useState(false);

//   const {
//     parsed_resume,
//     recruiter_evaluation,
//     skill_gap_analysis,
//     market_intelligence,
//     career_strategy,
//     explainability,
//   } = report;

//   const overallScore = recruiter_evaluation.overall_score;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => {
//                 onNewAnalysis();
//                 navigate('/');
//               }}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>New Analysis</span>
//             </button>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setShowShare(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//               >
//                 <Share2 className="w-4 h-4" />
//                 Share
//               </button>
//               <button
//                 onClick={() => setShowDownload(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
//               >
//                 <Download className="w-4 h-4" />
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ ROOT FOR PDF */}
//       <div id="career-report-root">
//         <div className="container mx-auto px-4 py-8 max-w-6xl">

//           {/* Hero Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-lg p-8 mb-8"
//           >
//             <div className="flex flex-col md:flex-row justify-between gap-6">
//               <div>
//                 <h1 className="text-4xl font-bold text-gray-800">
//                   {parsed_resume.personal_info.name}
//                 </h1>
//                 <p className="text-xl text-gray-600">
//                   {parsed_resume.experience[0]?.title || 'Aspiring Professional'}
//                 </p>
//                 <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
//                   {parsed_resume.personal_info.location && (
//                     <span className="flex items-center gap-1">
//                       <MapPin className="w-4 h-4" />
//                       {parsed_resume.personal_info.location}
//                     </span>
//                   )}
//                   {parsed_resume.personal_info.email && (
//                     <span className="flex items-center gap-1">
//                       <Mail className="w-4 h-4" />
//                       {parsed_resume.personal_info.email}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className={cn('text-6xl font-bold', getScoreColor(overallScore))}>
//                   {overallScore}
//                 </div>
//                 <div className="text-sm text-gray-500">Overall Career Score</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Recruiter Simulation */}
//           <motion.section className="mb-8">
//             <AgentCard
//               title="Recruiter Simulation"
//               icon={<CheckCircle className="w-6 h-6" />}
//               status={recruiter_evaluation.decision}
//             >
//               {/* unchanged */}
//             </AgentCard>
//           </motion.section>

//           {/* Skill Gap */}
//           <motion.section className="mb-8">
//             <AgentCard title="Skill Gap Analysis" icon={<TrendingUp />} status="completed">
//               <SkillsChart skillGapAnalysis={skill_gap_analysis} />
//             </AgentCard>
//           </motion.section>

//           {/* Market */}
//           <motion.section className="mb-8">
//             <AgentCard title="Market Intelligence" icon={<MapPin />} status="completed">
//               {/* unchanged */}
//             </AgentCard>
//           </motion.section>

//           {/* Career Strategy */}
//           <motion.section className="mb-8">
//             <AgentCard title="Career Strategy" icon={<Target />} status="completed">
//               {/* unchanged */}
//             </AgentCard>
//           </motion.section>

//           {/* ✅ AI Explainability — PDF HIDES THIS */}
//           <motion.section
//             id="ai-explainability-section"
//             className="mb-8"
//           >
//             <AgentCard
//               title="AI Explainability"
//               icon={<Lightbulb className="w-6 h-6" />}
//               status="completed"
//             >
//               <div className="space-y-4">
//                 {explainability.key_questions.map((qa, idx) => (
//                   <details key={idx} className="bg-gray-50 p-4 rounded-lg">
//                     <summary className="font-semibold">{qa.question}</summary>
//                     <p className="mt-2">{qa.answer}</p>
//                   </details>
//                 ))}
//               </div>
//             </AgentCard>
//           </motion.section>

//         </div>
//       </div>

//       {showDownload && (
//         <ReportDownload onClose={() => setShowDownload(false)} />
//       )}
//       {showShare && (
//         <ShareReport report={report} onClose={() => setShowShare(false)} />
//       )}
//     </div>
//   );
// }
