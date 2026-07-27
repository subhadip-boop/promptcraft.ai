# Contributing to PromptCraft AI

Thank you for your interest in contributing to PromptCraft AI! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a new branch** for your feature/fix
4. **Make your changes**
5. **Submit a pull request**

## Development Setup

```bash
# Clone repository
git clone https://github.com/your-username/promptcraft.ai.git
cd promptcraft.ai

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

## Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Format code with Prettier
- Use meaningful variable names
- Add comments for complex logic

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## Commit Messages

Use clear, descriptive commit messages:

```
✨ feat: Add new feature description
🐛 fix: Fix bug description
📝 docs: Documentation update
🎨 style: Code style changes
♻️ refactor: Code refactoring
✅ test: Add or update tests
⚡ perf: Performance improvements
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add/update tests** for your changes
3. **Ensure all tests pass**
4. **Fill out the PR template**
5. **Link related issues**
6. **Request review** from maintainers

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Areas for Contribution

### 🎨 Frontend
- UI/UX improvements
- Component optimization
- Accessibility enhancements
- Performance optimization

### ⚙️ Backend
- API improvements
- Database optimizations
- Error handling
- Rate limiting

### 📚 Documentation
- API documentation
- Setup guides
- Troubleshooting guides
- Code examples

### 🧪 Testing
- Unit tests
- Integration tests
- E2E tests
- Performance tests

### 🌐 Community
- Bug reports
- Feature requests
- User feedback
- Community support

## Reporting Bugs

Use GitHub Issues with the following template:

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 100]
- Node.js: [e.g. 18.0.0]
```

## Feature Requests

Use GitHub Issues with:

```markdown
## Description
Brief description of the feature

## Why is this needed?
Explain the use case

## Proposed Solution
How should this be implemented

## Alternatives Considered
Other possible approaches
```

## Code Review Process

1. **Automated Checks**
   - Tests must pass
   - Code coverage maintained
   - Linting passes

2. **Manual Review**
   - Code quality
   - Design patterns
   - Security considerations
   - Documentation

3. **Approval**
   - At least 1 maintainer approval
   - All conversations resolved
   - Branch up to date with main

## Community Guidelines

- Be respectful and inclusive
- Follow our Code of Conduct
- Help others in the community
- Provide constructive feedback
- Share knowledge and experience

## Questions?

- Check existing issues and discussions
- Read the documentation
- Ask in GitHub Discussions
- Email us at hello@promptcraft.ai

---

Thank you for contributing! 🎉
