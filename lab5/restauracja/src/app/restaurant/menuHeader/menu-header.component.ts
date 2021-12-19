import { Component, OnInit} from '@angular/core';
import {DishListService} from "../services/dish-list.service";
import {CheckoutAndCurrenciesService} from "../services/checkout-and-currencies.service";

@Component({
  selector: 'app-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menuHeader.component.css']
})
export class MenuHeaderComponent implements OnInit {

  constructor(public dishesService:DishListService,public moneyItemHandler:CheckoutAndCurrenciesService) { }

  ngOnInit(): void {
  }

}
