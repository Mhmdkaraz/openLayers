import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from 'src/shared/trip.model';
import { Router } from '@angular/router';
import Drag from '../../Drag';

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
  drag: any;
  overlay: Overlay;
  positionMarkers: Overlay[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private portsService: PortsService,
    private vesselService: VesselsService,
    private tripService: TripService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tripForm = this.formBuilder.group({
      imoNumber: ['', Validators.required],
      tripName: ['', Validators.required],
      portFrom: ['', Validators.required],
      portTo: ['', Validators.required],
      segments: this.formBuilder.array([]),
    });

    // Fetch ports and vessels data from the service
    this.portsService.getPortsDataObservable().subscribe((ports) => {
      this.ports = ports;
    });
    this.vesselService.getAvailableVesselsData();
    this.vesselService
      .getAvailableVesselsDataObservable()
      .subscribe((vessels) => {
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
      const lat = latControl.value;
      const lon = lonControl.value;

      // Create a new position marker
      const positionMarker = this.createPositionMarker(lat, lon);
      this.positionMarkers.push(positionMarker);
      this.map.addOverlay(positionMarker);
    });
  }
  private createPositionMarker(lat: number, lon: number): Overlay {
    const positionMarkerElement = document.createElement('div');
    positionMarkerElement.className = 'position-marker';
    const positionMarkerDot = document.createElement('div');
    positionMarkerDot.className = 'marker-dot';
    const positionMarkerPulse = document.createElement('div');
    positionMarkerPulse.className = 'marker-pulse';

    positionMarkerElement.appendChild(positionMarkerDot);
    positionMarkerElement.appendChild(positionMarkerPulse);
    console.log('Marker 1:', lat, lon);
    console.log(positionMarkerElement);
    const positionMarker = new Overlay({
      element: positionMarkerElement,
      positioning: 'bottom-center',
      offset: [0, 0],
      position: fromLonLat([lon, lat]),
    });

    return positionMarker;
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
    const segment = this.segments.controls[segmentIndex] as FormGroup;
    const positions = segment.get('positions') as FormArray;

    // Remove the markers associated with the positions in the segment
    positions.controls.forEach((position) => {
      const latitude = position.get('lat').value;
      const longitude = position.get('lon').value;
      const marker = this.findPositionMarker(latitude, longitude);
      if (marker) {
        this.removePositionMarker(marker);
      }
    });

    // Remove the positions and the segment itself
    positions.clear();
    this.segments.removeAt(segmentIndex);
  }

  removePositionMarker(marker: Overlay) {
    const markerElement = marker.getElement();
    if (markerElement) {
      markerElement.remove(); // Remove the marker element from the DOM
    }
    this.map.removeOverlay(marker);

    const index = this.positionMarkers.indexOf(marker);
    if (index !== -1) {
      this.positionMarkers.splice(index, 1);
    }
  }

  removePosition(segmentIndex: number, positionIndex: number) {
    const segment = this.segments.controls[segmentIndex] as FormGroup;
    const positions = segment.get('positions') as FormArray;

    const position = positions.at(positionIndex) as FormGroup;
    const latitude = position.get('lat').value;
    const longitude = position.get('lon').value;

    const marker = this.findPositionMarker(latitude, longitude);
    if (marker) {
      this.removePositionMarker(marker);
    }
    positions.removeAt(positionIndex);
  }
  findPositionMarker(latitude: number, longitude: number): Overlay | undefined {
    for (const marker of this.positionMarkers) {
      const markerPosition = marker.getPosition();
      const markerLatitude = toLonLat(markerPosition)[1];
      const markerLongitude = toLonLat(markerPosition)[0];
      if (latitude === markerLatitude && longitude === markerLongitude) {
        return marker;
      }
    }
    return undefined;
  }
  addTrip() {
    console.log(this.tripForm);
    if (this.tripForm.invalid) {
      this.showSnackbar('Error occurred while adding the trip', 'error');
      return;
    }

    const tripData = {
      trips: [
        {
          imoNumber: this.tripForm.controls['imoNumber'].value,
          tripName: this.tripForm.controls['tripName'].value,
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
        this.router.navigate(['/trip']);
        this.showSnackbar('Trip added successfully', 'success');
        this.tripForm.reset();
        this.tripService.getTripsData();
      },
      (error) => {
        this.showSnackbar('Error occurred while adding the vessel', 'error');
      }
    );
    this.tripForm.reset();
  }
  private showSnackbar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar', panelClass],
    });
  }
}
