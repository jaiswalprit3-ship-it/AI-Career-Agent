// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import ResumeUpload from './components/ResumeUpload';
// import ProcessingScreen from './components/ProcessingScreen';
// import CareerReport from './components/CareerReport';
// import { CareerReport as CareerReportType } from './types';
// import { getSharedReport } from './services/api';

// function AppContent() {
//   const navigate = useNavigate();
//   const [report, setReport] = useState<CareerReportType | null>(() => {
//     // Try to load report from sessionStorage on mount
//     const savedReport = sessionStorage.getItem('careerReport');
//     if (savedReport) {
//       try {
//         const parsedReport = JSON.parse(savedReport);
//         console.log('App: Loading report from sessionStorage:', parsedReport);
//         return parsedReport;
//       } catch (e) {
//         console.error('App: Error parsing report from sessionStorage:', e);
//         return null;
//       }
//     }
//     console.log('App: No report found in sessionStorage.');
//     return null;
//   });

//   // Save report to sessionStorage whenever it changes
//   useEffect(() => {
//     if (report) {
//       console.log('App: Saving report to sessionStorage:', report);
//       sessionStorage.setItem('careerReport', JSON.stringify(report));
//     } else {
//       console.log('App: Clearing report from sessionStorage.');
//       sessionStorage.removeItem('careerReport');
//     }
//   }, [report]);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <LandingPage
//             onGetStarted={() => {
//               setReport(null);
//               navigate('/upload');
//             }}
//           />
//         }
//       />
//       <Route
//         path="/upload"
//         element={
//           <ResumeUpload
//             onUploadComplete={(sessionId) => {
//               navigate(`/processing?sessionId=${sessionId}`);
//             }}
//           />
//         }
//       />
//       <Route
//         path="/processing"
//         element={
//           <ProcessingScreenWrapper
//             onComplete={(reportData) => {
//               setReport(reportData);
//               // Use replace to prevent going back to processing screen
//               navigate('/report', { replace: true });
//             }}
//             onError={() => {
//               navigate('/upload', { replace: true });
//             }}
//           />
//         }
//       />
//       <Route
//         path="/report"
//         element={
//           report ? (
//             <CareerReport
//               report={report}
//               onNewAnalysis={() => {
//                 setReport(null);
//                 navigate('/');
//               }}
//             />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//       <Route
//         path="/share/:shareId"
//         element={<SharedReportWrapper />}
//       />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// function ProcessingScreenWrapper({
//   onComplete,
//   onError,
// }: {
//   onComplete: (report: CareerReportType) => void;
//   onError: () => void;
// }) {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const sessionId = searchParams.get('sessionId');

//   if (!sessionId) {
//     return <Navigate to="/upload" replace />;
//   }

//   return (
//     <ProcessingScreen
//       sessionId={sessionId}
//       onComplete={onComplete}
//       onError={onError}
//     />
//   );
// }

// function SharedReportWrapper() {
//   const { shareId } = useParams<{ shareId: string }>();
//   const [report, setReport] = useState<CareerReportType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (shareId) {
//       getSharedReport(shareId)
//         .then((data) => {
//           setReport(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err instanceof Error ? err.message : 'Failed to load report');
//           setLoading(false);
//         });
//     } else {
//       setError('Invalid share link');
//       setLoading(false);
//     }
//   }, [shareId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <p>Loading shared report...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !report) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">{error || 'Report not found'}</p>
//           <a href="/" className="text-primary hover:underline">Go to Home</a>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <CareerReport
//       report={report}
//       onNewAnalysis={() => {
//         window.location.href = '/';
//       }}
//     />
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ResumeUpload from './components/ResumeUpload';
import ProcessingScreen from './components/ProcessingScreen';
import CareerReport from './components/CareerReport';
import { CareerReport as CareerReportType } from './types';
import { getSharedReport } from './services/api';

function AppContent() {
  const navigate = useNavigate();
  const [report, setReport] = useState<CareerReportType | null>(() => {
    const savedReport = sessionStorage.getItem('careerReport');
    if (savedReport) {
      try {
        return JSON.parse(savedReport) as CareerReportType;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (report) {
      sessionStorage.setItem('careerReport', JSON.stringify(report));
    } else {
      sessionStorage.removeItem('careerReport');
    }
  }, [report]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onGetStarted={() => {
              setReport(null);
              navigate('/upload');
            }}
          />
        }
      />

      <Route path="/upload" element={<ResumeUpload />} />

      <Route
        path="/processing"
        element={
          <ProcessingScreenWrapper
            onComplete={(reportData) => {
              setReport(reportData);
              navigate('/report', { replace: true });
            }}
            onError={() => {
              navigate('/upload', { replace: true });
            }}
          />
        }
      />

      <Route
        path="/report"
        element={
          report ? (
            <CareerReport
              report={report}
              onNewAnalysis={() => {
                setReport(null);
                navigate('/');
              }}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="/share/:shareId" element={<SharedReportWrapper />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ProcessingScreenWrapper({
  onComplete,
  onError,
}: {
  onComplete: (report: CareerReportType) => void;
  onError: () => void;
}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return <Navigate to="/upload" replace />;
  }

  return (
    <ProcessingScreen
      sessionId={sessionId}
      onComplete={onComplete}
      onError={onError}
    />
  );
}

function SharedReportWrapper() {
  const { shareId } = useParams<{ shareId: string }>();
  const [report, setReport] = useState<CareerReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shareId) {
      setError('Invalid share link');
      setLoading(false);
      return;
    }

    getSharedReport(shareId)
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load report');
        setLoading(false);
      });
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading shared report...</p>
        </div>
      </div>
    );
  }

  if (!report || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || 'Report not found'}
          </p>
          <a href="/" className="text-primary hover:underline">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <CareerReport
      report={report}
      onNewAnalysis={() => {
        window.location.href = '/';
      }}
    />
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

