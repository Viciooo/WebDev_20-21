import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {CheckoutAndCurrenciesService} from "./checkout-and-currencies.service";
import {FilterCuisinesPipe} from "../pipes/filter-cuisines.pipe";
import {FilterDishesPipe} from "../pipes/filter-dishes.pipe";
import {PricePipe} from "../pipes/price.pipe";
import {StarsPipe} from "../pipes/stars.pipe";
import {DishListService} from "./dish-list.service";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number = 1;
  itemsAtOneTime: number = 6;
  filteredDishes: any[] = []
  availableDishes: any
  constructor(public dishService: DishListService,
              public dataService: DataService,
              public moneyItemHandler: CheckoutAndCurrenciesService,
              public dishTypePipe:FilterDishesPipe,
              public cuisineTypePipe:FilterCuisinesPipe,
              public pricePipe: PricePipe,
              public starsPipe: StarsPipe) {
    this.dataService.dishList.subscribe(e=> {
      this.filteredDishes = e
      this.availableDishes = this.filteredDishes.length
    })

  }




  setDishes(){
    const dishTypePipe = new FilterDishesPipe()
    const cuisineTypePipe = new FilterCuisinesPipe()
    const pricePipe = new PricePipe()
    const starsPipe = new StarsPipe()

    this.filteredDishes = dishTypePipe.transform(
      this.filteredDishes,
      this.dishService.dishTypes,
      this.dishService.dishTypesSelected,
      this.dishService.sum(this.dishService.dishTypesSelected)
      )
    this.filteredDishes = cuisineTypePipe.transform(
      this.filteredDishes,
      this.dishService.cuisineTypes,
      this.dishService.cuisineTypesSelected,
      this.dishService.sum(this.dishService.cuisineTypesSelected)
    )
    this.filteredDishes = pricePipe.transform(this.filteredDishes,this.dishService.prices[2],this.dishService.prices[3])
    this.filteredDishes = starsPipe.transform(this.dishService.myDishes,this.dishService.starsSelected,this.dishService.sum(this.dishService.starsSelected))

    this.availableDishes = this.filteredDishes.length;
    if (this.getMaxPage() < this.currentPage){
      this.currentPage = this.getMaxPage();
    } else if (this.currentPage <= 0 && this.getMaxPage() > 0){
      this.currentPage = 1;
    }
  }

  sliderChange(value: any){
    console.log(value);
  }

  getMaxPage(){
    return Math.ceil(this.availableDishes/6);
  }

  pageNext(){
    this.currentPage = Math.min(this.currentPage + 1, this.getMaxPage());
  }

  pagePrev(){
    this.currentPage = Math.max(this.currentPage - 1, 1);
  }

  pageFirst(){
    this.currentPage = 1;
  }

  pageLast(){
    this.currentPage = this.getMaxPage();
  }
}


