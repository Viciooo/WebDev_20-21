import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {AuthService} from "../auth/auth.service";
import {dbUser} from "../interfaces/db.user.module";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  myUsers: any[] = [];
  // @ts-ignore
  userNick:string
  userSub:Subscription
  // @ts-ignore
  isAuthenticated: boolean
  constructor(private db:DataService,
              private auth:AuthService) {
    this.db.userList.subscribe(e=> {
      this.myUsers = e
    })
    this.userSub = this.auth.user.subscribe(user =>{
      this.isAuthenticated = !!user
    })
  }
}
