import {Component, OnChanges, OnInit} from '@angular/core';
import {Dish} from "./dish/dish.module";
import { DishListService } from "../DishListService/dish-list.service"
import {CheckoutAndCurrenciesService} from "../checkoutAndCurrenciesService/checkout-and-currencies.service";
import {checkoutItem} from '../checkoutAndCurrenciesService/checkoutItem/checkout-list.module'

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit{
  constructor(public dishesService: DishListService,public moneyItemHandler: CheckoutAndCurrenciesService) {
  }

  ngOnInit(): void {
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


    this.dishesService.myDishes.some(function(item, index) { f = index; return item === myDish; });
    // @ts-ignore
    this.dishesService.myDishes.splice(f, 1);
    let idxToRemove = this.getIdxInPriceList(myDish.id,myDish.price)
    this.dishesService.priceList.splice(idxToRemove, 1);


    if(typeOfPrice === -1){
      this.dishesService.prices[0] = this.dishesService.calcMin()
      this.dishesService.prices[2] = this.dishesService.prices[0]
    }
    else if(typeOfPrice === 1){
      this.dishesService.prices[1] = this.dishesService.calcMax()
      this.dishesService.prices[3] = this.dishesService.prices[1]
    }

    this.dishesService.myDishes.forEach(e=>{
      if(e.dishType.toLowerCase() === thisDishType.toLowerCase()) itsLastDishOfThisType = false
      if(e.cuisine.toLowerCase() === thisCuisineType.toLowerCase()) itsLastCuisineOfThisType = false
    })

    if(itsLastDishOfThisType){
      let idx = this.dishesService.dishTypes.indexOf(thisDishType)
      this.dishesService.dishTypes.splice(idx, 1);
      this.dishesService.dishTypesSelected.splice(idx, 1);
    }

    if(itsLastCuisineOfThisType){
      let idx = this.dishesService.cuisineTypes.indexOf(thisCuisineType)
      this.dishesService.cuisineTypes.splice(idx, 1);
      this.dishesService.cuisineTypesSelected.splice(idx, 1);
    }


  }

  getIdxInPriceList(idxInMyDishes:number,priceInMyDishes:number){
    if(this.moneyItemHandler.currency === "$"){
      return this.dishesService.priceList.findIndex(
        (element) =>element.toString() === [idxInMyDishes,priceInMyDishes].toString())
    }
    else{
      return this.dishesService.priceList.findIndex(
        (element) =>element.toString() === [idxInMyDishes,priceInMyDishes/this.moneyItemHandler.exchangeRate].toString())
    }

  }

  changeRating(i: number,myDish:Dish) {
    myDish.rating = i
  }

  c(arr:any[]){
    let x = new Array(0)
    arr.forEach(e=>{
      x.push(e)
    })
    return x
  }

  sum(arr:number[]){
    let tmp = 0
    arr.forEach(e=>{
      tmp += e
    })
    return tmp
  }
}
