import { useState, useEffect, useCallback } from 'react';
import { TicketWithScreening, CreateTicketDTO } from '../types/ticket.types';
import {
  subscribeToTickets,
  createTicket,
  deleteTicket,
} from '../services/tickets.service';

interface UseTicketsReturn {
  tickets: TicketWithScreening[];
  loading: boolean;
  error: string | null;
  purchase: (data: CreateTicketDTO, screeningPrice: number) => Promise<TicketWithScreening | null>;
  remove: (id: string) => Promise<boolean>;
}

/**
 * Custom hook for managing tickets state and operations.
 * Uses Firestore real-time listener for automatic updates.
 */
export function useTickets(): UseTicketsReturn {
  const [tickets, setTickets] = useState<TicketWithScreening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToTickets(
      (data) => {
        setTickets(data);
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

  const purchase = useCallback(
    async (data: CreateTicketDTO, screeningPrice: number): Promise<TicketWithScreening | null> => {
      try {
        setError(null);
        const ticket = await createTicket(data, screeningPrice);
        return ticket;
      } catch (err: any) {
        setError(err.message || 'Error purchasing ticket');
        return null;
      }
    },
    []
  );

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      await deleteTicket(id);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error deleting ticket');
      return false;
    }
  }, []);

  return { tickets, loading, error, purchase, remove };
}
