import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatePaymentRequest, Gateway } from './create-payment.request';
import { FormsModule } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { CreatePaymentResponse } from './create-payment.response';
import { BillingService } from './billing.service';
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
      },
    }),
  ],
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    SelectModule,
    TextareaModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly currencies = [
    { label: 'EUR', value: 'EUR' },
    { label: 'USD', value: 'USD' },
    { label: 'GBP', value: 'GBP' },
  ];

  readonly gateways = [
    { label: 'Montonio', value: 'montonio' },
    { label: 'Stripe', value: 'stripe' },
  ];

  private readonly billingService = inject(BillingService);

  protected readonly title = signal('xyz-billing-app');

  isPaymentInProgress = signal<boolean>(false);
  isError = signal<boolean>(false);
  isPaymentCompleted = signal<boolean>(false);

  // extracting to separate signal we will be using for conditional rendering for better testability
  shouldShowError = computed(() => !this.isPaymentInProgress() && this.isError());

  paymentConfirmation = signal<CreatePaymentResponse | null>(null);

  paymentVm = signal<CreatePaymentRequest>({
    orderNumber: this.generateOrderNumber(),
    userId: this.generateUserId(),
    amount: 0,
    currency: 'EUR',
    gatewayId: 'Stripe' as Gateway,
    description: '',
  });

  pay(): void {
    const request = this.paymentVm();

    this.isPaymentInProgress.set(true);
    this.isError.set(false);

    this.billingService
      .createPayment(request)
      .pipe(
        finalize(() => {
          this.isPaymentInProgress.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this.paymentConfirmation.set(response);
          this.isPaymentCompleted.set(true);
        },
        error: (error) => {
          this.isError.set(true);
        },
        complete: () => {
          this.isPaymentInProgress.set(false);
        },
      });
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${randomSuffix}`;
  }

  // mocked user id for the sake of demo
  private generateUserId(): string {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `USER-${randomSuffix}`;
  }
}
