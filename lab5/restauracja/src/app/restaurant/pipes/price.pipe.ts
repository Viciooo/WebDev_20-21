import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../interfaces/dish.module";

@Pipe({
  name: 'pricePipe'
})
export class PricePipe implements PipeTransform {

  transform (dishes: Dish[], minPrice:number,maxPrice:number): Dish[]{
    return dishes.filter(dish => (dish.price >= minPrice && dish.price <=maxPrice));
  }

}
