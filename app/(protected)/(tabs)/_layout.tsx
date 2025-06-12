import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        tabBarActiveTintColor: '#FF5500',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ProfileOverviewScreen"
        options={{
          title: 'Profiles',
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="StatsScreen"
        options={{
          title: 'Metrics',
          tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          headerShown: false,
        }}
      />
      {/* Hidden Screens */}
      <Tabs.Screen name="AddDryerScreen" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="DryerSettingsScreen" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="UserProfileScreen" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}