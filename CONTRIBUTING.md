# Contributing to xendit-fn

Thank you for considering contributing to xendit-fn! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/xendit-fn.git
   cd xendit-fn
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Create a `.env` file for testing:
   ```bash
   XENDIT_SK=your_xendit_secret_key_here
   ```

### Development Workflow

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run the validation script to ensure everything passes:
   ```bash
   bun run validate
   ```

4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add new payment method support"
   ```

5. Push to your fork and create a Pull Request

## Scripts

- `bun run dev` - Start development mode with file watching
- `bun run build` - Build the package
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
- `bun run typecheck` - Run TypeScript type checking
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Run ESLint with auto-fix
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check code formatting
- `bun run validate` - Run all checks (type, lint, format, test)

## Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Please ensure your code follows these standards by running:
```bash
bun run lint:fix
bun run format
```

## Testing

- Write tests for new functionality
- Ensure all tests pass: `bun run test`
- Maintain or improve test coverage
- Place tests in the `src/_test_/` directory
- Use descriptive test names

### Test Structure

```typescript
import { describe, expect, it } from "bun:test";

describe("FeatureName", () => {
  it("should do something specific", () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

Examples:
```bash
feat: add support for new payment method
fix: resolve validation error for phone numbers
docs: update README with new examples
test: add tests for customer creation
```

## Pull Request Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Tests**: Include or update tests for your changes
4. **Documentation**: Update documentation if needed
5. **Validation**: Ensure `bun run validate` passes

### Pull Request Template

When creating a PR, please include:

- **What**: Brief description of changes
- **Why**: Reason for the changes
- **How**: Implementation approach (if complex)
- **Testing**: How you tested the changes
- **Breaking Changes**: Any breaking changes (if applicable)

## Code Review Process

1. All PRs require review from maintainers
2. Address any feedback or requested changes
3. Ensure all CI checks pass
4. Maintain a clean commit history

## Adding New Features

When adding new Xendit API endpoints or features:

1. **Schema First**: Define Zod schemas for request/response types
2. **Error Handling**: Include proper error handling
3. **Type Safety**: Ensure full TypeScript support
4. **Validation**: Add input/output validation
5. **Tests**: Write comprehensive tests
6. **Documentation**: Update README and add code examples

### Example Structure

```typescript
// Schema definition
export const NewFeatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  // ... other fields
});

// Function implementation
export const createNewFeature = async (
  params: NewFeature,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
): Promise<NewFeatureResource> => {
  try {
    const validatedParams = validateInput(NewFeatureSchema, params, "new feature params");
    const response = await axiosInstance.post<NewFeatureResource>("/new-feature", validatedParams, config);
    return validateInput(NewFeatureResourceSchema, response.data, "new feature response");
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as any);
    }
    throw error;
  }
};
```

## Bug Reports

When reporting bugs:

1. Use the issue templates
2. Provide a minimal reproduction case
3. Include error messages and stack traces
4. Specify your environment (Node version, OS, etc.)

## Feature Requests

When requesting features:

1. Check if the feature already exists
2. Explain the use case and benefits
3. Provide examples of how it would be used
4. Consider if it fits the project's scope

## Questions?

- Open a GitHub Discussion for general questions
- Open an Issue for bug reports or feature requests
- Check the README and documentation first

## License

By contributing to xendit-fn, you agree that your contributions will be licensed under the MIT License.
