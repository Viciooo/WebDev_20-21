import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {DataHandlerService} from "../services/data-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataHandlerService: DataHandlerService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    if (this.dataHandlerService.isAuthenticated) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }

}
