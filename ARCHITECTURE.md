# PromptCraft AI - Architecture & Code Guide

## 📂 Project Structure

```
productcraft.ai/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── dashboard/
│   │   ├── page.tsx             # Dashboard home
│   │   ├── generator/page.tsx    # Prompt generator
│   │   ├── library/page.tsx      # Saved prompts library
│   │   ├── community/page.tsx    # Community showcase
│   │   └── layout.tsx           # Dashboard layout
│   ├── sign-in/page.tsx         # Sign in page
│   ├── sign-up/page.tsx         # Sign up page
│   ├── pricing/page.tsx         # Pricing page
│   └── api/                     # API routes
│       ├── prompts/
│       │   ├── generate/route.ts # Prompt generation
│       │   └── save/route.ts     # Save prompts
│       ├── subscription/
│       │   └── checkout/route.ts # Stripe checkout
│       └── webhooks/
│           └── stripe/route.ts   # Stripe webhooks
├── components/                   # Reusable React components
│   ├── landing/
│   ├── dashboard/
│   ├── pricing/
│   └── shared/
├── lib/                         # Utility functions
│   ├── db.ts                    # Prisma client
│   ├── stripe.ts                # Stripe client
│   └── ai-service.ts            # AI prompt generation
├── public/                      # Static assets
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
├── prisma/
│   └── schema.prisma            # Database schema
├── styles/
│   └── globals.css
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── next.config.js               # Next.js config
└── README.md                    # Documentation
```

---

## 🏗️ Architecture Overview

### Frontend Layer
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom brand colors
- **Animations**: Framer Motion for smooth transitions
- **State Management**: Zustand for global state
- **UI Components**: Radix UI + Custom components

### Backend Layer
- **API Routes**: Next.js API Routes (serverless functions)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk (managed auth service)
- **Payment**: Stripe (subscription & webhooks)
- **AI Integration**: OpenAI/Claude API

### Data Flow

```
User Input
    ↓
Frontend Component (React)
    ↓
API Route Handler (/api/...)
    ↓
OpenAI/Claude API (Prompt Generation)
    ↓
Database (Prisma/PostgreSQL)
    ↓
Response sent back to Frontend
    ↓
Display to User
```

---

## 🔄 Key Features & Implementation

### 1. Prompt Generation Engine
**File**: `app/api/prompts/generate/route.ts`

```typescript
// How it works:
1. User submits: { userInput, platform, tone, format }
2. System creates optimized prompt based on platform
3. Calls Claude/GPT with system instructions
4. Returns transformed prompt
5. Frontend displays result with copy/save options
```

### 2. Authentication Flow
**Provider**: Clerk

```typescript
// Protected routes use:
const { userId } = auth()
if (!userId) return NextResponse.json({ error: 'Unauthorized' })

// Clerk automatically handles:
// - Sign up/Sign in UI
// - Session management
// - User data storage
```

### 3. Subscription System
**Provider**: Stripe

```typescript
// Workflow:
1. User clicks "Upgrade"
2. Creates Stripe checkout session
3. User completes payment
4. Webhook received at /api/webhooks/stripe
5. Updates user subscription in database
6. Features unlocked based on subscription tier
```

### 4. Database Schema
**ORM**: Prisma

```prisma
User {
  - Tracks subscription status
  - Stores trial end date
  - Links to Stripe customer
}

Prompt {
  - Stores generation history
  - Links user to their prompts
  - Tracks metadata (platform, tone, format)
}

SavedPrompt {
  - User's saved prompt library
  - Tagging system
  - Searchable
}

CommunityPost {
  - Public shared prompts
  - Upvotes/engagement tracking
  - User attribution
}
```

---

## 🔌 API Endpoints

### POST `/api/prompts/generate`
**Generate optimized prompt**
```bash
curl -X POST http://localhost:3000/api/prompts/generate \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "Write an email to my boss",
    "platform": "chatgpt",
    "tone": "professional",
    "format": "markdown"
  }'
```

**Response**:
```json
{
  "prompt": "Act as a professional business communication expert...",
  "platform": "chatgpt",
  "tone": "professional",
  "format": "markdown"
}
```

### POST `/api/prompts/save`
**Save prompt to library**
```bash
curl -X POST http://localhost:3000/api/prompts/save \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Email Template",
    "prompt": "Act as...",
    "platform": "chatgpt",
    "tags": ["email", "business"]
  }'
```

### GET `/api/prompts/save`
**Get user's saved prompts**
```bash
curl http://localhost:3000/api/prompts/save
```

### POST `/api/subscription/checkout`
**Create Stripe checkout session**
```bash
curl -X POST http://localhost:3000/api/subscription/checkout
```

**Response**:
```json
{
  "sessionId": "cs_live_..."
}
```

---

## 🎨 Styling System

### Color Palette
- **Primary Blue**: `#0ea5e9` - Main actions, links
- **Accent Purple**: `#8b5cf6` - Premium features
- **Dark**: `#111827` - Text, backgrounds
- **Success**: `#10b981` - Confirmations

### Component Patterns
```typescript
// Button variant
className={`px-4 py-2 rounded-lg font-bold transition ${
  isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
}`}

// Motion animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up creates user in Clerk & database
- [ ] Prompt generation returns results
- [ ] Save prompt stores in database
- [ ] Free trial lasts exactly 30 days
- [ ] Stripe payment creates subscription
- [ ] Webhook updates user subscription status
- [ ] Cancel subscription removes access

### Local Testing
```bash
# Test Stripe locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Simulate payment event
stripe trigger payment_intent.succeeded
```

---

## 📝 Code Standards

- **Language**: TypeScript (strict mode)
- **Components**: Functional with hooks
- **Naming**: camelCase for functions, PascalCase for components
- **Imports**: Absolute paths with `@/*` alias
- **Comments**: Add for complex logic, not obvious code

---

## 🚀 Performance Optimization

1. **Image Optimization**: Use Next.js `Image` component
2. **Code Splitting**: Automatic via Next.js
3. **Caching**: Add `Cache-Control` headers to API responses
4. **Database Queries**: Use Prisma `select` to fetch only needed fields
5. **API Routes**: Keep functions under 50ms execution time

---

*Documentation v1.0 - Updated July 2026*
