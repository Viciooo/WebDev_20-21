import { Injectable } from '@angular/core';
import {Dish} from "../dishes/dish/dish.module";

@Injectable({
  providedIn: 'root'
})
export class DishListService {
  newId: number = 12
  myDishes: Dish[] = [
    new Dish(1,0,10, "Żurek", "Polska", 'Zupa', ["kostka rosołowa", "troche wody", "przyprawy", "kiełbaska"], 10, 10, "Pyszna zupka jak u babci", "https://drive.google.com/uc?export=view&id=1DtLgpxMRfkAf7Wy_uxbxrejVlGf1kKMZ")
    , new Dish(1,1,8, "Pomidorowa", "Polska", 'Zupa', ["kostka rosołowa", "troche wody", "przyprawy", "pomidory", "makaron"], 8, 9, "Trochę czuć koncentrat", "https://drive.google.com/uc?export=view&id=1yWarxZGHb8dkQR-VYaYj-UYtnVG20SS_")
    , new Dish(1,2,15, "Pizza NY-style", "Amerykańska", 'Pizza', ["ciasto", "ser", "szynka", "sos z butelki"], 15, 15, "Studenckie paliwo, najlepiej smakuje do kawki o 3am", "https://drive.google.com/uc?export=view&id=1I7oGRbRNb6_lrT8d1vPqx5l3CJo5e1Ss")
    , new Dish(1,3,5, "Pizza Italian-style", "Włoska", 'Pizza', ["ciasto", "ser", "pyszny sos", "salami pikante"], 5, 30, "Bdb pizza custom sos, ogólnie super", "https://drive.google.com/uc?export=view&id=1u9p3Cj7UDfK8TfRj9Ujd9y5VITzqryzn")
    , new Dish(1,4,12, "Spaghetti", "Włoska", 'Makaron', ["makaron", "sos pomidorowy", "ser", "przyprawy"], 12, 14, "Trochę rozgotowany bo polacy nie potrafią robić makaronu", "https://drive.google.com/uc?export=view&id=1xH7NpysoZDHCwz3JS63KHeYt_f9zSwxj")
    , new Dish(1,5,13, "Carbonara", "Włoska", 'Makaron', ["makaron", "jajko", "pieprz", "boczek"], 13, 5, "Zawsze spoko", "https://drive.google.com/uc?export=view&id=1GEnPFncdT52DSZUpPwhF58JY81PbzgMa")
    , new Dish(1,6,10, "Zdrowa krowa", "Amerykańska", 'Burger', ["bułka", "mięso", "warzywa", "sos"], 10, 25, "Bardzo dobry burger przy Galerii Krakowskiej", "https://drive.google.com/uc?export=view&id=1XJ9gFuRG-w2nVDryTxfpYOOOD6vWwJVF")
    , new Dish(1,7,100, "McChicken", "Amerykańska", 'Burger', ["soja", "więcej soji", "jeszcze trochę soji"], 100, 2, "Trzeba być mocno głodnym", "https://drive.google.com/uc?export=view&id=1Hnp0vnfsFpeJZyBbwvF3JiJMgbmHeEbq")
    , new Dish(1,8,12, "Lody włoskie", "Włoska", 'Lody', ["śmietana", "rożek", "polewa"], 12, 1, "Smak wakacji", "https://drive.google.com/uc?export=view&id=1IQSfwVF08FEIpxoUDLUSwUT4hL-XcuT7")
    , new Dish(1,9,7, "Świderek", "Polska", 'Lody', ["śmietana", "wafel", "chefs-kiss"], 7, 3, "Najlepsze lody <3", "https://drive.google.com/uc?export=view&id=1ehmHPZUmame5KcXEHOJgFEcDFxakz6yp")
    , new Dish(1,10,10000, "Jakiś ślimak", "Francuska", 'Inne', ["ślimak", "woda do wypłukania ust"], 10000, 80, "Fuj", "https://drive.google.com/uc?export=view&id=1gXK1LdlI3S3NCq7G4ThZUHUZqVAzDiDG")
    , new Dish(1,11,100, "French fries", "Francuska", 'Frytki', ["ziemniaki"], 100, 4, "Fajne fryteczki bardzo", "https://drive.google.com/uc?export=view&id=1jSdgmLTgaPpwBwrGbZMO01H3ssZLYxVy")
    , new Dish(1,12,1001, "American fries", "Amerykańska", 'Frytki', ["ziemniaki"], 1001, 7, "OK", "https://drive.google.com/uc?export=view&id=1yhruWNdrfiHa-Q3hETBtVX6wCJtiSrqR")
  ]
  priceList: number[][] =
    [[0,this.myDishes[0].price],
    [1,this.myDishes[1].price],
    [2,this.myDishes[2].price],
    [3,this.myDishes[3].price],
    [4,this.myDishes[4].price],
    [5,this.myDishes[5].price],
    [6,this.myDishes[6].price],
    [7,this.myDishes[7].price],
    [8,this.myDishes[8].price],
    [9,this.myDishes[9].price],
    [10,this.myDishes[10].price],
    [11,this.myDishes[11].price],
    [12,this.myDishes[12].price]
    ].sort((a, b) => a[1] > b[1] && 1 || -1)
  constructor() { }

