import { useState, useEffect, useCallback } from 'react';
import { Screening, CreateScreeningDTO, UpdateScreeningDTO } from '../types/screening.types';
import {
  subscribeToScreenings,
  createScreening,
  updateScreening,
  deleteScreening,
} from '../services/screenings.service';

interface UseScreeningsReturn {
  screenings: Screening[];
  loading: boolean;
  error: string | null;
  create: (data: CreateScreeningDTO) => Promise<Screening | null>;
  update: (id: string, data: UpdateScreeningDTO) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
}

/**
 * Custom hook for managing screenings state and operations.
 * Uses Firestore real-time listener for automatic updates.
 */
export function useScreenings(): UseScreeningsReturn {
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToScreenings(
      (data) => {
        setScreenings(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const create = useCallback(async (data: CreateScreeningDTO): Promise<Screening | null> => {
    try {
      setError(null);
      const screening = await createScreening(data);
      return screening;
    } catch (err: any) {
      setError(err.message || 'Error creating screening');
      return null;
    }
  }, []);

  const update = useCallback(async (id: string, data: UpdateScreeningDTO): Promise<boolean> => {
    try {
      setError(null);
      await updateScreening(id, data);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error updating screening');
      return false;
    }
  }, []);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await deleteScreening(id);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error deleting screening');
      return false;
    }
  }, []);

  return { screenings, loading, error, create, update, remove };
}
