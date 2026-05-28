import { Screening } from './screening.types';

export interface Ticket {
  id: string;
  screeningId: string;
  customerName: string;
  quantity: number;
  seats: string[];
  totalPrice: number;
  purchaseDate: string;
}

export interface TicketWithScreening extends Ticket {
  screening?: Screening;
}

export interface CreateTicketDTO {
  screeningId: string;
  customerName: string;
  quantity: number;
  seats: string[];
}
