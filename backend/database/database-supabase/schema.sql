-- Resume Sessions Table
CREATE TABLE IF NOT EXISTS resume_sessions (
  session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  upload_timestamp TIMESTAMP DEFAULT NOW(),
  resume_filename TEXT,
  resume_text TEXT,
  parsed_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent Outputs Table
CREATE TABLE IF NOT EXISTS agent_outputs (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES resume_sessions(session_id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  output_data JSONB NOT NULL,
  processing_time_ms INTEGER,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Career Reports Table
CREATE TABLE IF NOT EXISTS career_reports (
  report_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES resume_sessions(session_id) ON DELETE CASCADE,
  full_report JSONB NOT NULL,
  share_id UUID UNIQUE DEFAULT uuid_generate_v4(),
  is_public BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '7 days',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_session_timestamp ON resume_sessions(upload_timestamp);
CREATE INDEX IF NOT EXISTS idx_agent_session ON agent_outputs(session_id);
CREATE INDEX IF NOT EXISTS idx_report_share ON career_reports(share_id);
CREATE INDEX IF NOT EXISTS idx_report_session ON career_reports(session_id);
