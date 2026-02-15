import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import fitnessService, { FitnessProfile } from '../../services/fitnessService';
import { styles } from '../../styles/onboarding/ai-results.styles';

export default function AIResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Analyzing your profile...');
  const [profile, setProfile] = useState<FitnessProfile | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    generateProfile();
  }, []);

  const generateProfile = async () => {
    try {
      // Simulate progress updates
      const progressSteps = [
        { progress: 20, text: 'Calculating your BMI...' },
        { progress: 40, text: 'Determining calorie requirements...' },
        { progress: 60, text: 'Optimizing macronutrients...' },
        { progress: 80, text: 'Generating personalized recommendations...' },
        { progress: 100, text: 'Finalizing your fitness plan...' },
      ];

      let currentStep = 0;
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setProgress(progressSteps[currentStep].progress);
          setLoadingText(progressSteps[currentStep].text);
          currentStep++;
        }
      }, 800);

      const result = await fitnessService.generateFitnessProfile();

      clearInterval(progressInterval);
      setProgress(100);
      setLoadingText('Complete!');

      setTimeout(() => {
        setProfile(result);
        setLoading(false);

        // Fade in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 500);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        'Error',
        error.message || 'Failed to generate fitness profile. Please try again.',
        [
          {
            text: 'Retry',
            onPress: () => {
              setLoading(true);
              setProgress(0);
              generateProfile();
            },
          },
          {
            text: 'Go Back',
            onPress: () => router.back(),
          },
        ]
      );
    }
  };

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <View style={styles.aiIconContainer}>
              <Ionicons name="fitness" size={80} color="#fff" />
            </View>

            <Text style={styles.loadingTitle}>Creating Your Fitness Plan</Text>
            <Text style={styles.loadingSubtitle}>Powered by AI</Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>

            <View style={styles.loadingTextContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.loadingStatusText}>{loadingText}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="checkmark-circle" size={60} color="#fff" />
          <Text style={styles.headerTitle}>Your Personalized Plan</Text>
          <Text style={styles.headerSubtitle}>AI-Generated Fitness Profile</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* BMI Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="analytics" size={24} color="#667eea" />
              <Text style={styles.cardTitle}>Body Mass Index</Text>
            </View>
            <View style={styles.bmiContainer}>
              <Text style={styles.bmiValue}>{profile.bmi}</Text>
              <Text style={styles.bmiLabel}>BMI</Text>
            </View>
          </View>

          {/* Daily Calories Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="flame" size={24} color="#FF6B6B" />
              <Text style={styles.cardTitle}>Daily Calorie Target</Text>
            </View>
            <View style={styles.calorieContainer}>
              <Text style={styles.calorieValue}>{profile.dailyCalories}</Text>
              <Text style={styles.calorieLabel}>kcal/day</Text>
            </View>
          </View>

          {/* Macronutrients Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="nutrition" size={24} color="#4CAF50" />
              <Text style={styles.cardTitle}>Daily Macronutrients</Text>
            </View>
            <View style={styles.macroGrid}>
              <View style={styles.macroItem}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.macroIconContainer}
                >
                  <Ionicons name="barbell" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.macroValue}>{profile.protein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>

              <View style={styles.macroItem}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.macroIconContainer}
                >
                  <Ionicons name="leaf" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.macroValue}>{profile.carbohydrates}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>

              <View style={styles.macroItem}>
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={styles.macroIconContainer}
                >
                  <Ionicons name="water" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.macroValue}>{profile.fats}g</Text>
                <Text style={styles.macroLabel}>Fats</Text>
              </View>
            </View>
          </View>

          {/* Water Intake Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="water" size={24} color="#00BCD4" />
              <Text style={styles.cardTitle}>Daily Water Intake</Text>
            </View>
            <View style={styles.waterContainer}>
              <Text style={styles.waterValue}>{profile.waterIntake}L</Text>
              <Text style={styles.waterLabel}>per day</Text>
            </View>
          </View>

          {/* Recommendations Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="bulb" size={24} color="#FFC107" />
              <Text style={styles.cardTitle}>Personalized Recommendations</Text>
            </View>
            <View style={styles.recommendationsContainer}>
              {profile.recommendations.map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <View style={styles.recommendationBullet}>
                    <Ionicons name="checkmark" size={16} color="#667eea" />
                  </View>
                  <Text style={styles.recommendationText}>{recommendation}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.continueButtonGradient}>
            <Text style={styles.continueButtonText}>Start Your Journey</Text>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
