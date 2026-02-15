import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import authService from '../services/authService';
import onboardingService from '../services/onboardingService';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuth = await authService.isAuthenticated();
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuth && !inAuthGroup) {
      router.replace('/(auth)/signin');
    } else if (isAuth && inAuthGroup) {
      // Check if onboarding is completed
      const onboardingCompleted = await onboardingService.isOnboardingCompleted();
      if (onboardingCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)' as any);
      }
    } else if (isAuth && inTabsGroup) {
      // Check if onboarding is completed when trying to access tabs
      const onboardingCompleted = await onboardingService.isOnboardingCompleted();
      if (!onboardingCompleted) {
        router.replace('/(onboarding)' as any);
      }
    }
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
