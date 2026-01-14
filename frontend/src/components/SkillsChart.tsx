// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { SkillGapAnalysis } from '../types';
// import { getScoreColor } from '../utils/helpers'; // Keep for consistency, might be used elsewhere.

// interface SkillsChartProps {
//   skillGapAnalysis: SkillGapAnalysis;
// }

// // Custom Tooltip for Recharts
// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div className="custom-tooltip bg-white p-3 rounded-lg shadow-md border border-gray-200">
//         <p className="label text-base font-semibold text-gray-800">{data.skill}</p>
//         <p className="intro text-sm text-gray-600">Status: <span className="font-medium">{data.status.replace(/_/g, ' ').replace(/^(.)/, (match: string) => match.toUpperCase())}</span></p>
//         <p className="desc text-sm text-gray-600">Level: <span className="font-medium">{data.value}%</span></p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function SkillsChart({ skillGapAnalysis }: SkillsChartProps) {
//   // Prepare data for chart
//   const allSkills = [
//     ...skillGapAnalysis.skill_gaps.critical_missing.map(skill => ({
//       skill,
//       status: 'critical_missing',
//       value: 20, // Low value for critical missing
//     })),
//     ...skillGapAnalysis.skill_gaps.important_missing.map(skill => ({
//       skill,
//       status: 'important_missing',
//       value: 40, // Medium-low value for important missing
//     })),
//     ...skillGapAnalysis.skill_gaps.weak_skills.map(skill => ({
//       skill,
//       status: 'weak',
//       value: 60, // Medium value for weak skills
//     })),
//     ...skillGapAnalysis.skill_strengths.map(skill => ({
//       skill,
//       status: 'strong',
//       value: 100, // High value for strong skills
//     })),
//   ].slice(0, 8); // Limit to top 8-10 for better readability, adjust as needed

//   // Sort skills for consistent display
//   allSkills.sort((a, b) => b.value - a.value); 

//   const getColor = (status: string) => {
//     switch (status) {
//       case 'critical_missing':
//         return '#ef4444'; // Tailwind error color
//       case 'important_missing':
//         return '#f59e0b'; // Tailwind warning color
//       case 'weak':
//         return '#fbbf24'; // A lighter warning shade
//       case 'strong':
//         return '#10b981'; // Tailwind success color
//       default:
//         return '#6b7280'; // Gray
//     }
//   };

//   return (
//     <div className="w-full h-72 lg:h-80 pt-4">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={allSkills} layout="vertical" margin={{ top: 10, right: 30, left: 110, bottom: 10 }}>
//           <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
//           <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
//           <YAxis dataKey="skill" type="category" width={100} tick={{ fontSize: 12 }} />
//           <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//           <Bar dataKey="value" barSize={20} radius={[0, 8, 8, 0]}>
//             {allSkills.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }



import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { SkillGapAnalysis } from '../types';

interface SkillsChartProps {
  skillGapAnalysis: SkillGapAnalysis;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <p className="font-semibold text-gray-800">{data.skill}</p>
        <p className="text-sm text-gray-600">
          Status:{' '}
          <span className="font-medium">
            {data.status.replace(/_/g, ' ').replace(/^(.)/, (m: string) => m.toUpperCase())}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Level: <span className="font-medium">{data.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SkillsChart({ skillGapAnalysis }: SkillsChartProps) {
  const allSkills = [
    ...skillGapAnalysis.skill_gaps.critical_missing.map(skill => ({
      skill,
      status: 'critical_missing',
      value: 20,
    })),
    ...skillGapAnalysis.skill_gaps.important_missing.map(skill => ({
      skill,
      status: 'important_missing',
      value: 40,
    })),
    ...skillGapAnalysis.skill_gaps.weak_skills.map(skill => ({
      skill,
      status: 'weak',
      value: 60,
    })),
    ...skillGapAnalysis.skill_strengths.map(skill => ({
      skill,
      status: 'strong',
      value: 100,
    })),
  ].slice(0, 8);

  allSkills.sort((a, b) => b.value - a.value);

  const getColor = (status: string) => {
    switch (status) {
      case 'critical_missing':
        return '#ef4444';
      case 'important_missing':
        return '#f59e0b';
      case 'weak':
        return '#fbbf24';
      case 'strong':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="w-full h-72 lg:h-80 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={allSkills}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 110, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <YAxis dataKey="skill" type="category" width={100} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
          <Bar dataKey="value" barSize={20} radius={[0, 8, 8, 0]}>
            {allSkills.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
