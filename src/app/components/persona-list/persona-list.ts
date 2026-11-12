import { Component } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona-list',
  standalone: false,
  templateUrl: './persona-list.html',
  styleUrl: './persona-list.css'
})
export class PersonaList {
  personas: Persona[];

  constructor(private personaService: PersonaService) {
    this.personas = this.personaService.getPersonas();
  }

  deletePersona(id: number): void {
    this.personaService.deletePersona(id);
    this.personas = this.personaService.getPersonas();
  }
}
