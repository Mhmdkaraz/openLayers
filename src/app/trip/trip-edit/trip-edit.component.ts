import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css'],
})
export class TripEditComponent implements OnInit {
  tripForm: FormGroup;
  ports: Port[];
  vessels: Vessel[];
  assignedVessel: any = { imoNumber: '', vesselName: '' };
  map: Map;
  overlay: Overlay;
  positionMarkers: Overlay[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private portsService: PortsService,
    private vesselService: VesselsService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
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

    const tripId = this.route.snapshot.paramMap.get('tripId');
    this.tripService.getTripDetails(tripId).subscribe(
      (trip) => {
        this.populateFormWithData(trip);
        this.initializeMap();
      },
      (error) => {}
    );
  }
  populateFormWithData(trip: any) {
    console.log(this.tripForm.controls);
    this.tripForm.patchValue({
      imoNumber: trip[0].IMO_NUMBER,
      tripName: trip[0].TRIP_NAME,
      portFrom: trip[0].PORT_FROM,
      portTo: trip[0].PORT_TO,
    });
    this.assignedVessel = {
      imoNumber: trip[0].IMO_NUMBER,
      vesselName: trip[0].VESSEL_NAME,
    };
    const segments = this.tripForm.get('segments') as FormArray;
    segments.clear();
    trip[0].SEGMENTS.forEach((segmentData) => {
      console.log(segmentData);
      const segment = this.createSegmentFormGroup(segmentData);
      segments.push(segment);
      const positions = segment.get('positions') as FormArray;
      segmentData.POSITIONS.forEach((positionData) => {
        const position = this.createPositionFormGroup(positionData);
        positions.push(position);
      });
      console.log('Segments : ', segments.controls);
      console.log('Segment : ', segment.get('positions').getRawValue());
    });
  }

  createSegmentFormGroup(segment: any): FormGroup {
    return this.formBuilder.group({
      segmentId: [segment.SEGMENT_ID,''],
      positions: this.formBuilder.array([]),
    });
  }

  createPositionFormGroup(position: any): FormGroup {
    return this.formBuilder.group({
      positionId: [position.POSITION_ID,''],
      latitude: [position.LATITUDE, Validators.required],
      longitude: [position.LONGITUDE, Validators.required],
    });
  }

  initializeMap() {
    const mapElement = document.getElementById('map');

    if (mapElement) {
      const baseLayer = new TileLayer({
        source: new OSM(),
      });

      this.map = new Map({
        target: 'map',
        layers: [baseLayer],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });

      // Initialize the overlay for position markers
      // this.overlay = new Overlay({
      //   element: document.getElementById('marker-overlay'),
      //   positioning: 'center-center',
      //   stopEvent: false,
      //   offset: [0, 0],
      // });
      // this.map.addOverlay(this.overlay);

      // Display positions on the map
      this.overlay = new Overlay({
        element: document.getElementById('position-marker'),
        positioning: 'bottom-center',
        offset: [0, 0],
      });

      this.map.addOverlay(this.overlay);

      const segments = this.tripForm.get('segments') as FormArray;
      segments.controls.forEach((segment) => {
        const positions = segment.get('positions') as FormArray;
        positions.controls.forEach((position) => {
          const latitude = position.get('latitude').value;
          const longitude = position.get('longitude').value;

          const positionMarker = this.addPositionMarker(latitude, longitude);
          this.positionMarkers.push(positionMarker);
          this.map.addOverlay(positionMarker);
        });
      });
    }
  }

  addPositionMarker(latitude: number, longitude: number): Overlay {
    const positionMarkerElement = document.createElement('div');
    positionMarkerElement.className = 'position-marker';
    const positionMarkerDot = document.createElement('div');
    positionMarkerDot.className = 'marker-dot';
    const positionMarkerPulse = document.createElement('div');
    positionMarkerPulse.className = 'marker-pulse';

    positionMarkerElement.appendChild(positionMarkerDot);
    positionMarkerElement.appendChild(positionMarkerPulse);
    const positionMarker = new Overlay({
      element: positionMarkerElement,
      positioning: 'bottom-center',
      offset: [0, 0],
      position: fromLonLat([latitude, longitude]),
    });

    return positionMarker;
  }

  removePositionMarker(marker: Overlay) {
    this.map.removeOverlay(marker);
    const index = this.positionMarkers.indexOf(marker);
    if (index !== -1) {
      this.positionMarkers.splice(index, 1);
    }
  }

  addSegment() {
    const segments = this.tripForm.get('segments') as FormArray;
    segments.push(this.createSegmentFormGroup({ positions: [] }));
  }

  addPosition(segmentIndex: number) {
    const segments = this.tripForm.get('segments') as FormArray;
    const segment = segments.at(segmentIndex);
    const positions = segment.get('positions') as FormArray;
    positions.push(
      this.createPositionFormGroup({ latitude: '', longitude: '' })
    );
  }
  get segments(): FormArray {
    return this.tripForm.get('segments') as FormArray;
  }
  removeSegment(segmentIndex: number) {
    this.segments.removeAt(segmentIndex);
  }
  removePosition(segmentIndex: number, positionIndex: number) {
    const segment = this.segments.controls[segmentIndex] as FormGroup;
    const positions = segment.get('positions') as FormArray;
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

  updateTrip() {
    console.log(this.tripForm);
    if (this.tripForm.valid) {
      this.positionMarkers.forEach((marker) => {
        this.map.removeOverlay(marker);
      });
      this.positionMarkers = [];
      const tripId = this.route.snapshot.paramMap.get('tripId');
      const updatedTrip = this.tripForm.value;
      this.tripService.updateTrip(tripId, updatedTrip).subscribe(
        (response) => {
          this.router.navigate(['/trip']);
        },
        (error) => {
          // Handle error
        }
      );
    }
  }
}
