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
import Drag from '../Drag';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Port } from 'src/shared/port.model';
import { PortPopupComponent } from '../port-popup/port-popup.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  public map: Map;
  public selectedVessel: Vessel;
  public selectedPort: Port;
  public drag: Drag;
  public portLayer: any;
  public vesselLayer: any;
  @ViewChild('popup') popup: PopupComponent;
  @ViewChild('portPopup') portPopup: PortPopupComponent;

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
        rotation: 0.5,
      }),
      layers: [stamenTerrain],
      target: 'ol-map',
    });
    this.map.on('click', (event) => {
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const { type } = feature.getProperties();
        console.log(type);
        if (type === 'vessel') {
          const { imoNumber, vesselName, country, latitude, longitude, speed,timeOfPosition } =
            feature.getProperties();
          this.selectedVessel = new Vessel(
            imoNumber,
            vesselName,
            country,
            latitude,
            longitude,
            speed,
            timeOfPosition
          );
          this.popup.selectedVessel = this.selectedVessel;
          this.popup.overlay.setPosition(event.coordinate);
        } else if (type === 'port') {
          const { portCode, portName, city, country, latitude, longitude } =
            feature.getProperties();
          this.selectedPort = new Port(
            portCode,
            portName,
            city,
            country,
            latitude,
            longitude
          );
          this.portPopup.selectedPort = this.selectedPort;
          this.portPopup.portOverlay.setPosition(event.coordinate);
        }
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
        feature.setProperties({
          type: 'port',
          portCode: port.PORT_CODE,
          portName: port.PORT_NAME,
          city: port.CITY,
          country: port.COUNTRY,
          latitude: port.LATITUDE,
          longitude: port.LONGITUDE,
        });
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
  }

  private updateIconScale(layer: any, iconStyle: any) {
    layer.setStyle((feature, resolution) => {
      iconStyle.getImage().setScale(2 / Math.pow(resolution, 1 / 2));
      return iconStyle;
    });
  }
}
