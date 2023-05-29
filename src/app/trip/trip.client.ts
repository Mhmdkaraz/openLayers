import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from 'src/shared/trip.model';

@Injectable()
export class TripsClient {
  private apiUrl = 'http://localhost:80';
  constructor(private http: HttpClient) {}

  public sendTripData(trip: any): Observable<any> {
    const url = `${this.apiUrl}/api/add_trip.php`;
    return this.http.post<any>(url, trip);
  }
  public getTripsData(): Observable<any[]> {
    const url = `${this.apiUrl}/api/get_trips.php`;
    return this.http.get<any>(url);
  }
  public deleteTrip(tripId: number): Observable<any> {
    const url = `${this.apiUrl}/api/delete_trip.php`;
    return this.http.post<any>(url, { tripId });
  }
}
