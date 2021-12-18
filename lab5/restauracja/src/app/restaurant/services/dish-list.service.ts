import {Injectable} from '@angular/core';
import {Dish} from "../interfaces/dish.module";
import {DataService} from "./data.service";
import {Observable, of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DishListService{
  myDishes: any[] = [];
  dishTypes: any[] = [];
  cuisineTypes: any[] = [];
  constructor(private db: DataService) {
    this.db.getDishList().subscribe(e=>this.myDishes = e)
    this.db.getDishTypes().subscribe(e=>this.dishTypes = e)
    this.db.getCuisineTypes().subscribe(e=>this.cuisineTypes = e)
  }
  dishTypesSelected = Array(this.dishTypes.length).fill(0)
  cuisineTypesSelected = Array(this.cuisineTypes.length).fill(0)
  starsSelected = Array(6).fill(0)
  displayFilters = 'none'
  //potentially not true
  newId = this.myDishes.length
  populatePriceList(){
    let i = 0
    let tmp: number[][] = []
    this.myDishes.forEach((e:Dish)=>{
      tmp.push([i++,e.price])
    })
    return tmp
  }
  priceList = this.populatePriceList()

  calcMax(){
    // let val = -1
    // this.priceList.forEach(e=>{
    //   val = Math.max(val,e[1])
    // })
    return 1000
  }

  calcMin(){
    // let val = 1000000
    // this.priceList.forEach(e=>{
    //   val = Math.min(val,e[1])
    // })
    return 1
  }

  prices = [
    this.calcMin(),
    this.calcMax(),
    this.calcMin(),
    this.calcMax()
  ]

  getDishTypesSelected(): Observable<any>{
    return of(this.dishTypesSelected)
  }
  getCuisineTypesSelected(): Observable<any>{
    return of(this.cuisineTypesSelected)
  }
  getStarsSelected(): Observable<any>{
    return of(this.starsSelected)
  }
  getPrices(): Observable<any>{
    return of(this.prices)
  }
  getPriceList(): Observable<any>{
    return of(this.priceList)
  }
  getDisplayFilters(): Observable<any>{
    return of(this.displayFilters)
  }
  changeDishTypesSelected(x:number){
    this.dishTypesSelected[x] = (this.dishTypesSelected[x] + 1) % 2
  }
  changeCuisineTypesSelected(x:number){
    this.cuisineTypesSelected[x] = (this.cuisineTypesSelected[x] + 1) % 2
  }
  changeStarsSelected(x:number){
    this.starsSelected[x] = (this.starsSelected[x] + 1) % 2
  }
  changeDisplayFilters(){
    if(this.displayFilters === 'none')this.displayFilters = 'flex'
    else{
      this.displayFilters ='none'
    }

  }
  changePrices(prices:number[]){
    this.prices = prices
  }
}
