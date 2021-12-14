import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Photo} from "../photo";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.css']
})
export class ImgViewComponent implements OnInit {
  photos: Photo[] = []
  photoId: number = -1
  constructor(private dataHandler:DataService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.photoId = parseInt(<string>this.route.snapshot.paramMap.get('id'))
    this.dataHandler.getPhotos().subscribe(photos=>this.photos = photos)
  }

}
