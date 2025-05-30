import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Auth } from "aws-amplify";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function sendExpoTokenToBackend() {
  try {
    // 1. Haal het push token op van Expo
    const expoToken = await registerForPushNotificationsAsync();

    if (!expoToken) {
      console.log("Geen expo push token beschikbaar");
      return;
    }

    const session = await Auth.currentSession();
    const jwt = session.getIdToken().getJwtToken();

    const response = await fetch("https://hkp9clnxq6.execute-api.eu-north-1.amazonaws.com/dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify({
        expoToken: expoToken,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Fout bij uploaden:", data.error);
    } else {
      console.log("push token succesvol geregistreerd:", data);
    }
  } catch (err) {
    console.error("Verzendfout:", err);
  }
}