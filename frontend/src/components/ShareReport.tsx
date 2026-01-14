import { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, Linkedin, Twitter } from 'lucide-react';
import { CareerReport as CareerReportType } from '../types';

interface ShareReportProps {
  report: CareerReportType;
  onClose: () => void;
}

export default function ShareReport({ report, onClose }: ShareReportProps) {
  const [shareId, setShareId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // In a real implementation, you would call an API to create a shareable link
    // For now, we'll use the session_id as a placeholder
    setShareId(report.session_id);
  }, [report]);

  const shareUrl = shareId ? `${window.location.origin}/share/${shareId}` : '';

  const copyToClipboard = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `Check out my Career Intelligence Report!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = 'My Career Intelligence Report';
    const body = `I wanted to share my Career Intelligence Report with you:\n\n${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Share Report</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Share your career intelligence report with others. The link will be valid for 7 days.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Shareable Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Share on:</p>
          <div className="flex gap-3">
            <button
              onClick={shareOnLinkedIn}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </button>
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </button>
            <button
              onClick={shareViaEmail}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
