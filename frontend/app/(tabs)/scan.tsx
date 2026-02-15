import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Scan() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Your Food</Text>
      <Text style={styles.subtitle}>
        Take a photo to get instant nutritional information
      </Text>

      <View style={styles.cameraPlaceholder}>
        <Ionicons name="camera-outline" size={80} color="#ccc" />
        <Text style={styles.placeholderText}>Camera feature coming soon</Text>
      </View>

      <TouchableOpacity style={styles.scanButton}>
        <LinearGradient
          colors={['#4CAF50', '#45B649']}
          style={styles.gradientButton}
        >
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.scanButtonText}>Take Photo</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 32,
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  scanButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
