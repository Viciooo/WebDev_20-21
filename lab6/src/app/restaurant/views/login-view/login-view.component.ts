import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../interfaces/user.module";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
//@ts-ignore
  logInForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.logInForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
    })
  }



  onSubmit() {
    console.log(this.logInForm.controls)
    let newUser = new User(
      (<FormArray>this.logInForm.get('email')).value,
      (<FormArray>this.logInForm.get('password')).value)
  }
}
