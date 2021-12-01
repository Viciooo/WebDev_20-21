import { Component, OnInit} from '@angular/core';
import {DishListService} from "../DishListService/dish-list.service";
import {CheckoutAndCurrenciesService} from "../checkoutAndCurrenciesService/checkout-and-currencies.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dishesService:DishListService,public moneyItemHandler:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
  }

  swap() {
    if(this.moneyItemHandler.currency ==='$') {
      this.moneyItemHandler.currency = '€'
      this.moneyItemHandler.basketValue *= this.moneyItemHandler.exchangeRate
      this.dishesService.myDishes.forEach((element)=>{
        element.price *= this.moneyItemHandler.exchangeRate
        element.price.toFixed(2)
      })
    }
        else {
      this.moneyItemHandler.currency = '$'
      this.moneyItemHandler.basketValue /= this.moneyItemHandler.exchangeRate
      this.dishesService.myDishes.forEach((element)=>{
        element.price /= this.moneyItemHandler.exchangeRate
        element.price.toFixed(2)
      })
    }
        this.moneyItemHandler.basketItems.toFixed(2)
  }

}
