import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {DataHandlerService} from "../../services/data-handler.service";
import {Dish} from "../../interfaces/dish.module";
import {DataService} from "../../services/data.service";
import {PaginationService} from "../../services/pagination.service";
import {Router} from "@angular/router";
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";

@Component({
  selector: 'app-chefs-view',
  templateUrl: './chefs-view.component.html',
  styleUrls: ['./chefs-view.component.css']
})

export class ChefsViewComponent implements OnInit{
  //@ts-ignore
  dishForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              public paginationService:PaginationService,
              public dishesService: DataHandlerService,
              public moneyItemHandler: CheckoutAndCurrenciesService,
              private dataService:DataService) {}

  ngOnInit() : void {
    this.dishForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'maxAmt': ['', [Validators.required, Validators.minLength(2),Validators.min(1),Validators.max(1000)]],
      'cuisine': ['', [Validators.required, Validators.minLength(2)]],
      'dishType': ['', [Validators.required, Validators.minLength(2)]],
      'price': ['', [Validators.required,Validators.min(1),Validators.max(1000)]],
      'description': ['', [Validators.required, Validators.minLength(2)]],
      'imgPath': ['', [Validators.required,Validators.minLength(5)]],
      'ingredients': new FormArray([],[Validators.required,Validators.minLength(2)])
    });
  }

  onSubmit() {
    console.log(this.dishForm.controls)
    let newDish = new Dish(
      "",
      0,
      this.dishesService.newId,
      (<FormArray>this.dishForm.get('maxAmt')).value,
      (<FormArray>this.dishForm.get('name')).value,
      (<FormArray>this.dishForm.get('cuisine')).value,
      (<FormArray>this.dishForm.get('dishType')).value,
      (<FormArray>this.dishForm.get('ingredients')).value,
      (<FormArray>this.dishForm.get('maxAmt')).value,
      (<FormArray>this.dishForm.get('price')).value,
      (<FormArray>this.dishForm.get('description')).value,
      (<FormArray>this.dishForm.get('imgPath')).value,
      [0]
    )
    this.dataService.pushDish(newDish)
    this.dishesService.priceList.push([this.dishesService.newId,newDish.price])
    this.dishesService.priceList.sort((a, b) => a[1] > b[1] && 1 || -1)

    if(this.dishesService.dishTypes.indexOf((<FormArray>this.dishForm.get('dishType')).value) === -1){
      this.dataService.pushDishType((<FormArray>this.dishForm.get('dishType')).value)
      this.dishesService.dishTypesSelected.push(0)
    }
    if(this.dishesService.cuisineTypes.indexOf((<FormArray>this.dishForm.get('cuisine')).value) === -1){
      this.dataService.pushCuisineType((<FormArray>this.dishForm.get('cuisine')).value)
      this.dishesService.cuisineTypesSelected.push(0)
    }

    if(this.dishesService.prices[0] > (<FormArray>this.dishForm.get('price')).value){
      this.dishesService.prices[0] = (<FormArray>this.dishForm.get('price')).value
      this.dishesService.prices[2] = (<FormArray>this.dishForm.get('price')).value
    }
    if(this.dishesService.prices[1] < (<FormArray>this.dishForm.get('price')).value){
      this.dishesService.prices[1] = (<FormArray>this.dishForm.get('price')).value
      this.dishesService.prices[3] = (<FormArray>this.dishForm.get('price')).value
    }

    this.dishForm.reset()
  }

  addIngredient() {
    (<FormArray> this.dishForm.get('ingredients')).push(new FormControl(null,Validators.required))
  }

  getControls() {
    return (<FormArray>this.dishForm.get('ingredients')).controls;
  }

  deleteIngredient(j:number) {
    (<FormArray>this.dishForm.get('ingredients')).removeAt(j)
  }
  getControlAtIndex(i:number){
    return (<FormArray>this.dishForm.get('ingredients')).at(i)
  }

  changeName($event: Event,dish:Dish) {
    // @ts-ignore
    this.dataService.nameChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeMaxAmt($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.maxAmtChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeCuisine($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.cuisineChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeDishType($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.dishTypeChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeIngredients($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.ingredientsChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeAmount($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.amountChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changePrice($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.priceChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeDescription($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.descriptionChange(dish.key,(event.target as HTMLInputElement).value)
  }

  changeImgPath($event: Event, dish:Dish) {
    // @ts-ignore
    this.dataService.imgPathChange(dish.key,(event.target as HTMLInputElement).value)
  }

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

  getIdxInCheckoutList(myDish: Dish){
    return this.moneyItemHandler.checkoutList.findIndex((element) => element.id === myDish.id)
  }
}
