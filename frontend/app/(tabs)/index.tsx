import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import authService from '../../services/authService';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const userData = await authService.getStoredUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const features = [
    {
      icon: 'nutrition',
      title: 'Track Calories',
      description: 'Monitor your daily calorie intake with AI-powered food recognition',
      gradient: ['#667eea', '#764ba2'],
      onPress: () => {},
    },
    {
      icon: 'camera',
      title: 'Scan Food',
      description: 'Take a photo of your meal and get instant nutritional information',
      gradient: ['#f093fb', '#f5576c'],
      onPress: () => router.push('/(tabs)/scan'),
    },
    {
      icon: 'trending-up',
      title: 'View Progress',
      description: 'Track your nutrition goals and see your progress over time',
      gradient: ['#4facfe', '#00f2fe'],
      onPress: () => router.push('/(tabs)/analytics'),
    },
    {
      icon: 'fitness',
      title: 'AI Fitness Plan',
      description: 'Get personalized recommendations based on your goals',
      gradient: ['#43e97b', '#38f9d7'],
      onPress: () => router.push('/(tabs)/analytics'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>
              Hello, {isAuthenticated && user?.name ? user.name : 'User'}! 👋
            </Text>
            <Text style={styles.subtitle}>
              Track your nutrition and reach your goals
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!isAuthenticated && (
          <TouchableOpacity
            style={styles.loginPrompt}
            onPress={() => router.push('/(auth)/signin')}
          >
            <View style={styles.loginPromptContent}>
              <Ionicons name="information-circle" size={24} color="#667eea" />
              <View style={styles.loginPromptText}>
                <Text style={styles.loginPromptTitle}>Get Started</Text>
                <Text style={styles.loginPromptSubtitle}>
                  Sign in to unlock personalized features
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#667eea" />
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Features</Text>

        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={feature.onPress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={feature.gradient}
              style={styles.featureIcon}
            >
              <Ionicons name={feature.icon as any} size={28} color="#fff" />
            </LinearGradient>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loginPrompt: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  loginPromptContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  loginPromptText: {
    flex: 1,
  },
  loginPromptTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  loginPromptSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
