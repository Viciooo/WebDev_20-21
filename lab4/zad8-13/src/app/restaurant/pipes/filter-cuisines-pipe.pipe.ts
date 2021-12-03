import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dishes/dish/dish.module";

@Pipe({
  name: 'filterCuisinesPipe'
})
export class FilterCuisinesPipePipe implements PipeTransform {

  transform (dishes: Dish[], selected: number[],cuisineList: string[]): Dish[]{
    return dishes.filter(dish => selected[cuisineList.indexOf(dish.cuisine)] === 1);
  }
}
