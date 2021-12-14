import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { HeaderComponent } from './restaurant/header/header.component';
import { NewDishFormsComponent } from './restaurant/dishes/new-dish-forms/new-dish-forms.component';
import { DishListService } from './restaurant/DishListService/dish-list.service'
import { CheckoutAndCurrenciesService } from "./restaurant/checkoutAndCurrenciesService/checkout-and-currencies.service";
import { FiltersBarComponent } from './restaurant/filters-bar/filters-bar.component';
import { FilterDishesPipe } from './restaurant/pipes/filter-dishes.pipe';
import { FilterCuisinesPipePipe } from './restaurant/pipes/filter-cuisines-pipe.pipe';
import { StarsPipe } from './restaurant/pipes/stars.pipe';
import { PricePipe } from './restaurant/pipes/price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    HeaderComponent,
    NewDishFormsComponent,
    FiltersBarComponent,
    FilterDishesPipe,
    FilterCuisinesPipePipe,
    StarsPipe,
    PricePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule
  ],
  providers: [DishListService,CheckoutAndCurrenciesService,FilterDishesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
