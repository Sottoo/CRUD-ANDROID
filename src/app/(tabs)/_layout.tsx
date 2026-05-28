import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          ...typography.microLabel,
          color: colors.textMuted,
          fontSize: 11,
          letterSpacing: 2,
        },
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <View style={styles.redDot} />
            <Text style={styles.logoText}>
              Studio<Text style={styles.logoLight}>Kino</Text>
            </Text>
          </View>
        ),
        headerTitle: '',
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: {
          ...typography.microLabel,
          fontSize: 9,
          letterSpacing: 1.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Programme',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Admissions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Operations',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.lg,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  logoText: {
    fontFamily: 'Oswald_700Bold',
    fontSize: 20,
    color: colors.text,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  logoLight: {
    fontFamily: 'Oswald_300Light',
    color: colors.textMuted,
  },
});
