import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from "./restaurant/views/home-view/home-view.component";
import {MenuViewComponent} from "./restaurant/views/menu-view/menu-view.component";
import {SingleDishViewComponent} from "./restaurant/views/single-dish-view/single-dish-view.component";
import {CheckoutViewComponent} from "./restaurant/views/checkout-view/checkout-view.component";
import {LoginViewComponent} from "./restaurant/views/login-view/login-view.component";
import {SignupViewComponent} from "./restaurant/views/signup-view/signup-view.component";
import {ChefsViewComponent} from "./restaurant/views/chefs-view/chefs-view.component";
import {PageNotFoundComponent} from "./restaurant/views/page-not-found-view/page-not-found.component";
import {chefsViewAuthGuard} from "./restaurant/auth/chefs-view-auth-guard.service";
import {AdminViewComponent} from "./restaurant/views/admin-view/admin-view.component";
import {AdminViewAuthGuardGuard} from "./restaurant/auth/admin-view-auth-guard.guard";
import {UserAuthGuard} from "./restaurant/auth/user-auth.guard";

const appRoutes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'menu', component: MenuViewComponent},
  {path: 'menu/:id', component: SingleDishViewComponent},
  {
    path: 'checkout',
    component: CheckoutViewComponent,
    canActivate: [UserAuthGuard]
  },
  {path: 'login', component: LoginViewComponent},
  {path: 'signup', component: SignupViewComponent},
  {
    path: 'chefsView',
    component: ChefsViewComponent,
    canActivate: [chefsViewAuthGuard]
  },
  {
    path: 'adminView',
    component: AdminViewComponent,
    canActivate: [AdminViewAuthGuardGuard]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
