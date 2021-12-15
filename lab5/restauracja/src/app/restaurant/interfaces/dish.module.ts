export class Dish {
  constructor(public rating: number,
              public id: number,
              public maxAmt: number,
              public name: string,
              public cuisine: string,
              public dishType: string,
              public ingredients: string[],
              public amount: number,
              public price: number,
              public description: string,
              public imgPath: string) {}
}
