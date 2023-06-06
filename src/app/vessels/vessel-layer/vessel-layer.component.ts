import { Component, Input, OnInit } from '@angular/core';
import { Map, MapBrowserEvent } from 'ol';
import { GeoJSON } from 'ol/format';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { VesselsService } from '../vessels.service';
import { transform } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Vessel } from 'src/shared/vessel.model';

@Component({
  selector: 'app-vessel-layer',
  templateUrl: './vessel-layer.component.html',
  styleUrls: ['./vessel-layer.component.css'],
})
export class VesselLayerComponent implements OnInit {
  @Input() map: Map;
 
  constructor(private vesselsService: VesselsService) {}
  ngOnInit(): void {
    this.vesselsService.getVesselsDataObservable().subscribe((vessels) => {
      vessels.forEach((vessel) => {
        const [lon, lat] = transform(
          [vessel.LONGITUDE, vessel.LATITUDE],
          'EPSG:4326',
          'EPSG:900913'
        );
        const point = new Point([lon, lat]);
        const feature = new Feature(point);

        feature.setProperties({
          type: 'vessel',
          imoNumber: vessel.IMO_NUMBER,
          vesselName: vessel.VESSEL_NAME,
          country: vessel.COUNTRY,
          latitude: vessel.LATITUDE,
          longitude: vessel.LONGITUDE,
          speed: vessel.SPEED,
        });

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
        vesselLayer.set('title', 'vessel');
        this.map.addLayer(vesselLayer);
      });
    });
  }
  private updateIconScale(layer: any, iconStyle: any) {
    layer.setStyle((feature, resolution) => {
      iconStyle.getImage().setScale(3 / Math.pow(resolution, 1 / 2));
      return iconStyle;
    });
  }
}
