import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  value: any = ''
  running:boolean = true
  btns = ['+', '-', '*', '/', '=',1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  ctrls = [ 'C','ON','OFF']
  constructor() {
  }

  calc($event: any) {
    let btn = $event.srcElement.innerText
    if (btn === '=') this.value = eval(this.value)
    else if (btn === 'C') this.value = ''
    else if (btn === 'ON') {
      this.running = true
      this.value = ''
    }
    else if (btn === 'OFF') {
      this.running = false
      this.value = ''
    }
    else this.value += btn
  }

  ngOnInit(): void {
  }
}
