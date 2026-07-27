# PromptCraft AI - README

<div align="center">
  <img src="public/logo.svg" alt="PromptCraft AI" width="200" height="200" />
  
  # ✨ PromptCraft AI
  
  **Transform Simple Ideas Into Expert-Level AI Prompts**
  
  [Website](https://promptcraft.ai) • [Documentation](./DEPLOYMENT.md) • [GitHub](https://github.com/subhadip-boop/promptcraft.ai) • [Twitter](https://twitter.com/promptcraftai)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
  ![Version](https://img.shields.io/badge/version-1.0.0-blue)
</div>

---

## 🎯 About PromptCraft AI

PromptCraft AI is a revolutionary web platform that transforms casual, everyday descriptions into professional, optimized AI prompts. Whether you're a content creator, developer, marketer, or artist, PromptCraft helps you unlock the full potential of AI tools like ChatGPT, Midjourney, Claude, and more.

### Why PromptCraft?

- **🚀 Save Time**: Generate expert prompts in seconds, not hours
- **🎯 Better Results**: Optimized prompts mean better AI outputs
- **💎 All-in-One**: Support for multiple AI platforms
- **🌟 Community**: Discover and share prompts from thousands of users
- **💳 Affordable**: $30/month with 1-month free trial

---

## ✨ Features

### 🔮 Core Features
- **AI-Powered Generation** - Transform simple descriptions into expert prompts
- **Multi-Platform Support** - Optimized for ChatGPT, Midjourney, DALL-E, Claude, Coding Assistants
- **Custom Refinement** - Adjust tone (Professional/Casual/Academic), length, and format
- **Prompt Library** - Save and organize your favorite prompts
- **Community Showcase** - Share and discover amazing prompts
- **One-Click Copy** - Instant clipboard copy for easy sharing

### 💳 Subscription Plans
- **Free Trial**: 1 month full access, no credit card required
- **Premium**: $30/month for unlimited access and advanced features

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/subhadip-boop/promptcraft.ai.git
cd promptcraft.ai

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Setup database
npx prisma migrate dev

# Start development server
npm run dev

# Open http://localhost:3000
```

For detailed setup instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - How to deploy to production
- **[Architecture](./ARCHITECTURE.md)** - Technical architecture and code structure
- **[API Reference](./API_REFERENCE.md)** - Complete API documentation
- **[Contributing](./CONTRIBUTING.md)** - How to contribute
- **[Changelog](./CHANGELOG.md)** - Version history
- **[Branding](./BRANDING.md)** - Brand guidelines and assets

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Next.js API Routes** - Serverless functions
- **PostgreSQL** - Database
- **Prisma** - ORM

### Integrations
- **Clerk** - Authentication
- **Stripe** - Payments
- **OpenAI/Claude** - AI prompts
- **Vercel** - Hosting

---

## 🏗️ Project Structure

```
productcraft.ai/
├── app/                    # Next.js app directory
│   ├── dashboard/          # User dashboard
│   ├── api/                # API routes
│   └── pricing/            # Pricing page
├── components/             # React components
├── lib/                    # Utilities and helpers
├── prisma/                 # Database schema
├── public/                 # Static assets
└── docs/                   # Documentation
```

---

## 🔑 Environment Variables

See [.env.example](./.env.example) for all required variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk auth
- `CLERK_SECRET_KEY` - Clerk secret
- `OPENAI_API_KEY` - OpenAI API
- `STRIPE_SECRET_KEY` - Stripe payment

---

## 📊 Usage Statistics

- **Active Users**: Growing daily
- **Prompts Generated**: Thousands
- **Community Contributions**: Increasing
- **User Satisfaction**: 4.9/5 ⭐

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Ways to Contribute
- 🐛 Report bugs
- ✨ Suggest features
- 📝 Improve documentation
- 🎨 Design improvements
- ⚡ Performance optimizations

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

## 🙏 Acknowledgments

- Built with love by [Subhadip](https://github.com/subhadip-boop)
- Powered by OpenAI and Anthropic
- Designed with Tailwind CSS
- Hosted on Vercel

---

## 📞 Support

- **Email**: support@promptcraft.ai
- **GitHub Issues**: [Report a bug](https://github.com/subhadip-boop/promptcraft.ai/issues)
- **Twitter**: [@PromptCraftAI](https://twitter.com/promptcraftai)
- **Discord**: [Coming Soon]

---

## 🚀 Roadmap

- [ ] v1.1 - Email notifications
- [ ] v1.2 - Browser extension
- [ ] v1.3 - API access for premium
- [ ] v2.0 - Mobile app
- [ ] Team collaboration features
- [ ] Enterprise plans

---

<div align="center">
  <p>Made with ❤️ by PromptCraft AI</p>
  <p>Transform Your Ideas Into Expert Prompts</p>
</div>
