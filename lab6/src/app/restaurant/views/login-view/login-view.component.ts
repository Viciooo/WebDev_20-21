import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces/user.module";
import {AuthResponseData, AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PaginationService} from "../../services/pagination.service";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
//@ts-ignore
  logInForm: FormGroup
  isLoading = false;
  error = null;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              public paginationService:PaginationService) {
  }

  ngOnInit(): void {

    this.logInForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit() {
    alert("Strona wymaga wyjścia i wejścia w celu zobaczenia zmian takich jak zakup czy możliwość oceny - trwają prace nad naprawą tej niedogodności")
    if (!this.logInForm.valid) return
    const email = (<FormArray>this.logInForm.get('email')).value
    const password = (<FormArray>this.logInForm.get('password')).value

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.login(email, password);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/menu']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.logInForm.reset();
  }
}
