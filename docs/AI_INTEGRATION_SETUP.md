# AI Integration Setup Guide

This guide explains how to set up the Gemini AI integration for personalized fitness recommendations.

## Overview

The AI integration uses Google's Gemini AI model to generate personalized fitness recommendations based on user data collected during onboarding. The system calculates:

- Daily calorie requirements
- Macronutrient breakdown (protein, carbs, fats)
- Daily water intake
- BMI calculation
- Personalized fitness recommendations

## Setup Steps

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the Gemini AI package:
   ```bash
   npm install @google/generative-ai
   ```

3. Add your Gemini API key to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Restart the backend server:
   ```bash
   npm run dev
   ```

### 3. Test the Integration

1. Complete the onboarding flow in the app
2. After clicking "Finish" on the measurements step, you'll be redirected to the AI results screen
3. Watch the progress indicator as the AI generates your personalized fitness plan
4. Review your results including calories, macros, water intake, and recommendations

## Architecture

### Backend Components

1. **Model**: `backend/src/models/fitnessProfile.model.ts`
   - Mongoose schema for storing fitness profiles
   - Links to user via userId reference

2. **Service**: `backend/src/services/geminiAI.service.ts`
   - Handles communication with Gemini AI API
   - Formats prompts and parses AI responses
   - Calculates BMI

3. **Controller**: `backend/src/controllers/fitness.controller.ts`
   - `generateAndSaveFitnessProfile`: Generates AI recommendations and saves to database
   - `getFitnessProfile`: Retrieves user's fitness profile

4. **Routes**: `backend/src/routes/fitness.routes.ts`
   - `POST /fitness/generate`: Generate and save fitness profile
   - `GET /fitness/profile`: Get user's fitness profile

### Frontend Components

1. **Screen**: `frontend/app/(onboarding)/ai-results.tsx`
   - Displays loading animation with progress
   - Shows AI-generated results in beautiful cards
   - Handles navigation to main app

2. **Service**: `frontend/services/fitnessService.ts`
   - Communicates with backend fitness API
   - Manages authentication tokens
   - Handles error cases

3. **Styles**: `frontend/app/(onboarding)/ai-results.styles.ts`
   - Styling for AI results screen

## API Endpoints

### Generate Fitness Profile
```
POST /fitness/generate
Authorization: Bearer <token>

Request Body:
{
  "gender": "male" | "female" | "other",
  "goal": "gain" | "lose" | "maintain",
  "workoutFrequency": "2-3" | "3-4" | "5-6",
  "birthdate": {
    "day": "15",
    "month": "06",
    "year": "1990"
  },
  "height": "1.75",
  "weight": "70"
}

Response:
{
  "message": "Fitness profile generated successfully",
  "profile": {
    "userId": "...",
    "gender": "male",
    "goal": "maintain",
    "workoutFrequency": "3-4",
    "age": 35,
    "height": 1.75,
    "weight": 70,
    "bmi": 22.86,
    "dailyCalories": 2400,
    "protein": 140,
    "carbohydrates": 300,
    "fats": 67,
    "waterIntake": 3.5,
    "recommendations": [...]
  }
}
```

### Get Fitness Profile
```
GET /fitness/profile
Authorization: Bearer <token>

Response:
{
  "profile": { ... }
}
```

## User Flow

1. User completes onboarding (gender, goal, workout frequency, birthdate, measurements)
2. User clicks "Finish" button
3. Onboarding data is saved to AsyncStorage
4. User is navigated to AI Results screen
5. AI Results screen shows loading animation with progress updates
6. Frontend calls `/fitness/generate` API with onboarding data
7. Backend calculates age and BMI
8. Backend calls Gemini AI with formatted prompt
9. AI generates personalized recommendations
10. Backend saves profile to database
11. Frontend displays results in beautiful cards
12. User clicks "Start Your Journey" to enter main app

## Troubleshooting

### API Key Issues
- Ensure GEMINI_API_KEY is set in backend/.env
- Verify the API key is valid and active
- Check API quota limits in Google AI Studio

### Generation Errors
- Check backend logs for detailed error messages
- Verify MongoDB connection is working
- Ensure user is authenticated (valid token)

### Frontend Issues
- Verify EXPO_PUBLIC_API_URL is correctly set
- Check network connectivity
- Review AsyncStorage for onboarding data

## Customization

### Modify AI Prompt
Edit `backend/src/services/geminiAI.service.ts` to customize the prompt sent to Gemini AI.

### Adjust Calculations
Modify the calculation logic in `geminiAI.service.ts` for custom BMI or other metrics.

### Update UI
Edit `frontend/app/(onboarding)/ai-results.tsx` and corresponding styles to customize the results display.

## Security Notes

- API keys should never be committed to version control
- Always use environment variables for sensitive data
- Fitness profiles are user-specific and require authentication
- Data is validated on both frontend and backend

## Future Enhancements

- Add meal plan generation
- Include workout routine suggestions
- Support for imperial units (feet/inches, pounds)
- Progress tracking over time
- Re-generate recommendations based on updated goals
