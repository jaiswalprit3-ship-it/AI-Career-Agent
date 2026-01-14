import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { uploadResume } from '../services/api';

interface ResumeUploadProps {
  onUploadComplete: (sessionId: string) => void;
}

export default function ResumeUpload({ onUploadComplete }: ResumeUploadProps) {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const { session_id } = await uploadResume(file);
      // Navigate to processing with sessionId in URL
      navigate(`/processing?sessionId=${session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload resume');
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Upload Your Resume</h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-blue-50'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-lg text-primary font-semibold">Drop your resume here...</p>
          ) : (
            <>
              <p className="text-lg text-gray-700 mb-2">
                Drag and drop your resume here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX (Max 5MB)
              </p>
            </>
          )}
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <File className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: file ? 1.02 : 1 }}
          whileTap={{ scale: file ? 0.98 : 1 }}
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-all ${
            file && !uploading
              ? 'bg-primary text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {uploading ? 'Uploading...' : 'Analyze Resume'}
        </motion.button>
      </motion.div>
    </div>
  );
}
