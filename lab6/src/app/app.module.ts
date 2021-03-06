import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { MenuHeaderComponent } from './restaurant/menuHeader/menu-header.component';
import { DataHandlerService } from './restaurant/services/data-handler.service'
import { CheckoutAndCurrenciesService } from "./restaurant/services/checkout-and-currencies.service";
import { FiltersBarComponent } from './restaurant/filters-bar/filters-bar.component';
import { FilterDishesPipe } from './restaurant/pipes/filter-dishes.pipe';
import { FilterCuisinesPipe } from './restaurant/pipes/filter-cuisines.pipe';
import { StarsPipe } from './restaurant/pipes/stars.pipe';
import { PricePipe } from './restaurant/pipes/price.pipe';
import { HomeViewComponent } from './restaurant/views/home-view/home-view.component';
import { MenuViewComponent } from './restaurant/views/menu-view/menu-view.component';
import { ChefsViewComponent } from './restaurant/views/chefs-view/chefs-view.component';
import { CheckoutViewComponent } from './restaurant/views/checkout-view/checkout-view.component';
import { LoginViewComponent } from './restaurant/views/login-view/login-view.component';
import { SignupViewComponent } from './restaurant/views/signup-view/signup-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './restaurant/navbar/navbar.component';
import { MapComponent } from './restaurant/map/map.component';
import { PageNotFoundComponent } from './restaurant/views/page-not-found-view/page-not-found.component';
import { SingleDishViewComponent } from './restaurant/views/single-dish-view/single-dish-view.component';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {DataService} from "./restaurant/services/data.service";
import { PaginationComponent } from './restaurant/pagination/pagination.component'
import {PaginationService} from "./restaurant/services/pagination.service";
import {LoadingSpinnerComponent} from "./restaurant/loading-spinner/loading-spinner.component";
import {AuthInterceptorService} from "./restaurant/auth/auth-interceptor.service";
import { AdminViewComponent } from './restaurant/views/admin-view/admin-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    MenuHeaderComponent,
    FiltersBarComponent,
    FilterDishesPipe,
    FilterCuisinesPipe,
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
    SingleDishViewComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    AdminViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng5SliderModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [PricePipe,StarsPipe,
    FilterCuisinesPipe,
    DataHandlerService,
    CheckoutAndCurrenciesService,
    FilterDishesPipe,DataService,
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
