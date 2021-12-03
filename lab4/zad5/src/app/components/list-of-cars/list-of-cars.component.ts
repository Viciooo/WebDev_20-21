import { Component } from '@angular/core';

@Component({
  selector: 'app-list-of-cars',
  templateUrl: './list-of-cars.component.html',
  styleUrls: ['./list-of-cars.component.css'],
})
export class ListOfCarsComponent {
   public brands: string[] = ["audi", "bmw", "tesla", "volkswagen", "porsche","ford"]

  public models = {
    "tesla": ["S", "3", "X","Y"],
    "bmw": ["m2", "m3", "m5"],
    "volkswagen": ["tiguan", "arteon", "polo", "transporter"],
    "audi": ["a4", "a6", "a7"],
    "porsche": ["cayenee", "spider", "cayman", "911"],
    "ford": ["focus"]
  }
  public colors= {

    "m3": ["grey", "violet", "green"],
    "m2": ["blue", "red", "yellow"],
    "m5": ["yellow", "red", "lightgreen"],
    "a7": ["brown", "orange"],
    "a5": ["black", "red", "lightgreen"],
    "a4": ["blue", "violet", "green", "chocolate"],
    "a6": ["lightblue", "pink"],
    "S": ["gray", "red", "green"],
    "3": ["lightgray", "brown", "aqua"],
    "X": ["white", "orange"],
    "Y": ["red", "green", "blue"],
    "tiguan": ["lightblue", "pink"],
    "arteon": ["blue", "red", "yellow"],
    "polo": ["aqua", "orange", "lightgreen"],
    "transporter": ["white", "brown", "green"],
    "spider": ["lightgray", "lightgreen"],
    "cayman": ["blue", "violet", "pink"],
    "911": ["brown", "orange", "yellow"],
    "focus" : ["silver","brown"]
  }
  currentModels: string[] | undefined;
  currentColors: string[] | undefined;

  currentModel: string | undefined;
  currentBrand: string | undefined;
  currentColor: string | undefined;

  brandChosen = false;
  modelChosen = false;
  colorChosen = false;

  chooseBrand(e: any, brand: string) {
    let list = e.currentTarget.parentNode;
    this.resetList(list);

    e.currentTarget.classList.add('active');

    this.brandChosen = true;

    this.modelChosen = false;
    this.currentModel = undefined;

    this.colorChosen = false;
    this.currentColor = undefined;

    this.currentBrand = brand;
    // @ts-ignore
    this.currentModels = this.models[brand];
  }

  chooseModel(e: any, model: string) {
    let list = e.currentTarget.parentNode;
    this.resetList(list);

    e.currentTarget.classList.add('active');

    this.modelChosen = true;

    this.colorChosen = false;
    this.currentColor = undefined;

    this.currentModel = model;
    // @ts-ignore
    this.currentColors = this.colors[model];
  }

  chooseColor(e: any, color: string) {
    let list = e.currentTarget.parentNode;
    this.resetList(list);

    e.currentTarget.classList.add('active');

    this.colorChosen = true;
    this.currentColor = color;
  }

  resetList(list: any) {
    let liArray: any =
      list.getElementsByTagName('li');
    for (let i = 0; i < liArray.length; i++) {
      if (liArray[i].classList.contains('active')) {
        liArray[i].classList.remove('active');
      }
    }
  }
}
