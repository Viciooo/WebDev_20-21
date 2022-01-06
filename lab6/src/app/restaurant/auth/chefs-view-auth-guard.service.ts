import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import {DataHandlerService} from "../services/data-handler.service";

@Injectable({providedIn: 'root'})
export class chefsViewAuthGuard implements CanActivate {
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

    if (this.dataHandlerService.isAuthenticated &&
      (this.dataHandlerService.isAdmin ||
        this.dataHandlerService.isManager)) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }
}
