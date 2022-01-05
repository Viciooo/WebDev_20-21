import { Component, OnInit } from '@angular/core';
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";
import {DataHandlerService} from "../../services/data-handler.service";

@Component({
  selector: 'app-basket-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {

  constructor(public moneyItemHandler: CheckoutAndCurrenciesService,
              public dishesService:DataHandlerService,
              public checkoutService:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
  }

}
