import { Component, OnInit } from '@angular/core';
import {CheckoutAndCurrenciesService} from "../../checkoutAndCurrenciesService/checkout-and-currencies.service";
import {DishListService} from "../../DishListService/dish-list.service";

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
