

import {Component} from '@angular/core';
import {Dish} from "../interfaces/dish.module";
import { DishListService } from "../services/dish-list.service"
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
              public dishesService: DishListService,
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
  deleteElement(myDish:Dish) {
    this.paginationService.setDishes()
    // @ts-ignore
    let f
    let thisDishType = myDish.dishType
    let thisCuisineType = myDish.cuisine
    let itsLastDishOfThisType = true
    let itsLastCuisineOfThisType = true
    //if the price is max typeOfPrice = 1  in between its 0 min its -1
    let typeOfPrice = 0
    if(myDish.price === this.dishesService.prices[0]) typeOfPrice = -1
    if(myDish.price === this.dishesService.prices[1]) typeOfPrice = 1

    let idx = this.getIdxInCheckoutList(myDish)
    if(idx !== -1){
      this.moneyItemHandler.basketItems -= this.moneyItemHandler.checkoutList[idx].amount
      this.moneyItemHandler.basketValue -= this.moneyItemHandler.checkoutList[idx].amount * myDish.price
      this.moneyItemHandler.checkoutList.splice(idx, 1);
    }


    this.dataService.removeDish(myDish.key)

    let idxToRemove = this.getIdxInPriceList(myDish.id,myDish.price)
    // this.dishesService.priceList.splice(idxToRemove, 1);

    if(typeOfPrice === -1){
      this.dishesService.prices[0] = this.dishesService.calcMin()
      this.dishesService.prices[2] = this.dishesService.prices[0]
    }
    else if(typeOfPrice === 1){
      this.dishesService.prices[1] = this.dishesService.calcMax()
      this.dishesService.prices[3] = this.dishesService.prices[1]
    }
    this.dishesService.myDishes.forEach((e: Dish)=>{
      if(e.dishType.toLowerCase() === thisDishType.toLowerCase()) itsLastDishOfThisType = false
      if(e.cuisine.toLowerCase() === thisCuisineType.toLowerCase()) itsLastCuisineOfThisType = false
    })

    if(itsLastDishOfThisType){
      let idx = this.dishesService.dishTypes.indexOf(thisDishType)
      this.dataService.removeDishType(thisDishType)
      // this.dishesService.dishTypesSelected.splice(idx, 1);
    }

    if(itsLastCuisineOfThisType){
      let idx = this.dishesService.cuisineTypes.indexOf(thisCuisineType)
      this.dataService.removeCuisineType(thisCuisineType);
      // this.dishesService.cuisineTypesSelected.splice(idx, 1);
    }


  }

  getIdxInPriceList(idxInMyDishes:number,priceInMyDishes:number){
    if(this.moneyItemHandler.currency === "$"){
      return this.dishesService.priceList.findIndex(
        (element: { toString: () => string; }) =>element.toString() === [idxInMyDishes,priceInMyDishes].toString())
    }
    else{
      return this.dishesService.priceList.findIndex(
        (element: { toString: () => string; }) =>element.toString() === [idxInMyDishes,priceInMyDishes/this.moneyItemHandler.exchangeRate].toString())
    }

  }

  goToDetails(id:number){
    this.router.navigate(['/menu',id])
  }

  test() {
    console.log(this.paginationService.availableDishes,"aaaa")
  }
}
