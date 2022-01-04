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
import {AuthGuard} from "./restaurant/auth/auth.guard";
import {AdminViewComponent} from "./restaurant/views/admin-view/admin-view.component";

const appRoutes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'menu', component: MenuViewComponent},
  {path: 'menu/:id', component: SingleDishViewComponent},
  {
    path: 'checkout',
    component: CheckoutViewComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginViewComponent},
  {path: 'signup', component: SignupViewComponent},
  {
    path: 'chefsView',
    component: ChefsViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adminView',
    component: AdminViewComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
