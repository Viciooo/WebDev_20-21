import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Output() passToParent: EventEmitter<number> = new EventEmitter<number>()
  @Output() reset: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() cnt: any
  @Input() criticVal: any;

  sendCntToParent() {
    this.cnt++
    this.passToParent.emit(this.cnt)
  }

  resetMe() {
    this.passToParent.emit(0)
    this.reset.emit(false)
  }
}
