import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PortsService } from './ports/ports.service';
import { VesselsService } from './vessels/vessels.service';
import { TripService } from './trip/trip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private portsService: PortsService,
    private vesselsService: VesselsService,
    private tripsService: TripService
  ) {}
  ngOnInit(): void {
    this.portsService.getPortsData();
    this.tripsService.getTripsData();
  }
}
