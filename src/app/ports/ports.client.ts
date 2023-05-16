import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PortsClient {
  private apiUrl = 'http://localhost:80';
  constructor(private http: HttpClient) {}

  public getPortsData(): Observable<any[]> {
    const url = `${this.apiUrl}/api/get_ports.php`;
    return this.http.get<any>(url);
  }
}
