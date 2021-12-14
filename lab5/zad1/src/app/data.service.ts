import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./post";
import {Observable} from "rxjs";
import {Photo} from "./photo";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }
  readonly URL = "https://my-json-server.typicode.com/Viciooo/demo"
  readonly post = "/posts"
  posts!: Observable<Post[]>;
  photos!: Observable<Photo[]>;


  public lastIdxOfPosts : number = 5

  postData(postData: Post){
    this.lastIdxOfPosts++
    this.http.post(this.URL + this.post,
      {
        "id": this.lastIdxOfPosts,
        "title": postData.title,
        "content":postData.content
      }).subscribe(response =>{
      console.log(response)
    })
  }
  getPosts() : Observable<Post[]> {
    this.posts = this.http.get<Post[]>(this.URL + '/posts');
    return this.posts;
  }

  getPhotos() : Observable<Photo[]> {
    this.photos = this.http.get<Photo[]>(this.URL + '/photos');
    return this.photos;
  }
}
