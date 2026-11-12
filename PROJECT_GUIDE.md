# Persona Board: Project Guide

This guide explains how the Angular app is organized and how its main pieces work together. The project is intentionally small: it uses Angular components, routing, a template-driven form, and one in-memory data service. It has no backend or database, so changes disappear when the browser page is refreshed.

## 1. Project architecture

The app follows a simple component-and-service structure:

1. **`AppModule`** starts the app and registers its components and Angular modules.
2. **`AppRoutingModule`** maps each URL to the component for that page.
3. **`App`** provides the shared header and a `<router-outlet>` where the selected page appears.
4. **Page components** display persona cards or the create form.
5. **`PersonaService`** holds the persona array and provides methods to read, add, and delete personas.
6. **`Persona`** describes the shape of one persona using a TypeScript interface.

The service is the single in-memory source of truth. Both page components inject the same root-level service, so they access the same persona data.

## 2. Folder structure

```text
persona/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── persona-create/
│   │   │   │   ├── persona-create.ts
│   │   │   │   ├── persona-create.html
│   │   │   │   └── persona-create.css
│   │   │   └── persona-list/
│   │   │       ├── persona-list.ts
│   │   │       ├── persona-list.html
│   │   │       └── persona-list.css
│   │   ├── models/
│   │   │   └── persona.model.ts
│   │   ├── services/
│   │   │   └── persona.service.ts
│   │   ├── app-module.ts
│   │   ├── app-routing-module.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── PROJECT_GUIDE.md
```

Each component has a TypeScript file for behavior, an HTML template for the page structure and bindings, and a CSS file for its styles. Global styles are in `src/styles.css`; shared header styles are in `src/app/app.css`.

## 3. What each component does

### `App` — `src/app/app.ts`

This is the root component. Angular starts by rendering it. Its template contains the shared navigation header and `<router-outlet>`. The router puts the active page component into that outlet.

### `PersonaList` — `src/app/components/persona-list/persona-list.ts`

This component gets the personas from `PersonaService` when it is created. Its template uses `*ngFor` to make a card for every persona and `*ngIf` to show a helpful empty state when there are none. The delete button calls `deletePersona`, which removes the selected persona through the service and refreshes the component's array reference.

The list displays full name, age, gender, occupation, location, and interests. Goals and challenges are collected on the create form and kept in the persona data, but are not shown on the list cards.

### `PersonaCreate` — `src/app/components/persona-create/persona-create.ts`

This component owns the form data in `newPersona`. Its template uses `[(ngModel)]` to keep form fields and that object in sync. On submit, `savePersona` checks form validity, adds the persona through the service, and navigates to `/personas`.

### `PersonaService` — `src/app/services/persona.service.ts`

This injectable service owns the sample persona data and the methods to get, add, and delete personas. Keeping data operations in one service lets both page components work with the same list without passing it through component inputs and outputs.

## 4. Important Angular and TypeScript concepts

### Components and templates

A component combines a TypeScript class (behavior) with a template (what the user sees). For example, the `@Component` decorator in `persona-list.ts` connects the `PersonaList` class to `persona-list.html` and `persona-list.css`.

### NgModules

This app uses the NgModule style rather than standalone components. `AppModule` declares `App`, `PersonaList`, and `PersonaCreate`. It imports:

- `BrowserModule` so Angular can run in a browser.
- `FormsModule` for template-driven forms and `ngModel`.
- `AppRoutingModule` for the app's routes.

### TypeScript interface and type

`Persona` in `persona.model.ts` describes the fields and types a saved persona must have. `NewPersona` is the same shape without an `id`, because the service assigns that id when it saves a new persona. These types help catch mistakes while writing code; they do not save or validate data at runtime.

### Dependency injection

The components ask for `PersonaService` in their constructors. Angular supplies the service instance. `providedIn: 'root'` makes it available application-wide as one shared service instance.

### String interpolation

Double curly braces display a component value in the template:

```html
<h2>{{ persona.fullName }}</h2>
```

Angular evaluates the expression and puts its result into the page.

### Property binding

Square brackets bind a component/template expression to an HTML property or attribute. For example, the delete button gets a descriptive accessible label:

```html
[attr.aria-label]="'Delete ' + persona.fullName"
```

The header also uses `[routerLinkActiveOptions]` to mark the Personas navigation item active only on the exact `/personas` route.

### Event binding

