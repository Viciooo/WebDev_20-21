import { Component, OnInit} from '@angular/core';
import {DishListService} from "../DishListService/dish-list.service";
import {CheckoutAndCurrenciesService} from "../checkoutAndCurrenciesService/checkout-and-currencies.service";

@Component({
  selector: 'app-header',
  templateUrl: './manuHeader.component.html',
  styleUrls: ['./menuHeader.component.css']
})
export class ManuHeaderComponent implements OnInit {

  constructor(public dishesService:DishListService,public moneyItemHandler:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
  }

  swap() {
    if(this.moneyItemHandler.currency ==='$') {
      this.moneyItemHandler.currency = '€'
      this.moneyItemHandler.basketValue *= this.moneyItemHandler.exchangeRate
      this.dishesService.myDishes.forEach((element)=>{
        element.price *= this.moneyItemHandler.exchangeRate
      })
      this.moneyItemHandler.checkoutList.forEach((element)=>{
        element.value *= this.moneyItemHandler.exchangeRate
        element.value = +element.value.toFixed(2)
      })
    }
        else {
      this.moneyItemHandler.currency = '$'
      this.moneyItemHandler.basketValue /= this.moneyItemHandler.exchangeRate
      this.dishesService.myDishes.forEach((element)=>{
        element.price /= this.moneyItemHandler.exchangeRate
      })
      this.moneyItemHandler.checkoutList.forEach((element)=>{
        element.value /= this.moneyItemHandler.exchangeRate
        element.value = +element.value.toFixed(2)
      })
    }
  }

}
