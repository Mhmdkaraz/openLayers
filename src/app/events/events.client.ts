import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Injectable()
export class EventsClient {
  private apiUrl = 'http://localhost:80';

  constructor(private http: HttpClient) {}

  // public getEventsData(): Observable<any[]> {
  //   const url = `${this.apiUrl}/events/get_events.php`;
  //   return this.http.get<any>(url);
  // }

  public fetchEventsData(
    status?: string,
    port?: string,
    date?: Date
  ): Observable<any[]> {
    const url = `${this.apiUrl}/api/get_events.php`;
    const Date = moment(date);
    console.log(Date);
    var formattedDate = Date.format('DD/MM/YYYY').toUpperCase();
    console.log('f1: ' + formattedDate);
    formattedDate = formattedDate === 'INVALID DATE' ? '' : formattedDate;
    console.log(formattedDate);
    const body = {
      status: status,
      port: port,
      date: formattedDate,
    };
    return this.http.post<any>(url, body);
  }
}
