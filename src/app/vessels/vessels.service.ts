import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VesselsClient } from './vessels.client';

@Injectable()
export class VesselsService {
  private vesselsData: any[] = [];
  private vesselsDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  private AvailableVesselsData: any[] = [];
  private AvailableVesselsDataSubject: BehaviorSubject<any[]> =
    new BehaviorSubject<any[]>([]);

  constructor(private vesselsClient: VesselsClient) {}

  public sendVesselsData(formData: any): Observable<any> {
    return this.vesselsClient.sendVesselsData(formData);
  }

  public getVesselsData() {
    this.vesselsClient.getVesselsData().subscribe((data) => {
      this.vesselsData = data;
      this.vesselsDataSubject.next(data);
    });
  }

  public getAvailableVesselsDataObservable(): Observable<any[]> {
    return this.AvailableVesselsDataSubject.asObservable();
  }
  public getAvailableVesselsData() {
    this.vesselsClient.getAvailableVesselsData().subscribe((data) => {
      this.AvailableVesselsData = data;
      this.AvailableVesselsDataSubject.next(data);
    });
  }

  public getVesselsDataObservable(): Observable<any[]> {
    return this.vesselsDataSubject.asObservable();
  }
  public deleteVessel(imoNumber: number): Observable<any> {
    return this.vesselsClient.deleteVessel(imoNumber);
  }
  public updateVessel(vessel: any): Observable<any> {
    return this.vesselsClient.updateVessel(vessel);
  }
}
