import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TicketVisual } from '@/components/ticket/TicketVisual';
import { TicketWithScreening } from '@/types/ticket.types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function TicketDetailScreen() {
  const { data } = useLocalSearchParams<{ id: string; data: string }>();
  const router = useRouter();

  let ticket: TicketWithScreening | null = null;
  try {
    if (data) {
      ticket = JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse ticket data');
  }

  if (!ticket) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ticket not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.errorLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={colors.textMuted} />
        <Text style={styles.backText}>Back to Admissions</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header text */}
        <View style={styles.headerInfo}>
          <Text style={styles.headerLabel}>DIGITAL ADMISSION</Text>
          <Text style={styles.headerSubtitle}>Ready for scanning</Text>
        </View>

        {/* Ticket Visual */}
        <TicketVisual ticket={ticket} />

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryAction}>
            <Ionicons name="wallet-outline" size={16} color={colors.textInverse} />
            <Text style={styles.primaryActionText}>Add to Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <Ionicons name="download-outline" size={16} color={colors.text} />
            <Text style={styles.secondaryActionText}>Save PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  errorText: {
    ...typography.body,
    color: colors.textMuted,
  },
  errorLink: {
    ...typography.button,
    color: colors.accent,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.massive,
    paddingBottom: spacing.md,
  },
  backText: {
    ...typography.buttonSmall,
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: spacing.giant,
  },
  headerInfo: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
    marginTop: spacing.xl,
  },
  headerLabel: {
    ...typography.microLabel,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
    color: colors.text,
    letterSpacing: -0.3,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 50,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  primaryActionText: {
    ...typography.buttonSmall,
    color: colors.textInverse,
    letterSpacing: 1.5,
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  secondaryActionText: {
    ...typography.buttonSmall,
    color: colors.text,
    letterSpacing: 1.5,
  },
});
