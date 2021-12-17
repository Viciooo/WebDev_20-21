import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dishList: Observable<any>
  constructor(private db: AngularFireDatabase) {
    this.dishList = this.getDishList()
  }
  getDishList(){
    return this.dishList = this.db.list('dishList').valueChanges();
  }
}
