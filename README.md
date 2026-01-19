# Task List App

Task List App is a React + Vite project that pulls tasks from JSONPlaceholder,
lets users search and paginate, and stores status changes locally so they
persist across reloads.

## Features

- Task list with pagination (20 per page)
- Search by task title
- Task detail page with status and metadata
- Click "Pending" to mark a task as done
- Status changes stored in localStorage
- Loading and error states

## Tech Stack

- React 19
- React Router
- Vite

## Getting Started

## Live Demo

- https://eclectic-taffy-486dfc.netlify.app/tasks

## Screenshots

### Dark Mode

![Task details dark](public/screenshots/Screenshot%20from%202026-01-19%2013-07-27.png)
![Task details dark](public/screenshots/Screenshot%20from%202026-01-19%2013-07-38.png)
![Home dark](public/screenshots/Screenshot%20from%202026-01-19%2013-07-46.png)

### Day Mode

![Task details light](public/screenshots/Screenshot%20from%202026-01-19%2013-07-54.png)
![Home light](public/screenshots/Screenshot%20from%202026-01-19%2013-08-04.png)
![Task list light](public/screenshots/Screenshot%20from%202026-01-19%2013-08-12.png)

### Clone the repository

```bash
git clone https://github.com/saidurcsesust/Assignment_05.git
cd Assignment_05
```

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Open the app

Vite will print the local URL in the terminal (usually
`http://localhost:5173`).

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Data Source

Tasks are loaded from the JSONPlaceholder API:
`https://jsonplaceholder.typicode.com/todos`

Status updates are stored locally in `localStorage` under the key
`taskStatusOverrides`.
