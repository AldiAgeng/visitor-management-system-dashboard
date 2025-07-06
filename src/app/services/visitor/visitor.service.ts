import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = `${environment.baseUrl}/visitors`;

  constructor(private http: HttpClient) {}

  getVisitors(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getVisitor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createVisitor(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateVisitor(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deleteVisitor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
