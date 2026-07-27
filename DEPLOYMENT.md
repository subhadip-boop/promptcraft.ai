# PromptCraft AI - Deployment Guide

## Overview

This guide covers deploying PromptCraft AI to production on Vercel.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Vercel account
- GitHub account
- Required API keys:
  - Clerk (authentication)
  - Stripe (payments)
  - OpenAI/Claude (AI models)
  - Email service (SendGrid/Mailgun)

## Deployment Steps

### 1. Prepare Repository

```bash
# Ensure main branch is clean
git status
git pull origin main

# Run tests
npm run test

# Check linting
npm run lint
```

### 2. Configure Environment Variables

Create production `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/promptcraft_prod

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI Models
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Email
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=noreply@promptcraft.ai

# Application
NEXT_PUBLIC_APP_URL=https://promptcraft.ai
NODE_ENV=production
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Verify connection
npx prisma db execute --stdin < verify.sql
```

### 4. Deploy to Vercel

#### Option A: Connect GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Configure project settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
5. Add environment variables
6. Deploy

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### 5. Domain Configuration

1. In Vercel dashboard, go to Settings → Domains
2. Add custom domain: `promptcraft.ai`
3. Update DNS records:
   - Type: CNAME
   - Name: `promptcraft`
   - Value: `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)

### 6. SSL/TLS Certificate

- Automatically provided by Vercel
- HTTPS enabled by default
- Auto-renewal included

### 7. Monitoring Setup

```bash
# Install Sentry CLI
npm install --save-dev @sentry/cli

# Configure Sentry
# Set SENTRY_AUTH_TOKEN in env
```

### 8. Health Check

```bash
# Test deployment
curl https://promptcraft.ai/api/health

# Expected response:
# {"uptime": ..., "message": "OK", "timestamp": ...}
```

## Post-Deployment

### Monitoring

1. Check Vercel Analytics
2. Monitor error rates (Sentry)
3. Review database performance
4. Check API response times

### Testing

```bash
# Test user flow
1. Sign up with test email
2. Complete payment with test card: 4242 4242 4242 4242
3. Generate test prompt
4. Verify email delivery
```

### Backup Strategy

```bash
# Daily backups
0 2 * * * /home/user/backup.sh >> /var/log/backup.log 2>&1

# Weekly verification
0 3 * * 0 /home/user/verify_backup.sh
```

## Rollback Procedure

If issues occur:

```bash
# 1. Revert to previous deployment
# In Vercel dashboard: Deployments → Select previous → Promote to Production

# 2. Or revert git commit
git revert <commit-hash>
git push origin main

# 3. Database rollback
npx prisma migrate resolve --rolled-back <migration-name>
```

## Scaling

### Database
- Start: Shared PostgreSQL (Vercel Postgres)
- Scale: Managed PostgreSQL (AWS RDS, Render)
- Read replicas for high traffic

### Application
- Auto-scaling enabled on Vercel
- Serverless functions scale automatically
- Edge caching for static content

### Storage
- Use S3 for file uploads
- CloudFront CDN for distribution
- Cache static assets

## Security Checklist

- [ ] Enable HSTS
- [ ] Configure CORS properly
- [ ] Set CSP headers
- [ ] Enable rate limiting
- [ ] Rotate API keys
- [ ] Enable 2FA on all accounts
- [ ] Regular security audits
- [ ] Backup encryption

## Support

- **Vercel Support**: https://vercel.com/support
- **Docs**: https://vercel.com/docs
- **Status**: https://www.vercel-status.com

---

*Last Updated: July 2026*
