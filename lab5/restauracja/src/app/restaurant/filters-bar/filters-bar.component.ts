import { Component, OnInit } from '@angular/core';
import {DishListService} from "../services/dish-list.service";
import { Options } from 'ng5-slider';
import { CheckoutAndCurrenciesService } from "../services/checkout-and-currencies.service";

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.css']
})
export class FiltersBarComponent implements OnInit {

  constructor(public dishesService:DishListService, public moneyItemHandler:CheckoutAndCurrenciesService) { }


  ngOnInit(): void {
  }

  resetAllCheckboxes() {
    this.dishesService.cuisineTypesSelected = Array(this.dishesService.cuisineTypesSelected.length).fill(0)
    this.dishesService.dishTypesSelected = Array(this.dishesService.dishTypesSelected.length).fill(0)
    this.dishesService.starsSelected = Array(5).fill(0)
    this.dishesService.prices[2] = this.dishesService.prices[0]
    this.dishesService.prices[3] = this.dishesService.prices[1]
  }


}
