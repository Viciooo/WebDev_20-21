import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DishListService} from "../../DishListService/dish-list.service";
import {CheckoutAndCurrenciesService} from "../../checkoutAndCurrenciesService/checkout-and-currencies.service";
import {Dish} from "../../dishes/dish/dish.module";
import {checkoutItem} from "../../checkoutAndCurrenciesService/checkoutItem/checkout-list.module";

@Component({
  selector: 'app-single-dish-view',
  templateUrl: './single-dish-view.component.html',
  styleUrls: ['./single-dish-view.component.css']
})
export class SingleDishViewComponent implements OnInit {
  dishId: number = -1
  //@ts-ignore
  myDish: Dish
  constructor(private route: ActivatedRoute,public dishService:DishListService,public moneyItemHandler:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
    this.dishId = parseInt(<string>this.route.snapshot.paramMap.get('id'))
    this.myDish = this.dishService.myDishes[this.dishId]

  }
  changeRating(i: number,myDish:Dish) {
    myDish.rating = i
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
}
