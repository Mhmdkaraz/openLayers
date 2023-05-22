import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventsDataService } from './events-data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  status: string[] = [];
  port: string[] = [];
  date: Date | null = null;

  eventStatusOptions: string[] = ['FEEDBACK', 'SOLVED', 'NEW', 'PROCESSING'];
  portOptions: string[] = ['USLAX', 'CNSHA', 'USLGB', 'USOAK'];
  statuses: string[] = ['FEEDBACK', 'SOLVED', 'NEW', 'PROCESSING'];

  displayedColumns: string[] = [
    'EVENT_ID',
    'EVENT_STATUS',
    'SHORT_DESCRIPTION',
    'INSERT_DATE',
    'COLD_IRONING_PORT',
    'SAILING_TO_ETA',
    'SAILING_TO',
    'EOSP_PORT',
  ];
  eventStatusCounts: any[] = [];
  portNameCounts: any[] = [];
  constructor(private eventsDataService: EventsDataService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit() {
    this.getEventsData();
  }
  public getEventsData() {
    this.eventsDataService
      .fetchEventsData(this.status.join(','), this.port.join(','), this.date)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.eventStatusCounts =
          this.eventsDataService.calculateEventStatusCounts(data);
        this.portNameCounts = this.eventsDataService.calculateNumberPorts(data);
      });
  }

  public applyFilter() {
    this.getEventsData();
  }
}
