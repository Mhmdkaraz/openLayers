import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VesselsClient } from './vessels.client';

@Injectable()
export class VesselsService {
  private vesselsData: any[] = [];
  private vesselsDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

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

  public getVesselsDataObservable(): Observable<any[]> {
    return this.vesselsDataSubject.asObservable();
  }
  public deleteVessel(imoNumber: number): Observable<any> {
    return this.vesselsClient.deleteVessel(imoNumber);
  }
}
