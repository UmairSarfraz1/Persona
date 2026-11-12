export interface Persona {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  occupation: string;
  location: string;
  interests: string;
  goals: string;
  challenges: string;
}

export type NewPersona = Omit<Persona, 'id'>;
