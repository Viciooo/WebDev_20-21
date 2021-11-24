import { Component } from '@angular/core';

@Component({
  selector: 'app-list-of-cars',
  templateUrl: './list-of-cars.component.html',
  styleUrls: ['./list-of-cars.component.css'],
})
export class ListOfCarsComponent {
   public brands: string[] = ["audi", "bmw", "mercedes-benz", "volkswagen", "porsche", "lamborghini"]

  public models = {
    "audi": ["a4", "a6", "a7"],
    "bmw": ["m2", "m3", "m5"],
    "mercedes-benz": ["e-klasa", "c-klasa", "g-klasa"],
    "volkswagen": ["tiguan", "arteon", "polo", "transporter"],
    "porsche": ["cayenee", "spider", "cayman", "911"],
    "lamborghini": ["urus", "huracan"]
  }
  public colors= {
    "a4": ["blue", "violet", "green", "chocolate"],
    "a5": ["black", "red", "lightgreen"],
    "a6": ["lightblue", "lightred", "pink"],
    "a7": ["brown", "orange"],
    "m2": ["blue", "red", "yellow"],
    "m3": ["lightblue", "orange", "green"],
    "m5": ["gray", "lightred", "lightgreen", "cyan", "crimson"],
    "e-klasa": ["gray", "red", "green"],
    "c-klasa": ["lightgray", "brown", "aqua"],
    "g-klasa": ["white", "lightred", "orange"],
    "tiguan": ["lightblue", "lightred", "pink"],
    "arteon": ["blue", "red", "yellow"],
    "polo": ["aqua", "orange", "lightgreen"],
    "transporter": ["white", "brown", "green"],
    "cayenee": ["gray", "red", "green"],
    "spider": ["lightgray", "lightred", "lightgreen"],
    "cayman": ["blue", "violet", "pink"],
    "911": ["brown", "orange", "yellow"],
    "urus": ["orange", "coral", "green"],
    "huracan": ["aqua", "lightblue", "chartreuse"],
  }
  currentModels: string[] | undefined;
  currentColors: string[] | undefined;

  currentModel: string | undefined;
  currentBrand: string | undefined;
  currentColor: string | undefined;

  isBrandChosen = false;
  isModelChosen = false;
  isColorChosen = false;

  chooseBrand(event: any, brand: string) {
    let list = event.currentTarget.parentNode;
    this.resetList(list);

    event.currentTarget.classList.add('active');

    this.isBrandChosen = true;

    this.isModelChosen = false;
    this.currentModel = undefined;

    this.isColorChosen = false;
    this.currentColor = undefined;

    this.currentBrand = brand;
    // @ts-ignore
    this.currentModels = this.models[brand];
  }

  chooseModel(event: any, model: string) {
    let list = event.currentTarget.parentNode;
    this.resetList(list);

    event.currentTarget.classList.add('active');

    this.isModelChosen = true;

    this.isColorChosen = false;
    this.currentColor = undefined;

    // this.currentModel = model;
    // @ts-ignore
    this.currentColors = this.colors[model];
  }

  chooseColor(event: any, color: string) {
    let list = event.currentTarget.parentNode;
    this.resetList(list);

    event.currentTarget.classList.add('active');

    this.isColorChosen = true;
    this.currentColor = color;
  }

  resetList(list: any) {
    let liArray: HTMLCollectionOf<HTMLLIElement> =
      list.getElementsByTagName('li');
    for (let i = 0; i < liArray.length; i++) {
      if (liArray[i].classList.contains('active')) {
        liArray[i].classList.remove('active');
      }
    }
  }
}
