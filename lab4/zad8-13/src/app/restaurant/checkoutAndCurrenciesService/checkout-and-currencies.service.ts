import { Injectable } from '@angular/core';
import { checkoutItem } from './checkoutItem/checkout-list.module'

@Injectable({
  providedIn: 'root'
})
export class CheckoutAndCurrenciesService {
  currency: string = "$"
  exchangeRate: number = 0.89
  basketValue: number = 0
  basketItems: number = 0
  checkoutList: checkoutItem[] = [
  ]
  constructor() {
  }
}
