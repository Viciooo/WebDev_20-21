import {Component, OnInit} from '@angular/core';
import {Dish} from "./dish/dish.module";
import { DishListService } from "../DishListService/dish-list.service"
import {CheckoutAndCurrenciesService} from "../checkoutAndCurrenciesService/checkout-and-currencies.service";
import {checkoutItem} from '../checkoutAndCurrenciesService/checkoutItem/checkout-list.module'
import { Observable, of } from "rxjs";


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  constructor(public dishesService: DishListService,public moneyItemHandler: CheckoutAndCurrenciesService) {
  }

  // myDishes$ = this.dishesService.myDishes
  ngOnInit(): void {
    // interval(1000).subscribe(e =>{
    //   this.myDishes$ = this.dishesService.myDishes
    // })
  }



  takeItem(myDish: Dish) {
    myDish.amount--
    this.moneyItemHandler.basketItems++
    this.moneyItemHandler.basketValue += myDish.price

    let idx = this.getIdxInCheckoutList(myDish)
    if(idx === -1){
      const item = new checkoutItem(myDish.id,myDish.name,1,myDish.price)
      this.moneyItemHandler.checkoutList.push(item)
    }else{
      this.moneyItemHandler.checkoutList[idx].amount++
      this.moneyItemHandler.checkoutList[idx].value += myDish.price
    }
  }

  getIdxInCheckoutList(myDish: Dish){
    return this.moneyItemHandler.checkoutList.findIndex((element) => element.id === myDish.id)
  }

  returnItem(myDish: Dish) {
    myDish.amount++
    this.moneyItemHandler.basketItems--
    this.moneyItemHandler.basketValue -= myDish.price

    let idx = this.getIdxInCheckoutList(myDish)
    this.moneyItemHandler.checkoutList[idx].amount--
    this.moneyItemHandler.checkoutList[idx].value -= myDish.price
    if(this.moneyItemHandler.checkoutList[idx].amount === 0){
      this.moneyItemHandler.checkoutList.splice(idx, 1);
    }
  }

  deleteElement(myDish:Dish) {
    // @ts-ignore
    let f
    this.dishesService.myDishes.some(function(item, index) { f = index; return item === myDish; });
    // @ts-ignore
    this.dishesService.myDishes.splice(f, 1);
    let idxToRemove = this.getIdxInPriceList(myDish.id,myDish.price)
    this.dishesService.priceList.splice(idxToRemove, 1);

    let idx = this.getIdxInCheckoutList(myDish)
    this.moneyItemHandler.basketItems -= this.moneyItemHandler.checkoutList[idx].amount
    this.moneyItemHandler.basketValue -= this.moneyItemHandler.checkoutList[idx].amount * myDish.price
    this.moneyItemHandler.checkoutList.splice(idx, 1);

  }

  getIdxInPriceList(idxInMyDishes:number,priceInMyDishes:number){
    return this.dishesService.priceList.findIndex(
      (element) =>element.toString() === [idxInMyDishes,priceInMyDishes].toString())

  }

  changeRating(i: number,myDish:Dish) {
    myDish.rating = i
  }
}
