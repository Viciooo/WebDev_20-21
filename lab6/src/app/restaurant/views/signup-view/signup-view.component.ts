import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {User} from "../../interfaces/user.module";
import {ConfirmedValidator} from "./passwordValidator";
@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css']
})
export class SignupViewComponent implements OnInit {
  //@ts-ignore
  signUpForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirm_password': ['']
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }



  onSubmit() {
    console.log(this.signUpForm.controls)
    let newUser = new User(
      (<FormArray>this.signUpForm.get('email')).value,
      (<FormArray>this.signUpForm.get('password')).value)
  }
}

