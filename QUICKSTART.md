# Quick Start Guide

# Quick Start Guide

## Step 1: Create Backend .env File

Navigate to the `backend` folder and create a `.env` file:

```bash
cd backend
```

Create `.env` file with the following content (minimum required):

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-3.5-turbo
```

**Optional (for persistent storage):**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

**Note:** If you don't set Supabase credentials, the app will work with in-memory storage (data is lost on restart).

## Step 2: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 3: Run the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📊 Health check: http://localhost:3000/health
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 4: Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Analyze My Resume Now"
3. Upload a PDF, DOC, or DOCX resume
4. Wait for the analysis to complete
5. View your career intelligence report!

## Getting Your OpenRouter API Key

1. Go to https://openrouter.ai/keys
2. Sign up or log in
3. Click "Create New Key"
4. Copy the API key and paste it in your `.env` file as `OPENROUTER_API_KEY=your_key_here`

## Optional: Setup Supabase (for persistent storage)

1. Go to https://supabase.com/
2. Create a new project
3. Go to SQL Editor
4. Run the SQL from `backend/src/database/schema.sql`
5. Go to Settings > API
6. Copy the URL and anon key to your `.env` file

## Troubleshooting

### "OPENROUTER_API_KEY environment variable is missing"
- Make sure you created a `.env` file in the `backend` folder
- Make sure the file contains `OPENROUTER_API_KEY=your_key_here`
- Get your API key from https://openrouter.ai/keys
- Restart the backend server after creating/updating `.env`

### "Cannot connect to backend"
- Make sure the backend is running on port 3000
- Check that `VITE_API_URL` in frontend `.env` matches the backend URL
- Check CORS settings if accessing from a different origin

### "Module not found" errors
- Run `npm install` in both `backend` and `frontend` folders
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
