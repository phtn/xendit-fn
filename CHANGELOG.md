# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial implementation of Xendit Functional SDK
- Customer management APIs (create, get, update)
- E-wallet payment APIs (charge, get)
- Comprehensive TypeScript support with Zod validation
- Error handling with custom error types
- Type guards for runtime validation
- Comprehensive test suite
- ESLint and Prettier configuration
- GitHub Actions CI/CD pipeline
- VSCode workspace configuration

### Features
- ✓ **Type Safety**: Full TypeScript support with comprehensive type definitions
- ✓ **Runtime Validation**: Input/output validation using Zod schemas
- ✓ **Modern APIs**: Built with async/await and functional programming patterns
- ✓ **Error Handling**: Comprehensive error handling with custom error types
- ✓ **Tree Shakable**: Import only what you need
- ✓ **Well Tested**: Comprehensive test coverage
- ✓ **tRPC Ready**: Optional tRPC integration for type-safe API calls

### Supported
- Countries: Philippines (PH), Indonesia (ID), Malaysia (MY), Thailand (TH), Vietnam (VN)
- Currencies: PHP, IDR, MYR, THB, VND
- E-wallet channels: GCash, PayMaya, OVO, DANA, and more
- Customer types: Individual and Business

## [0.0.1] - 2024-08-28

### Added
- Initial project setup
- Basic SDK structure
- Customer and E-wallet schema definitions

[unreleased]: https://github.com/xpriori/xendit-fn/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/xpriori/xendit-fn/releases/tag/v0.0.1
