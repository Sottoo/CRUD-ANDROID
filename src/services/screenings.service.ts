import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Screening, CreateScreeningDTO, UpdateScreeningDTO } from '../types/screening.types';

const COLLECTION = 'screenings';

/**
 * Get a reference to the screenings collection
 */
const screeningsRef = () => collection(db, COLLECTION);

/**
 * Convert a Firestore document to a Screening object
 */
const docToScreening = (doc: any): Screening => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    director: data.director,
    date: data.date,
    time: data.time,
    price: Number(data.price),
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
  };
};

/**
 * Fetch all screenings, ordered by date
 */
export async function getAllScreenings(): Promise<Screening[]> {
  const q = query(screeningsRef(), orderBy('date', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docToScreening);
}

/**
 * Subscribe to real-time screening updates
 */
export function subscribeToScreenings(
  callback: (screenings: Screening[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(screeningsRef(), orderBy('date', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const screenings = snapshot.docs.map(docToScreening);
      callback(screenings);
    },
    (error) => {
      console.error('Screenings subscription error:', error);
      onError?.(error);
    }
  );
}

/**
 * Create a new screening
 */
export async function createScreening(data: CreateScreeningDTO): Promise<Screening> {
  const docRef = await addDoc(screeningsRef(), {
    ...data,
    price: Number(data.price),
    createdAt: serverTimestamp(),
  });
  return {
    id: docRef.id,
    ...data,
    price: Number(data.price),
  };
}

/**
 * Update an existing screening
 */
export async function updateScreening(id: string, data: UpdateScreeningDTO): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const updateData: any = { ...data };
  if (data.price !== undefined) {
    updateData.price = Number(data.price);
  }
  await updateDoc(docRef, updateData);
}

/**
 * Delete a screening and all its associated tickets (cascade)
 */
export async function deleteScreening(id: string): Promise<void> {
  const batch = writeBatch(db);

  // Delete all tickets for this screening
  const ticketsSnapshot = await getDocs(
    query(collection(db, 'tickets'))
  );
  ticketsSnapshot.docs.forEach((ticketDoc) => {
    if (ticketDoc.data().screeningId === id) {
      batch.delete(ticketDoc.ref);
    }
  });

  // Delete the screening itself
  batch.delete(doc(db, COLLECTION, id));

  await batch.commit();
}
