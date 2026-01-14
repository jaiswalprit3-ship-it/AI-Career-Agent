# Career Intelligence Application - Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- OpenAI API key (or Anthropic Claude API key)

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

4. Setup Supabase:
   - Create a new Supabase project
   - Go to SQL Editor
   - Run the SQL from `backend/src/database/schema.sql`

5. Run the backend:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
VITE_API_URL=http://localhost:3000
```

4. Run the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing the Application

1. Open `http://localhost:5173` in your browser
2. Click "Analyze My Resume Now"
3. Upload a PDF, DOC, or DOCX resume (max 5MB)
4. Wait for the 6 AI agents to process your resume
5. View your comprehensive career intelligence report

## Project Structure

```
career-intelligence-app/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   └── package.json
├── backend/              # Express backend
│   ├── src/
│   │   ├── agents/       # 6 AI agents
│   │   ├── services/     # Business logic
│   │   ├── routes/        # API routes
│   │   └── database/     # Supabase integration
│   └── package.json
└── README.md
```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 3000)
- `OPENAI_API_KEY`: Your OpenAI API key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase anon key
- `CORS_ORIGIN`: Frontend URL (default: http://localhost:5173)

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)

## Deployment

### Backend (Render)
1. Connect your GitHub repository
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard

### Frontend (Vercel)
1. Connect your GitHub repository
2. Set framework preset: Vite
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables in Vercel dashboard

## Troubleshooting

### Backend Issues
- Ensure OpenAI API key is valid
- Check Supabase connection and table creation
- Verify CORS settings match frontend URL

### Frontend Issues
- Check that backend is running
- Verify `VITE_API_URL` matches backend URL
- Clear browser cache if issues persist

### Database Issues
- Ensure all tables are created (run schema.sql)
- Check Supabase connection credentials
- Verify RLS (Row Level Security) policies if enabled

## API Endpoints

- `POST /api/upload-resume` - Upload resume file
- `POST /api/analyze` - Start analysis with session_id
- `GET /api/report/:session_id` - Get report by session
- `GET /api/share/:share_id` - Get public shared report

## Support

For issues or questions, check the README.md or create an issue in the repository.
