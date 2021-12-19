import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {DishListService} from "../../services/dish-list.service";
import {Dish} from "../../interfaces/dish.module";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-chefs-view',
  templateUrl: './chefs-view.component.html',
  styleUrls: ['./chefs-view.component.css']
})

export class ChefsViewComponent implements OnInit{
  //@ts-ignore
  dishForm : FormGroup;
  myDishes: any = [];
  myDishTypes: any = [];
  myCuisineTypes: any = [];


  constructor(private formBuilder : FormBuilder,public dishesService:DishListService,private dataService:DataService) {}

  ngOnInit() : void {
    this.dishForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'maxAmt': ['', [Validators.required, Validators.minLength(2),Validators.min(1),Validators.max(1000)]],
      'cuisine': ['', [Validators.required, Validators.minLength(2)]],
      'dishType': ['', [Validators.required, Validators.minLength(2)]],
      'price': ['', [Validators.required,Validators.min(1),Validators.max(1000)]],
      'description': ['', [Validators.required, Validators.minLength(2)]],
      'imgPath': ['', [Validators.required,Validators.minLength(5)]],
      'ingredients': new FormArray([],[Validators.required,Validators.minLength(2)])
    });

      this.dataService.getDishList()
        .subscribe((e) => this.myDishes = e);
      this.dataService.getDishTypes()
        .subscribe((e) => this.myDishTypes = e);
      this.dataService.getCuisineTypes()
        .subscribe((e) => this.myCuisineTypes = e);

  }
  onSubmit() {
    let newDish = new Dish(
      "",
      1,
      this.dishesService.newId,
      (<FormArray>this.dishForm.get('maxAmt')).value,
      (<FormArray>this.dishForm.get('name')).value,
      (<FormArray>this.dishForm.get('cuisine')).value,
      (<FormArray>this.dishForm.get('dishType')).value,
      (<FormArray>this.dishForm.get('ingredients')).value,
      (<FormArray>this.dishForm.get('maxAmt')).value,
      (<FormArray>this.dishForm.get('price')).value,
      (<FormArray>this.dishForm.get('description')).value,
      (<FormArray>this.dishForm.get('imgPath')).value,
    )
    this.dataService.pushDish(newDish)
    // this.dishesService.myDishes.push(newDish)
    this.dishesService.priceList.push([this.dishesService.newId,newDish.price])
    this.dishesService.priceList.sort((a, b) => a[1] > b[1] && 1 || -1)

    if(this.dishesService.dishTypes.indexOf((<FormArray>this.dishForm.get('dishType')).value) === -1){
      // this.dishesService.dishTypes.push((<FormArray>this.dishForm.get('dishType')).value)
      this.dataService.pushDishType((<FormArray>this.dishForm.get('dishType')).value)
      this.dishesService.dishTypesSelected.push(0)
    }
    if(this.dishesService.cuisineTypes.indexOf((<FormArray>this.dishForm.get('cuisine')).value) === -1){
      // this.dishesService.cuisineTypes.push((<FormArray>this.dishForm.get('cuisine')).value)
      this.dataService.pushCuisineType((<FormArray>this.dishForm.get('cuisine')).value)
      this.dishesService.cuisineTypesSelected.push(0)
    }

    if(this.dishesService.prices[0] > (<FormArray>this.dishForm.get('price')).value){
      this.dishesService.prices[0] = (<FormArray>this.dishForm.get('price')).value
      this.dishesService.prices[2] = (<FormArray>this.dishForm.get('price')).value
    }
    if(this.dishesService.prices[1] < (<FormArray>this.dishForm.get('price')).value){
      this.dishesService.prices[1] = (<FormArray>this.dishForm.get('price')).value
      this.dishesService.prices[3] = (<FormArray>this.dishForm.get('price')).value
    }

    this.dishForm.reset()
  }

  addIngredient() {
    (<FormArray> this.dishForm.get('ingredients')).push(new FormControl(null,Validators.required))
  }

  getControls() {
    return (<FormArray>this.dishForm.get('ingredients')).controls;
  }

  deleteIngredient(j:number) {
    (<FormArray>this.dishForm.get('ingredients')).removeAt(j)
  }
  getControlAtIndex(i:number){
    return (<FormArray>this.dishForm.get('ingredients')).at(i)
  }
}
