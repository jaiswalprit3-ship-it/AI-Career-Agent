// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
// import { analyzeResume } from '../services/api';
// import { CareerReport } from '../types';

// interface ProcessingScreenProps {
//   sessionId: string;
//   onComplete: (report: CareerReport) => void;
//   onError: () => void;
// }

// const agents = [
//   { name: 'resume_parsing', label: 'Parsing Your Resume...', icon: '🔍' },
//   { name: 'recruiter_simulation', label: 'Simulating Recruiter Review...', icon: '👔' },
//   { name: 'skill_gap_analysis', label: 'Analyzing Skill Gaps...', icon: '📈' },
//   { name: 'market_intelligence', label: 'Checking Market Trends...', icon: '🌍' },
//   { name: 'career_strategy', label: 'Building Career Strategy...', icon: '🎯' },
//   { name: 'explainability', label: 'Generating Insights...', icon: '💬' },
// ];

// export default function ProcessingScreen({ sessionId, onComplete, onError }: ProcessingScreenProps) {
//   const [currentAgent, setCurrentAgent] = useState(0);
//   const [error, setError] = useState<string | null>(null);
//   const [estimatedTime, setEstimatedTime] = useState(60); // seconds

//   useEffect(() => {
//     let progressInterval: NodeJS.Timeout | null = null;
//     let timerInterval: NodeJS.Timeout | null = null;
//     let isMounted = true;

//     const startAnalysis = async () => {
//       try {
//         // Simulate agent progress
//         progressInterval = setInterval(() => {
//           if (isMounted) {
//             setCurrentAgent((prev) => {
//               if (prev < agents.length - 1) {
//                 return prev + 1;
//               }
//               return prev;
//             });
//           }
//         }, 8000); // Switch agent every 8 seconds

//         const result = await analyzeResume(sessionId);
        
//         if (progressInterval) {
//           clearInterval(progressInterval);
//         }
        
//         if (isMounted) {
//           setCurrentAgent(agents.length - 1);
          
//           // Small delay to show completion, then navigate
//           setTimeout(() => {
//             if (isMounted && result.report) {
//               onComplete(result.report);
//             }
//           }, 1000);
//         }
//       } catch (err) {
//         if (progressInterval) {
//           clearInterval(progressInterval);
//         }
        
//         if (isMounted) {
//           const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
//           setError(errorMessage);
          
//           // Don't auto-navigate on error, let user see the error and choose
//           // Remove the auto-navigation timeout
//         }
//       }
//     };

//     startAnalysis();

//     // Countdown timer
//     timerInterval = setInterval(() => {
//       if (isMounted) {
//         setEstimatedTime((prev) => {
//           if (prev <= 1) {
//             if (timerInterval) {
//               clearInterval(timerInterval);
//             }
//             return 0;
//           }
//           return prev - 1;
//         });
//       }
//     }, 1000);

//     return () => {
//       isMounted = false;
//       if (progressInterval) {
//         clearInterval(progressInterval);
//       }
//       if (timerInterval) {
//         clearInterval(timerInterval);
//       }
//     };
//   }, [sessionId, onComplete, onError]);

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
//         >
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <div className="flex gap-4 justify-center">
//             <button
//               onClick={() => {
//                 setError(null);
//                 window.location.href = '/upload';
//               }}
//               className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
//             >
//               Try Again
//             </button>
//             <button
//               onClick={() => {
//                 window.location.href = '/';
//               }}
//               className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//             >
//               Go Home
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-12 max-w-2xl w-full">
//         <div className="text-center mb-8">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
//             className="inline-block mb-6"
//           >
//             <Loader2 className="w-16 h-16 text-primary" />
//           </motion.div>
//           <h2 className="text-3xl font-bold mb-4">Analyzing Your Resume</h2>
//           <p className="text-gray-600">Our AI agents are working hard to provide you with comprehensive insights</p>
//         </div>

