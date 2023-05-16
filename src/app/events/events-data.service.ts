import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsClient } from './events.client';
@Injectable()
export class EventsDataService {
  constructor(private eventsClient: EventsClient) {}

  public calculateEventStatusCounts(data: any[]): any[] {
    const statusCounts = {};
    data.forEach((event) => {
      const status = event.EVENT_STATUS;
      if (statusCounts.hasOwnProperty(status)) {
        statusCounts[status]++;
      } else {
        statusCounts[status] = 1;
      }
    });
    return Object.entries(statusCounts);
  }

  public calculateNumberPorts(data: any[]): any[] {
    const portNameCount = {};
    data.forEach((event) => {
      const port = event.COLD_IRONING_PORT;
      if (portNameCount.hasOwnProperty(port)) {
        portNameCount[port]++;
      } else {
        portNameCount[port] = 1;
      }
    });
    return Object.entries(portNameCount);
  }
  // public getEventsData(): Observable<any[]> {
    // return this.eventsClient.getEventsData();
  // }
  public fetchEventsData(
    status?: string,
    port?: string,
    date?: Date
  ): Observable<any[]> {
    return this.eventsClient.fetchEventsData(status, port, date);
  }
}

