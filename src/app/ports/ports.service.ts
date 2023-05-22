import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PortsClient } from './ports.client';
@Injectable()
export class PortsService {
  private portsData: any[] = [];
  private portsDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor(private portsClient: PortsClient) {}

  public getPortsData() {
    console.log('getData');
    this.portsClient.getPortsData().subscribe((data) => {
      // console.log(data);
      this.portsData = data;
      this.portsDataSubject.next(data);
    });
  }

  public getPortsDataObservable(): Observable<any[]> {
    return this.portsDataSubject.asObservable();
  }
}
