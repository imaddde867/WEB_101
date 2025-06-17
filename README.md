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
|-------|------------|---------|
| **Frontend** | SvelteKit 2.16 + Svelte 5.0 | SSR web framework |
| **Backend** | Hono 4.6 on Deno | Lightweight API server |
| **Database** | PostgreSQL 17 + Flyway | Data persistence & migrations |
| **Testing** | Playwright | End-to-end testing |
| **DevOps** | Docker Compose | Containerized development |

## Quick Start

```bash
# Clone and start all services
git clone https://github.com/imaddde867/WEB_101
cd web101
docker-compose up -d

# Access application
# Frontend: http://localhost:5173
# API: http://localhost:8000
```

## Project Structure

```
├── client/           # SvelteKit frontend
├── server/           # Hono API (Deno)
├── database-migrations/  # SQL migrations
├── e2e-tests/        # Playwright tests
└── compose.yaml      # Docker orchestration
```

## Development

### Local Setup
```bash
# Frontend
cd client && npm install && npm run dev

# Backend
cd server && deno run --allow-net --allow-env app-run.js
```

### Testing
```bash
# Start services
docker-compose up -d

# Run E2E tests
docker-compose run e2e-tests npx playwright test
```

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/todos` | GET | Fetch todos |

## Database

- **PostgreSQL 17** with automated Flyway migrations
- **Schema**: `todos` table (id, name, done)
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
