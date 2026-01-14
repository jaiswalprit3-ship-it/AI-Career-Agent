import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { parseResume, validateFile } from '../services/parseService';
import { parseResumeAgent } from '../agents/resumeParsingAgent';
import { recruiterSimulationAgent } from '../agents/recruiterSimulationAgent';
import { skillGapAnalysisAgent } from '../agents/skillGapAnalysisAgent';
import { marketIntelligenceAgent } from '../agents/marketIntelligenceAgent';
import { careerStrategyAgent } from '../agents/careerStrategyAgent';
import { explainabilityAgent } from '../agents/explainabilityAgent';
import { db } from '../database/supabase';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { CareerReport } from '../types';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload resume and create session
router.post(
  '/upload-resume',
  upload.single('resume'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw createError('No file uploaded', 400);
    }

    validateFile(req.file);
    const parseResult = await parseResume(req.file.buffer, req.file.mimetype);

    const sessionId = await db.createSession({
      resume_filename: req.file.originalname,
      resume_text: parseResult.text,
    });

    res.json({
      success: true,
      session_id: sessionId,
    });
  })
);

// Analyze resume with all agents
router.post(
  '/analyze',
  asyncHandler(async (req, res) => {
    const { session_id } = req.body;

    if (!session_id) {
      throw createError('session_id is required', 400);
    }

    const session = await db.getSession(session_id);
    if (!session || !session.resume_text) {
      throw createError('Session not found or resume text missing', 404);
    }

    const startTime = Date.now();

    try {
      // Agent 1: Parse Resume
      const parseStart = Date.now();
      const parsedResume = await parseResumeAgent(session.resume_text);
      const parseTime = Date.now() - parseStart;
      await db.saveAgentOutput(session_id, 'resume_parsing', parsedResume, parseTime);

      // Agent 2: Recruiter Simulation
      const recruiterStart = Date.now();
      const recruiterEvaluation = await recruiterSimulationAgent(parsedResume);
      const recruiterTime = Date.now() - recruiterStart;
      await db.saveAgentOutput(session_id, 'recruiter_simulation', recruiterEvaluation, recruiterTime);

      // Agent 3: Skill Gap Analysis
      const skillStart = Date.now();
      const skillGapAnalysis = await skillGapAnalysisAgent(parsedResume);
      const skillTime = Date.now() - skillStart;
      await db.saveAgentOutput(session_id, 'skill_gap_analysis', skillGapAnalysis, skillTime);

      // Agent 4: Market Intelligence
      const marketStart = Date.now();
      const marketIntelligence = await marketIntelligenceAgent(parsedResume);
      const marketTime = Date.now() - marketStart;
      await db.saveAgentOutput(session_id, 'market_intelligence', marketIntelligence, marketTime);

      // Agent 5: Career Strategy
      const strategyStart = Date.now();
      const careerStrategy = await careerStrategyAgent(
        parsedResume,
        recruiterEvaluation,
        skillGapAnalysis,
        marketIntelligence
      );
      const strategyTime = Date.now() - strategyStart;
      await db.saveAgentOutput(session_id, 'career_strategy', careerStrategy, strategyTime);

      // Agent 6: Explainability
      const explainStart = Date.now();
      const explainability = await explainabilityAgent(
        parsedResume,
        recruiterEvaluation,
        skillGapAnalysis,
        marketIntelligence,
        careerStrategy
      );
      const explainTime = Date.now() - explainStart;
      await db.saveAgentOutput(session_id, 'explainability', explainability, explainTime);

      // Create full report
      const fullReport: CareerReport = {
        session_id,
        parsed_resume: parsedResume,
        recruiter_evaluation: recruiterEvaluation,
        skill_gap_analysis: skillGapAnalysis,
        market_intelligence: marketIntelligence,
        career_strategy: careerStrategy,
        explainability,
        created_at: new Date().toISOString(),
      };

      const shareId = await db.saveCareerReport(session_id, fullReport, false);

      const totalTime = Date.now() - startTime;

      res.json({
        success: true,
        session_id,
        share_id: shareId,
        processing_time_ms: totalTime,
        report: fullReport,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      throw createError(
        `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  })
);

// Get report by session ID
router.get(
  '/report/:session_id',
  asyncHandler(async (req, res) => {
    const { session_id } = req.params;

    const report = await db.getReport(session_id);
    if (!report) {
      throw createError('Report not found', 404);
    }

    res.json({
      success: true,
      report: report.full_report,
      share_id: report.share_id,
      created_at: report.created_at,
    });
  })
);

// Get public report by share ID
router.get(
  '/share/:share_id',
  asyncHandler(async (req, res) => {
    const { share_id } = req.params;

    const report = await db.getReportByShareId(share_id);
    if (!report) {
      throw createError('Report not found or expired', 404);
    }

    res.json({
      success: true,
      report: report.full_report,
      created_at: report.created_at,
    });
  })
);

export default router;
