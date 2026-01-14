import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  BarChart3,
  Target,
  TrendingUp,
  Lightbulb,
  Download,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    onGetStarted();
    navigate('/upload');
  };

  const features = [
    {
      icon: CheckCircle,
      title: 'ATS & Recruiter Simulation',
      description: 'Get evaluated by AI recruiters and ATS systems',
    },
    {
      icon: BarChart3,
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills and learning priorities',
    },
    {
      icon: Target,
      title: 'Market Intelligence',
      description: 'Understand job market demand and salary trends',
    },
    {
      icon: TrendingUp,
      title: 'Career Strategy',
      description: 'Get personalized career path recommendations',
    },
    {
      icon: Lightbulb,
      title: 'AI-Powered Insights',
      description: 'Clear explanations for every recommendation',
    },
    {
      icon: Download,
      title: 'Downloadable Report',
      description: 'Export your complete analysis as PDF',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Transform Your Resume into Career Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
            Get comprehensive career analysis powered by 6 specialized AI agents.
            Discover your strengths, identify gaps, and unlock your career potential.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
          >
            Analyze My Resume Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Powered by 6 AI Agents
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Upload your resume and get instant, comprehensive career intelligence
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
