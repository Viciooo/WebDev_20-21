import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  firstname: String = '';
  lastname: String = '';
  movie: String = '';
  submit(data: any) {
    this.firstname = data.controls.firstname.value;
    this.lastname = data.controls.lastname.value;
    this.movie = data.controls.movie.value;
  }
}
