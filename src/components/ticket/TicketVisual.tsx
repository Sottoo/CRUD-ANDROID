import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TicketWithScreening } from '../../types/ticket.types';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface TicketVisualProps {
  ticket: TicketWithScreening;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TICKET_WIDTH = Math.min(SCREEN_WIDTH - 48, 360);

/**
 * Premium visual ticket representation — matches the web version's
 * cardstock ticket with tear line, notches, and barcode
 */
export function TicketVisual({ ticket }: TicketVisualProps) {
  // Generate a pseudo-barcode pattern from ticket ID
  const barcodeId = ticket.id.split('-')[0].toUpperCase();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.card, { width: TICKET_WIDTH }]}>
        {/* Red accent stripe */}
        <View style={styles.accentStripe} />

        {/* ===== TOP SECTION ===== */}
        <View style={styles.topSection}>
          {/* Header row */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerLabel}>Cinema</Text>
              <Text style={styles.headerValue}>STUDIO KINO</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>Screen</Text>
              <Text style={styles.headerValue}>04</Text>
            </View>
          </View>

          {/* Movie title */}
          <View style={styles.titleContainer}>
            <Text style={styles.movieTitle}>
              {ticket.screening?.title || 'UNKNOWN'}
            </Text>
            <Text style={styles.movieDirector}>
              Dir. {ticket.screening?.director || 'N/A'}
            </Text>
          </View>

          {/* Metadata grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{ticket.screening?.date || '---'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{ticket.screening?.time || '---'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Seat</Text>
              <Text style={styles.metaValue}>{ticket.seats?.join(', ') || '---'}</Text>
            </View>
          </View>
        </View>

        {/* ===== TEAR LINE ===== */}
        <View style={styles.tearLineContainer}>
          <View style={styles.notchLeft} />
          <View style={styles.tearLine} />
          <View style={styles.notchRight} />
        </View>

        {/* ===== BOTTOM SECTION ===== */}
        <View style={styles.bottomSection}>
          {/* Admit & Patron */}
          <View style={styles.bottomInfo}>
            <View>
              <Text style={styles.bottomLabel}>Admit</Text>
              <Text style={styles.admitValue}>{ticket.quantity}</Text>
            </View>
            <View style={styles.patronContainer}>
              <Text style={styles.bottomLabel}>Patron</Text>
              <Text style={styles.patronName} numberOfLines={1}>
                {ticket.customerName}
              </Text>
            </View>
          </View>

          {/* Barcode area */}
          <View style={styles.barcodeContainer}>
            {/* Simulated barcode bars */}
            <View style={styles.barcodeLines}>
              {Array.from({ length: 40 }, (_, i) => (
                <View
                  key={i}
                  style={[
                    styles.barcodeLine,
                    {
                      width: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1,
                      marginRight: i % 4 === 0 ? 3 : 1,
                      height: i % 5 === 0 ? 36 : 44,
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.barcodeText}>{barcodeId}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
  },
  card: {
    backgroundColor: colors.cardstock,
    borderRadius: 16,
    overflow: 'hidden',
  },
  accentStripe: {
    height: 6,
    backgroundColor: colors.accent,
  },

  // Top section
  topSection: {
    padding: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xxxl,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#999999',
    marginBottom: 2,
  },
  headerValue: {
    fontFamily: typography.heading.fontFamily,
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    letterSpacing: -0.3,
  },
  titleContainer: {
    marginBottom: spacing.xxxl,
  },
  movieTitle: {
    fontFamily: typography.displayLarge.fontFamily,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -1,
    textTransform: 'uppercase',
    color: '#111111',
    marginBottom: spacing.sm,
  },
  movieDirector: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    letterSpacing: 0.5,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  metaItem: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#999999',
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },

  // Tear line
  tearLineContainer: {
    position: 'relative',
    height: 2,
    marginHorizontal: spacing.xxl,
  },
  tearLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CCCCBB',
    borderRadius: 0,
  },
  notchLeft: {
    position: 'absolute',
    left: -(spacing.xxl + 12),
    top: -11,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  notchRight: {
    position: 'absolute',
    right: -(spacing.xxl + 12),
    top: -11,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    zIndex: 10,
  },

  // Bottom section
  bottomSection: {
    backgroundColor: colors.cardstockDark,
    padding: spacing.xxl,
    paddingTop: spacing.xxxl,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.xxl,
  },
  bottomLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#999999',
    marginBottom: 2,
  },
  admitValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
  },
  patronContainer: {
    alignItems: 'flex-end',
    maxWidth: 160,
  },
  patronName: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#111111',
  },
  barcodeContainer: {
    alignItems: 'center',
  },
  barcodeLines: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 48,
    marginBottom: spacing.sm,
  },
  barcodeLine: {
    backgroundColor: '#111111',
  },
  barcodeText: {
    fontSize: 10,
    fontFamily: typography.mono.fontFamily,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#999999',
    marginTop: spacing.xs,
  },
});
