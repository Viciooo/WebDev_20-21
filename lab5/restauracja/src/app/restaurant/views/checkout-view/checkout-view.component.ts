import { Component, OnInit } from '@angular/core';
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";
import {DishListService} from "../../services/dish-list.service";

@Component({
  selector: 'app-basket-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {

  constructor(public moneyItemHandler: CheckoutAndCurrenciesService,public dishesService:DishListService,public checkoutService:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
  }

}
