# Persona Board

A small Angular app for keeping a simple, in-memory list of user personas. It uses Angular components, routing, a template-driven form, and a service. There is no backend, and changes reset when the page is refreshed.

## Run the app

```bash
npm install
npm start
```

Open [http://localhost:4200/personas](http://localhost:4200/personas).

To create a production build:

```bash
npm run build
```

## Try it out

1. Browse the sample personas on the **Personas** page.
2. Choose **Create persona** and fill in the required fields.
3. Save to return to the list, or cancel to leave without saving.
4. Use the × button on a persona card to remove it.

## How the app is organized

- `src/app/components/persona-list/` displays persona cards and handles deleting.
- `src/app/components/persona-create/` contains the create form and its required-field validation.
- `src/app/models/persona.model.ts` defines the persona data shape.
- `src/app/services/persona.service.ts` holds the sample data and add/delete methods in memory.
- `src/app/app-routing-module.ts` maps `/personas` and `/personas/create` to their components.
- `src/app/app-module.ts` declares the components and imports `FormsModule` for `ngModel`.

The form uses `[(ngModel)]` for two-way binding and `ngSubmit` to save. The list uses `*ngFor` to render cards and `*ngIf` to show an empty state. Angular Router returns to the list after a persona is saved.
