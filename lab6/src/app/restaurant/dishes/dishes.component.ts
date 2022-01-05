

import {Component} from '@angular/core';
import {Dish} from "../interfaces/dish.module";
import { DataHandlerService } from "../services/data-handler.service"
import {CheckoutAndCurrenciesService} from "../services/checkout-and-currencies.service";
import {checkoutItem} from '../interfaces/checkout-list.module'
import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {PaginationService} from "../services/pagination.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent{

  constructor(public paginationService:PaginationService,
              private router:Router,
              private dataService:DataService,
              public dishesService: DataHandlerService,
              public moneyItemHandler: CheckoutAndCurrenciesService) {}

  takeItem(myDish: Dish) {
    this.dataService.amountChange(myDish.key, myDish.amount - 1)
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
    this.dataService.amountChange(myDish.key, myDish.amount + 1)
    this.moneyItemHandler.basketItems--
    this.moneyItemHandler.basketValue -= myDish.price

    let idx = this.getIdxInCheckoutList(myDish)
    this.moneyItemHandler.checkoutList[idx].amount--
    this.moneyItemHandler.checkoutList[idx].value -= myDish.price
    if(this.moneyItemHandler.checkoutList[idx].amount === 0){
      this.moneyItemHandler.checkoutList.splice(idx, 1);
    }
  }
  //

  goToDetails(id:number){
    this.router.navigate(['/menu',id])
  }

  test() {
    console.log(this.paginationService.availableDishes,"aaaa")
  }
}
