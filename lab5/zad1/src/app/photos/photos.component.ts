import { Component, OnInit } from '@angular/core';
import {Photo} from "../photo";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos : Photo[] = []
  constructor(public dataHandler: DataService,private router:Router) { }

  ngOnInit(): void {
    this.dataHandler.getPhotos().subscribe(photos=>this.photos = photos)
  }

  onClick(id:number) {
  this.router.navigate(['/photos',id])
  }
}
