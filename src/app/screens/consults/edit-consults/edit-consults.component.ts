import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consultant } from 'src/app/model/Consultant';
import { Doctor } from 'src/app/model/Doctor';
import { Patient } from 'src/app/model/Patient';
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
  idConsult: number = 0;
  selectValueIsPreferential!: boolean;
  selectedValue!: string;
  doctors: Doctor[] = [];
  rooms: Room[] = [];
  doctorsNames: Doctor[] = [];
  numberRoom!: number;
  nameDoctor!: string;
  specialties!: string;
  crm!:string;
  doctorModel!: Doctor ;
  idPatient!: number;
  idDoctor!: number;
  idRoom!: number;
  isAvailable!: boolean;
  radioValue!: boolean;
  selectValueSpecialtiesDoctor!: string;
  selectValueNameDoctor!: string;
  selectValueRoom!: number;

  constructor(
    private _formBuilder: FormBuilder,
    private service: HospitalService,
    private activatedRoute: ActivatedRoute){
    this.createFormIsBlankDoctors();
    this.createFormIsBlankPatient();
    this.createFormIsBlankRooms();
  }

  ngOnInit() {
   const IdConsult = this.idConsult = this.activatedRoute.snapshot.params['id'];
    this.getConsultsById(IdConsult);

  }

  createFormIsBlankPatient() {
    this.formEditPatient = this._formBuilder.group({
      id: [''],
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
    this.selectValueIsPreferential = event.value;
  }

  selectionChangeSteps(event: Event | any) {
    let stepLabel = event.selectedStep.label;
    if (stepLabel == "Step 2") {
      this.getAllDoctors();
      this.getAllDoctorByName();
    }

    if (stepLabel == "Step 3") {
      this.getAllRooms();
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
    this.selectValueNameDoctor = valueSelectDoctorName;
    const result = this.service.getDoctorByName(valueSelectDoctorName).subscribe(
      {
        next: (data: Doctor[]) => {
          this.populateUpdateFormsDoctor(data);
        }
      }
    )


  }

  valueSelectDoctorUpdateName(event: Event | any) {
    var valueSelectDoctorName = event.value;
    this.crm = valueSelectDoctorName['crm']
    this.idDoctor = valueSelectDoctorName['id']
    this.nameDoctor = valueSelectDoctorName['name']
    this.specialties = valueSelectDoctorName['specialties']
    this.populateUpdateFormsDoctor(valueSelectDoctorName);

  }


  valueSelectRoom(event: Event | any | number) {
    var valueSelectRoom = event.value;
    this.selectValueRoom = valueSelectRoom;
    this.idRoom = valueSelectRoom['id'];
    this.numberRoom = valueSelectRoom['numberRoom'];
    this.isAvailable = valueSelectRoom['isAvailable']
  }

  getConsultsById(id: number){
    this.service.getConsultsById(id).subscribe({
      next: (consult: Consultant) => {
        this.doctorModel = consult.doctor;
        this.populateFormsConsults(consult);
      }
    })
  }

  getAllDoctorByName(){
    const result = this.service.getDoctorByName(this.selectValueNameDoctor).subscribe(
      {
        next: (data: Doctor[]) => {
          console.log(data);
          this.doctorsNames = data;
        }
    })
  }

  getAllDoctors() {
    const result = this.service.getAllDoctors().subscribe({
      next: (data => {
        this.doctors = data;
        let uniqueSpecialties = this.doctors.filter((doctor, i, arr) => arr.findIndex(t => t.specialties === doctor.specialties) === i)
        this.doctors = uniqueSpecialties;
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

  populateUpdateFormsDoctor(doctor: Doctor[] | any){
    this.formEditDoctor.controls['crm'].setValue(doctor[0].crm);
  }

  populateFormsConsults(consultsData: Consultant){

    //Forms Patient
    this.idPatient = consultsData.patient.id
    //this.formEditPatient.controls['id'].setValue(consultsData.patient.id);
    this.formEditPatient.controls['name'].setValue(consultsData.patient.name);
    this.formEditPatient.controls['lastName'].setValue(consultsData.patient.lastName);
    this.formEditPatient.controls['cpf'].setValue(consultsData.patient.cpf);
    this.formEditPatient.controls['age'].setValue(consultsData.patient.age);
    this.radioValue = consultsData.patient.isPreferential;

    //Forms Doctor
    this.selectValueSpecialtiesDoctor = consultsData.doctor.specialties;
    this.selectValueNameDoctor = consultsData.doctor.name;
    this.selectValueRoom = consultsData.room.numberRoom;
    this.formEditDoctor.controls['crm'].setValue(consultsData.doctor.crm);
  }

  updateConsult(){
    const patientForms = this.formEditPatient.getRawValue() as Patient;
    const doctorForms = this.formEditDoctor.getRawValue() as Doctor;
    const roomForms = this.formEditRoom.getRawValue() as Room;



    const updateConsult = new Consultant();
    updateConsult.id = this.idConsult;

    patientForms.isPreferential = this.selectValueIsPreferential;
    patientForms.id = this.idPatient
    updateConsult.patient = patientForms;


    this.doctorModel.id = doctorForms.id;
    this.doctorModel.crm = doctorForms.crm;
    this.doctorModel.name = doctorForms.name;
    this.doctorModel.specialties = doctorForms.specialties;


    updateConsult.doctor = doctorForms
    console.log(doctorForms)



    // doctorForms.id = this.doctorModel.id ;
    // doctorForms.crm = this.doctorModel.crm;
    // doctorForms.name = this.doctorModel.name
    // doctorForms.specialties = this.doctorModel.specialties;
    // updateConsult.doctor = doctorForms;

    roomForms.id = this.idRoom;
    roomForms.numberRoom = this.numberRoom;
    roomForms.isAvailable = this.isAvailable;
    updateConsult.room = roomForms;

    updateConsult.isPatientRoomClinic = false;
    updateConsult.isPatientToken = true;
    updateConsult.isPatientRoomMedication = false;
    updateConsult.isPatientRoomSorting = false;

    //console.log(updateConsult);


  }



}
