# Contributing to PromptCraft AI

Thank you for your interest in contributing! Here's how you can help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/promptcraft.ai.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Follow our code standards (see below)
5. Commit your changes: `git commit -m "feat: add new feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Code Standards

### TypeScript
- Use strict mode
- No `any` types (use `unknown` if needed)
- Always type function parameters and returns

### React Components
- Use functional components with hooks
- Keep components under 300 lines
- Extract logic to custom hooks if needed
- Use TypeScript interfaces for props

```typescript
interface MyComponentProps {
  title: string
  onSubmit: (data: string) => Promise<void>
  loading?: boolean
}

export default function MyComponent({
  title,
  onSubmit,
  loading = false,
}: MyComponentProps) {
  // Component code
}
```

### Styling
- Use Tailwind CSS classes
- Follow the color palette in BRANDING.md
- Use the `@apply` directive for custom utilities

### API Routes
- Handle all error cases
- Validate input with Zod
- Return consistent response format
- Log errors for debugging

```typescript
export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate input
    const body = await request.json()
    if (!body.required_field) {
      return NextResponse.json({ error: 'Missing field' }, { status: 400 })
    }

    // Process request
    const result = await doSomething(body)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Commit Message Format

Use conventional commits:
```
feat: add new feature
fix: fix a bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

## Pull Request Process

1. Update CHANGELOG.md
2. Add tests for new features
3. Update documentation if needed
4. Ensure all tests pass
5. Request review from maintainers

## Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 🧪 Tests

## Feature Ideas

- [ ] Batch prompt generation
- [ ] Prompt versioning
- [ ] Team collaboration
- [ ] API for third-party integration
- [ ] Prompt templates marketplace
- [ ] Analytics dashboard
- [ ] Export to PDF
- [ ] Browser extension

## Questions?

- Open a GitHub Discussion
- Email: dev@promptcraft.ai
- Discord: [Coming Soon]

Thanks for contributing! 🙌
