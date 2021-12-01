import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { HeaderComponent } from './restaurant/header/header.component';
import { NewDishFormsComponent } from './restaurant/dishes/new-dish-forms/new-dish-forms.component';
import { DishListService } from './restaurant/DishListService/dish-list.service'
import { CheckoutAndCurrenciesService } from "./restaurant/checkoutAndCurrenciesService/checkout-and-currencies.service";

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    HeaderComponent,
    NewDishFormsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DishListService,CheckoutAndCurrenciesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
