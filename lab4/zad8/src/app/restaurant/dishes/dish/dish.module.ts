export class Dish {
  public name: string
  public cuisine: string
  public dishType: string
  public ingredients: string[]
  public amount: number
  public price: number
  public description: string
  public imgPath: string[]

  constructor(name: string, cuisine: string, dishType: string, ingredients: string[], amount: number, price: number, description: string, imgPath: string[]) {
    this.name = name;
    this.cuisine = cuisine;
    this.dishType = dishType;
    this.ingredients = ingredients;
    this.amount = amount;
    this.price = price;
    this.description = description;
    this.imgPath = imgPath;
  }
}
