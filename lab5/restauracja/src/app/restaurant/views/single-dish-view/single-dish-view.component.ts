import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DishListService} from "../../services/dish-list.service";
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";
import {Dish} from "../../interfaces/dish.module";
import {checkoutItem} from "../../interfaces/checkout-list.module";
import {ReviewsService} from "../../services/reviews.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../interfaces/review.module";

@Component({
  selector: 'app-single-dish-view',
  templateUrl: './single-dish-view.component.html',
  styleUrls: ['./single-dish-view.component.css']
})
export class SingleDishViewComponent implements OnInit {
  dishId: number = -1
  //@ts-ignore
  myDish: Dish
  //@ts-ignore
  reviewForm: FormGroup

  constructor(private formBuilder : FormBuilder,
              public reviews:ReviewsService,
              private route: ActivatedRoute,
              public dishService:DishListService,
              public moneyItemHandler:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
    this.dishId = parseInt(<string>this.route.snapshot.paramMap.get('id'))
    this.myDish = this.dishService.myDishes[this.dishId]

    this.reviewForm = this.formBuilder.group({
      'nick': ['', [Validators.required, Validators.minLength(3)]],
      'title': ['', [Validators.required, Validators.minLength(5),Validators.min(1),Validators.max(1000)]],
      'content': ['', [Validators.required, Validators.minLength(50),Validators.maxLength(500)]],
      'date': [''],
    });
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


  onSubmit() {
    let newReview = new Review(
      (<FormArray>this.reviewForm.get('nick')).value,
      (<FormArray>this.reviewForm.get('title')).value,
      (<FormArray>this.reviewForm.get('content')).value,
    )
  //  to be continued
  }
}
