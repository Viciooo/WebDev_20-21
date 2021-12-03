import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dishes/dish/dish.module";

@Pipe({
  name: 'starsPipe'
})
export class StarsPipe implements PipeTransform {

  transform (dishes: Dish[], selected: number[]): Dish[]{
    return dishes.filter(dish => selected[dish.rating-1] === 1);
  }

}
