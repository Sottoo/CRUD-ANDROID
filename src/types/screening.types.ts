export interface Screening {
  id: string;
  title: string;
  director: string;
  date: string;
  time: string;
  price: number;
  createdAt?: Date;
}

export interface CreateScreeningDTO {
  title: string;
  director: string;
  date: string;
  time: string;
  price: number;
}

export interface UpdateScreeningDTO extends Partial<CreateScreeningDTO> {}
