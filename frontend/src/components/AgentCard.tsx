import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

interface AgentCardProps {
  title: string;
  icon: ReactNode;
  status: string; // e.g., "completed", "ACCEPT", "IMPROVE", "REJECT"
  children: ReactNode;
}

export default function AgentCard({ title, icon, status, children }: AgentCardProps) {
  const getStatusClasses = (currentStatus: string) => {
    switch (currentStatus) {
      case 'ACCEPT':
        return 'bg-success/20 text-success';
      case 'IMPROVE':
        return 'bg-warning/20 text-warning';
      case 'REJECT':
        return 'bg-error/20 text-error';
      case 'completed':
        return 'bg-gray-100 text-gray-600'; // General completed state
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="text-2xl text-primary">{icon}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
        <span className={cn('ml-auto px-3 py-1 rounded-full text-sm font-semibold', getStatusClasses(status))}>
          {displayStatus}
        </span>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}
