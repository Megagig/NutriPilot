import { Document, Schema, Types, model } from "mongoose";

export interface IFitnessProfile extends Document {
    userId: Types.ObjectId;
    gender: 'male' | 'female' | 'other';
    goal: 'gain' | 'lose' | 'maintain';
    workoutFrequency: '2-3' | '3-4' | '5-6';
    birthdate: {
        day: string;
        month: string;
        year: string;
    };
    height: number; // in meters
    weight: number; // in kg
    age: number;
    
    // AI Generated Data
    dailyCalories: number;
    protein: number; // in grams
    carbohydrates: number; // in grams
    fats: number; // in grams
    waterIntake: number; // in liters
    bmi: number;
    recommendations: string[];
    
    createdAt: Date;
    updatedAt: Date;
}

const FitnessProfileSchema = new Schema<IFitnessProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true,
        },
        goal: {
            type: String,
            enum: ['gain', 'lose', 'maintain'],
            required: true,
        },
        workoutFrequency: {
            type: String,
            enum: ['2-3', '3-4', '5-6'],
            required: true,
        },
        birthdate: {
            day: { type: String, required: true },
            month: { type: String, required: true },
            year: { type: String, required: true },
        },
        height: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        dailyCalories: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
        carbohydrates: {
            type: Number,
            required: true,
        },
        fats: {
            type: Number,
            required: true,
        },
        waterIntake: {
            type: Number,
            required: true,
        },
        bmi: {
            type: Number,
            required: true,
        },
        recommendations: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const FitnessProfile = model<IFitnessProfile>("FitnessProfile", FitnessProfileSchema);