  dishTypes:string[] = [
    'Inne',
    'Frytki',
    'Lody',
    'Zupa',
    'Pizza',
    'Makaron',
    'Burger'
  ]
  // dishTypesSelected:number[] = [0,1,0,0,1,0,0]
  dishTypesSelected:number[] = Array(this.dishTypes.length).fill(1)
  cuisineTypes:string[] = [
    'Polska',
    'Amerykańska',
    'Włoska',
    'Francuska'
    ]

  cuisineTypesSelected:number[] = Array(this.cuisineTypes.length).fill(1)

  //prices[0] - min value product
  //prices[1] - max value product
  //prices[0] - min CHOSEN value product
  //prices[1] - max CHOSEN value product

  calcMax(){
    let val = -1
    this.priceList.forEach(e=>{
      val = Math.max(val,e[1])
    })
    return val
  }

  calcMin(){
    let val = 1000000
    this.priceList.forEach(e=>{
      val = Math.min(val,e[1])
    })
    return val
  }

  prices:number[] = [
    this.calcMin(),
    this.calcMax(),
    this.calcMin(),
    this.calcMax()
  ]

  starsSelected:number[] = Array(6).fill(1)

  displayFilters:string = 'none'




  // myDishes: Dish[] = [
  //   new Dish(10, "Żurek", "Polska", "Zupa", ["kostka rosołowa", "troche wody", "przyprawy", "kiełbaska"], 10, 10, "Pyszna zupka jak u babci", ["https://drive.google.com/uc?export=view&id=17SDwy5sqAHe3sLaaDjnE6IrvvwCsXInb", "https://drive.google.com/uc?export=view&id=1pP8ub1bpvL6UriY1fnMIcn066tznpcE_", "https://drive.google.com/uc?export=view&id=1DtLgpxMRfkAf7Wy_uxbxrejVlGf1kKMZ", "https://drive.google.com/uc?export=view&id=1h74qpsj3ekiqW1SvHime_xRj-7PWN7f-"])
  //   , new Dish(8, "Pomidorowa", "Polska", "Zupa", ["kostka rosołowa", "troche wody", "przyprawy", "pomidory", "makaron"], 8, 10, "Trochę czuć koncentrat", ["https://drive.google.com/uc?export=view&id=1yUGANQEhQGrp605lb1dcSC3m_NOSPA6L", "https://drive.google.com/uc?export=view&id=1zj_bjbKyzm8GaORJlvQaOqq3YIQk5z94", "https://drive.google.com/uc?export=view&id=1yWarxZGHb8dkQR-VYaYj-UYtnVG20SS_", "https://drive.google.com/uc?export=view&id=1eW-u79-haDotz29LsxnIOZfu-ecXGNqu"])
  //   , new Dish(15, "Pizza NY-style", "Amerykańska", "Pizza", ["ciasto", "ser", "szynka", "sos z butelki"], 15, 15, "Studenckie paliwo, najlepiej smakuje do kawki o 3am", ["https://drive.google.com/uc?export=view&id=1kdeE2Dd3MNrdZtGdC7NQCzSK1XtcXtH7", "https://drive.google.com/uc?export=view&id=14BPyTQFsx7yndNgwqDmAHxGr9-qV2Yg_", "https://drive.google.com/uc?export=view&id=1I7oGRbRNb6_lrT8d1vPqx5l3CJo5e1Ss", "https://drive.google.com/uc?export=view&id=13wWI2Xdq2Pm6oNIcsETF3w5L9alFknuy"])
  //   , new Dish(30, "Pizza Italian-style", "Włoska", "Pizza", ["ciasto", "ser", "pyszny sos", "salami pikante"], 5, 30, "Bdb pizza custom sos, ogólnie super", ["https://drive.google.com/uc?export=view&id=1amAhEkM2gOHuCKc3s488IrOJQPiz5Hq0", "https://drive.google.com/uc?export=view&id=17QPH5FMfJUsHuGgPfwEnROdPfRrhqFv6", "https://drive.google.com/uc?export=view&id=1u9p3Cj7UDfK8TfRj9Ujd9y5VITzqryzn", "https://drive.google.com/uc?export=view&id=1ND_BO8BzbbuMWkrVadZo63PxEznrcIaZ"])
  //   , new Dish(5, "Spaghetti", "Włoska", "Makaron", ["makaron", "sos pomidorowy", "ser", "przyprawy"], 12, 15, "Trochę rozgotowany bo polacy nie potrafią robić makaronu", ["https://drive.google.com/uc?export=view&id=1bsxJIrsSGjJeyVi2gDbZWHGct3-GNoku", "https://drive.google.com/uc?export=view&id=1o38RG0G9ddFn31I7Lh7vIZZt5veaWIRf", "https://drive.google.com/uc?export=view&id=1xH7NpysoZDHCwz3JS63KHeYt_f9zSwxj", "https://drive.google.com/uc?export=view&id=1QCfKHRdU5_DYyUOPmk-3lr__WFEyfebb"])
  //   , new Dish(13, "Carbonara", "Włoska", "Makaron", ["makaron", "jajko", "pieprz", "boczek"], 13, 5, "Zawsze spoko", ["https://drive.google.com/uc?export=view&id=1595hpWkOvhU9-U_v3N1fYrIN1Mu7WW6p", "https://drive.google.com/uc?export=view&id=1TSjt3IYoCCjwXJk8mSA03UU6TZ9d8PzH", "https://drive.google.com/uc?export=view&id=1GEnPFncdT52DSZUpPwhF58JY81PbzgMa", "https://drive.google.com/uc?export=view&id=1Qg0RHuHE3cM9BINuigQFA7qgqAHxeiPf"])
  //   , new Dish(10, "Zdrowa krowa", "Amerykańska", "Burger", ["bułka", "mięso", "warzywa", "sos"], 10, 25, "Bardzo dobry burger przy Galerii Krakowskiej", ["https://drive.google.com/uc?export=view&id=19C9dKladwstXMRY6soMW-6niPHpvQmHI", "https://drive.google.com/uc?export=view&id=1Nz2p4FdkHWMOGl8mg0Nuaz9gtTgpGu7n", "https://drive.google.com/uc?export=view&id=1XJ9gFuRG-w2nVDryTxfpYOOOD6vWwJVF", "https://drive.google.com/uc?export=view&id=1IA_ID0N0xelOHM2JTGssQ10mvQf7tGRj"])
  //   , new Dish(100, "McChicken", "Amerykańska", "Burger", ["soja", "więcej soji", "jeszcze trochę soji"], 100, 2, "Trzeba być mocno głodnym", ["https://drive.google.com/uc?export=view&id=1j6Tnp2w9NA0m5dmL2sqyXTp_j0T0OrTz", "https://drive.google.com/uc?export=view&id=1QhtRRByJSJ8JA7PMSsYScrh7Bts6jdhy", "https://drive.google.com/uc?export=view&id=1Hnp0vnfsFpeJZyBbwvF3JiJMgbmHeEbq", "https://drive.google.com/uc?export=view&id=1AdQtoilUP-yzyUr-sV8KtB4RlYIwR4As"])
  //   , new Dish(12, "Lody włoskie", "Włoska", "Lody", ["śmietana", "rożek", "polewa"], 12, 1, "Smak wakacji", ["https://drive.google.com/uc?export=view&id=1cMzJqzhqZr1fWFfpZ4z3nc0osLLHbUFU", "https://drive.google.com/uc?export=view&id=1VCqEWJXGbGUKiAsf8C0E2oagTv7xitoy", "https://drive.google.com/uc?export=view&id=1IQSfwVF08FEIpxoUDLUSwUT4hL-XcuT7", "https://drive.google.com/uc?export=view&id=134WxqxurLdkX2clAPlY47UvezwzSvAsW"])
  //   , new Dish(7, "Świderek", "Polska", "Lody", ["śmietana", "wafel", "chefs-kiss"], 7, 2, "Najlepsze lody <3", ["https://drive.google.com/uc?export=view&id=16aBThyTIoAXkJQh9ApSZogWCrZO7OWHZ", "https://drive.google.com/uc?export=view&id=1XB7EkQJXAdLfw0UH13T0RWbXAJB-2FU", "https://drive.google.com/uc?export=view&id=1ehmHPZUmame5KcXEHOJgFEcDFxakz6yp", "https://drive.google.com/uc?export=view&id=1YrFJonAl-Q-tPBiAvFrbkA2G8I6263Kw"])
  //   , new Dish(10000, "Jakiś ślimak", "Francuska", "Inne", ["ślimak", "woda do wypłukania ust"], 10000, 100, "Fuj", ["https://drive.google.com/uc?export=view&id=1yegsqiViFHkz9cGV32SXB3muWS8vSJnQ", "https://drive.google.com/uc?export=view&id=1JKAbYSEdJYlEc8_wwgehYTrj9qpB0JPW", "https://drive.google.com/uc?export=view&id=1gXK1LdlI3S3NCq7G4ThZUHUZqVAzDiDG", "https://drive.google.com/uc?export=view&id=1yqLYZ25LUb710u0mM4a-yN-hdzWHZvpO"])
  //   , new Dish(100, "French fries", "Francuska", "Frytki", ["ziemniaki"], 100, 3, "Fajne fryteczki bardzo", ["https://drive.google.com/uc?export=view&id=1Ad9XqDBspzcwS-OOiWiwAlZMO9924ViG", "https://drive.google.com/uc?export=view&id=105FVWLZrc-2y9eDhl7k6Kzdq-uVzz2QO", "https://drive.google.com/uc?export=view&id=1jSdgmLTgaPpwBwrGbZMO01H3ssZLYxVy", "https://drive.google.com/uc?export=view&id=13S6xxocS_y2_gBEDgedMk-xmWK6kEnVR"])
  //   , new Dish(1001, "American fries", "Amerykańska", "Frytki", ["ziemniaki"], 1001, 0.5, "OK", ["https://drive.google.com/uc?export=view&id=1w-D_lQgYVY-_wXyKNMTNMHA3D7iR17ut", "https://drive.google.com/uc?export=view&id=1YlnhN6GLz6bwsEExVixqArFgP77fpZQS", "https://drive.google.com/uc?export=view&id=1yhruWNdrfiHa-Q3hETBtVX6wCJtiSrqR", "https://drive.google.com/uc?export=view&id=1s0jNJr4wmIB9CGCG34BXu2v2gmxV_fEs"])
  // ].sort((a, b) => a.price > b.price && 1 || -1)
  // constructor() { }
  // //minus takiego rozwiązania jest taki, że elementy wyświetlają się posortowane, ale nigdzie nie było napisane jak ma to wyglądać
  // //jeśli klient chciałby aby były w kolejności dodawania to najprostsze rozwiązanie to zrobić po prostu osobny obiekt i używać pierwotnego do wyświetlania a tamtego do wszystkeigo innego

}
