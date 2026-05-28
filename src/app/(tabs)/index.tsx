import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useScreenings } from '@/hooks/useScreenings';
import { ScreeningList } from '@/components/screening/ScreeningList';
import { Screening } from '@/types/screening.types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function CarteleraScreen() {
  const { screenings, loading } = useScreenings();
  const router = useRouter();

  const handlePress = (screening: Screening) => {
    router.push({
      pathname: '/booking/[id]',
      params: { id: screening.id },
    });
  };

  return (
    <View style={styles.container}>
      <ScreeningList
        screenings={screenings}
        loading={loading}
        onPress={handlePress}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>NOW SHOWING</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  headerLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
  },
});
