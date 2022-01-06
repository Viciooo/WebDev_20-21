import {Component, OnInit} from '@angular/core';
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";
import {DataHandlerService} from "../../services/data-handler.service";
import {OrderedDish} from "../../interfaces/db.user.module";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-basket-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {

  constructor(public moneyItemHandler: CheckoutAndCurrenciesService,
              public dishesService: DataHandlerService,
              public checkoutService: CheckoutAndCurrenciesService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

buyDishes() {
  const newOrders: OrderedDish[] = []
  if(this.dishesService.userInDB.orders != undefined){
    this.dishesService.userInDB.orders.forEach((order) => {
      newOrders.push(order)
    })
  }
  this.moneyItemHandler.checkoutList.forEach((item) => {
      newOrders.push(new OrderedDish(item.name, item.amount, 0, item.value,this.moneyItemHandler.currency))
      this.dataService.addOrder(this.dishesService.userInDB.UID, newOrders)
    })
    this.moneyItemHandler.clearAll()
  }
}
