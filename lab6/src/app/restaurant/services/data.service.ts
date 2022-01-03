import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";
import {Dish} from "../interfaces/dish.module";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dishList: Observable<any>
  dishTypes: Observable<any>
  cuisineTypes: Observable<any>
  constructor(private db: AngularFireDatabase) {
    this.dishList = this.getDishList()
    this.dishTypes = this.getDishTypes()
    this.cuisineTypes = this.getCuisineTypes()
  }

  getDishList(){
    return this.db.list('dishList').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        // @ts-ignore
        return new Dish(key,data.rating,data.id,data.maxAmt,data.name,data.cuisine,data.dishType,data.ingredients,data.amount,data.price,data.description,data.imgPath)
      })
    }));
  }

  getDishTypes() {
    return  this.db.list('dishTypes').valueChanges();
  }

  getCuisineTypes() {
    return this.db.list('cuisineTypes').valueChanges();
  }

  pushDish(myDish:Dish){
    const dishList = this.db.list('dishList')
    dishList.push(myDish)
  }

  removeDish(dish:string){
    const dishList = this.db.list('dishList')
    dishList.remove(dish);
  }

  pushDishType(dishType:string){
    const dishTypes = this.db.list('dishTypes')
    // dishTypes.push(dishType)
  }

  removeDishType(dishType:string){
    const dishTypes = this.db.list('dishTypes')
    dishTypes.remove(dishType);
  }

  pushCuisineType(cuisineType:string){
    const cuisineTypes = this.db.list('cuisineTypes')
    // cuisineTypes.push(cuisineType)
  }

  removeCuisineType(cuisineType:string){
    const cuisineTypes = this.db.list('cuisineTypes')
    cuisineTypes.remove(cuisineType);
  }

  //modify data functions
  ratingChange(key:string,rating:number){
    this.db.list('dishList').update(key,{rating:rating})
  }
  maxAmtChange(key:string,maxAmt:number){
    this.db.list('dishList').update(key,{maxAmt:maxAmt})
  }
  nameChange(key:string,name:string){
    this.db.list('dishList').update(key,{name:name})
  }
  cuisineChange(key:string,cuisine:string){
    this.db.list('dishList').update(key,{cuisine:cuisine})
  }
  dishTypeChange(key:string,dishType:string){
    this.db.list('dishList').update(key,{dishType:dishType})
  }
  ingredientsChange(key:string,ingredients:string[]){
    this.db.list('dishList').update(key,{ingredients:ingredients})
  }
  amountChange(key:string,amount:number){
    this.db.list('dishList').update(key,{amount:amount})
  }
  priceChange(key:string,price:number){
    this.db.list('dishList').update(key,{price:price})
  }
  descriptionChange(key:string,description:string){
    this.db.list('dishList').update(key,{description:description})
  }
  imgPathChange(key:string,imgPath:string[]){
    this.db.list('dishList').update(key,{imgPath:imgPath})
  }
}
