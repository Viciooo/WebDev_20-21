import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";
import {dbUser, Roles} from "../../interfaces/db.user.module";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(public dataHandler:DataHandlerService,
              public dataService:DataService) { }

  ngOnInit(): void {
  }

  changeRoleUser(user:dbUser) {
    const newRoles = new Roles(!user.roles.user,user.roles.manager,user.roles.admin,user.roles.banned)
    this.dataService.changeUserRoles(user.UID,newRoles)
  }
  changeRoleManager(user:dbUser) {
    const newRoles = new Roles(user.roles.user,!user.roles.manager,user.roles.admin,user.roles.banned)
    this.dataService.changeUserRoles(user.UID,newRoles)
  }
  changeRoleAdmin(user:dbUser) {
    const newRoles = new Roles(user.roles.user,user.roles.manager,!user.roles.admin,user.roles.banned)
    this.dataService.changeUserRoles(user.UID,newRoles)
  }
  changeRoleBanned(user:dbUser) {
    const newRoles = new Roles(user.roles.user,user.roles.manager,user.roles.admin,!user.roles.banned)
    this.dataService.changeUserRoles(user.UID,newRoles)
  }
}
