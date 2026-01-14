import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Warning: Supabase environment variables are missing. Database features will not work.');
  console.warn('The application will use in-memory storage (data will be lost on server restart).');
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface ResumeSession {
  session_id: string;
  upload_timestamp: string;
  resume_filename: string | null;
  resume_text: string | null;
  parsed_data: any;
  created_at: string;
}

export interface AgentOutput {
  id: number;
  session_id: string;
  agent_name: string;
  output_data: any;
  processing_time_ms: number | null;
  timestamp: string;
}

export interface CareerReport {
  report_id: string;
  session_id: string;
  full_report: any;
  share_id: string;
  is_public: boolean;
  expires_at: string;
  created_at: string;
}

// In-memory store for when database is not available
const inMemoryStore: Map<string, ResumeSession> = new Map();
const inMemoryReports: Map<string, CareerReport> = new Map();

export const db = {
  async createSession(data: {
    resume_filename: string;
    resume_text: string;
    parsed_data?: any;
  }): Promise<string> {
    const { v4: uuidv4 } = await import('uuid');
    const sessionId = uuidv4();
    
    if (!supabase) {
      // Fallback: store in memory
      const session: ResumeSession = {
        session_id: sessionId,
        upload_timestamp: new Date().toISOString(),
        resume_filename: data.resume_filename,
        resume_text: data.resume_text,
        parsed_data: data.parsed_data || null,
        created_at: new Date().toISOString(),
      };
      inMemoryStore.set(sessionId, session);
      return sessionId;
    }

    const { data: result, error } = await supabase
      .from('resume_sessions')
      .insert({
        resume_filename: data.resume_filename,
        resume_text: data.resume_text,
        parsed_data: data.parsed_data || null,
      })
      .select('session_id')
      .single();

    if (error) throw error;
    return result.session_id;
  },

  async saveAgentOutput(
    sessionId: string,
    agentName: string,
    outputData: any,
    processingTimeMs?: number
  ): Promise<void> {
    if (!supabase) return; // Skip if no database

    const { error } = await supabase.from('agent_outputs').insert({
      session_id: sessionId,
      agent_name: agentName,
      output_data: outputData,
      processing_time_ms: processingTimeMs,
    });

    if (error) throw error;
  },

  async saveCareerReport(
    sessionId: string,
    fullReport: any,
    isPublic: boolean = false
  ): Promise<string> {
    const { v4: uuidv4 } = await import('uuid');
    const shareId = uuidv4();
    
    if (!supabase) {
      // Fallback: store in memory
      const report: CareerReport = {
        report_id: uuidv4(),
        session_id: sessionId,
        full_report: fullReport,
        share_id: shareId,
        is_public: isPublic,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      };
      inMemoryReports.set(shareId, report);
      return shareId;
    }

    const { data: result, error } = await supabase
      .from('career_reports')
      .insert({
        session_id: sessionId,
        full_report: fullReport,
        is_public: isPublic,
      })
      .select('share_id')
      .single();

    if (error) throw error;
    return result.share_id;
  },

  async getReport(sessionId: string): Promise<CareerReport | null> {
    if (!supabase) {
      // Fallback: get from memory
      for (const report of inMemoryReports.values()) {
        if (report.session_id === sessionId) {
          return report;
        }
      }
      return null;
    }

    const { data, error } = await supabase
      .from('career_reports')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  async getReportByShareId(shareId: string): Promise<CareerReport | null> {
    if (!supabase) {
      // Fallback: get from memory
      for (const report of inMemoryReports.values()) {
        if (report.share_id === shareId && report.is_public) {
          const expiresAt = new Date(report.expires_at);
          if (expiresAt > new Date()) {
            return report;
          }
        }
      }
      return null;
    }

    const { data, error } = await supabase
      .from('career_reports')
      .select('*')
      .eq('share_id', shareId)
      .eq('is_public', true)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  async getSession(sessionId: string): Promise<ResumeSession | null> {
    if (!supabase) {
      // Fallback: get from memory
      return inMemoryStore.get(sessionId) || null;
    }

    const { data, error } = await supabase
      .from('resume_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },
};
