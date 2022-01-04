import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  isAuthenticated = false
  // @ts-ignore
  userNick:string
  // @ts-ignore
  private userSub: Subscription


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
