import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import authService from '../services/authService';
import onboardingService from '../services/onboardingService';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuth = await authService.isAuthenticated();
    if (isAuth) {
      const onboardingCompleted = await onboardingService.isOnboardingCompleted();
      if (onboardingCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)' as any);
      }
    } else {
      router.replace('/(auth)/signin');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
