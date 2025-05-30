import { AuthContext } from '@/context/authContext';
import { setLoggedInState } from '@/nativeFeatures/AuthStorage';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect } from 'react';
import { Text as RNText } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Satoshi-Black': require('../../assets/fonts/Satoshi-Black.ttf'),
    'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.ttf'),
    'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.ttf'),
    'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.ttf'),
    'Satoshi-Light': require('../../assets/fonts/Satoshi-Light.ttf'),
    'Satoshi-Italic': require('../../assets/fonts/Satoshi-Italic.ttf'),
    'Satoshi-BoldItalic': require('../../assets/fonts/Satoshi-BoldItalic.ttf'),
    'Satoshi-Variable': require('../../assets/fonts/Satoshi-Variable.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Bypass TypeScript error safely
      (RNText as any).defaultProps = (RNText as any).defaultProps || {};
      (RNText as any).defaultProps.style = { fontFamily: 'Satoshi-Regular' };
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <ProtectedLayoutNav />;
}

function ProtectedLayoutNav() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/LoginScreen" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
