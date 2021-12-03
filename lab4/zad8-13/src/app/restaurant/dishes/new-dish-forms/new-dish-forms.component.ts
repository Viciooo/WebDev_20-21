import { Component,OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";
import {DishListService} from "../../DishListService/dish-list.service";
import {Dish} from "../dish/dish.module";

@Component({
  selector: 'app-new-dish-forms',
  templateUrl: './new-dish-forms.component.html',
  styleUrls: ['./new-dish-forms.component.css']
})
export class NewDishFormsComponent implements OnInit{
  //@ts-ignore
  dishForm : FormGroup;

  constructor(private formBuilder : FormBuilder,public dishesService:DishListService) {}

  ngOnInit() : void {
    this.dishForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'maxAmt': ['', [Validators.required, Validators.minLength(2),Validators.min(1),Validators.max(1000)]],
      'cuisine': ['', [Validators.required, Validators.minLength(2)]],
      'dishType': ['', [Validators.required, Validators.minLength(2)]],
      'price': ['', [Validators.required,Validators.min(1),Validators.max(1000)]],
      'description': ['', [Validators.required, Validators.minLength(2)]],
      'imgPath': ['', Validators.required],
      'ingredients': new FormArray([],[Validators.required,Validators.minLength(2)])

    });
  }
  onSubmit() {
    let newDish = new Dish(
      0,
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
    this.dishesService.myDishes.push(newDish)
    this.dishesService.priceList.push([this.dishesService.newId,newDish.price])
    this.dishesService.priceList.sort((a, b) => a[1] > b[1] && 1 || -1)
    this.dishesService.newId++
    // this.dishForm.reset()
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
