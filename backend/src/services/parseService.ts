import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { Readable } from 'stream';

export interface ParseResult {
  text: string;
  metadata?: {
    pages?: number;
    info?: any;
  };
}

export async function parsePDF(buffer: Buffer): Promise<ParseResult> {
  try {
    const data = await pdfParse(buffer);
    return {
      text: data.text,
      metadata: {
        pages: data.numpages,
        info: data.info,
      },
    };
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parseDOCX(buffer: Buffer): Promise<ParseResult> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return {
      text: result.value,
      metadata: {},
    };
  } catch (error) {
    throw new Error(`Failed to parse DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function parseResume(
  buffer: Buffer,
  mimetype: string
): Promise<ParseResult> {
  if (mimetype === 'application/pdf') {
    return parsePDF(buffer);
  } else if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword'
  ) {
    return parseDOCX(buffer);
  } else {
    throw new Error(`Unsupported file type: ${mimetype}`);
  }
}

export function validateFile(file: Express.Multer.File): void {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit.');
  }
}
