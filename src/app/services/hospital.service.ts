import { Consultant } from 'src/app/model/Consultant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../model/Doctor';
import { Room } from '../model/Room';
import { environment } from 'src/environments/environment';
import { PatientHistory } from '../model/PatientHistory';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  getAllConsults(): Observable<Consultant[]>{
    return this.http.get<Consultant[]>(`${environment.apiUrl}/consultas`);
  }

  createConsult(consultas: Consultant): Observable<Consultant>{
    return this.http.post<Consultant>(`${environment.apiUrl}/consultas`, consultas);
  }

  getAllDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${environment.apiUrl}/medicos`);
  }

  getDoctorBySpecialties(specialties: String): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${environment.apiUrl}/medicos/${specialties}`);
  }

  getAllRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${environment.apiUrl}/salas`);
  }

  getDoctorByCrm(crm: string): Observable<Doctor>{
    return this.http.get<Doctor>(`${environment.apiUrl}/medicos/crm/${crm}`);
  }

  getDoctorByName(name: string): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${environment.apiUrl}/medicos/name/${name}`);
  }

  getConsultsById(id: number): Observable<Consultant>{
    return this.http.get<Consultant>(`${environment.apiUrl}/consultas/${id}`)
  }

  updateConsultant(id: number, consult: Consultant): Observable<Consultant>{
    console.log(consult)
    return this.http.put<Consultant>(`${environment.apiUrl}/consultas/${id}`,consult);
  }

  deleteConsultant(id: number): Observable<Consultant>{
    return this.http.delete<Consultant>(`${environment.apiUrl}/consultas/${id}`);
  }

  getOrderConsult(): Observable<Consultant>{
    return this.http.get<Consultant>(`${environment.apiUrl}/consultas/paciente`)
  }

  callPatient(consult: Consultant): Observable<Consultant>{
    return this.http.post<Consultant>(`${environment.apiUrl}/translate`, consult);
  }

  doctorCallPatient(): Observable<Consultant>{
    return this.http.get<Consultant>(`${environment.apiUrl}/consultas/consultorio/paciente`);
  }

  createPatientHistory(patientHistory: PatientHistory): Observable<PatientHistory>{
    return this.http.post<PatientHistory>(`${environment.apiUrl}/paciente/historico`, patientHistory);

  }

}
