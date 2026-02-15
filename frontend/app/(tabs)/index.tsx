import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#45B649']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Welcome to NutriPilot!</Text>
        <Text style={styles.subtitle}>Your AI Nutrition Companion</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Ionicons name="nutrition" size={32} color="#4CAF50" />
          <Text style={styles.cardTitle}>Track Calories</Text>
          <Text style={styles.cardText}>
            Monitor your daily calorie intake with AI-powered food recognition
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="camera" size={32} color="#4CAF50" />
          <Text style={styles.cardTitle}>Scan Food</Text>
          <Text style={styles.cardText}>
            Take a photo of your meal and get instant nutritional information
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="analytics" size={32} color="#4CAF50" />
          <Text style={styles.cardTitle}>View Progress</Text>
          <Text style={styles.cardText}>
            Track your nutrition goals and see your progress over time
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
