# XYZ Billing App

A simple Angular frontend for creating and processing payments through a billing API, built with [PrimeNG](https://primeng.org/) components.

## Features

- Payment form with order number, amount, currency, gateway, and optional description fields
- Support for multiple currencies (EUR, USD, GBP)
- Support for multiple payment gateways (Montonio, Stripe)
- Real-time UI states for payment processing, success and error scenarios
- Auto-generated order numbers and user IDs for demo purposes
- Payment confirmation display with order number and payment ID

## Setup

The app can be launched via:

```
npm start
```

Navigate to http://localhost:4200/.

## Notes

- `generateUserId()` and `generateOrderNumber()` are mocked for demo purposes.
