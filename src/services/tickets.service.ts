import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Ticket, TicketWithScreening, CreateTicketDTO } from '../types/ticket.types';
import { Screening } from '../types/screening.types';

const COLLECTION = 'tickets';

/**
 * Get a reference to the tickets collection
 */
const ticketsRef = () => collection(db, COLLECTION);

/**
 * Convert a Firestore document to a Ticket object
 */
const docToTicket = (docSnap: any): Ticket => {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    screeningId: data.screeningId,
    customerName: data.customerName,
    quantity: Number(data.quantity),
    seats: Array.isArray(data.seats) ? data.seats : [],
    totalPrice: Number(data.totalPrice),
    purchaseDate:
      data.purchaseDate instanceof Timestamp
        ? data.purchaseDate.toDate().toISOString()
        : String(data.purchaseDate || ''),
  };
};

/**
 * Fetch all tickets with their associated screening data
 */
export async function getAllTickets(): Promise<TicketWithScreening[]> {
  const q = query(ticketsRef(), orderBy('purchaseDate', 'desc'));
  const snapshot = await getDocs(q);
  const tickets = snapshot.docs.map(docToTicket);

  // Fetch associated screenings
  const ticketsWithScreening: TicketWithScreening[] = await Promise.all(
    tickets.map(async (ticket) => {
      try {
        const screeningDoc = await getDoc(doc(db, 'screenings', ticket.screeningId));
        if (screeningDoc.exists()) {
          const sData = screeningDoc.data();
          const screening: Screening = {
            id: screeningDoc.id,
            title: sData.title,
            director: sData.director,
            date: sData.date,
            time: sData.time,
            price: Number(sData.price),
          };
          return { ...ticket, screening };
        }
      } catch (e) {
        console.warn('Could not fetch screening for ticket:', ticket.id);
      }
      return ticket;
    })
  );

  return ticketsWithScreening;
}

/**
 * Subscribe to real-time ticket updates (with screening data)
 */
export function subscribeToTickets(
  callback: (tickets: TicketWithScreening[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(ticketsRef(), orderBy('purchaseDate', 'desc'));
  return onSnapshot(
    q,
    async (snapshot) => {
      const tickets = snapshot.docs.map(docToTicket);

      // Fetch screening data for each ticket
      const ticketsWithScreening: TicketWithScreening[] = await Promise.all(
        tickets.map(async (ticket) => {
          try {
            const screeningDoc = await getDoc(doc(db, 'screenings', ticket.screeningId));
            if (screeningDoc.exists()) {
              const sData = screeningDoc.data();
              return {
                ...ticket,
                screening: {
                  id: screeningDoc.id,
                  title: sData.title,
                  director: sData.director,
                  date: sData.date,
                  time: sData.time,
                  price: Number(sData.price),
                },
              };
            }
          } catch (e) {
            // screening may have been deleted
          }
          return ticket;
        })
      );

      callback(ticketsWithScreening);
    },
    (error) => {
      console.error('Tickets subscription error:', error);
      onError?.(error);
    }
  );
}

/**
 * Get all taken seats for a specific screening
 */
export async function getTakenSeats(screeningId: string): Promise<string[]> {
  const q = query(ticketsRef(), where('screeningId', '==', screeningId));
  const snapshot = await getDocs(q);
  const allSeats: string[] = [];
  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data();
    if (Array.isArray(data.seats)) {
      allSeats.push(...data.seats);
    }
  });
  return allSeats;
}

/**
 * Create a new ticket
 * Validates seat availability before creating
 */
export async function createTicket(
  data: CreateTicketDTO,
  screeningPrice: number
): Promise<TicketWithScreening> {
  // Validate seats are not already taken
  const takenSeats = await getTakenSeats(data.screeningId);
  const conflicting = data.seats.filter((seat) => takenSeats.includes(seat));
  if (conflicting.length > 0) {
    throw new Error(`Seats already taken: ${conflicting.join(', ')}`);
  }

  // Validate seat count matches quantity
  if (data.seats.length !== data.quantity) {
    throw new Error('Seat count must match quantity');
  }

  const totalPrice = screeningPrice * data.quantity;

  const docRef = await addDoc(ticketsRef(), {
    screeningId: data.screeningId,
    customerName: data.customerName,
    quantity: data.quantity,
    seats: data.seats,
    totalPrice,
    purchaseDate: serverTimestamp(),
  });

  // Fetch the screening to return complete data
  const screeningDoc = await getDoc(doc(db, 'screenings', data.screeningId));
  let screening: Screening | undefined;
  if (screeningDoc.exists()) {
    const sData = screeningDoc.data();
    screening = {
      id: screeningDoc.id,
      title: sData.title,
      director: sData.director,
      date: sData.date,
      time: sData.time,
      price: Number(sData.price),
    };
  }

  return {
    id: docRef.id,
    screeningId: data.screeningId,
    customerName: data.customerName,
    quantity: data.quantity,
    seats: data.seats,
    totalPrice,
    purchaseDate: new Date().toISOString(),
    screening,
  };
}

/**
 * Delete a ticket
 */
export async function deleteTicket(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
