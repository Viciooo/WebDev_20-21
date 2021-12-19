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
  allDishes: any
  constructor(public dishService: DishListService,
              public dataService: DataService,
              public moneyItemHandler: CheckoutAndCurrenciesService,
              public dishTypePipe:FilterDishesPipe,
              public cuisineTypePipe:FilterCuisinesPipe,
              public pricePipe: PricePipe,
              public starsPipe: StarsPipe) {
    this.updateFunc()
  }
  updateFunc(){
    this.dataService.dishList.subscribe(e=> {
      this.allDishes = e
      this.availableDishes = this.allDishes.length
    })
  }
  setDishes(){
    this.filteredDishes = this.allDishes
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
    console.log("aaa",this.getMaxPage(),this.currentPage,this.filteredDishes,this.availableDishes)

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


