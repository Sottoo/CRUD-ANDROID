import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TicketWithScreening } from '../../types/ticket.types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

interface TicketCardProps {
  ticket: TicketWithScreening;
  onView: (ticket: TicketWithScreening) => void;
  onDelete: (id: string) => void;
}

export function TicketCard({ ticket, onView, onDelete }: TicketCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onView(ticket)}
      activeOpacity={0.8}
      style={styles.container}
    >
      {/* Left accent bar */}
      <View style={styles.accentBar} />

      {/* Main content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.admitBadge}>ADMIT {ticket.quantity}</Text>
          <Text style={styles.ticketId}>{ticket.id.split('-')[0]}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {ticket.screening?.title || 'Voided'}
        </Text>
        <Text style={styles.customer}>{ticket.customerName}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{ticket.screening?.date || '---'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>{ticket.screening?.time || '---'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Seats</Text>
            <Text style={styles.metaValue}>{ticket.seats?.join(', ') || '---'}</Text>
          </View>
        </View>
      </View>

      {/* Right panel */}
      <View style={styles.rightPanel}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.price}>${ticket.totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onView(ticket)}
            style={styles.actionButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="eye-outline" size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(ticket.id)}
            style={styles.actionButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={16} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  accentBar: {
    width: 3,
    backgroundColor: colors.accent,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  admitBadge: {
    ...typography.microLabel,
    color: colors.accent,
  },
  ticketId: {
    ...typography.monoSmall,
    color: colors.textMuted,
    fontSize: 10,
  },
  title: {
    ...typography.displaySmall,
    color: colors.text,
    fontSize: 20,
    marginBottom: spacing.xxs,
  },
  customer: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  metaItem: {
    gap: spacing.xxs,
  },
  metaLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
    fontSize: 8,
  },
  metaValue: {
    ...typography.monoSmall,
    color: colors.text,
    fontSize: 11,
  },
  rightPanel: {
    width: 80,
    backgroundColor: colors.surfaceHighlight,
    padding: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
    fontSize: 8,
    marginBottom: spacing.xxs,
  },
  price: {
    ...typography.mono,
    color: colors.text,
    fontSize: 16,
  },
  actions: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  actionButton: {
    padding: spacing.xs,
  },
});
