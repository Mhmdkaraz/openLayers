  // import { Component, Input, OnInit } from '@angular/core';
  // import { Map } from 'ol';
  // import { GeoJSON } from 'ol/format';
  // import Point from 'ol/geom/Point';
  // import Feature from 'ol/Feature';
  // import VectorLayer from 'ol/layer/Vector';
  // import VectorSource from 'ol/source/Vector';
  // @Component({
  //   selector: 'app-vessel-layer',
  //   templateUrl: './vessel-layer.component.html',
  //   styleUrls: ['./vessel-layer.component.css'],
  // })
  // export class VesselLayerComponent implements OnInit{
  //   @Input() map: Map;
    
  //   ngOnInit(): void {
  //     const vesselLayer = new VectorLayer({
  //       source: new VectorSource({
  //         features: [
  //           new Feature({
  //             geometry: new Point([-3751.2614924234804, 453035.41798135755]),
  //             properties: {
  //               name: 'My Vessel',
  //               imoNumber: 10,
  //               portFrom: 'Accra',
  //               portTo: 'Lebanon',
  //               type: 'Cargo',
  //               arrivalDate: '14.05.2023',
  //               speed: 12,
  //             },
  //           }),
  //           new Feature({
  //             geometry: new Point([-66600, 450000]),
  //             properties: {
  //               name: 'Another Vessel',
  //               imoNumber: 20,
  //               portFrom: 'New York',
  //               portTo: 'Singapore',
  //               type: 'Tanker',
  //               arrivalDate: '20.05.2023',
  //               speed: 16,
  //             },
  //           }),
  //         ],
  //         format: new GeoJSON(),
  //       }),
  //     });
  //     vesselLayer.set('title', 'Vessels');
  //     this.map.addLayer(vesselLayer);
  //   }
  // }
