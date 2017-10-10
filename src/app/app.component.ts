import { Compiler, Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { PopupContentModule } from './components/popup-content/popup-content.module';
import { PopupContentComponent } from './components/popup-content/popup-content.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent implements OnInit {

  constructor (private compiler: Compiler) {}

  @ViewChild('popupContent', {
    read: ViewContainerRef,
  }) popupContent: ViewContainerRef;
  map: any;
  maker: any;
  popup: any;
  items = [
    {
      name: 'Candy',
      age: 12,
    }, {
      name: 'Lucy',
      age: 5,
    }, {
      name: 'Sam',
      age: 21,
    }, {
      name: 'Duke',
      age: 23,
    }, {
      name: 'Jack',
      age: 15,
    }, {
      name: 'Ben',
      age: 7,
    }, {
      name: 'Cindy',
      age: 8,
    }, {
      name: 'Joe',
      age: 9,
    },
  ];
  itemLength = this.items.length;
  popupContentComponentFactory = this.compiler.compileModuleAndAllComponentsSync(PopupContentModule)
    .componentFactories.find((comp) =>
      comp.componentType === PopupContentComponent,
    );
  component: any;
  props = {
    data: {
      item: this.items[ 0 ],
    },
  };

  ngOnInit () {
    this.map = L.map('map', {
      center: [ 51.505, -0.09 ],
      zoom: 13,
    });
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.maker = L.marker([ 51.505, -0.09 ], {
      icon: L.icon({
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
      }),
    }).addTo(this.map).on('click', () => {
      this.showItemPopup();
    });

    this.popup = L.popup().setLatLng([ 51.505, -0.09 ]); // use the same LatLng of the marker

    this.component = this.popupContent.createComponent(this.popupContentComponentFactory);
    Object.assign(this.component.instance, this.props);
    this.popup.setContent(this.component.instance.ele.nativeElement);
  }

  showItemPopup () {
    this.props.data.item = this.items[ Math.floor(Math.random() * this.itemLength) ];
    this.component.changeDetectorRef.detectChanges();
    this.popup.openOn(this.map);
  }
}
