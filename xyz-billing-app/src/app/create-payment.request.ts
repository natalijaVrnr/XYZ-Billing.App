export type CreatePaymentRequest = {
  orderNumber: string;
  userId: string;
  amount: number;
  currency: string;
  gatewayId: Gateway;
  description?: string;
};

export type Gateway = 'stripe' | 'montonio';
