import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class VesselsClient {
  private apiUrl = 'http://localhost:80';
  constructor(private http: HttpClient) {}

  public sendVesselsData(formData: any): Observable<any> {
    const url = `${this.apiUrl}/api/add_vessels.php`;
    return this.http.post<any>(url, formData);
  }

  public getVesselsData(): Observable<any[]> {
    const url = `${this.apiUrl}/api/get_vessels.php`;
    return this.http.get<any>(url);
  }
  public deleteVessel(imoNumber: number): Observable<any> {
    const url = `${this.apiUrl}/api/delete_vessel.php`;
    return this.http.post<any>(url, { imoNumber });
  }
}
