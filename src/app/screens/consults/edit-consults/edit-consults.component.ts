import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/model/Doctor';
import { Room } from 'src/app/model/Room';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-edit-consults',
  templateUrl: './edit-consults.component.html',
  styleUrls: ['./edit-consults.component.css']
})
export class EditConsultsComponent {
  formEditPatient!: FormGroup;
  formEditDoctor!: FormGroup;
  formEditRoom!: FormGroup;
  id: number = 0;
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
    private service: HospitalService){
    this.createFormIsBlankDoctors();
    this.createFormIsBlankPatient();
    this.createFormIsBlankRooms();
  }

  ngOnInit() {

  }

  createFormIsBlankPatient() {
    this.formEditPatient = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      cpf: ['', Validators.required],
      isPreferential: ['', Validators.required]
    })
  }

  createFormIsBlankDoctors() {
    this.formEditDoctor = this._formBuilder.group({
      id: [''],
      name: [''],
      crm: [''],
      specialties: [''],
    })
  }

  createFormIsBlankRooms() {
    this.formEditRoom = this._formBuilder.group({
      numberRoom: [''],
      isAvailable: ['']
    })
  }

  radioChange(event: Event | any){

  }

  selectionChangeSteps(event: Event | any) {
    let stepLabel = event.selectedStep.label;
    if (stepLabel == "Step 2") {
    }

    if (stepLabel == "Step 3") {
    }

  }

  valueSelectSpecialties(event: Event | any) {
    this.formEditDoctor.reset();
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
    //this.populateFormsDoctor(valueSelectDoctorName);

  }

  valueSelectRoom(event: Event | any | number) {
    var valueSelectRoom = event.value;
    this.idRoom = valueSelectRoom['id'];
    this.numberRoom = valueSelectRoom['numberRoom'];
    this.isAvailable = valueSelectRoom['isAvailable']
  }

  updateConsult(){

  }

}
