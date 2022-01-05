import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {CheckoutAndCurrenciesService} from "./checkout-and-currencies.service";
import {FilterCuisinesPipe} from "../pipes/filter-cuisines.pipe";
import {FilterDishesPipe} from "../pipes/filter-dishes.pipe";
import {PricePipe} from "../pipes/price.pipe";
import {StarsPipe} from "../pipes/stars.pipe";
import {DataHandlerService} from "./data-handler.service";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  filteredDishes: any[] = []
  availableDishes: any
  allDishes: any
  constructor(public dishService: DataHandlerService,
              public dataService: DataService,
              public moneyItemHandler: CheckoutAndCurrenciesService,
              public dishTypePipe:FilterDishesPipe,
              public cuisineTypePipe:FilterCuisinesPipe,
              public pricePipe: PricePipe,
              public starsPipe: StarsPipe) {
  }
  setDishes(){
    this.filteredDishes = this.dishService.myDishes
    const dishTypePipe = new FilterDishesPipe()
    const cuisineTypePipe = new FilterCuisinesPipe()
    const pricePipe = new PricePipe()
    const starsPipe = new StarsPipe()

    let tmp = dishTypePipe.transform(
      this.filteredDishes,
      this.dishService.dishTypes,
      this.dishService.dishTypesSelected,
      this.dishService.sum(this.dishService.dishTypesSelected)
      )
    tmp = cuisineTypePipe.transform(
        tmp,
      this.dishService.cuisineTypes,
      this.dishService.cuisineTypesSelected,
      this.dishService.sum(this.dishService.cuisineTypesSelected)
    )
    tmp = pricePipe.transform(tmp,this.dishService.prices[2],this.dishService.prices[3])
    tmp = starsPipe.transform(tmp,this.dishService.starsSelected,this.dishService.sum(this.dishService.starsSelected))
    this.filteredDishes = tmp
    this.availableDishes = this.filteredDishes.length;
    if (this.getMaxPage() < this.currentPage){
      this.currentPage = this.getMaxPage();
    } else if (this.currentPage <= 0 && this.getMaxPage() > 0){
      this.currentPage = 1;
    }

  }

  getMaxPage(){
    return Math.ceil(this.availableDishes/this.itemsPerPage);
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


