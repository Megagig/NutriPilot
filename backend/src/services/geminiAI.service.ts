import { GoogleGenerativeAI } from '@google/generative-ai';

interface UserFitnessData {
    gender: 'male' | 'female' | 'other';
    goal: 'gain' | 'lose' | 'maintain';
    workoutFrequency: '2-3' | '3-4' | '5-6';
    age: number;
    height: number; // in meters
    weight: number; // in kg
}

interface FitnessRecommendations {
    dailyCalories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    waterIntake: number;
    bmi: number;
    recommendations: string[];
}

class GeminiAIService {
    private genAI: GoogleGenerativeAI | null = null;
    private model: any = null;

    private initialize() {
        if (this.genAI) return; // Already initialized
        
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('❌ GEMINI_API_KEY is not set in environment variables');
            return;
        }
        
        try {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
            console.log('✅ Gemini AI initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI:', error);
        }
    }

    private calculateBMI(weight: number, height: number): number {
        return parseFloat((weight / (height * height)).toFixed(2));
    }

    async generateFitnessRecommendations(userData: UserFitnessData): Promise<FitnessRecommendations> {
        this.initialize(); // Lazy initialization
        
        const bmi = this.calculateBMI(userData.weight, userData.height);
        
        // If Gemini AI is not available, throw error
        if (!this.genAI || !this.model) {
            throw new Error('Gemini AI is not configured. Please set GEMINI_API_KEY in environment variables.');
        }
        
        const prompt = `You are a professional fitness and nutrition expert. Based on the following user data, provide precise nutritional recommendations in JSON format only.

User Data:
- Gender: ${userData.gender}
- Age: ${userData.age} years
- Height: ${userData.height} meters
- Weight: ${userData.weight} kg
- BMI: ${bmi}
- Fitness Goal: ${userData.goal === 'gain' ? 'Gain weight/Build muscle' : userData.goal === 'lose' ? 'Lose weight/Fat loss' : 'Maintain current weight'}
- Workout Frequency: ${userData.workoutFrequency} days per week

Calculate and provide:
1. Daily calorie requirement (considering goal and activity level)
2. Daily protein requirement in grams
3. Daily carbohydrates requirement in grams
4. Daily fats requirement in grams
5. Daily water intake in liters
6. 5-7 personalized fitness and nutrition recommendations

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "dailyCalories": number,
  "protein": number,
  "carbohydrates": number,
  "fats": number,
  "waterIntake": number,
  "recommendations": ["recommendation1", "recommendation2", ...]
}`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            // Clean the response to extract JSON
            let jsonText = text.trim();
            
            // Remove markdown code blocks if present
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            
            // Parse the JSON response
            const aiData = JSON.parse(jsonText);
            
            return {
                dailyCalories: Math.round(aiData.dailyCalories),
                protein: Math.round(aiData.protein),
                carbohydrates: Math.round(aiData.carbohydrates),
                fats: Math.round(aiData.fats),
                waterIntake: parseFloat(aiData.waterIntake.toFixed(1)),
                bmi: bmi,
                recommendations: aiData.recommendations || [],
            };
        } catch (error) {
            console.error('Error generating AI recommendations:', error);
            throw new Error('Failed to generate fitness recommendations. Please try again.');
        }
    }
}

export default new GeminiAIService();
