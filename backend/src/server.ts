// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import careerAnalysisRoutes from './routes/careerAnalysis';
// import { errorHandler } from './middleware/errorHandler';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// // API Routes
// app.use('/api', careerAnalysisRoutes);

// // Error handling
// app.use(errorHandler);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: {
//       message: 'Route not found',
//     },
//   });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Health check: http://localhost:${PORT}/health`);
  
//   // Check environment variables
//   if (!process.env.OPENROUTER_API_KEY) {
//     console.warn('⚠️  WARNING: OPENROUTER_API_KEY is not set. AI features will not work.');
//     console.warn('   Please create a .env file with your OpenRouter API key.');
//     console.warn('   Get your API key from: https://openrouter.ai/keys');
//   }
//   if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
//     console.warn('⚠️  WARNING: Supabase credentials are not set. Using in-memory storage.');
//     console.warn('   Data will be lost on server restart. For production, set up Supabase.');
//   }
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import careerAnalysisRoutes from './routes/careerAnalysis';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * ✅ CORS CONFIGURATION (FIXED)
 * Allows:
 * - Local frontend (localhost)
 * - Deployed Vercel frontend (via env variable)
 */
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', careerAnalysisRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: /health`);

  if (!process.env.OPENROUTER_API_KEY) {
    console.warn('⚠️  WARNING: OPENROUTER_API_KEY is not set.');
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.warn('⚠️  WARNING: Supabase credentials not set. Using in-memory storage.');
  }

  if (!process.env.CORS_ORIGIN) {
    console.warn('⚠️  WARNING: CORS_ORIGIN not set. Only localhost will be allowed.');
  }
});
