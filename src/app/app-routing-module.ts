import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaList } from './components/persona-list/persona-list';
import { PersonaCreate } from './components/persona-create/persona-create';

const routes: Routes = [
  { path: 'personas', component: PersonaList },
  { path: 'personas/create', component: PersonaCreate },
  { path: '', redirectTo: 'personas', pathMatch: 'full' },
  { path: '**', redirectTo: 'personas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
