import { Doctor } from './../../../model/Doctor';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Consultant } from 'src/app/model/Consultant';
import { Patient } from 'src/app/model/Patient';
import { Room } from 'src/app/model/Room';
import { HospitalService } from 'src/app/services/hospital.service';
import * as cpf from 'validation-br/dist/cpf'


@Component({
  selector: 'app-create-consults',
  templateUrl: './create-consults.component.html',
  styleUrls: ['./create-consults.component.css']
})
export class CreateConsultsComponent {
  formPatients!: FormGroup;
  formDoctors!: FormGroup;
  formRooms!: FormGroup;
  selectValueIsPreferential!: boolean;
  selectedValue!: string;
  doctors: Doctor[] = [];
  rooms: Room[] = [];
  doctorsNames: Doctor[] = [];
  numberRoom!: number;
  nameDoctor!: string;
  specialties!: string;
  crm!:string;
  doctorModel: Doctor | any;
  idDoctor!: number;
  idRoom!: number;
  isAvailable!: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private service: HospitalService,
    private  snackBar: MatSnackBar,
    private router: Router

  ) {
    this.createFormIsBlankPatient();
    this.createFormIsBlankDoctors();
    this.createFormIsBlankRooms();
  }

  createFormIsBlankPatient() {
    this.formPatients = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      cpf: ['', Validators.required],
      isPreferential: ['', Validators.required]
    })
  }

  createFormIsBlankDoctors() {
    this.formDoctors = this._formBuilder.group({
      id: [''],
      name: [''],
      crm: [''],
      specialties: [''],
    })
  }

  createFormIsBlankRooms() {
    this.formRooms = this._formBuilder.group({
      numberRoom: [''],
      isAvailable: ['']
    })
  }

  validateCpf(event: Event | any){
   var cpfDigited = event.target.value;
   console.log(cpfDigited)

    var cpfFormated = cpf.validate(cpfDigited);
    console.log(cpfFormated)

    cpfFormated ? this.openSnackBar("Cpf Válido") : this.openSnackBar("Cpf Inválido")
  }

  createConsult() {
    const patientForms = this.formPatients.getRawValue() as Patient;
    const doctorForms = this.formDoctors.getRawValue() as Doctor;
    const roomForms = this.formRooms.getRawValue() as Room;

    const newConsult = new Consultant();

    patientForms.isPreferential = this.selectValueIsPreferential;
    newConsult.patient = patientForms;

    doctorForms.id =  this.idDoctor;
    doctorForms.crm = this.crm;
    doctorForms.name = this.nameDoctor
    doctorForms.specialties = this.specialties;
    newConsult.doctor = doctorForms;

    roomForms.id = this.idRoom;
    roomForms.numberRoom = this.numberRoom;
    roomForms.isAvailable = this.isAvailable;
    newConsult.room = roomForms;

    newConsult.isPatientRoomClinic = false;
    newConsult.isPatientToken = true;
    newConsult.isPatientRoomMedication = false;
    newConsult.isPatientRoomSorting = false;

    console.log(newConsult);

    const createConsult = this.service.createConsult(newConsult).subscribe(
      {
        next: (data: Consultant) => {
          this.openSnackBar("Consulta cadastrada com sucesso :)");
          this.getAllRooms();
          this.router.navigate(['']);
        }
      }
    );
  }

  radioChange(event: Event | any) {
    this.selectValueIsPreferential = event.value;
  }

  getAllDoctors() {
    const result = this.service.getAllDoctors().subscribe({
      next: (data => {
        this.doctors = data;
        let unique = this.doctors.filter((doctor, i, arr) => arr.findIndex(t => t.specialties === doctor.specialties) === i)
        this.doctors = unique;
      })
    });
  }

  getAllRooms() {
    const result = this.service.getAllRooms().subscribe({
      next: (data => {
        this.rooms = data;
      })
    });
  }

  populateFormsDoctor(doctor: Doctor[] | any) {
      this.formDoctors.controls['crm'].setValue(doctor.crm);
  }

  valueSelectSpecialties(event: Event | any) {
    this.formDoctors.reset();
    var valueSelectSpecialties = event.value;
    this.specialties = valueSelectSpecialties;
    const result = this.service.getDoctorBySpecialties(valueSelectSpecialties).subscribe(
      {
        next: (data => {
          this.doctorsNames = data;
          this.nameDoctor = this.doctorsNames[0].name;
        })
      }
    )
  }

  valueSelectDoctorName(event: Event | any) {
    var valueSelectDoctorName = event.value;
    this.crm = valueSelectDoctorName['crm']
    this.idDoctor = valueSelectDoctorName['id']
    this.nameDoctor = valueSelectDoctorName['name']
    this.specialties = valueSelectDoctorName['specialties']
    this.populateFormsDoctor(valueSelectDoctorName);

  }

  valueSelectRoom(event: Event | any | number) {
    var valueSelectRoom = event.value;
    this.idRoom = valueSelectRoom['id'];
    this.numberRoom = valueSelectRoom['numberRoom'];
    this.isAvailable = valueSelectRoom['isAvailable']
  }

  selectionChangeSteps(event: Event | any) {
    let stepLabel = event.selectedStep.label;
    if (stepLabel == "Step 2") {
      this.getAllDoctors();
    }

    if (stepLabel == "Step 3") {
      this.getAllRooms();
    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000});
  }
}
