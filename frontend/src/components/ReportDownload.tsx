// import { jsPDF } from 'jspdf';
// import { X } from 'lucide-react';
// import { CareerReport as CareerReportType } from '../types';
// import { formatCurrency, formatDate } from '../utils/helpers';

// interface ReportDownloadProps {
//   report: CareerReportType;
//   onClose: () => void;
// }

// export default function ReportDownload({ report, onClose }: ReportDownloadProps) {
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     let yPosition = 20;

//     // Helper function to add new page if needed
//     const checkPageBreak = (requiredSpace: number) => {
//       if (yPosition + requiredSpace > pageHeight - 20) {
//         doc.addPage();
//         yPosition = 20;
//       }
//     };

//     // Title
//     doc.setFontSize(24);
//     doc.setTextColor(37, 99, 235); // Primary blue
//     doc.text('Career Intelligence Report', pageWidth / 2, yPosition, { align: 'center' });
//     yPosition += 15;

//     // Candidate Info
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Candidate: ${report.parsed_resume.personal_info.name}`, 20, yPosition);
//     yPosition += 10;
//     doc.setFontSize(12);
//     doc.text(`Role: ${report.parsed_resume.experience[0]?.title || 'Professional'}`, 20, yPosition);
//     yPosition += 10;
//     doc.text(`Generated: ${formatDate(report.created_at)}`, 20, yPosition);
//     yPosition += 15;

//     // Overall Score
//     checkPageBreak(20);
//     doc.setFontSize(18);
//     doc.text(`Overall Career Score: ${report.recruiter_evaluation.overall_score}/100`, 20, yPosition);
//     yPosition += 15;

//     // Recruiter Evaluation
//     checkPageBreak(40);
//     doc.setFontSize(16);
//     doc.text('Recruiter Simulation', 20, yPosition);
//     yPosition += 10;
//     doc.setFontSize(12);
//     doc.text(`Decision: ${report.recruiter_evaluation.decision}`, 20, yPosition);
//     yPosition += 8;
//     doc.text(`Hiring Likelihood: ${report.recruiter_evaluation.hiring_likelihood}`, 20, yPosition);
//     yPosition += 10;
//     const feedbackLines = doc.splitTextToSize(report.recruiter_evaluation.detailed_feedback, pageWidth - 40);
//     doc.text(feedbackLines, 20, yPosition);
//     yPosition += feedbackLines.length * 6 + 10;

//     // Skill Gap Analysis
//     checkPageBreak(30);
//     doc.setFontSize(16);
//     doc.text('Skill Gap Analysis', 20, yPosition);
//     yPosition += 10;
//     doc.setFontSize(12);
//     doc.text(`Current Level: ${report.skill_gap_analysis.current_skill_level}`, 20, yPosition);
//     yPosition += 8;
//     doc.text(`Skill Match: ${report.skill_gap_analysis.skill_match_percentage}%`, 20, yPosition);
//     yPosition += 10;
//     doc.text('Critical Missing Skills:', 20, yPosition);
//     yPosition += 8;
//     report.skill_gap_analysis.skill_gaps.critical_missing.forEach((skill) => {
//       doc.text(`• ${skill}`, 25, yPosition);
//       yPosition += 6;
//     });
//     yPosition += 5;

//     // Market Intelligence
//     checkPageBreak(30);
//     doc.setFontSize(16);
//     doc.text('Market Intelligence', 20, yPosition);
//     yPosition += 10;
//     doc.setFontSize(12);
//     doc.text(`Market Demand: ${report.market_intelligence.market_demand.overall_demand}`, 20, yPosition);
//     yPosition += 8;
//     doc.text(`Job Openings: ${report.market_intelligence.market_demand.job_openings_found}`, 20, yPosition);
//     yPosition += 8;
//     doc.text(
//       `Salary Range: ${formatCurrency(report.market_intelligence.salary_insights.min, "INR")} - ${formatCurrency(report.market_intelligence.salary_insights.max, "INR")}`,
//       20,
//       yPosition
//     );
//     yPosition += 8;
//     doc.text(`Market Value: ${formatCurrency(report.market_intelligence.salary_insights.candidate_market_value, "INR")}`, 20, yPosition);
//     yPosition += 15;

//     // Career Strategy
//     checkPageBreak(40);
//     doc.setFontSize(16);
//     doc.text('Career Strategy', 20, yPosition);
//     yPosition += 10;
//     doc.setFontSize(12);
//     report.career_strategy.recommended_career_paths.forEach((path) => {
//       checkPageBreak(20);
//       doc.setFontSize(14);
//       doc.text(path.role_title, 20, yPosition);
//       yPosition += 8;
//       doc.setFontSize(12);
//       doc.text(`Feasibility: ${path.feasibility_score}% | Timeline: ${path.timeline}`, 20, yPosition);
//       yPosition += 10;
//     });

//     // Save PDF
//     const filename = `CareerIntelligence_${report.parsed_resume.personal_info.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
//     doc.save(filename);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">Download Report</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <p className="text-gray-600 mb-6">
//           Your comprehensive career intelligence report will be downloaded as a PDF file.
//         </p>
//         <div className="flex gap-4">
//           <button
//             onClick={generatePDF}
//             className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
//           >
//             Generate PDF
//           </button>
//           <button
//             onClick={onClose}
//             className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CareerReport as CareerReportType } from '../types';

interface ReportDownloadProps {
  report: CareerReportType;
  onClose: () => void;
}

export default function ReportDownload({ onClose }: ReportDownloadProps) {
  const generatePDF = async () => {
    const reportElement = document.getElementById('career-report-root');

    if (!reportElement) {
      alert('Report content not found');
      return;
    }

    // Capture UI as canvas
    const canvas = await html2canvas(reportElement, {
      scale: 2, // improves quality
      useCORS: true,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('Career_Intelligence_Report.pdf');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Download Report</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Your report will be downloaded exactly as shown on the screen.
        </p>

        <div className="flex gap-4">
          <button
            onClick={generatePDF}
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

