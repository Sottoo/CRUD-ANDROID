import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Screen not found</Text>
      <Button
        title="Go to Home"
        onPress={() => router.replace('/')}
        variant="outline"
        style={{ marginTop: spacing.xxl }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xxl,
  },
  code: {
    ...typography.displayLarge,
    color: colors.textMuted,
    fontSize: 72,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.body,
    color: colors.textMuted,
  },
});
