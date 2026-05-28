import { useState, useEffect, useCallback } from 'react';
import { getTakenSeats } from '../services/tickets.service';

const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E'] as const;
const SEATS_PER_ROW = 8;

interface UseSeatsReturn {
  selectedSeats: string[];
  takenSeats: string[];
  loading: boolean;
  seatRows: readonly string[];
  seatsPerRow: number;
  toggleSeat: (seat: string) => void;
  isSelected: (seat: string) => boolean;
  isTaken: (seat: string) => boolean;
  isValid: boolean;
  reset: () => void;
  refreshTaken: () => Promise<void>;
}

/**
 * Custom hook for seat selection logic.
 * Handles toggle, validation, and taken seats state.
 */
export function useSeats(screeningId: string | null, quantity: number): UseSeatsReturn {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [takenSeats, setTakenSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch taken seats when screening changes
  useEffect(() => {
    if (!screeningId) {
      setTakenSeats([]);
      setSelectedSeats([]);
      return;
    }

    const fetchTaken = async () => {
      setLoading(true);
      try {
        const seats = await getTakenSeats(screeningId);
        setTakenSeats(seats);
      } catch (err) {
        console.error('Error fetching taken seats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaken();
    setSelectedSeats([]);
  }, [screeningId]);

  // Trim selected seats if quantity decreases
  useEffect(() => {
    setSelectedSeats((prev) => prev.slice(0, quantity));
  }, [quantity]);

  const toggleSeat = useCallback(
    (seat: string) => {
      if (takenSeats.includes(seat)) return;

      setSelectedSeats((prev) => {
        if (prev.includes(seat)) {
          return prev.filter((s) => s !== seat);
        }
        if (prev.length >= quantity) return prev;
        return [...prev, seat];
      });
    },
    [takenSeats, quantity]
  );

  const isSelected = useCallback(
    (seat: string) => selectedSeats.includes(seat),
    [selectedSeats]
  );

  const isTaken = useCallback(
    (seat: string) => takenSeats.includes(seat),
    [takenSeats]
  );

  const reset = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  const refreshTaken = useCallback(async () => {
    if (!screeningId) return;
    try {
      const seats = await getTakenSeats(screeningId);
      setTakenSeats(seats);
    } catch (err) {
      console.error('Error refreshing taken seats:', err);
    }
  }, [screeningId]);

  return {
    selectedSeats,
    takenSeats,
    loading,
    seatRows: SEAT_ROWS,
    seatsPerRow: SEATS_PER_ROW,
    toggleSeat,
    isSelected,
    isTaken,
    isValid: selectedSeats.length === quantity && quantity > 0,
    reset,
    refreshTaken,
  };
}
