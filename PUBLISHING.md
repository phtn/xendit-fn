# Publishing Guide for xendit-fn

This guide will walk you through publishing the xendit-fn library to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **npm CLI**: Make sure you have npm installed and are logged in:
   ```bash
   npm login
   npm whoami  # Verify you're logged in
   ```

## Pre-Publishing Checklist

### 1. Version Management
Update the version in `package.json` following semantic versioning:
- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features (backwards compatible)
- **Major** (2.0.0): Breaking changes

```bash
# Update version automatically
npm version patch  # or minor, major
```

### 2. Quality Checks
Run all validation steps:
```bash
npm run validate
```

This runs:
- `npm run typecheck` - TypeScript type checking
- `npm run lint` - Code linting
- `npm run format:check` - Code formatting check

### 3. Build the Package
```bash
npm run build
```

This creates the `lib/` directory with:
- `lib/index.js` - CommonJS build
- `lib/index.esm.js` - ES Module build
- `lib/index.d.ts` - TypeScript declarations
- `lib/**/*.d.ts` - All type definitions

### 4. Test the Build Locally
```bash
# Pack the package locally
npm pack

# This creates a .tgz file you can test in another project
npm install /path/to/xendit-fn-1.0.0.tgz
```

## Publishing Steps

### 1. Dry Run
Test the publishing process without actually publishing:
```bash
npm publish --dry-run
```

### 2. Publish to npm
```bash
npm publish
```

For scoped packages (if you want to publish under your username):
```bash
npm publish --access public
```

## Post-Publishing

### 1. Verify Publication
- Check your package on [npmjs.com/package/xendit-fn](https://npmjs.com/package/xendit-fn)
- Test installation: `npm install xendit-fn`

### 2. Tag the Release (Optional but Recommended)
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 3. Create GitHub Release
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0`
5. Describe the changes and features

## Continuous Integration (Optional)

For automated publishing, you can set up GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run validate
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Package Management Tips

### Beta Releases
For beta/alpha versions:
```bash
npm version 1.0.0-beta.1
npm publish --tag beta

# Users install with:
npm install xendit-fn@beta
```

### Updating Existing Package
For subsequent releases:
```bash
npm version patch  # Updates version
npm run validate   # Run checks
npm run build     # Build package
npm publish       # Publish update
```

## File Structure for Publishing

The published package will include only these files (defined in `package.json` `files` field):
```
xendit-fn/
├── lib/           # Built JavaScript and TypeScript definitions
│   ├── index.js   # CommonJS entry point
│   ├── index.esm.js # ES Module entry point
│   └── index.d.ts # TypeScript definitions
├── README.md      # Documentation
├── LICENSE        # MIT License
└── package.json   # Package metadata
```

## Common Issues

### 1. Authentication Errors
```bash
npm login
# Or use auth token
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

### 2. Package Name Conflicts
If the name is taken, you can:
- Use a scoped name: `@yourusername/xendit-fn`
- Choose a different name
- Add a suffix: `xendit-fn-sdk`

### 3. Build Errors
Make sure all dependencies are installed:
```bash
npm install
npm run clean
npm run build
```

## Final Notes

- Always test your package locally before publishing
- Keep your README.md up to date with examples
- Follow semantic versioning
- Consider setting up automated testing and publishing workflows

Once published, developers can install your library with:
```bash
npm install xendit-fn
# or
yarn add xendit-fn
# or
bun add xendit-fn
```
