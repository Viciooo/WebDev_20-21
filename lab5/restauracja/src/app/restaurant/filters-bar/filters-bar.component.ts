import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DishListService} from "../services/dish-list.service";
import { CheckoutAndCurrenciesService } from "../services/checkout-and-currencies.service";
import {DataService} from "../services/data.service";
import {Dish} from "../interfaces/dish.module";

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.css']
})
export class FiltersBarComponent implements OnInit {
  myDishes: any = [];
  myDishTypes: any = [];
  myCuisineTypes: any = [];

  dishTypesSelected: any = []
  cuisineTypesSelected: any = []
  starsSelected: any = []
  priceList: any = []
  prices: any = []
  displayFilters: any = "flex"

  constructor(private dataService:DataService,public dishesService: DishListService,public moneyItemHandler: CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
    this.dataService.getDishList()
      .subscribe((e) => this.myDishes = e);
    this.dataService.getDishTypes()
      .subscribe((e) => this.myDishTypes = e);
    this.dataService.getCuisineTypes()
      .subscribe((e) => this.myCuisineTypes = e);

    this.dishesService.getDishTypesSelected().subscribe(e=> this.dishTypesSelected = e)
    this.dishesService.getCuisineTypesSelected().subscribe(e=> this.cuisineTypesSelected = e)
    this.dishesService.getStarsSelected().subscribe(e=> this.starsSelected = e)
    this.dishesService.getPriceList().subscribe(e=> this.priceList = e)
    this.dishesService.getPrices().subscribe(e=> this.prices = e)
    this.dishesService.getDisplayFilters().subscribe(e=> this.displayFilters = e)
  }

  ngOnChanges() {
    this.dataService.getDishList()
      .subscribe((e) => this.myDishes = e);
    this.dataService.getDishTypes()
      .subscribe((e) => this.myDishTypes = e);
    this.dataService.getCuisineTypes()
      .subscribe((e) => this.myCuisineTypes = e);

    this.dishesService.getDishTypesSelected().subscribe(e=> this.dishTypesSelected = e)
    this.dishesService.getCuisineTypesSelected().subscribe(e=> this.cuisineTypesSelected = e)
    this.dishesService.getStarsSelected().subscribe(e=> this.starsSelected = e)
    this.dishesService.getPriceList().subscribe(e=> this.priceList = e)
    this.dishesService.getPrices().subscribe(e=> this.prices = e)
    this.dishesService.getDisplayFilters().subscribe(e=> this.displayFilters = e)
  }
  resetAllCheckboxes() {
    this.dishesService.cuisineTypesSelected = Array(this.dishesService.cuisineTypesSelected.length).fill(0)
    this.dishesService.dishTypesSelected = Array(this.dishesService.dishTypesSelected.length).fill(0)
    this.dishesService.starsSelected = Array(5).fill(0)
    this.dishesService.prices[2] = this.dishesService.prices[0]
    this.dishesService.prices[3] = this.dishesService.prices[1]
  }

}
