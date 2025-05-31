import { AuthContext } from '@/context/authContext';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text as RNText, View } from 'react-native';
import 'react-native-reanimated';

// Keep splash screen visible while we load resources
export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Black': require('../../assets/fonts/Satoshi-Black.otf'),
    'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Medium': require('../../assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Regular': require('../../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Light': require('../../assets/fonts/Satoshi-Light.otf'),
    'Satoshi-Italic': require('../../assets/fonts/Satoshi-Italic.otf'),
    'Satoshi-BoldItalic': require('../../assets/fonts/Satoshi-BoldItalic.otf'),
    // 'Satoshi-Variable': require('../../assets/fonts/Satoshi-Variable.otf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      (RNText as any).defaultProps = (RNText as any).defaultProps || {};
      (RNText as any).defaultProps.style = { fontFamily: 'Satoshi-Regular' };
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ProtectedLayoutNav />
    </View>
  );
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