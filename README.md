# Xendit SDK for TypeScript/JavaScript

[![npm version](https://badge.fury.io/js/xendit-fn.svg)](https://badge.fury.io/js/xendit-fn)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, production-ready TypeScript SDK for the Xendit payment gateway. Framework-agnostic and designed for any JavaScript/TypeScript project.

## Features

✓ **Production-Ready**
- Built-in rate limiting and retry logic
- Webhook signature verification
- Comprehensive error handling
- Pagination utilities

✓ **Developer Experience**
- Full TypeScript support with type safety
- Runtime validation using Zod schemas
- Tree-shakeable exports
- Framework-agnostic design

✓ **Complete API Coverage**
- Customer Management
- E-wallet Payments
- Payment Methods
- Invoice Management

## Installation

```bash
# Using bun (recommended)
bun add xendit-fn

# Using npm
npm install xendit-fn

# Using yarn
yarn add xendit-fn
```

## Quick Start

```typescript
import { Xendit } from 'xendit-fn';

// Initialize with your secret key
const xendit = Xendit(process.env.XENDIT_SECRET_KEY!);

// Create a customer
const customer = await xendit.customer.create({
  reference_id: 'customer_001',
  type: 'INDIVIDUAL',
  individual_detail: {
    given_names: 'John',
    surname: 'Doe',
  },
  email: 'john.doe@example.com',
  mobile_number: '+639171234567',
});

// Create an e-wallet charge
const charge = await xendit.ewallet.charge({
  reference_id: 'charge_001',
  currency: 'PHP',
  amount: 10000, // 100.00 PHP
  checkout_method: 'ONE_TIME_PAYMENT',
  channel_code: 'PH_GCASH',
  channel_properties: {
    success_redirect_url: 'https://yourapp.com/success',
    failure_redirect_url: 'https://yourapp.com/failure',
  },
});
```

## API Reference

### Customer Management

#### Create Customer

```typescript
const customer = await xendit.customer.create({
  reference_id: 'unique_customer_id',
  type: 'INDIVIDUAL', // or 'BUSINESS'
  individual_detail: {
    given_names: 'John',
    surname: 'Doe',
    nationality: 'PH',
    date_of_birth: '1990-01-01',
  },
  email: 'john@example.com',
  mobile_number: '+639171234567',
  addresses: [{
    country: 'PH',
    street_line1: '123 Main St',
    city: 'Manila',
    postal_code: '1000',
    is_primary: true,
  }],
});
```

#### Get Customer

```typescript
// Get by ID
const customer = await xendit.customer.getById({
  id: 'cust-12345'
});

// Get by reference ID
const customers = await xendit.customer.getByRefId({
  reference_id: 'customer_001'
});
```

#### Update Customer

```typescript
const updatedCustomer = await xendit.customer.update({
  id: 'cust-12345',
  payload: {
    email: 'newemail@example.com',
    phone_number: '+639181234567',
  },
});
```

### E-Wallet Payments

#### Create Charge

```typescript
// One-time payment
const charge = await xendit.ewallet.charge({
  reference_id: 'charge_001',
  currency: 'PHP',
  amount: 50000, // 500.00 PHP
  checkout_method: 'ONE_TIME_PAYMENT',
  channel_code: 'PH_GCASH',
  channel_properties: {
    success_redirect_url: 'https://yourapp.com/success',
    failure_redirect_url: 'https://yourapp.com/failure',
  },
  customer_id: 'cust-12345', // optional
  basket: [ // optional
    {
      reference_id: 'item_001',
      name: 'Product Name',
      category: 'Electronics',
      currency: 'PHP',
      price: 50000,
      quantity: 1,
      type: 'PRODUCT',
    },
  ],
});

// Tokenized payment
const tokenizedCharge = await xendit.ewallet.charge({
  reference_id: 'charge_002',
  currency: 'PHP',
  amount: 25000,
  checkout_method: 'TOKENIZED_PAYMENT',
  payment_method_id: 'pm-12345',
  channel_properties: {
    success_redirect_url: 'https://yourapp.com/success',
  },
});
```

#### Get Charge

```typescript
const charge = await xendit.ewallet.get({
  id: 'ewc-12345'
});
```

### Supported Countries and Currencies

- **Philippines (PH)**: PHP
- **Indonesia (ID)**: IDR
- **Malaysia (MY)**: MYR
- **Thailand (TH)**: THB
- **Vietnam (VN)**: VND

### Supported E-Wallet Channels

- **Indonesia**: OVO, DANA, LinkAja, ShopeePay, AstraPay, JENIUSPAY, SakuKu
- **Philippines**: PayMaya, GCash, GrabPay, ShopeePay
- **Vietnam**: Appota, MoMo, ShopeePay, VNPTWallet, ViettelPay, ZaloPay
- **Thailand**: WeChat Pay, LINE Pay, TrueMoney, ShopeePay
- **Malaysia**: Touch 'n Go, ShopeePay, GrabPay

## Error Handling

The SDK provides comprehensive error handling with custom error types:

```typescript
import { XenditApiError, ValidationError } from 'xendit-fn/errors';

try {
  const customer = await xendit.customer.create(invalidData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.validationErrors);
  } else if (error instanceof XenditApiError) {
    console.error('API Error:', {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    });
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Support

The SDK is built with TypeScript and provides full type definitions:

```typescript
import type {
  Customer,
  CustomerResource,
  EWalletChargeParams,
  EWalletChargeResource
} from 'xendit-fn';

// All parameters and responses are fully typed
const createCustomer = async (data: Customer): Promise<CustomerResource> => {
  return await xendit.customer.create(data);
};
```

## Development

### Setup

```bash
# Install dependencies
bun install

# Run type checking
bun run typecheck

# Run linting
bun run lint

# Run tests
bun run test
```

### Building

```bash
# Build the package
bun run build

# Start development mode
bun run dev
```

### Environment Variables

For testing, create a `.env` file:

```env
XENDIT_SK=your_xendit_secret_key_here
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Related Projects

- [Xendit API Documentation](https://developers.xendit.co/)
- [TypeScript](https://typescriptlang.org/)
- [Zod](https://zod.dev/)

## Production-Ready Features

### Rate Limiting

The SDK includes built-in rate limiting to respect API limits:

```typescript
import { Xendit } from 'xendit-fn';

const xendit = Xendit('your-api-key', {
  rateLimit: {
    maxRequests: 100,      // Max requests per window
    windowMs: 60000,       // Time window (1 minute)
    maxRetries: 3,         // Retry attempts
    baseRetryDelayMs: 1000 // Base delay for retries
  }
});
```

### Webhook Handling

Secure webhook processing with signature verification:

```typescript
import {
  createWebhookProcessor,
  WebhookHandlers,
  parseWebhookEvent
} from 'xendit-fn';

// Create webhook processor
const webhookProcessor = createWebhookProcessor({
  callbackToken: 'your-webhook-token',
  // OR use HMAC verification
  // hmacSecret: 'your-hmac-secret'
});

// Define event handlers
const handlers: WebhookHandlers = {
  'invoice.paid': async (event) => {
    console.log('Invoice paid:', event.data);
    // Process payment success
  },
  'payment.failed': async (event) => {
    console.log('Payment failed:', event.data);
    // Handle payment failure
  }
};

// Process webhook in your endpoint
app.post('/webhook', async (req, res) => {
  const result = await webhookProcessor.processWebhook(
    req.body,
    req.headers,
    handlers
  );

  if (result.success) {
    res.status(200).send('OK');
  } else {
    res.status(400).send(result.error);
  }
});
```

### Pagination Utilities

For endpoints that return paginated data:

```typescript
import { fetchAllPages, iterateItems } from 'xendit-fn';

// Get all invoices across all pages
const allInvoices = await fetchAllPages(
  axiosInstance,
  '/invoices',
  InvoiceSchema,
  { limit: 100, maxItems: 1000 }
);

// Stream through items
for await (const invoice of iterateItems(
  axiosInstance,
  '/invoices',
  InvoiceSchema
)) {
  console.log('Processing invoice:', invoice.id);
}
```

### Complete API Coverage

#### Payment Methods

```typescript
// Create payment method
const paymentMethod = await xendit.paymentMethod.create({
  customer_id: 'customer-id',
  type: 'DEBIT_CARD',
  properties: {
    id: 'card-token-from-xendit-js',
  },
});

// List payment methods
const paymentMethods = await xendit.paymentMethod.list({
  customer_id: 'customer-id',
});
```

#### Invoice Management

```typescript
// Create invoice
const invoice = await xendit.invoice.create({
  external_id: 'invoice-001',
  amount: 100000,
  description: 'Payment for services',
  invoice_duration: 3600,
  customer: {
    given_names: 'John',
    email: 'customer@example.com',
  },
  success_redirect_url: 'https://yoursite.com/success',
  failure_redirect_url: 'https://yoursite.com/failure',
});

// Expire invoice
const expiredInvoice = await xendit.invoice.expire({ id: 'invoice-id' });
```

### Environment Configuration

The SDK automatically detects test mode:

```typescript
// Test mode (automatically detected)
const xendit = Xendit('xnd_development_...');
//


// Production mode
const xendit = Xendit('xnd_production_...');
```

---

**Note**: This is an unofficial SDK. For official support, please refer to [Xendit's official documentation](https://developers.xendit.co/).
