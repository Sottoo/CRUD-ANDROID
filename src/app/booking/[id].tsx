import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useScreenings } from '@/hooks/useScreenings';
import { useTickets } from '@/hooks/useTickets';
import { useSeats } from '@/hooks/useSeats';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SeatMap } from '@/components/booking/SeatMap';
import { Screening } from '@/types/screening.types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { screenings } = useScreenings();
  const { purchase } = useTickets();

  const [screening, setScreening] = useState<Screening | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const {
    selectedSeats,
    takenSeats,
    loading: seatsLoading,
    seatRows,
    seatsPerRow,
    toggleSeat,
    isValid,
    reset: resetSeats,
    refreshTaken,
  } = useSeats(id || null, quantity);

  // Find the screening
  useEffect(() => {
    if (id && screenings.length > 0) {
      const found = screenings.find((s: any) => s.id === id);
      if (found) setScreening(found);
    }
  }, [id, screenings]);

  const handlePurchase = async () => {
    if (!screening || !customerName.trim() || !isValid) return;

    setIsPurchasing(true);
    try {
      const ticket = await purchase(
        {
          screeningId: screening.id,
          customerName: customerName.trim(),
          quantity,
          seats: selectedSeats,
        },
        screening.price
      );

      if (ticket) {
        Alert.alert('Booking Confirmed', 'Your ticket has been reserved.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        await refreshTaken();
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Could not process booking.');
      await refreshTaken();
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!screening) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Movie Info */}
        <View style={styles.movieInfo}>
          <Text style={styles.sectionLabel}>SELECTED FEATURE</Text>
          <Text style={styles.movieTitle}>{screening.title}</Text>
          <View style={styles.movieMeta}>
            <Text style={styles.movieMetaText}>{screening.date}</Text>
            <Text style={styles.movieMetaText}>{screening.time}</Text>
            <Text style={styles.movieMetaText}>${screening.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Patron Name */}
        <View style={styles.section}>
          <Input
            label="PATRON NAME"
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Enter full name"
            autoCapitalize="words"
          />
        </View>

        {/* Quantity */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ADMISSIONS</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(Math.min(10, quantity + 1))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seat Map */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            SELECT SEATS ({selectedSeats.length}/{quantity})
          </Text>
          <View style={styles.seatMapContainer}>
            <SeatMap
              seatRows={seatRows}
              seatsPerRow={seatsPerRow}
              selectedSeats={selectedSeats}
              takenSeats={takenSeats}
              loading={seatsLoading}
              quantity={quantity}
              onToggleSeat={toggleSeat}
            />
          </View>
        </View>

        {/* Total & Confirm */}
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalValue}>
              ${(screening.price * quantity).toFixed(2)}
            </Text>
          </View>

          {selectedSeats.length !== quantity && (
            <Text style={styles.warningText}>
              Select exactly {quantity} seat{quantity > 1 ? 's' : ''} to continue.
            </Text>
          )}

          <Button
            title={isPurchasing ? 'Processing...' : 'Confirm Booking'}
            onPress={handlePurchase}
            variant="primary"
            fullWidth
            loading={isPurchasing}
            disabled={!isValid || !customerName.trim()}
            icon={
              !isPurchasing ? (
                <Ionicons name="arrow-forward" size={18} color={colors.textInverse} />
              ) : undefined
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  loadingText: {
    ...typography.body,
    color: colors.textMuted,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.massive,
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.giant,
  },
  movieInfo: {
    marginBottom: spacing.xxxl,
  },
  sectionLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  movieTitle: {
    ...typography.displayMedium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  movieMeta: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  movieMetaText: {
    ...typography.mono,
    color: colors.textMuted,
    fontSize: 13,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  quantityButtonText: {
    ...typography.monoLarge,
    color: colors.text,
    fontSize: 22,
  },
  quantityValue: {
    ...typography.displaySmall,
    color: colors.text,
    width: 44,
    textAlign: 'center',
  },
  seatMapContainer: {
    marginTop: spacing.md,
  },
  footer: {
    marginTop: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xxl,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.xxl,
  },
  totalLabel: {
    ...typography.microLabel,
    color: colors.textMuted,
  },
  totalValue: {
    ...typography.displayMedium,
    color: colors.text,
    fontSize: 28,
  },
  warningText: {
    ...typography.microLabel,
    color: colors.accent,
    marginBottom: spacing.md,
  },
});
