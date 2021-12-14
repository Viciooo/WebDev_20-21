import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Post} from "../post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // @ts-ignore
  postsForm : FormGroup;
  posts : Post[] = [];

  constructor(private formBuilder : FormBuilder,public dataHandler: DataService) { }

  ngOnInit(): void {
    this.postsForm = this.formBuilder.group({
    'title': ['',Validators.required],
    'content': ['',Validators.required]
    })
    this.dataHandler.getPosts().subscribe(posts=>this.posts = posts)
  }

  onSubmit() {
    // console.log(this.postsForm.value)
    this.dataHandler.postData(this.postsForm.value)
  }
}
