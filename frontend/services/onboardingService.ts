import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OnboardingData {
  gender: 'male' | 'female' | 'other';
  goal: 'gain' | 'lose' | 'maintain';
  workoutFrequency: '2-3' | '3-4' | '5-6';
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
  height: string; // in meters
  weight: string; // in kg
  completed: boolean;
}

class OnboardingService {
  private STORAGE_KEY = 'onboarding_data';

  async saveOnboardingData(data: OnboardingData): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  async getOnboardingData(): Promise<OnboardingData | null> {
    const data = await AsyncStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  async isOnboardingCompleted(): Promise<boolean> {
    const data = await this.getOnboardingData();
    return data?.completed || false;
  }

  async clearOnboardingData(): Promise<void> {
    await AsyncStorage.removeItem(this.STORAGE_KEY);
  }
}

export default new OnboardingService();
