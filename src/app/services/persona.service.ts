import { Injectable } from '@angular/core';
import { NewPersona, Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  // This sample data lives only in memory and resets when the app is refreshed.
  private personas: Persona[] = [
    {
      id: 1,
      fullName: 'Maya Chen',
      age: 28,
      gender: 'Female',
      occupation: 'Product Designer',
      location: 'Portland, OR',
      interests: 'Illustration, hiking, coffee',
      goals: 'Build thoughtful products that make everyday tasks easier.',
      challenges: 'Finding uninterrupted time for focused creative work.'
    },
    {
      id: 2,
      fullName: 'Jordan Lee',
      age: 34,
      gender: 'Male',
      occupation: 'Small Business Owner',
      location: 'Austin, TX',
      interests: 'Cooking, live music, travel',
      goals: 'Grow a sustainable business and connect with more customers.',
      challenges: 'Managing daily operations while planning for growth.'
    },
    {
      id: 3,
      fullName: 'Sam Rivera',
      age: 22,
      gender: 'Non-binary',
      occupation: 'University Student',
      location: 'Chicago, IL',
      interests: 'Photography, gaming, volunteering',
      goals: 'Find a meaningful first role after graduation.',
      challenges: 'Balancing coursework, work, and personal projects.'
    }
  ];

  private nextId = 4;

  getPersonas(): Persona[] {
    return this.personas;
  }

  addPersona(persona: NewPersona): void {
    // The form does not provide an id, so the service assigns one.
    this.personas.push({ ...persona, id: this.nextId });
    this.nextId += 1;
  }

  deletePersona(id: number): void {
    this.personas = this.personas.filter(persona => persona.id !== id);
  }
}
