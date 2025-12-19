# CedarCreek.AI - Legacy Modernization & AI Integration Platform

## Overview

CedarCreek.AI is a business-focused web application for a technology consulting company specializing in legacy system modernization and AI integration services. The platform serves as a marketing and lead generation tool, showcasing services for migrating businesses from legacy code (primarily ColdFusion) to modern, AI-ready architectures using Go microservices, Svelte frontends, and Ionic mobile applications.

The application is built as a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence. It includes assessment forms, booking calendars, contact forms, and integration with ClickUp for consultation scheduling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and UI effects
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared for shared types)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under /api prefix
- **Development**: Hot reload via Vite middleware integration

### Data Storage
- **Database**: PostgreSQL via Neon serverless driver (@neondatabase/serverless)
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: shared/schema.ts (shared between frontend and backend)
- **Migrations**: Drizzle Kit with migrations output to ./migrations

### Key Data Models
- **Users**: Basic authentication schema
- **Assessments**: Multi-step AI readiness assessment forms with progress tracking
- **Contacts**: Contact form submissions
- **Newsletters**: Newsletter subscription management
- **Bookings**: Consultation booking with date/time slots

### Component Structure
- **/components/ui**: shadcn/ui primitives (buttons, forms, dialogs, etc.)
- **/components/sections**: Page sections (hero, approach, expertise, solutions, contact)
- **/components/booking**: Calendar and booking widgets including ClickUp integration
- **/components/layout**: Navbar and footer components

### Build and Deployment
- **Development**: `npm run dev` runs Express with Vite middleware
- **Production Build**: Vite builds frontend to dist/public, esbuild bundles server to dist/index.js
- **Database Sync**: `npm run db:push` pushes schema changes via Drizzle Kit

## External Dependencies

### Third-Party Services
- **ClickUp**: Form embedding for consultation booking (forms.clickup.com integration)
- **Neon Database**: Serverless PostgreSQL hosting (requires DATABASE_URL environment variable)

### Key NPM Packages
- **@neondatabase/serverless**: PostgreSQL database driver
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **@tanstack/react-query**: Async state management
- **react-helmet-async**: SEO and meta tag management
- **date-fns**: Date manipulation for booking functionality
- **zod / zod-validation-error**: Runtime validation for forms and API requests
- **Radix UI primitives**: Accessible component foundations (via shadcn/ui)
- **vaul**: Drawer component for mobile interactions

### Environment Variables Required
- **DATABASE_URL**: PostgreSQL connection string (required for database operations)
- **NODE_ENV**: Development/production mode flag