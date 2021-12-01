import {Component, OnInit} from '@angular/core';
import {Dish} from "./dish/dish.module";
import { DishListService } from "../DishListService/dish-list.service"
import {CheckoutAndCurrenciesService} from "../checkoutAndCurrenciesService/checkout-and-currencies.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  constructor(public dishesService: DishListService,public moneyItemHandler: CheckoutAndCurrenciesService) {
  }

  ngOnInit(): void {
  }

  takeItem(myDish: Dish) {
    myDish.amount--
    this.moneyItemHandler.basketItems++
    this.moneyItemHandler.basketValue += myDish.price * this.moneyItemHandler.exchangeRate
  }

  returnItem(myDish: Dish) {
    myDish.amount++
    this.moneyItemHandler.basketItems--
    this.moneyItemHandler.basketValue -= myDish.price * this.moneyItemHandler.exchangeRate
  }

  deleteElement(myDish:Dish) {
    // @ts-ignore
    let f
    this.dishesService.myDishes.some(function(item, index) { f = index; return item === myDish; });
    // @ts-ignore
    this.dishesService.myDishes.splice(f, 1);
    let idxToRemove = this.getIdxInPriceList(myDish.id,myDish.price)
    this.dishesService.priceList.splice(idxToRemove, 1);
  }

  getIdxInPriceList(idxInMyDishes:number,priceInMyDishes:number){
    return this.dishesService.priceList.findIndex((element) =>element.toString() === [idxInMyDishes,priceInMyDishes].toString())
  }

  changeRating(i: number,myDish:Dish) {
    myDish.rating = i
  }
}
