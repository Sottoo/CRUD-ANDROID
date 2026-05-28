import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTickets } from '@/hooks/useTickets';
import { TicketCard } from '@/components/ticket/TicketCard';
import { TicketWithScreening } from '@/types/ticket.types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function TicketsScreen() {
  const { tickets, loading, remove } = useTickets();
  const router = useRouter();

  const handleView = (ticket: TicketWithScreening) => {
    router.push({
      pathname: '/ticket/[id]',
      params: {
        id: ticket.id,
        data: JSON.stringify(ticket),
      },
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Void Ticket',
      'Are you sure you want to void this ticket? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Void',
          style: 'destructive',
          onPress: () => remove(id),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketCard
            ticket={item}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>ADMISSIONS LOG</Text>
            <Text style={styles.count}>{tickets.length}</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No admissions found.</Text>
          </View>
        }
        contentContainerStyle={tickets.length === 0 ? styles.emptyList : undefined}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  headerLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
  },
  count: {
    ...typography.mono,
    color: colors.textMuted,
    fontSize: 12,
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
