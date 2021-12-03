import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dishes/dish/dish.module";

@Pipe({
  name: 'filterDishes'
})
export class FilterDishesPipe implements PipeTransform {


  transform(listOfDishes:Dish[],dishService:any): any {
    return listOfDishes.filter((myDish) =>{
    let dishTypeIdx = dishService.dishTypes.indexOf(myDish.dishType)
    let cuisineTypeIdx = dishService.cuisineTypes.indexOf(myDish.cuisine)
    let starsAmt = myDish.rating
    if(myDish.price < dishService.prices[2] || myDish.price > dishService.prices[3]){
      console.log(myDish.price)
      return null
    }
    else if(dishService.sumOfDishTypes != 0 && dishService.dishTypesSelected[dishTypeIdx] != 1){
      return null
    }
    else if(dishService.sumOfCuisine != 0 && dishService.cuisineTypesSelected[cuisineTypeIdx] != 1){
      return null
    }
    else if(dishService.sumOfstars != 0 && dishService.starsSelected[starsAmt] != 1){
      return null
    }
    else{
      console.log(dishService.sumOfstars)
      return myDish
    }
  })
}
}
