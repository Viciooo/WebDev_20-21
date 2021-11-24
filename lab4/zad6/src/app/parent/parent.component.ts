import {Component} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  myCnt:number = 0
  criticVal: boolean = false
  updateCnt($event: number) {
    this.myCnt = $event
    if(this.myCnt === 10)this.criticVal = true
  }

  resetAll($event: boolean) {
    this.criticVal = $event
  }
}
