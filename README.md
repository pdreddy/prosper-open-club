# Prosper Racquet League Platform Monorepo

This monorepo contains:

- `backend`: Node.js + Express + TypeScript API service.
- `mobile`: Expo React Native + TypeScript mobile app.
- `shared`: Shared TypeScript interfaces used across backend and mobile.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure backend environment:

```bash
cp backend/.env.example backend/.env
```

3. Configure mobile environment:

```bash
cp mobile/.env.example mobile/.env
```

4. Update `.env` files with your Firebase credentials and API URL.

## Development

Run backend and mobile together:

```bash
npm run dev
```

Run backend only:

```bash
npm run dev:backend
```

Run mobile only:

```bash
npm run dev:mobile
```

## Build

```bash
npm run build
```

## Start backend (production build)

```bash
npm run start
```

## Lint and Typecheck

```bash
npm run lint
npm run typecheck
```

## Architecture

### Backend

- `src/config`: runtime configuration (`env.ts`) and Firebase Admin initialization.
- `src/modules`: feature modules (controller, route, schema, service).
- `src/shared`: cross-cutting concerns (middleware and errors).
- `src/app`: app composition.
- `src/server.ts`: entry point.

### Mobile

- `src/config`: environment and Firebase client setup.
- `src/features`: feature-oriented UI modules.
- `App.tsx`: root application component.

### Shared

- Shared contracts/interfaces exported by `@prosper/shared` package.
