import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PersonaList } from './components/persona-list/persona-list';
import { PersonaCreate } from './components/persona-create/persona-create';

@NgModule({
  declarations: [App, PersonaList, PersonaCreate],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
