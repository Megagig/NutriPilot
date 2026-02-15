import { Request, Response } from 'express';
import { FitnessProfile } from '../models/fitnessProfile.model';
import geminiAIService from '../services/geminiAI.service';

// Extend Request to include user property
interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
        role: 'user' | 'admin';
        isEmailVerified: boolean;
    };
}

export const generateAndSaveFitnessProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { gender, goal, workoutFrequency, birthdate, height, weight } = req.body;

        // Validate required fields
        if (!gender || !goal || !workoutFrequency || !birthdate || !height || !weight) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Calculate age
        const birthYear = parseInt(birthdate.year);
        const birthMonth = parseInt(birthdate.month);
        const birthDay = parseInt(birthdate.day);
        const today = new Date();
        let age = today.getFullYear() - birthYear;
        const monthDiff = today.getMonth() + 1 - birthMonth;
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
            age--;
        }

        // Generate AI recommendations
        const aiRecommendations = await geminiAIService.generateFitnessRecommendations({
            gender,
            goal,
            workoutFrequency,
            age,
            height: parseFloat(height),
            weight: parseFloat(weight),
        });

        // Check if profile already exists
        let fitnessProfile = await FitnessProfile.findOne({ userId });

        if (fitnessProfile) {
            // Update existing profile
            fitnessProfile.gender = gender;
            fitnessProfile.goal = goal;
            fitnessProfile.workoutFrequency = workoutFrequency;
            fitnessProfile.birthdate = birthdate;
            fitnessProfile.height = parseFloat(height);
            fitnessProfile.weight = parseFloat(weight);
            fitnessProfile.age = age;
            fitnessProfile.dailyCalories = aiRecommendations.dailyCalories;
            fitnessProfile.protein = aiRecommendations.protein;
            fitnessProfile.carbohydrates = aiRecommendations.carbohydrates;
            fitnessProfile.fats = aiRecommendations.fats;
            fitnessProfile.waterIntake = aiRecommendations.waterIntake;
            fitnessProfile.bmi = aiRecommendations.bmi;
            fitnessProfile.recommendations = aiRecommendations.recommendations;
            
            await fitnessProfile.save();
        } else {
            // Create new profile
            fitnessProfile = await FitnessProfile.create({
                userId,
                gender,
                goal,
                workoutFrequency,
                birthdate,
                height: parseFloat(height),
                weight: parseFloat(weight),
                age,
                dailyCalories: aiRecommendations.dailyCalories,
                protein: aiRecommendations.protein,
                carbohydrates: aiRecommendations.carbohydrates,
                fats: aiRecommendations.fats,
                waterIntake: aiRecommendations.waterIntake,
                bmi: aiRecommendations.bmi,
                recommendations: aiRecommendations.recommendations,
            });
        }

        return res.status(200).json({
            message: 'Fitness profile generated successfully',
            profile: fitnessProfile,
        });
    } catch (error: any) {
        console.error('Error in generateAndSaveFitnessProfile:', error);
        return res.status(500).json({ 
            message: 'Failed to generate fitness profile',
            error: error.message 
        });
    }
};

export const getFitnessProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const fitnessProfile = await FitnessProfile.findOne({ userId });

        if (!fitnessProfile) {
            return res.status(404).json({ message: 'Fitness profile not found' });
        }

        return res.status(200).json({ profile: fitnessProfile });
    } catch (error: any) {
        console.error('Error in getFitnessProfile:', error);
        return res.status(500).json({ 
            message: 'Failed to fetch fitness profile',
            error: error.message 
        });
    }
};
