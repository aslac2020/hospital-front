import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultant } from '../model/Consultant';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  getAllConsults(): Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${API_URL}/consultas`);
  }
}
