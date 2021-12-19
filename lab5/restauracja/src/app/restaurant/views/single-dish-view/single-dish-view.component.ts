import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DishListService} from "../../services/dish-list.service";
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";
import {Dish} from "../../interfaces/dish.module";
import {checkoutItem} from "../../interfaces/checkout-list.module";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../interfaces/review.module";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-single-dish-view',
  templateUrl: './single-dish-view.component.html',
  styleUrls: ['./single-dish-view.component.css']
})
export class SingleDishViewComponent implements OnInit, OnChanges {
  dishId: number = -1
  //@ts-ignore
  reviewForm: FormGroup
  myDishes: any = [];
  myReviews: Review[] = []

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public dishService: DishListService,
              public moneyItemHandler: CheckoutAndCurrenciesService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.dishList
      .subscribe((e) => this.myDishes = e);
    this.dishId = parseInt(<string>this.route.snapshot.paramMap.get('id'))
    this.reviewForm = this.formBuilder.group({
      'nick': ['', [Validators.required, Validators.minLength(3)]],
      'title': ['', [Validators.required, Validators.minLength(5), Validators.min(1), Validators.max(1000)]],
      'content': ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      'date': [''],
    });

  }

  ngOnChanges() {
    this.dataService.dishList
      .subscribe((e) => this.myDishes = e);
  }

  getMyDish() {
    let tmp: Dish
    this.myDishes.forEach((dish: Dish) => {
      if (dish.id === this.dishId) {
        tmp = dish
      }
    })
    // @ts-ignore
    return tmp
  }

  changeRating(i: number, myDish: Dish) {
    // myDish.rating = i
    this.dataService.ratingChange(myDish.name, i)
  }

  takeItem(myDish: Dish) {
    this.dataService.amountChange(myDish.key, myDish.amount - 1)
    this.moneyItemHandler.basketItems++
    this.moneyItemHandler.basketValue += myDish.price

    let idx = this.getIdxInCheckoutList(myDish)
    if (idx === -1) {
      const item = new checkoutItem(myDish.id, myDish.name, 1, myDish.price)
      this.moneyItemHandler.checkoutList.push(item)
    } else {
      this.moneyItemHandler.checkoutList[idx].amount++
      this.moneyItemHandler.checkoutList[idx].value += myDish.price
    }
  }

  getIdxInCheckoutList(myDish: Dish) {
    return this.moneyItemHandler.checkoutList.findIndex((element) => element.id === myDish.id)
  }

  returnItem(myDish: Dish) {
    this.dataService.amountChange(myDish.key, myDish.amount + 1)
    this.moneyItemHandler.basketItems--
    this.moneyItemHandler.basketValue -= myDish.price

    let idx = this.getIdxInCheckoutList(myDish)
    this.moneyItemHandler.checkoutList[idx].amount--
    this.moneyItemHandler.checkoutList[idx].value -= myDish.price
    if (this.moneyItemHandler.checkoutList[idx].amount === 0) {
      this.moneyItemHandler.checkoutList.splice(idx, 1);
    }
  }


  onSubmit() {
    let newReview = new Review(
      (<FormArray>this.reviewForm.get('nick')).value,
      (<FormArray>this.reviewForm.get('title')).value,
      (<FormArray>this.reviewForm.get('content')).value,
    )
    this.myReviews.push(newReview)
    this.reviewForm.reset()
    //  to be continued
  }
}
