import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../model/Doctor';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChartServicesService {

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${environment.apiUrl}/medicos`);
  }
}
