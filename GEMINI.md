# Project Overview

This is a full-stack web application built with a modern technology stack. The project is containerized using Docker, making it easy to set up and run.

The architecture consists of:

*   **Frontend:** A SvelteKit application located in the `client` directory.
*   **Backend:** A Hono API server running on Deno, located in the `server` directory.
*   **Database:** A PostgreSQL database, with migrations managed by Flyway in the `database-migrations` directory.
*   **E2E Tests:** Playwright tests are in the `e2e-tests` directory.

# Building and Running

The project is designed to be run with Docker Compose.

**To start all services:**

```bash
docker compose up -d
```

This will start the frontend, backend, and database services.

*   **Frontend:** Accessible at `http://localhost:5173`
*   **Backend API:** Accessible at `http://localhost:8000`

**To run tests:**

```bash
docker compose run e2e-tests npx playwright test
```

**To run database migrations:**

```bash
docker compose up database-migrations
```

# Development Conventions

## Frontend

The frontend is a SvelteKit application. To run it locally for development:

```bash
cd client
npm install
npm run dev
```

The frontend code is located in `client/src`. It uses Tailwind CSS for styling.

## Backend

The backend is a Hono application running on Deno. To run it locally for development:

```bash
cd server
deno run --allow-net --allow-env app-run.js
```

The backend code is in `server/app.js`. It provides a RESTful API for the frontend.

## Database

Database migrations are handled by Flyway. SQL migration files are located in the `database-migrations` directory. To apply migrations, use the `docker-compose` command mentioned above.
