import { Component, OnInit } from '@angular/core';
import {Photo} from "../photo";
import {DataService} from "../data.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos : Photo[] = []
  constructor(public dataHandler: DataService) { }

  ngOnInit(): void {
    this.dataHandler.getPhotos().subscribe(photos=>this.photos = photos)
  }

}
