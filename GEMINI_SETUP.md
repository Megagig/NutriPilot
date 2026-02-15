# Quick Gemini AI Setup

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install @google/generative-ai
```

### 2. Get Your Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 3. Add API Key to Backend

Add this line to `backend/.env`:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Restart Backend Server
```bash
cd backend
npm run dev
```

### 5. Test the Feature

1. Open the app
2. Complete the onboarding flow
3. Click "Finish" on the measurements step
4. Watch the AI generate your personalized fitness plan!

## What Gets Generated

- ✅ Daily calorie target
- ✅ Protein, carbs, and fats breakdown
- ✅ Daily water intake recommendation
- ✅ BMI calculation
- ✅ 5-7 personalized fitness tips

## Need Help?

See `docs/AI_INTEGRATION_SETUP.md` for detailed documentation.
