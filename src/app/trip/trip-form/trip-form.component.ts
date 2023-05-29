import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortsService } from 'src/app/ports/ports.service';
import { VesselsService } from 'src/app/vessels/vessels.service';
import { Port } from 'src/shared/port.model';
import { Vessel } from 'src/shared/vessel.model';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat, toLonLat } from 'ol/proj';
import { TripService } from '../trip.service';
import { Trip } from 'src/shared/trip.model';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css'],
})
export class TripFormComponent implements OnInit {
  tripForm: FormGroup;
  ports: Port[];
  vessels: Vessel[];
  map: Map;
  overlay: Overlay;

  constructor(
    private formBuilder: FormBuilder,
    private portsService: PortsService,
    private vesselService: VesselsService,
    private tripService: TripService
  ) {}

  ngOnInit() {
    this.tripForm = this.formBuilder.group({
      imoNumber: ['', Validators.required],
      portFrom: ['', Validators.required],
      portTo: ['', Validators.required],
      segments: this.formBuilder.array([]),
    });

    // Fetch ports and vessels data from the service
    this.portsService.getPortsDataObservable().subscribe((ports) => {
      this.ports = ports;
    });
    this.vesselService.getVesselsData();
    this.vesselService.getVesselsDataObservable().subscribe((vessels) => {
      this.vessels = vessels;
    });

    this.initializeMap();
  }
  initializeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Create the position marker overlay
    this.overlay = new Overlay({
      element: document.getElementById('position-marker'),
      positioning: 'bottom-center',
      offset: [0, 0],
    });

    this.map.addOverlay(this.overlay);

    this.map.on('click', (event) => {
      const clickedCoordinate = toLonLat(event.coordinate);

      const segmentIndex = this.segments.length - 1;
      const segment = this.segments.controls[segmentIndex] as FormGroup;
      const positions = segment.get('positions') as FormArray;
      const positionIndex = positions.length - 1;
      const position = positions.at(positionIndex) as FormGroup;

      const latControl = position.controls['lat'];
      const lonControl = position.controls['lon'];

      latControl.setValue(clickedCoordinate[1]);
      lonControl.setValue(clickedCoordinate[0]);

      // const positionMarkerElement = document.getElementById('position-marker');
      const clickedPosition = fromLonLat([lonControl.value, latControl.value]);
      this.overlay.setPosition(clickedPosition);

      // Center the map on the clicked position
      // this.map.getView().setCenter(clickedPosition);
    });
  }
  get segments(): FormArray {
    return this.tripForm.get('segments') as FormArray;
  }

  addSegment() {
    const segmentGroup = this.formBuilder.group({
      positions: this.formBuilder.array([]),
    });

    this.segments.push(segmentGroup);
  }

  addPosition(segmentIndex: number) {
    const positionGroup = this.formBuilder.group({
      lat: ['', Validators.required],
      lon: ['', Validators.required],
    });

    const segment = this.segments.controls[segmentIndex] as FormGroup;
    const positions = segment.get('positions') as FormArray;
    positions.push(positionGroup);
  }

  removeSegment(segmentIndex: number) {
    this.segments.removeAt(segmentIndex);
  }

  removePosition(segmentIndex: number, positionIndex: number) {
    const segment = this.segments.controls[segmentIndex] as FormGroup;
    const positions = segment.get('positions') as FormArray;
    positions.removeAt(positionIndex);
  }

  addTrip() {
    console.log(this.tripForm);
    if (this.tripForm.invalid) {
      return;
    }

    const tripData = {
      trips: [
        {
          imoNumber: this.tripForm.controls['imoNumber'].value,
          portFrom: this.tripForm.controls['portFrom'].value,
          portTo: this.tripForm.controls['portTo'].value,
          segments: this.tripForm.controls['segments'].value,
        },
      ],
    };

    // console.log(tripData);
    const trip = tripData;
    this.tripService.sendTripData(trip).subscribe(
      (response) => {
        // Handle successful response
        console.log('Trip added successfully:', response);
        this.tripForm.reset();
      },
      (error) => {
        // Handle error
        console.error('Failed to add trip:', error);
      }
    );
    this.tripForm.reset();
  }
}
