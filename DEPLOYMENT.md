# PromptCraft AI - Complete Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/subhadip-boop/promptcraft.ai.git
cd promptcraft.ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Update .env.local with your API keys
```

### Environment Variables Setup

**Database:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/promptcraft
```

**Clerk Authentication:**
1. Go to https://dashboard.clerk.com
2. Create a new application
3. Copy your keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```

**OpenAI API:**
1. Visit https://platform.openai.com/api-keys
2. Create new API key
   ```
   OPENAI_API_KEY=sk-...
   ```

**Stripe Payment:**
1. Go to https://dashboard.stripe.com
2. Get your keys:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
   STRIPE_SECRET_KEY=sk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
3. Create a price in Stripe:
   - Product: "Premium Plan"
   - Price: $30/month (recurring)
   - Copy Price ID: `price_...`
   ```
   NEXT_PUBLIC_PREMIUM_PRICE_ID=price_...
   ```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# View database UI (optional)
npx prisma studio
```

### Local Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 🌐 Deployment to Production

### Option 1: Deploy to Vercel (Recommended)

**Easiest and fastest deployment:**

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/import
   - Select your repository
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

### Option 2: Deploy to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "Create New"
   - Select "GitHub Repo"
   - Choose `promptcraft.ai`

3. **Add PostgreSQL**
   - Click "Add"
   - Select "PostgreSQL"
   - Connect to your app

4. **Set Environment Variables**
   - Go to your app settings
   - Add all environment variables

5. **Deploy**
   - Railway auto-deploys on push

### Option 3: Deploy to Self-Hosted (Docker)

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: promptcraft
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: promptcraft
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://promptcraft:secure_password@db:5432/promptcraft
      # Add other env vars here
    depends_on:
      - db

volumes:
  postgres_data:
```

Run with: `docker-compose up -d`

---

## 🔐 Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS only (enforced by Vercel/Railway)
- [ ] Enable CORS only for your domain
- [ ] Rotate API keys regularly
- [ ] Enable Stripe webhook verification
- [ ] Set rate limiting on API routes
- [ ] Enable database backups
- [ ] Use strong database passwords
- [ ] Monitor error logs

---

## 📊 Database Backups

**Vercel PostgreSQL:**
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

---

## 🚨 Troubleshooting

### Stripe webhook not working
- Ensure webhook URL is: `https://yourdomain.com/api/webhooks/stripe`
- Verify webhook secret matches `STRIPE_WEBHOOK_SECRET`
- Check Stripe dashboard for failed events

### Database connection issues
- Verify `DATABASE_URL` format
- Check PostgreSQL server is running
- Test connection: `psql $DATABASE_URL`

### Clerk authentication failing
- Ensure Clerk keys are correct
- Check Clerk dashboard for your application
- Verify redirect URLs in Clerk settings

### OpenAI API errors
- Confirm API key is valid
- Check API usage in OpenAI dashboard
- Ensure you have sufficient credits

---

## 📈 Scaling Tips

1. **Database**: Use connection pooling with PgBouncer
2. **Caching**: Add Redis for prompt caching
3. **CDN**: Enable Vercel Edge Network
4. **Rate Limiting**: Implement API rate limits
5. **Analytics**: Use PostHog for user analytics

---

## 📞 Support

- GitHub Issues: https://github.com/subhadip-boop/promptcraft.ai/issues
- Email: support@promptcraft.ai
- Discord: [Coming Soon]

---

*Last Updated: July 2026*
