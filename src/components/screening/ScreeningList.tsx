import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Screening } from '../../types/screening.types';
import { ScreeningCard } from './ScreeningCard';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface ScreeningListProps {
  screenings: Screening[];
  loading: boolean;
  onPress: (screening: Screening) => void;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
  ListHeaderComponent?: React.ReactElement;
}

export function ScreeningList({
  screenings,
  loading,
  onPress,
  showDelete,
  onDelete,
  ListHeaderComponent,
}: ScreeningListProps) {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <FlatList
      data={screenings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ScreeningCard
          screening={item}
          onPress={onPress}
          showDelete={showDelete}
          onDelete={onDelete}
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No screenings currently scheduled.</Text>
        </View>
      }
      contentContainerStyle={screenings.length === 0 ? styles.emptyList : undefined}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: spacing.giant,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginHorizontal: spacing.xl,
    borderRadius: 8,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
