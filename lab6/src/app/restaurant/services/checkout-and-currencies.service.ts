import { Injectable } from '@angular/core';
import { checkoutItem } from '../interfaces/checkout-list.module'
import {Dish} from "../interfaces/dish.module";

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

  getRealPrice(price:number) {
    if(this.currency === "$") return price.toFixed(2)
    return (price*this.exchangeRate).toFixed(2)
  }

  clearAll(){
    this.checkoutList = []
    this.basketItems = 0
    this.basketValue = 0
  }

  getIdxInCheckoutList(myDish: Dish){
    return this.checkoutList.findIndex((element) => element.id === myDish.id)
  }
  getAmountInChecklist(myDish:Dish){
    if(this.getIdxInCheckoutList(myDish) === -1) return 0
    return this.checkoutList[this.getIdxInCheckoutList(myDish)].amount
  }
}
