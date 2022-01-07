import {Component, OnInit} from '@angular/core';
import {CheckoutAndCurrenciesService} from "../../services/checkout-and-currencies.service";
import {DataHandlerService} from "../../services/data-handler.service";
import {OrderedDish} from "../../interfaces/db.user.module";
import {DataService} from "../../services/data.service";
import {checkoutItem} from "../../interfaces/checkout-list.module";
import {Dish} from "../../interfaces/dish.module";

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
    if (this.dishesService.userInDB.orders != undefined) {
      this.dishesService.userInDB.orders.forEach((order) => {
        newOrders.push(order)
      })
    }
    this.moneyItemHandler.checkoutList.forEach((item) => {
      newOrders.push(new OrderedDish(item.name, item.amount, 0, item.value, this.moneyItemHandler.currency))
      this.dataService.addOrder(this.dishesService.userInDB.UID, newOrders)
      const amountOfDish: number = this.dishesService.myDishes.find((element) => {
        return element.key === item.key
      }).amount
      this.dataService.amountChange(item.key,
        amountOfDish - item.amount)
      this.dataService.maxAmtChange(item.key,
        amountOfDish - item.amount)
    })
    this.moneyItemHandler.clearAll()
  }

  getImg(myDish: checkoutItem) {
    if (this.dishesService.myDishes === undefined || this.dishesService.myDishes.indexOf(myDish.id)) {
      return null
    } else {

      const dish = this.dishesService.myDishes.find((element:Dish) => {
        return element.id === myDish.id}).imgPath
      console.log(dish)
      return dish.imgPath
      // return this.dishesService.myDishes[this.dishesService.myDishes.indexOf(myDish.id)].imgPath
    }
  }
}
