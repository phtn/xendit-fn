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
- **Payment Request API** (v3) - Unified payment processing
- **Refund API** - Process refunds
- **Payout API** - Disbursements and payouts
- **Balance & Transaction API** - Account balance and transaction history
- **Card Operations** - Tokenization, charges, and authorizations

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

// Create a payment request (recommended for new integrations)
const payment = await xendit.paymentRequest.create({
  reference_id: 'payment_001',
  type: 'PAY',
  country: 'PH',
  currency: 'PHP',
  request_amount: 10000, // 100.00 PHP
  payment_method: {
    type: 'EWALLET',
    ewallet: {
      channel_code: 'PH_GCASH',
      channel_properties: {
        success_redirect_url: 'https://yourapp.com/success',
        failure_redirect_url: 'https://yourapp.com/failure',
      },
    },
  },
  customer_id: customer.id,
});
```

## API Reference

### Payment Request API (v3) - Recommended

The Payment Request API is the unified way to process payments across all payment channels.

#### Create Payment Request

```typescript
// E-wallet payment
const payment = await xendit.paymentRequest.create({
  reference_id: 'payment_001',
  type: 'PAY',
  country: 'PH',
  currency: 'PHP',
  request_amount: 10000,
  payment_method: {
    type: 'EWALLET',
    ewallet: {
      channel_code: 'PH_GCASH',
      channel_properties: {
        success_redirect_url: 'https://yourapp.com/success',
        failure_redirect_url: 'https://yourapp.com/failure',
      },
    },
  },
  description: 'Payment for order #123',
  customer_id: 'cust-12345',
});

// Card payment
const cardPayment = await xendit.paymentRequest.create({
  reference_id: 'payment_002',
  type: 'PAY',
  country: 'PH',
  currency: 'PHP',
  request_amount: 50000,
  payment_method: {
    type: 'CARD',
    card_information: {
      token_id: 'token-from-xendit-js',
    },
  },
  capture_method: 'AUTOMATIC',
});

// Direct debit payment
const directDebitPayment = await xendit.paymentRequest.create({
  reference_id: 'payment_003',
  type: 'PAY',
  country: 'ID',
  currency: 'IDR',
  request_amount: 100000,
  payment_method: {
    type: 'DIRECT_DEBIT',
    direct_debit: {
      channel_code: 'BCA_ONEKLIK',
      channel_properties: {
        account_mobile_number: '+6281234567890',
      },
    },
  },
});

// Virtual account payment
const vaPayment = await xendit.paymentRequest.create({
  reference_id: 'payment_004',
  type: 'PAY',
  country: 'ID',
  currency: 'IDR',
  request_amount: 200000,
  payment_method: {
    type: 'VIRTUAL_ACCOUNT',
    virtual_account: {
      channel_code: 'BCA',
      channel_properties: {
        customer_name: 'John Doe',
      },
    },
  },
});
```

#### Get Payment Request

```typescript
const payment = await xendit.paymentRequest.get({
  id: 'pr-12345',
});
```

#### List Payment Requests

```typescript
const payments = await xendit.paymentRequest.list({
  status: ['SUCCEEDED', 'PENDING'],
  limit: 50,
  created_after: '2024-01-01T00:00:00Z',
});
```

### Refund API

Process refunds for successful payment requests.

#### Create Refund

```typescript
// Full refund
const refund = await xendit.refund.create({
  payment_request_id: 'pr-12345',
  reason: 'REQUESTED_BY_CUSTOMER',
  metadata: {
    order_id: 'order_123',
  },
});

// Partial refund
const partialRefund = await xendit.refund.create({
  payment_request_id: 'pr-12345',
  amount: 5000, // Partial amount
  reason: 'CANCELLATION',
});
```

#### Get Refund

```typescript
const refund = await xendit.refund.get({
  id: 'refund-12345',
});
```

#### List Refunds

```typescript
const refunds = await xendit.refund.list({
  payment_request_id: 'pr-12345',
  limit: 20,
});
```

### Payout API

Create and manage payouts/disbursements.

#### Create Payout

```typescript
// Bank payout
const payout = await xendit.payout.create({
  reference_id: 'payout_001',
  channel_code: 'BANK',
  channel_properties: {
    channel_code: 'BANK',
    bank_account: {
      account_holder_name: 'John Doe',
      account_number: '1234567890',
      bank_code: 'BCA',
      account_type: 'CHECKING',
    },
  },
  amount: 100000,
  currency: 'IDR',
  description: 'Payout for order #123',
});

