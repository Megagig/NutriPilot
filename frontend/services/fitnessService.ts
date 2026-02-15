import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

export interface FitnessProfile {
  gender: 'male' | 'female' | 'other';
  goal: 'gain' | 'lose' | 'maintain';
  workoutFrequency: '2-3' | '3-4' | '5-6';
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
  height: number;
  weight: number;
  age: number;
  dailyCalories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  waterIntake: number;
  bmi: number;
  recommendations: string[];
}

class FitnessService {
  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('accessToken');
  }

  async generateFitnessProfile(): Promise<FitnessProfile> {
    try {
      // Get onboarding data from AsyncStorage
      const onboardingDataStr = await AsyncStorage.getItem('onboarding_data');
      if (!onboardingDataStr) {
        throw new Error('No onboarding data found');
      }

      const onboardingData = JSON.parse(onboardingDataStr);
      const token = await this.getAuthToken();

      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await axios.post(
        `${API_URL}/fitness/generate`,
        {
          gender: onboardingData.gender,
          goal: onboardingData.goal,
          workoutFrequency: onboardingData.workoutFrequency,
          birthdate: onboardingData.birthdate,
          height: onboardingData.height,
          weight: onboardingData.weight,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.profile;
    } catch (error: any) {
      console.error('Error generating fitness profile:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to generate fitness profile');
      }
      throw new Error(error.message || 'Network error. Please check your connection.');
    }
  }

  async getFitnessProfile(): Promise<FitnessProfile | null> {
    try {
      const token = await this.getAuthToken();

      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await axios.get(`${API_URL}/fitness/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.profile;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching fitness profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch fitness profile');
    }
  }
}

export default new FitnessService();
