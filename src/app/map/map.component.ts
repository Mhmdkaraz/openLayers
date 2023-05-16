import { Component, OnInit, ViewChild } from '@angular/core';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Overlay } from 'ol';
import { Vessel } from 'src/shared/vessel.model';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
 
  map: Map;
  selectedVessel: Vessel;
  @ViewChild('popup') popup: PopupComponent;
  
  ngOnInit(): void {
    const stamenTerrain = new TileLayer({
      source: new XYZ({
        url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
      }),
      visible: true,
    });
    stamenTerrain.set('title', 'StamenTerrain');

    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 4,
      }),
      layers: [stamenTerrain],
      target: 'ol-map',
    });
    this.map.on('click', (event) => {
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const features = feature.getProperties().properties;
        const { name, imoNumber, portFrom, portTo, type, arrivalDate, speed } =
          feature.getProperties().properties;
        this.selectedVessel = new Vessel(
          name,
          imoNumber,
          portFrom,
          portTo,
          type,
          arrivalDate,
          speed
        );
        this.popup.selectedVessel = this.selectedVessel;
        this.popup.overlay.setPosition(event.coordinate);
      });
    });

  }
}