// E-wallet payout
const ewalletPayout = await xendit.payout.create({
  reference_id: 'payout_002',
  channel_code: 'EWALLET',
  channel_properties: {
    channel_code: 'EWALLET',
    ewallet: {
      account_holder_name: 'Jane Doe',
      account_number: '+6281234567890',
      ewallet_type: 'OVO',
    },
  },
  amount: 50000,
  currency: 'IDR',
});
```

#### Get Payout

```typescript
const payout = await xendit.payout.get({
  id: 'payout-12345',
});
```

#### List Payouts

```typescript
const payouts = await xendit.payout.list({
  status: ['COMPLETED', 'PENDING'],
  channel_code: ['BANK'],
  limit: 50,
});
```

#### Cancel Payout

```typescript
const cancelledPayout = await xendit.payout.cancel({
  id: 'payout-12345',
});
```

### Balance & Transaction API

#### Get Balance

```typescript
const balance = await xendit.balance.get();
// Returns: { balance: 1000000, currency: 'IDR' }
```

#### List Transactions

```typescript
const transactions = await xendit.balance.listTransactions({
  types: ['PAYMENT', 'PAYOUT'],
  statuses: ['SUCCEEDED'],
  limit: 100,
  created_after: '2024-01-01T00:00:00Z',
});
```

### Card Operations

#### Create Token

```typescript
const token = await xendit.card.createToken({
  mid_label: 'merchant_label',
  card_data: {
    account_number: '4111111111111111',
    exp_month: '12',
    exp_year: '2025',
    card_holder_first_name: 'John',
    card_holder_last_name: 'Doe',
    card_holder_email: 'john@example.com',
    card_holder_phone_number: '+639171234567',
  },
  is_multiple_use: true,
  currency: 'PHP',
});
```

#### Get Token

```typescript
const token = await xendit.card.getToken({
  credit_card_token_id: 'token-12345',
});
```

#### Authenticate Token

```typescript
const auth = await xendit.card.authenticateToken({
  token_id: 'token-12345',
  amount: '10000',
  currency: 'PHP',
  external_id: 'auth_001',
});
```

#### Authorize Token

```typescript
const charge = await xendit.card.authorizeToken({
  token_id: 'token-12345',
  amount: '10000',
  external_id: 'charge_001',
  capture: true,
});
```

#### Create Charge

```typescript
const charge = await xendit.card.createCharge({
  token_id: 'token-12345',
  external_id: 'charge_001',
  amount: 10000,
  currency: 'PHP',
  capture: true,
  authentication_id: 'auth-12345',
});
```

#### Get Charge

```typescript
const charge = await xendit.card.getCharge({
  id: 'charge-12345',
});
```

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

### Payment Methods

#### Create Payment Method

```typescript
const paymentMethod = await xendit.paymentMethod.create({
  type: 'CARD',
  country: 'PH',
  reusability: 'MULTIPLE_USE',
  card: {
    currency: 'PHP',
    channel_properties: {
      success_return_url: 'https://yourapp.com/success',
      failure_return_url: 'https://yourapp.com/failure',
    },
  },
});
```

#### Get Payment Method

```typescript
const paymentMethod = await xendit.paymentMethod.get({
  id: 'pm-12345',
});
```

#### List Payment Methods

```typescript
const paymentMethods = await xendit.paymentMethod.list({
  customer_id: 'cust-12345',
  type: ['CARD', 'EWALLET'],
  status: ['ACTIVE'],
  limit: 50,
});
```

#### Update Payment Method

```typescript
const updated = await xendit.paymentMethod.update({
  id: 'pm-12345',
  payload: {
    status: 'INACTIVE',
    description: 'Card expired',
  },
});
```

### Invoice Management

#### Create Invoice

```typescript
const invoice = await xendit.invoice.create({
  external_id: 'invoice-001',
  payer_email: 'customer@example.com',
  amount: 100000,
  description: 'Payment for services',
  invoice_duration: 3600,
  customer: {
    customer_name: 'John Doe',
    customer_email: 'customer@example.com',
    customer_phone: '+639171234567',
  },
  success_redirect_url: 'https://yoursite.com/success',
  failure_redirect_url: 'https://yoursite.com/failure',
});
```

#### Get Invoice

```typescript
const invoice = await xendit.invoice.get({
  invoice_id: 'invoice-12345',
});
```

#### List Invoices

```typescript
const invoices = await xendit.invoice.list({
  statuses: ['PAID', 'PENDING'],
  limit: 50,
  created_after: '2024-01-01T00:00:00Z',
});
```

#### Update Invoice

```typescript
const updated = await xendit.invoice.update({
  invoice_id: 'invoice-12345',
  payload: {
    customer_email: 'newemail@example.com',
    items: [
      {
        name: 'Updated Item',
        quantity: 2,
        price: 50000,
      },
    ],
  },
});
```

#### Expire Invoice

```typescript
const expired = await xendit.invoice.expire({
  invoice_id: 'invoice-12345',
});
```

## Supported Countries and Currencies

- **Philippines (PH)**: PHP
- **Indonesia (ID)**: IDR
- **Malaysia (MY)**: MYR
- **Thailand (TH)**: THB
- **Vietnam (VN)**: VND

## Supported Payment Channels

### E-Wallets
- **Indonesia**: OVO, DANA, LinkAja, ShopeePay, AstraPay, JENIUSPAY, SakuKu
- **Philippines**: PayMaya, GCash, GrabPay, ShopeePay
- **Vietnam**: Appota, MoMo, ShopeePay, VNPTWallet, ViettelPay, ZaloPay
- **Thailand**: WeChat Pay, LINE Pay, TrueMoney, ShopeePay
- **Malaysia**: Touch 'n Go, ShopeePay, GrabPay

### Cards
- Visa, Mastercard, JCB, AMEX

### Direct Debit
- BCA OneKlik, Mandiri ClickPay, BRI AutoDebit

### Virtual Accounts
- BCA, BNI, Mandiri, Permata, and more

## Error Handling

The SDK provides comprehensive error handling with custom error types:

```typescript
import { XenditApiError, ValidationError } from 'xendit-fn';

