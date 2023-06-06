import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TripsClient } from './trip.client';
import { Trip } from 'src/shared/trip.model';
@Injectable()
export class TripService {
  private tripsData: any[] = [];
  private tripsDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor(private tripsClient: TripsClient) {}

  public sendTripData(trip: any): Observable<any> {
    return this.tripsClient.sendTripData(trip);
  }
  public getTripsData() {
    this.tripsClient.getTripsData().subscribe((data) => {
      this.tripsData = data;
      this.tripsDataSubject.next(data);
    });
  }

  public getTripsDataObservable(): Observable<any[]> {
    return this.tripsDataSubject.asObservable();
  }
  public deleteTrip(tripId: number): Observable<any> {
    return this.tripsClient.deleteTrip(tripId);
  }
  public getTripDetails(tripId: any): Observable<any> {
    return this.tripsClient.getTripDetails(tripId);
  }
  public updateTrip(tripId: any, updatedTrip: any): Observable<any> {
    return this.tripsClient.updateTrip(tripId, updatedTrip);
  }
}
