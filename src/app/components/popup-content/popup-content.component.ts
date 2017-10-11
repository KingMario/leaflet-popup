import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: [ './popup-content.component.css' ],
})
export class PopupContentComponent implements OnInit {

  @Input() item: any;

  ele: ElementRef;

  constructor (myElement: ElementRef) {
    this.ele = myElement;
  }

  ngOnInit () {
  }

}
