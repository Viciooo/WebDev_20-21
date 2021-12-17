import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: any;

  constructor(private studentService: StudentService) { }

  ngOnInit() {

  }

  getStudentsList() {

  }

  deleteStudents() {

  }

}
