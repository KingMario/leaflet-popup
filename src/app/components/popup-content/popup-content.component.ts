import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  templateUrl: './popup-content.component.html',
  styleUrls: [ './popup-content.component.css' ],
})
export class PopupContentComponent implements OnInit {

  @Input() data: any;

  ele: ElementRef;

  constructor (myElement: ElementRef) {
    this.ele = myElement;
  }

  ngOnInit () {
  }

}
