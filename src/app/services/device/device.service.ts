import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
private apiUrl = `${environment.baseUrl}/devices`;

  constructor(private http: HttpClient) {}

  getDevices(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDeviceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDevice(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateDevice(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteDevice(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