//         <div className="space-y-4 mb-8">
//           <AnimatePresence mode="wait">
//             {agents.map((agent, index) => {
//               const isActive = index === currentAgent;
//               const isCompleted = index < currentAgent;
//               const isPending = index > currentAgent;

//               return (
//                 <motion.div
//                   key={agent.name}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
//                     isActive
//                       ? 'bg-primary/10 border-2 border-primary'
//                       : isCompleted
//                       ? 'bg-success/10 border-2 border-success'
//                       : 'bg-gray-100 border-2 border-transparent'
//                   }`}
//                 >
//                   <div className="text-2xl">{agent.icon}</div>
//                   <div className="flex-1">
//                     <p className={`font-semibold ${
//                       isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-gray-500'
//                     }`}>
//                       {agent.label}
//                     </p>
//                   </div>
//                   {isActive && (
//                     <Loader2 className="w-5 h-5 text-primary animate-spin" />
//                   )}
//                   {isCompleted && (
//                     <CheckCircle2 className="w-5 h-5 text-success" />
//                   )}
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>

//         <div className="text-center">
//           <p className="text-sm text-gray-500">
//             Estimated time remaining: {Math.max(0, estimatedTime)} seconds
//           </p>
//           <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
//             <motion.div
//               className="bg-primary h-2 rounded-full"
//               initial={{ width: 0 }}
//               animate={{ width: `${((currentAgent + 1) / agents.length) * 100}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeResume } from '../services/api';
import { CareerReport } from '../types';

interface ProcessingScreenProps {
  sessionId: string;
  onComplete: (report: CareerReport) => void;
  onError: () => void;
}

const agents = [
  { name: 'resume_parsing', label: 'Parsing Your Resume...', icon: '🔍' },
  { name: 'recruiter_simulation', label: 'Simulating Recruiter Review...', icon: '👔' },
  { name: 'skill_gap_analysis', label: 'Analyzing Skill Gaps...', icon: '📈' },
  { name: 'market_intelligence', label: 'Checking Market Trends...', icon: '🌍' },
  { name: 'career_strategy', label: 'Building Career Strategy...', icon: '🎯' },
  { name: 'explainability', label: 'Generating Insights...', icon: '💬' },
];

export default function ProcessingScreen({
  sessionId,
  onComplete,
  onError,
}: ProcessingScreenProps) {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState(60);

  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval> | null = null;
    let timerInterval: ReturnType<typeof setInterval> | null = null;
    let isMounted = true;

    const startAnalysis = async () => {
      try {
        progressInterval = setInterval(() => {
          if (!isMounted) return;
          setCurrentAgent((prev) =>
            prev < agents.length - 1 ? prev + 1 : prev
          );
        }, 8000);

        const result = await analyzeResume(sessionId);

        if (progressInterval) clearInterval(progressInterval);

        if (isMounted && result.report) {
          setCurrentAgent(agents.length - 1);
          setTimeout(() => {
            if (isMounted) {
              onComplete(result.report);
            }
          }, 1000);
        }
      } catch (err) {
        if (progressInterval) clearInterval(progressInterval);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Analysis failed');
          onError();
        }
      }
    };

    startAnalysis();

    timerInterval = setInterval(() => {
      if (!isMounted) return;
      setEstimatedTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      isMounted = false;
      if (progressInterval) clearInterval(progressInterval);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [sessionId, onComplete, onError]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => (window.location.href = '/upload')}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <Loader2 className="w-16 h-16 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Analyzing Your Resume</h2>
          <p className="text-gray-600">
            Our AI agents are working hard to generate insights
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {agents.map((agent, index) => {
              const isActive = index === currentAgent;
              const isCompleted = index < currentAgent;

              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                    isActive
                      ? 'bg-primary/10 border-primary'
                      : isCompleted
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-100 border-transparent'
                  }`}
                >
                  <div className="text-2xl">{agent.icon}</div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        isActive
                          ? 'text-primary'
                          : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {agent.label}
                    </p>
                  </div>
                  {isActive && (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )}
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Estimated time remaining: {estimatedTime} seconds
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentAgent + 1) / agents.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
