import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dishes/dish/dish.module";

@Pipe({
  'name': 'filterDishes'
})
export class FilterDishesPipe implements PipeTransform {
  transform (dishes: Dish[], selected: number[],dishList: string[]): Dish[]{
    return dishes.filter(dish => selected[dishList.indexOf(dish.dishType)] === 1);
  }}
