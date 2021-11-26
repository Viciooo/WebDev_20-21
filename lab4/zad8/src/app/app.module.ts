import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { HeaderComponent } from './restaurant/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
