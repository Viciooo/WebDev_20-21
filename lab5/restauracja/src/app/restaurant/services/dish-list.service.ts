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
  constructor(private db: DataService) {
    this.db.getDishList().subscribe(e=>this.myDishes = e)
    this.db.getDishTypes().subscribe(e=>this.dishTypes = e)
    this.db.getCuisineTypes().subscribe(e=>this.cuisineTypes = e)
  }
  dishTypesSelected:number[] = Array(this.dishTypes.length).fill(0)
  cuisineTypesSelected:number[] = Array(this.cuisineTypes.length).fill(0)
  starsSelected:number[] = Array(6).fill(0)
  displayFilters:string = 'none'
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
  priceList: number[][] = this.populatePriceList()

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

  prices:number[] = [
    this.calcMin(),
    this.calcMax(),
    this.calcMin(),
    this.calcMax()
  ]

}
