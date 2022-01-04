import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishListService} from "../services/dish-list.service";
import {CheckoutAndCurrenciesService} from "../services/checkout-and-currencies.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menuHeader.component.css']
})
export class MenuHeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false
  // @ts-ignore
  private userSub: Subscription

  constructor(private authService:AuthService,
              public dishesService:DishListService,
              public moneyItemHandler:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}

