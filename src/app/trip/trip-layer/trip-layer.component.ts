import { Component, Input, OnInit } from '@angular/core';
import { Map as OlMap, MapBrowserEvent } from 'ol';
import { TripService } from '../trip.service';
import { GeoJSON } from 'ol/format';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { transform } from 'ol/proj';
import LineString from 'ol/geom/LineString';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'app-trip-layer',
  templateUrl: './trip-layer.component.html',
  styleUrls: ['./trip-layer.component.css'],
})
export class TripLayerComponent implements OnInit {
  @Input() map: OlMap;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTripsDataObservable().subscribe((trips) => {
      const tripCoordinatesMap = new Map(); // Map to group coordinates by TRIP_ID

      trips.forEach((position) => {
        const tripId = position.TRIP_ID;
        const coordinate = transform(
          [parseFloat(position.LONGITUDE), parseFloat(position.LATITUDE)],
          'EPSG:4326',
          'EPSG:3857'
        );
        if (tripCoordinatesMap.has(tripId)) {
          const coordinates = tripCoordinatesMap.get(tripId);
          coordinates.push(coordinate);
        } else {
          tripCoordinatesMap.set(tripId, [coordinate]);
        }
      });

      tripCoordinatesMap.forEach((coordinates) => {
        const lineString = new LineString(coordinates);
        const feature = new Feature(lineString);
        const vectorSource = new VectorSource();
        vectorSource.addFeature(feature);

        const dotStyle = new Style({
          image: new Icon({
            src: '../../../assets/icons/dot-icon.png',
            anchor: [0.5, 0.5],
            scale: 0.1,
          }),
        });

        const lineStyle = new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2,
          }),
        });

        coordinates.forEach((coordinate, index) => {
          const point = new Point(coordinate);
          const pointFeature = new Feature(point);
          pointFeature.setStyle(dotStyle);
          vectorSource.addFeature(pointFeature);

          if (index > 0) {
            const prevCoordinate = coordinates[index - 1];
            const lineCoords = [prevCoordinate, coordinate];
            const line = new LineString(lineCoords);
            const lineFeature = new Feature(line);
            vectorSource.addFeature(lineFeature);
          }
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: lineStyle,
        });
        vectorLayer.set('title', 'trip');
        this.map.addLayer(vectorLayer);
      });
    });
  }
}
