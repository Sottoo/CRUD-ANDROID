import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface SeatMapProps {
  seatRows: readonly string[];
  seatsPerRow: number;
  selectedSeats: string[];
  takenSeats: string[];
  loading: boolean;
  quantity: number;
  onToggleSeat: (seat: string) => void;
}

export function SeatMap({
  seatRows,
  seatsPerRow,
  selectedSeats,
  takenSeats,
  loading,
  quantity,
  onToggleSeat,
}: SeatMapProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Screen indicator */}
      <View style={styles.screenContainer}>
        <View style={styles.screenLine} />
        <Text style={styles.screenLabel}>SCREEN</Text>
      </View>

      {/* Seat grid */}
      <View style={styles.grid}>
        {seatRows.map((row) => (
          <View key={row} style={styles.row}>
            <Text style={styles.rowLabel}>{row}</Text>
            <View style={styles.seats}>
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = i + 1;
                const seat = `${row}${seatNumber}`;
                const isTaken = takenSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <TouchableOpacity
                    key={seat}
                    onPress={() => onToggleSeat(seat)}
                    disabled={isTaken}
                    activeOpacity={0.6}
                    style={[
                      styles.seat,
                      isTaken && styles.seatTaken,
                      isSelected && styles.seatSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.seatText,
                        isTaken && styles.seatTextTaken,
                        isSelected && styles.seatTextSelected,
                      ]}
                    >
                      {seatNumber}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendAvailable]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendSelected]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendTaken]} />
          <Text style={styles.legendText}>Taken</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  loadingContainer: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  screenContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    width: '80%',
  },
  screenLine: {
    height: 3,
    width: '100%',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 2,
    marginBottom: spacing.xs,
  },
  screenLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
    fontSize: 8,
    letterSpacing: 3,
  },
  grid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
    width: 16,
    textAlign: 'center',
  },
  seats: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  seat: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  seatTaken: {
    backgroundColor: colors.seatTaken,
    borderColor: 'transparent',
  },
  seatSelected: {
    backgroundColor: colors.seatSelected,
    borderColor: colors.seatSelected,
  },
  seatText: {
    ...typography.monoSmall,
    color: colors.textMuted,
    fontSize: 11,
  },
  seatTextTaken: {
    color: colors.textMuted,
    opacity: 0.4,
  },
  seatTextSelected: {
    color: colors.textInverse,
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.xxl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendAvailable: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  legendSelected: {
    backgroundColor: colors.seatSelected,
  },
  legendTaken: {
    backgroundColor: colors.seatTaken,
  },
  legendText: {
    ...typography.microLabel,
    color: colors.textMuted,
    fontSize: 9,
  },
});
