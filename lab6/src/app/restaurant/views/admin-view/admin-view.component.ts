import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(public dataHandler:DataHandlerService) { }

  ngOnInit(): void {
  }

}
