import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../interfaces/dish.module";

@Pipe({
  name: 'filterCuisinesPipe'
})
export class FilterCuisinesPipe implements PipeTransform {
  transform (dishes: Dish[], selected: number[],cuisineList: string[],sumOfSelected:number): Dish[]{
    if(sumOfSelected === 0) return dishes.filter(dish=> true)
    return dishes.filter(dish => selected[cuisineList.indexOf(dish.cuisine)] === 1);
  }
}
