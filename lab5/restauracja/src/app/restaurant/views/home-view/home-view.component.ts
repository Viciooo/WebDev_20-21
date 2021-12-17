import {Component, OnChanges, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Dish} from "../../interfaces/dish.module";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
  // dishes: any = [];
  // constructor(private dataService:DataService) { }
  //
  // ngOnInit(): void {
  //   this.dataService.getDishList()
  //     .subscribe((dataService) => this.dishes = dataService);
  // }
  //
  // ngOnChanges() {
  //   this.dataService.getDishList()
  //     .subscribe((dishes) => this.dishes = dishes);
  // }
  //
  // getData() {
  //   console.log(this.dishes)
  // }
}
