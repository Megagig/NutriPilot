import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import authService from '../services/authService';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuth = await authService.isAuthenticated();
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuth && !inAuthGroup) {
      router.replace('/(auth)/signin');
    } else if (isAuth && inAuthGroup) {
      router.replace('/(tabs)');
    }
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
