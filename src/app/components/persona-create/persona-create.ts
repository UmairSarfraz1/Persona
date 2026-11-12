import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NewPersona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona-create',
  standalone: false,
  templateUrl: './persona-create.html',
  styleUrl: './persona-create.css'
})
export class PersonaCreate {
  submitted = false;

  newPersona: Omit<NewPersona, 'age'> & { age: number | null } = {
    fullName: '',
    age: null,
    gender: '',
    occupation: '',
    location: '',
    interests: '',
    goals: '',
    challenges: ''
  };

  constructor(
    private personaService: PersonaService,
    private router: Router
  ) {}

  savePersona(form: NgForm): void {
    this.submitted = true;

    // Keep the user on the form until every required field is valid.
    if (form.invalid) {
      return;
    }

    const age = this.newPersona.age;
    if (age === null) {
      return;
    }

    this.personaService.addPersona({
      ...this.newPersona,
      age,
      interests: this.newPersona.interests.trim(),
      goals: this.newPersona.goals.trim(),
      challenges: this.newPersona.challenges.trim()
    });

    this.router.navigate(['/personas']);
  }
}
