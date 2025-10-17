# Personal Website

> Modern full-stack web application built with SvelteKit, Hono, and PostgreSQL

[![Tech Stack](https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Tech Stack](https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white)](https://hono.dev/)
[![Tech Stack](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Tech Stack](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com/)

## Overview

A containerized full-stack application demonstrating modern web development practices with server-side rendering, API integration, and automated testing.

**Architecture:** Frontend (SvelteKit) → Backend (Hono/Deno) → Database (PostgreSQL)

## Tech Stack

| Layer | Technology | Purpose |
# WEB 101 – Full‑stack demo

SvelteKit frontend, Hono (Deno) API, and PostgreSQL, all wired together with Docker Compose.

## Quick start

```bash
# Clone and boot the stack
git clone https://github.com/imaddde867/WEB_101
cd web101
docker compose up -d

# URLs
# Frontend: http://localhost:5173
# API:      http://localhost:8000
```

## Database & migrations

- PostgreSQL 17 with Flyway migrations
- Migrations live in `database-migrations/`
- This repo includes `V2__courses_and_questions.sql` which creates `courses` and `questions`

Run migrations:

```bash
docker compose up database-migrations
```

The server reads DB credentials from environment variables provided by `project.env` (do not commit secrets elsewhere).

## API (brief)

Base URL: `http://localhost:8000`

Courses
- GET `/api/courses` — list courses
- GET `/api/courses/:id` — get a course
- POST `/api/courses` — create (body: { name }, ≥ 3 chars)
- DELETE `/api/courses/:id` — delete and return the course

Questions (per course)
- GET `/api/courses/:id/questions` — list questions
- POST `/api/courses/:id/questions` — create (body: { title, text }, each ≥ 3 chars)
- POST `/api/courses/:id/questions/:qId/upvote` — +1 upvote
- DELETE `/api/courses/:id/questions/:qId` — delete and return the question

## Local development

```bash
# Frontend (SvelteKit)
cd client && npm install && npm run dev

# API server (Deno + Hono)
cd server && deno run --allow-net --allow-env app-run.js
```

## Layout

```
client/                 # SvelteKit app
server/                 # Hono app (exports default Hono instance in app.js)
database-migrations/    # SQL migrations (Flyway)
compose.yaml            # Docker Compose
```

## Testing (optional)

```bash
docker compose up -d
docker compose run e2e-tests npx playwright test
```

—

Built with a pragmatic, lightweight stack for fast iteration.
- **Configuration**: See `project.env`

## Deployment

```bash
# Production build
docker-compose up --build -d

# Configure environment
cp project.env .env.production
# Update .env.production with production values
```

---

**Built with modern web technologies**
