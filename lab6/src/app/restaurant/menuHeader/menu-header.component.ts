import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataHandlerService} from "../services/data-handler.service";
import {CheckoutAndCurrenciesService} from "../services/checkout-and-currencies.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menuHeader.component.css']
})
export class MenuHeaderComponent{


  constructor(private authService:AuthService,
              public dataHandler:DataHandlerService,
              public moneyItemHandler:CheckoutAndCurrenciesService) { }

  onLogout() {
    this.authService.logout()
  }
}

