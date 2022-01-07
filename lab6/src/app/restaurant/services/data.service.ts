import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable} from "rxjs";
import {Dish} from "../interfaces/dish.module";
import {dbUser, OrderedDish, Roles} from "../interfaces/db.user.module";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dishList: Observable<any>
  dishTypes: Observable<any>
  cuisineTypes: Observable<any>
  userList: Observable<any>
  constructor(private db: AngularFireDatabase) {
    this.dishList = this.getDishList()
    this.dishTypes = this.getDishTypes()
    this.cuisineTypes = this.getCuisineTypes()
    this.userList = this.getUserList()
  }
  getUserList(){
    return this.db.list('users').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        // @ts-ignore
        return new dbUser(key,data.nick,data.roles,data.orders)
      })
    }));
  }

  getDishList(){
    return this.db.list('dishList').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();

          // @ts-ignore
          const avgRating = Math.ceil(data.rating.reduce((ratingSum:number,current:number) => ratingSum + current,0) / Math.max(data.rating.length-1,1))
        // @ts-ignore
        return new Dish(key,avgRating,data.id,data.maxAmt,data.name,data.cuisine,data.dishType,data.ingredients,data.amount,data.price,data.description,data.imgPath,data.rating)
      })
    }));
  }


  addOrder(key:string,newOrders:OrderedDish[]){
    this.db.list('users').update(key,{orders:newOrders})
  }

  addUserRating(key:string,newRating:number[]){
    this.db.list('users').update(key,{rating:newRating})
  }

  addDishRating(key:string,newRating:number[]){
    this.db.list('dishList').update(key,{rating:newRating})
  }

  changeUserRoles(key:string,roles:Roles){
    this.db.list('users').update(key,{roles:roles})
  }

  getDishTypes() {
    return  this.db.list('dishTypes').valueChanges();
  }

  getCuisineTypes() {
    return this.db.list('cuisineTypes').valueChanges();
  }

  pushUser(user:dbUser){
    this.db.database.ref('users').child(user.UID).set(user)
  }

  pushDish(myDish:Dish){
    const dishList = this.db.list('dishList')
    dishList.push(
      {
        key:myDish.key,
        rating:[0],
        id:myDish.id,
        maxAmt:myDish.maxAmt,
        name:myDish.name,
        cuisine:myDish.cuisine,
        dishType:myDish.dishType,
        ingredients:myDish.ingredients,
        amount:myDish.amount,
        price:myDish.price,
        description:myDish.description,
        imgPath:myDish.imgPath,
      }
    )
  }

  removeDish(dish:string){
    const dishList = this.db.list('dishList')
    dishList.remove(dish);
  }

  pushDishType(dishType:string){
    const dishTypes = this.db.list('dishTypes')
    dishTypes.push(dishType)
  }

  removeDishType(dishType:string){
    const dishTypes = this.db.list('dishTypes')
    dishTypes.remove(dishType);
  }

  pushCuisineType(cuisineType:string){
    const cuisineTypes = this.db.list('cuisineTypes')
    cuisineTypes.push(cuisineType)
  }

  removeCuisineType(cuisineType:string){
    const cuisineTypes = this.db.list('cuisineTypes')
    cuisineTypes.remove(cuisineType);
  }
  //modify data functions

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
