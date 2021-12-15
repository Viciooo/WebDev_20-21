import { Component, OnInit} from '@angular/core';
import {DishListService} from "../services/dish-list.service";
import {CheckoutAndCurrenciesService} from "../services/checkout-and-currencies.service";

@Component({
  selector: 'app-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menuHeader.component.css']
})
export class MenuHeaderComponent implements OnInit {

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
