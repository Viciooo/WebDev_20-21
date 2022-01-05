import {Injectable} from '@angular/core';
import {Dish} from "../interfaces/dish.module";
import {DataService} from "./data.service";
import {AuthService} from "../auth/auth.service";
import {User} from "../interfaces/user.module";
import {dbUser} from "../interfaces/db.user.module";

export class PersistenceType{
  constructor(public LOCAL:boolean,
              public SESSION:boolean,
              public NONE:boolean) {}
}


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  myUsers: any[] = [];
  myDishes: any[] = [];
  dishTypes: any[] = [];
  cuisineTypes: any[] = [];
  dishTypesSelected: any
  cuisineTypesSelected: any
  newId: number = 0
  priceList: any[] = []
  prices: any[] = []
  // @ts-ignore
  user: User
  // @ts-ignore
  isAuthenticated: boolean
  // @ts-ignore
  userInDB:dbUser
  isAdmin = false
  isUser = false
  isManager = false
  isBanned = false

  private typeOfPersistence:PersistenceType = new PersistenceType(true,false,false)

  changeToLOCAL(){
    this.typeOfPersistence.LOCAL = true
    this.typeOfPersistence.SESSION = false
    this.typeOfPersistence.NONE = false
  }
  changeToSESSION(){
    this.typeOfPersistence.LOCAL = false
    this.typeOfPersistence.SESSION = true
    this.typeOfPersistence.NONE = false
  }
  changeToNONE(){
    this.typeOfPersistence.LOCAL = false
    this.typeOfPersistence.SESSION = false
    this.typeOfPersistence.NONE = true
  }
  getPersistence(){
    if(this.typeOfPersistence.LOCAL) return "LOCAL"
    else if(this.typeOfPersistence.SESSION) return "SESSION"
    else return "NONE"
  }

  constructor(private db: DataService,
              private auth: AuthService) {
    this.db.userList.subscribe((e:dbUser[]) => {
      this.myUsers = e
    })

    this.db.dishList.subscribe(e => {
      this.myDishes = e
      this.newId = e.length + 1
      this.priceList = this.populatePriceList()
      this.prices = [
        this.calcMin(),
        this.calcMax(),
        this.calcMin(),
        this.calcMax()
      ]
    })
    this.db.dishTypes.subscribe(e => {
      this.dishTypes = e
      this.dishTypesSelected = Array(e.length).fill(0)

    })
    this.db.cuisineTypes.subscribe(e => {
      this.cuisineTypes = e
      this.cuisineTypesSelected = Array(e.length).fill(0)
    })
    this.auth.user.subscribe((user: User) => {
      this.user = user
      this.isAuthenticated = !!user
      this.myUsers.forEach((user1:dbUser)=>{
        if(user1.UID === this.user.id) this.userInDB = user1
      })
      this.isUser = this.userInDB.roles.user
      this.isManager = this.userInDB.roles.manager
      this.isAdmin = this.userInDB.roles.admin
      this.isBanned = this.userInDB.roles.banned
    })

  }

  starsSelected = Array(6).fill(0)
  displayFilters = 'none'

  //potentially not true


  populatePriceList() {
    let i = 0
    let tmp: number[][] = []
    this.myDishes.forEach((e: Dish) => {
      tmp.push([i++, e.price])
    })
    return tmp
  }


  calcMax() {
    let val = -1
    this.priceList.forEach(e => {
      val = Math.max(val, e[1])
    })
    return val
  }

  calcMin() {
    let val = 1000000
    this.priceList.forEach(e => {
      val = Math.min(val, e[1])
    })
    return val
  }

  sum(arr: number[]) {
    let tmp = 0
    arr.forEach(e => {
      tmp += e
    })
    return tmp
  }

  // getDishTypesSelected(): Observable<any>{
  //   return of(this.dishTypesSelected)
  // }
  // getCuisineTypesSelected(): Observable<any>{
  //   return of(this.cuisineTypesSelected)
  // }
  // getStarsSelected(): Observable<any>{
  //   return of(this.starsSelected)
  // }
  // getPrices(): Observable<any>{
  //   return of(this.prices)
  // }
  // getPriceList(): Observable<any>{
  //   return of(this.priceList)
  // }
  // getDisplayFilters(): Observable<any>{
  //   return of(this.displayFilters)
  // }
  changeDishTypesSelected(x: number) {
    this.dishTypesSelected[x] = (this.dishTypesSelected[x] + 1) % 2
  }

  changeCuisineTypesSelected(x: number) {
    this.cuisineTypesSelected[x] = (this.cuisineTypesSelected[x] + 1) % 2
  }

  changeStarsSelected(x: number) {
    this.starsSelected[x] = (this.starsSelected[x] + 1) % 2
  }

  changeDisplayFilters() {
    if (this.displayFilters === 'none') this.displayFilters = 'flex'
    else {
      this.displayFilters = 'none'
    }

  }

  changePrices(prices: number[]) {
    this.prices = prices
  }
}
