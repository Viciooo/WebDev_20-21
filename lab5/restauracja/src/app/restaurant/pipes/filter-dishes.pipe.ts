import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../interfaces/dish.module";

@Pipe({
  'name': 'filterDishes'
})
export class FilterDishesPipe implements PipeTransform {
  transform (dishes: Dish[],dishTypeList: string[], selected: number[],sumOfSelected: number): Dish[]{
    if(sumOfSelected === 0) return dishes.filter(dish=> true)
    return dishes.filter(dish => selected[dishTypeList.indexOf(dish.dishType)] === 1);
  }}
