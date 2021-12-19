import {Injectable} from '@angular/core';
import {Dish} from "../interfaces/dish.module";
import {DataService} from "./data.service";
@Injectable({
  providedIn: 'root'
})
export class DishListService{
  myDishes: any[] = [];
  dishTypes: any[] = [];
  cuisineTypes: any[] = [];
  dishTypesSelected: any
  cuisineTypesSelected: any
  newId: number = 0
  priceList: any[] = []
  prices: any[] = []

  constructor(private db: DataService) {
    this.db.dishList.subscribe(e=> {
      this.myDishes = e
      this.newId = e.length + 1
      this.priceList = this.populatePriceList()
      this.prices = [
        this.calcMin(),
        this.calcMax(),
        this.calcMin(),
        this.calcMax()
      ]
    })
    this.db.dishTypes.subscribe(e=> {
      this.dishTypes = e
      this.dishTypesSelected = Array(e.length).fill(0)

    })
    this.db.cuisineTypes.subscribe(e=> {
      this.cuisineTypes = e
      this.cuisineTypesSelected = Array(e.length).fill(0)
    })
  }
  starsSelected = Array(6).fill(0)
  displayFilters = 'none'
  //potentially not true


  populatePriceList(){
    let i = 0
    let tmp: number[][] = []
    this.myDishes.forEach((e:Dish)=>{
      tmp.push([i++,e.price])
    })
    return tmp
  }



  calcMax(){
    let val = -1
    this.priceList.forEach(e=>{
      val = Math.max(val,e[1])
    })
    return val
  }

  calcMin(){
    let val = 1000000
    this.priceList.forEach(e=>{
      val = Math.min(val,e[1])
    })
    return val
  }

  sum(arr:number[]){
    let tmp = 0
    arr.forEach(e=>{
      tmp += e
    })
    return tmp
  }
  // getDishTypesSelected(): Observable<any>{
  //   return of(this.dishTypesSelected)
  // }
  // getCuisineTypesSelected(): Observable<any>{
  //   return of(this.cuisineTypesSelected)
  // }
  // getStarsSelected(): Observable<any>{
  //   return of(this.starsSelected)
  // }
  // getPrices(): Observable<any>{
  //   return of(this.prices)
  // }
  // getPriceList(): Observable<any>{
  //   return of(this.priceList)
  // }
  // getDisplayFilters(): Observable<any>{
  //   return of(this.displayFilters)
  // }
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