try {
  const payment = await xendit.paymentRequest.create(invalidData);
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
  CreatePaymentRequest,
  PaymentRequestResource,
  CreateRefund,
  RefundResource,
  CreatePayout,
  PayoutResource,
} from 'xendit-fn';

// All parameters and responses are fully typed
const createPayment = async (
  data: CreatePaymentRequest
): Promise<PaymentRequestResource> => {
  return await xendit.paymentRequest.create(data);
};
```

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
} from 'xendit-fn';

// Create webhook processor
const webhookProcessor = createWebhookProcessor({
  callbackToken: 'your-webhook-token',
  // OR use HMAC verification
  // hmacSecret: 'your-hmac-secret'
});

// Define event handlers
const handlers: WebhookHandlers = {
  'payment_request.succeeded': async (event) => {
    console.log('Payment succeeded:', event.data);
    // Process payment success
  },
  'payment_request.failed': async (event) => {
    console.log('Payment failed:', event.data);
    // Handle payment failure
  },
  'refund.succeeded': async (event) => {
    console.log('Refund processed:', event.data);
    // Handle refund
  },
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

## Environment Configuration

The SDK automatically detects test mode:

```typescript
// Test mode (automatically detected)
const xendit = Xendit('xnd_development_...');

// Production mode
const xendit = Xendit('xnd_production_...');
```

---

**Note**: This is an unofficial SDK. For official support, please refer to [Xendit's official documentation](https://developers.xendit.co/).
