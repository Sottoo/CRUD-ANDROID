import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screening } from '../../types/screening.types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface ScreeningCardProps {
  screening: Screening;
  onPress: (screening: Screening) => void;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

export function ScreeningCard({ screening, onPress, showDelete, onDelete }: ScreeningCardProps) {
  const formattedDate = screening.date
    ? screening.date.split('-').slice(1).join('/')
    : '---';

  return (
    <TouchableOpacity
      onPress={() => onPress(screening)}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.mainInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {screening.title}
          </Text>
          <Text style={styles.director}>Dir. {screening.director}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{formattedDate}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{screening.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Price</Text>
            <Text style={styles.metaValue}>${screening.price.toFixed(2)}</Text>
          </View>

          {showDelete && onDelete ? (
            <TouchableOpacity
              onPress={() => onDelete(screening.id)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : (
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward" size={20} color={colors.textMuted} />
            </View>
          )}
        </View>
      </View>

      <View style={styles.bottomBorder} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
  },
  content: {
    paddingVertical: spacing.xxl,
  },
  mainInfo: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.displayMedium,
    color: colors.text,
  },
  director: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xxl,
  },
  metaItem: {
    gap: spacing.xxs,
  },
  metaLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
  },
  metaValue: {
    ...typography.mono,
    color: colors.text,
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: spacing.sm,
  },
  bottomBorder: {
    height: 1,
    backgroundColor: colors.border,
  },
});
