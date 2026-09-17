import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CreatePaymentResponse } from './create-payment.response';
import { CreatePaymentRequest } from './create-payment.request';

@Injectable({ providedIn: 'root' })
export class BillingService {
  readonly CREATE_PAYMENT_URL = 'https://localhost:5202/api/payments';

  private readonly httpClient = inject(HttpClient);

  createPayment(request: CreatePaymentRequest): Observable<CreatePaymentResponse> {
    console.log(request);
    return this.httpClient.post<CreatePaymentResponse>(this.CREATE_PAYMENT_URL, request);
  }
}
