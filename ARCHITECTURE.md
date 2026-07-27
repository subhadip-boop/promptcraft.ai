# PromptCraft AI - Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
│  (Next.js Frontend - React, Tailwind, Framer Motion)       │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  API Gateway / Edge                         │
│              (Vercel Edge, CORS, Auth)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Next.js API Routes / Middleware                │
│  (Authentication, Validation, Rate Limiting, Logging)       │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                 Business Logic Layer                        │
│  (Services, Controllers, Utilities)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
     ┌───────────────────┼───────────────────┐
     │                   │                   │
     ▼                   ▼                   ▼
┌─────────┐      ┌────────────┐      ┌──────────┐
│Database │      │ Third-party│      │  Cache   │
│         │      │ Services   │      │  Layer   │
│(Postgres)│     │(OpenAI,    │      │ (Redis)  │
│         │      │Stripe)     │      │          │
└─────────┘      └────────────┘      └──────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **UI Components**: Custom + Shadcn/ui

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: Clerk
- **Payments**: Stripe

### Infrastructure
- **Hosting**: Vercel
- **Database**: Vercel Postgres / AWS RDS
- **File Storage**: AWS S3 / Vercel Blob
- **CDN**: Vercel Edge Network
- **Monitoring**: Sentry, DataDog
- **Logging**: Vercel Logs, ELK Stack

### Services
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email**: SendGrid
- **AI Models**: OpenAI, Anthropic
- **Analytics**: Mixpanel

## Directory Structure

```
productcraft.ai/
├── app/                          # Next.js 14 app directory
│   ├── (auth)/                   # Auth group
│   │   ├── sign-in/              # Sign in page
│   │   └── sign-up/              # Sign up page
│   ├── (dashboard)/              # Dashboard group
│   │   ├── dashboard/            # Main dashboard
│   │   ├── prompts/              # Prompt management
│   │   ├── library/              # Saved prompts
│   │   └── settings/             # User settings
│   ├── api/                      # API routes
│   │   ├── auth/                 # Auth endpoints
│   │   ├── prompts/              # Prompt endpoints
│   │   ├── users/                # User endpoints
│   │   └── webhooks/             # Third-party webhooks
│   ├── admin/                    # Admin panel
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── dashboard/                # Dashboard components
│   ├── forms/                    # Form components
│   └── layouts/                  # Layout components
│
├── lib/                          # Utilities and helpers
│   ├── auth.ts                   # Auth utilities
│   ├── db.ts                     # Database client
│   ├── stripe.ts                 # Stripe utilities
│   ├── openai.ts                 # OpenAI utilities
│   └── utils.ts                  # General utilities
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Auth hook
│   ├── usePrompt.ts              # Prompt hook
│   └── useFetch.ts               # Fetch hook
│
├── types/                        # TypeScript types
│   ├── index.ts                  # Common types
│   ├── user.ts                   # User types
│   └── prompt.ts                 # Prompt types
│
├── prisma/                       # Database schema
│   ├── schema.prisma             # Data models
│   └── migrations/               # Database migrations
│
├── public/                       # Static assets
│   ├── logo.svg                  # Logo files
│   └── images/                   # Image assets
│
├── styles/                       # Global styles
│   └── globals.css               # Global CSS
│
├── .env.example                  # Example environment variables
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind config
└── next.config.js                # Next.js config
```

## Data Flow

### Prompt Generation Flow

```
User Input
    ↓
Validation (Client + Server)
    ↓
Rate Limiting Check
    ↓
OpenAI/Claude API Call
    ↓
Response Processing
    ↓
Database Storage (if authenticated)
    ↓
Return to User
```

### User Authentication Flow

```
User Login
    ↓
Clerk Authentication
    ↓
Session Creation
    ↓
Middleware Verification
    ↓
Access Granted
```

### Payment Flow

```
Subscribe Button
    ↓
Stripe Checkout
    ↓
Payment Processing
    ↓
Webhook Event
    ↓
Subscription Created in DB
    ↓
User Access Updated
```

## Database Schema

### Key Models

```prisma
model User {
  id String @id
  email String @unique
  name String
  avatar String?
  plan PlanType
  credits Int
  createdAt DateTime
  updatedAt DateTime
  prompts Prompt[]
  likes Like[]
}

model Prompt {
  id String @id
  userId String
  user User @relation(fields: [userId])
  title String
  description String
  content String
  platform String
  tone String
  isPublic Boolean
  views Int
  likes Like[]
  createdAt DateTime
  updatedAt DateTime
}

model Subscription {
  id String @id
  userId String @unique
  planId String
  stripeId String
  status String
  currentPeriodEnd DateTime
  createdAt DateTime
  updatedAt DateTime
}
```

## API Design

### Endpoint Structure

```
POST   /api/v1/prompts/generate     - Generate new prompt
GET    /api/v1/prompts              - List user prompts
GET    /api/v1/prompts/{id}         - Get specific prompt
PATCH  /api/v1/prompts/{id}         - Update prompt
DELETE /api/v1/prompts/{id}         - Delete prompt

GET    /api/v1/users/me             - Get current user
PATCH  /api/v1/users/me             - Update profile
GET    /api/v1/users/me/usage       - Get usage stats

POST   /api/v1/subscription/create  - Create subscription
GET    /api/v1/subscription/status  - Check subscription
```

## Performance Optimization

### Caching Strategy

1. **Client Caching**
   - React Query for data fetching
   - Browser cache for assets
   - Service Worker for offline

2. **Server Caching**
   - Redis for session data
   - Database query caching
   - API response caching

3. **CDN Caching**
   - Static assets (images, CSS, JS)
   - API responses (where applicable)
   - Edge function results

### Code Optimization

- Code splitting by route
- Dynamic imports for large components
- Image optimization with Next.js Image
- Font optimization

## Security Architecture

### Authentication & Authorization
- Clerk handles authentication
- JWT tokens for API requests
- Role-based access control (RBAC)
- Session management

### Data Protection
- HTTPS/TLS for all communications
- Password hashing with bcrypt
- Sensitive data encryption at rest
- Regular security audits

### API Security
- Rate limiting per user
- Input validation and sanitization
- CORS configuration
- CSRF protection
- SQL injection prevention (Prisma ORM)

## Monitoring & Logging

### Metrics
- API response times
- Error rates
- Database query performance
- User engagement metrics

### Logging
- Error tracking (Sentry)
- Application logs (Vercel)
- Database logs
- Access logs

## Scaling Strategy

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching

### Horizontal Scaling
- Serverless functions auto-scale
- Database read replicas
- Load balancing
- Multiple deployment regions

## CI/CD Pipeline

```
Git Push to main
    ↓
GitHub Actions Trigger
    ↓
Run Tests
    ↓
Build Application
    ↓
Deploy to Vercel
    ↓
Run E2E Tests
    ↓
Monitor Deployment
```

---

*Last Updated: July 2026*
