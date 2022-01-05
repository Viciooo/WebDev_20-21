import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {DataHandlerService} from "../services/data-handler.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService:AuthService,
              public dataHandler:DataHandlerService) { }
  onLogout() {
    this.authService.logout()
  }
}
