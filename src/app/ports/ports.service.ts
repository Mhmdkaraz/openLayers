import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortsClient } from './ports.client';
@Injectable()
export class PortsService {
  constructor(private portsClient: PortsClient) {}
  public getPortsData(): Observable<any[]> {
    return this.portsClient.getPortsData();
  }
}
