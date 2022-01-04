import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {ConfirmedValidator} from "./passwordValidator";
import {AuthResponseData, AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css']
})
export class SignupViewComponent implements OnInit {
  //@ts-ignore
  signUpForm: FormGroup
  isLoading = false;
  error = null;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      'nick':['', [Validators.required, Validators.minLength]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirm_password': ['']
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }


  onSubmit() {
    if (!this.signUpForm.valid) return
    const email = (<FormArray>this.signUpForm.get('email')).value
    const password = (<FormArray>this.signUpForm.get('password')).value
    const nick = (<FormArray>this.signUpForm.get('nick')).value

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.signup(email, password, nick);

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/menu']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.signUpForm.reset();
  }
}
