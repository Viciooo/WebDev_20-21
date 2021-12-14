import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { ManuHeaderComponent } from './restaurant/menuHeader/manuHeader.component';
import { DishListService } from './restaurant/DishListService/dish-list.service'
import { CheckoutAndCurrenciesService } from "./restaurant/checkoutAndCurrenciesService/checkout-and-currencies.service";
import { FiltersBarComponent } from './restaurant/filters-bar/filters-bar.component';
import { FilterDishesPipe } from './restaurant/pipes/filter-dishes.pipe';
import { FilterCuisinesPipePipe } from './restaurant/pipes/filter-cuisines-pipe.pipe';
import { StarsPipe } from './restaurant/pipes/stars.pipe';
import { PricePipe } from './restaurant/pipes/price.pipe';
import {RouterModule, Routes} from "@angular/router";
import { HomeViewComponent } from './restaurant/views/home-view/home-view.component';
import { MenuViewComponent } from './restaurant/views/menu-view/menu-view.component';
import { ChefsViewComponent } from './restaurant/views/chefs-view/chefs-view.component';
import { CheckoutViewComponent } from './restaurant/views/checkout-view/checkout-view.component';
import { LoginViewComponent } from './restaurant/views/login-view/login-view.component';
import { SignupViewComponent } from './restaurant/views/signup-view/signup-view.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './restaurant/navbar/navbar.component';
import { MapComponent } from './restaurant/map/map.component';
import { PageNotFoundComponent } from './restaurant/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {path: '',component:HomeViewComponent},
  {path: 'menu',component:MenuViewComponent},
  {path: 'checkout',component:CheckoutViewComponent},
  {path: 'login',component:LoginViewComponent},
  {path: 'signup',component:SignupViewComponent},
  {path: 'chefsView',component:ChefsViewComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    ManuHeaderComponent,
    FiltersBarComponent,
    FilterDishesPipe,
    FilterCuisinesPipePipe,
    StarsPipe,
    PricePipe,
    HomeViewComponent,
    MenuViewComponent,
    ChefsViewComponent,
    CheckoutViewComponent,
    LoginViewComponent,
    SignupViewComponent,
    NavbarComponent,
    MapComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [DishListService,CheckoutAndCurrenciesService,FilterDishesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
