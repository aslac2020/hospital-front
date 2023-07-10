import { Consultant } from 'src/app/model/Consultant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../model/Doctor';
import { Room } from '../model/Room';

const API_URL = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  getAllConsults(): Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${API_URL}/consultas`);
  }

  createConsult(consultas: Consultant): Observable<Consultant>{
    return this.http.post<Consultant>(`${API_URL}/consultas`, consultas);
  }

  getAllDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${API_URL}/medicos`);
  }

  getDoctorBySpecialties(specialties: String): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${API_URL}/medicos/${specialties}`);
  }

  getAllRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${API_URL}/salas`);
  }

  getDoctorByCrm(crm: string): Observable<Doctor>{
    return this.http.get<Doctor>(`${API_URL}/medicos/crm/${crm}`);
  }

  getDoctorByName(name: string): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${API_URL}/medicos/name/${name}`);
  }

  getConsultsById(id: number): Observable<Consultant>{
    return this.http.get<Consultant>(`${API_URL}/consultas/${id}`)
  }

}
