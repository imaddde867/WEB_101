# Personal Website

A modern full-stack personal website built with SvelteKit frontend, Hono backend, and PostgreSQL database. This project demonstrates a complete web development stack with containerized deployment, database migrations, and end-to-end testing.

## 🏗️ Architecture

This project follows a microservices architecture with the following components:

- **Frontend**: SvelteKit application with Vite
- **Backend**: Hono.js API server running on Deno
- **Database**: PostgreSQL with Flyway migrations
- **Testing**: Playwright for end-to-end testing
- **Deployment**: Docker Compose for containerized development

## 🚀 Tech Stack

### Frontend
- **SvelteKit 2.16.0** - Modern web framework with server-side rendering
- **Svelte 5.0** - Reactive UI framework
- **Vite 6.2.6** - Fast build tool and development server

### Backend
- **Hono 4.6.5** - Lightweight web framework for Deno
- **Deno** - Modern JavaScript/TypeScript runtime
- **PostgresJS** - PostgreSQL client for JavaScript

### Database
- **PostgreSQL 17.0** - Robust relational database
- **Flyway 10** - Database migration tool

### DevOps & Testing
- **Docker & Docker Compose** - Containerization and orchestration
- **Playwright** - End-to-end testing framework

## 📁 Project Structure

```
├── client/                 # SvelteKit frontend application
│   ├── src/
│   │   ├── routes/         # SvelteKit routes
│   │   ├── lib/            # Shared components and utilities
│   │   └── app.html        # HTML template
│   ├── static/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Hono.js backend API
│   ├── app.js              # Main application file
│   ├── app-run.js          # Server runner
│   └── deno.json           # Deno configuration
├── database-migrations/    # SQL migration files
│   └── V1__todos.sql       # Initial database schema
├── e2e-tests/             # End-to-end tests
│   └── tests/             # Playwright test files
├── compose.yaml           # Docker Compose configuration
└── project.env           # Environment variables
```

## 🛠️ Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local frontend development)
- Deno (for local backend development)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/imaddde867/WEB_101
   cd web101
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Local Development

#### Frontend Development
```bash
cd client
npm install
npm run dev
```

#### Backend Development
```bash
cd server
deno run --allow-net --allow-env app-run.js
```

## 🧪 Testing

### Run End-to-End Tests
```bash
# Start all services first
docker-compose up -d

# Run tests
docker-compose run e2e-tests npx playwright test
```

### Test Coverage
- ✅ Message fetching functionality
- ✅ API integration testing
- ✅ Frontend-backend communication

## 🗄️ Database

The application uses PostgreSQL with automated migrations via Flyway.

### Current Schema
- **todos** table with id, name, and done fields

### Running Migrations
Migrations run automatically when starting the database service via Docker Compose.

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Health check - returns "Hello world!" |
| GET    | `/todos` | Fetch all todos from database |

## 🌐 Environment Configuration

Key environment variables (configured in `project.env`):
- Database connection settings
- Flyway migration configuration
- PostgreSQL credentials

## 🚀 Deployment

The application is containerized and ready for deployment:

1. **Production Build**
   ```bash
   docker-compose -f compose.yaml up --build
   ```

2. **Environment Setup**
   - Update `project.env` with production values
   - Configure database connection strings
   - Set up proper security credentials

## 🔮 Future Enhancements

This personal website foundation can be extended with:
- User authentication and authorization
- Content management system
- Blog functionality
- Portfolio showcase
- Contact forms
- Social media integration
- SEO optimization
- Performance monitoring

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using modern web technologies
