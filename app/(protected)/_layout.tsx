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
    'Satoshi-Black': require('../../assets/fonts/Satoshi-Black.otf'),
    'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Light': require('../../assets/fonts/Satoshi-Light.otf'),
    'Satoshi-Italic': require('../../assets/fonts/Satoshi-Italic.otf'),
    'Satoshi-BoldItalic': require('../../assets/fonts/Satoshi-BoldItalic.otf'),
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
      <Stack.Screen name="(dryer-add)" options={{headerShown: false}} />
    </Stack>
  );
}
