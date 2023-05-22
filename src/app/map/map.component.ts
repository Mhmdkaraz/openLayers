import { Component, OnInit, ViewChild } from '@angular/core';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Vessel } from 'src/shared/vessel.model';
import { PopupComponent } from '../popup/popup.component';
import { PortsService } from '../ports/ports.service';
import { transform } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { VesselsService } from '../vessels/vessels.service';
import Collection from 'ol/Collection';
import { DragAndDrop } from 'ol/interaction';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  public map: Map;
  public selectedVessel: Vessel;
  @ViewChild('popup') popup: PopupComponent;

  constructor(
    private portsService: PortsService,
    private vesselsService: VesselsService
  ) {}

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
        constrainResolution: true,
        center: [0, 0],
        zoom: 7,
        // maxZoom: 10,
        // minZoom: 5,
        rotation: 0.5,
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
    this.portsService.getPortsDataObservable().subscribe((ports) => {
      ports.forEach((port) => {
        const [lon, lat] = transform(
          [port.LONGITUDE, port.LATITUDE],
          'EPSG:4326',
          'EPSG:900913'
        );
        const point = new Point([lon, lat]);
        const feature = new Feature(point);

        const portLayer = new VectorLayer({
          source: new VectorSource({
            features: [feature],
          }),
          style: (feature, resolution) => {
            const iconStyle = new Style({
              image: new Icon({
                src: '../../../assets/icons/port.jpg',
              }),
            });
            this.updateIconScale(portLayer, iconStyle);
          },
        });
        this.map.addLayer(portLayer);
      });
    });
    this.vesselsService.getVesselsDataObservable().subscribe((vessels) => {
      vessels.forEach((vessel) => {
        const [lon, lat] = transform(
          [vessel.LONGITUDE, vessel.LATITUDE],
          'EPSG:4326',
          'EPSG:900913'
        );
        const point = new Point([lon, lat]);
        const feature = new Feature(point);

        const vesselLayer = new VectorLayer({
          source: new VectorSource({
            features: [feature],
          }),
          style: (feature, resolution) => {
            const iconStyle = new Style({
              image: new Icon({
                src: '../../../assets/icons/vessel.png',
              }),
            });
            this.updateIconScale(vesselLayer, iconStyle);
          },
        });
        // const dragInteraction = new DragAndDrop({
        //   source: new VectorSource({
        //     features: new Collection([feature]),
        //   }),
        // });
        // console.log(dragInteraction);
        // this.map.addInteraction(dragInteraction);
        //  dragInteraction.on('translateend', (event) => {
        //    const coords = event.features
        //      .getArray()[0]
        //      .getGeometry()
        //      .getCoordinates();
        //    const [lon, lat] = transform(coords, 'EPSG:900913', 'EPSG:4326');
        //    vessel.LONGITUDE = lon;
        //    vessel.LATITUDE = lat;
        // Call your service method to update the vessel's coordinates
        //  });

        this.map.addLayer(vesselLayer);
      });
    });
  }

  private updateIconScale(layer: any, iconStyle: any) {
    layer.setStyle((feature, resolution) => {
      iconStyle.getImage().setScale(2 / Math.pow(resolution, 1 / 2));
      return iconStyle;
    });
  }
}
