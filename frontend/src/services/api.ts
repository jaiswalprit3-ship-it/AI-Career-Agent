const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

export async function uploadResume(file: File): Promise<{ session_id: string }> {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch(`${API_URL}/api/upload-resume`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to upload resume');
  }

  const data = await response.json();
  return data;
}

export async function analyzeResume(sessionId: string): Promise<{
  session_id: string;
  share_id: string;
  processing_time_ms: number;
  report: any;
}> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to analyze resume');
  }

  const data = await response.json();
  return data;
}

export async function getReport(sessionId: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/report/${sessionId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to get report');
  }

  const data = await response.json();
  return data.report;
}

export async function getSharedReport(shareId: string): Promise<any> {
  const response = await fetch(`${API_URL}/api/share/${shareId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to get shared report');
  }

  const data = await response.json();
  return data.report;
}