Parentheses listen for an event and call component code. The card's delete button uses:

```html
(click)="deletePersona(persona.id)"
```

The form listens for submission with `(ngSubmit)="savePersona(personaForm)"`.

### Structural directives: `*ngFor` and `*ngIf`

- `*ngFor="let persona of personas"` repeats the card markup for each item.
- `*ngIf="personas.length === 0"` displays the empty state only when the list is empty.

These directives control which parts of the template Angular renders.

### Two-way binding: `[(ngModel)]`

The banana-in-a-box syntax, `[(ngModel)]`, combines property binding and event binding. For example:

```html
<input name="fullName" [(ngModel)]="newPersona.fullName" required>
```

Angular displays the current value of `newPersona.fullName` in the input. When the user edits the input, Angular updates that property. When the property changes in code, Angular updates the input. Each form control needs a `name` so Angular can register it with the template-driven form.

### Template-driven form and validation

`FormsModule` enables the template-driven form directives. The template creates a form reference:

```html
<form #personaForm="ngForm" (ngSubmit)="savePersona(personaForm)" novalidate>
```

`ngForm` tracks the form's values and validity. Built-in attributes such as `required`, `min`, and `max` define validation rules. Each input can expose its Angular control with a template reference such as `#age="ngModel"`. The template checks `age.invalid` and `age.touched` to decide when to show its error message. The component sets `submitted` so errors also appear after the user tries to submit.

The age property starts as `null` so the input is blank. After the form passes validation, the component checks that age is present before sending the new persona to the service.

### Router links and navigation

`routerLink` navigates within the Angular app without reloading the whole page. `Router` in the create component is used in TypeScript after a successful save. More detail is in the routing section below.

## 5. How routing works between the pages

`AppRoutingModule` defines these routes:

| URL | Component | Purpose |
|---|---|---|
| `/personas` | `PersonaList` | Show the persona cards |
| `/personas/create` | `PersonaCreate` | Show the create form |
| `/` | Redirects to `/personas` | Make the list the default page |
| Any other URL | Redirects to `/personas` | Send unknown paths to the list |

`RouterModule.forRoot(routes)` registers the route table. In `app.html`, `<router-outlet>` is the placeholder where Angular displays the component matching the current URL. Links such as `routerLink="/personas/create"` switch pages. After a successful save, `this.router.navigate(['/personas'])` sends the user back to the list.

The route order puts the more specific `/personas/create` path before `/personas`, making the intended page mapping clear.

## 6. How the service shares data

`PersonaService` is decorated with `@Injectable({ providedIn: 'root' })`, so Angular creates a shared service for the running application. Both `PersonaList` and `PersonaCreate` inject this service.

The main data flow is:

1. `PersonaList` calls `getPersonas()` to display the service's current personas.
2. `PersonaCreate` calls `addPersona()` when its form is valid.
3. `addPersona()` adds a new object to the shared array and assigns its id.
4. `PersonaCreate` navigates back to `/personas`.
5. `PersonaList` reads the service data again and displays the newly added persona.
6. A delete click calls `deletePersona(id)`; the service filters out that persona.

This data exists only in the JavaScript memory of the running app. A page refresh starts the app again with the original sample data.

## 7. How the form and `ngModel` work

The form's `newPersona` object is the form's working data model. Each input has a matching `[(ngModel)]` expression:

| Form field | Bound property |
|---|---|
| Full name | `newPersona.fullName` |
| Age | `newPersona.age` |
| Gender | `newPersona.gender` |
| Occupation | `newPersona.occupation` |
| Location | `newPersona.location` |
| Interests | `newPersona.interests` |
| Goals | `newPersona.goals` |
| Challenges | `newPersona.challenges` |

As the user types or chooses an option, `ngModel` updates the corresponding property. When Save is pressed, the form emits `ngSubmit` and Angular passes the `NgForm` state to `savePersona`. The method:

1. Sets `submitted` so validation messages can be shown.
2. Returns without saving if the form is invalid.
3. Adds the valid data through `PersonaService`.
4. Navigates back to the persona list.

Cancel is a router link to `/personas`; it leaves the form without adding anything.

## 8. Try the app

Run the development server:

```bash
npm start
```

Open `http://localhost:4200/personas`. Create a persona, try submitting the form with missing or invalid values, and use the delete button to remove a card. To build the app, run:

```bash
npm run build
```
