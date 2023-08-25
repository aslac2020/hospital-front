import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from 'src/app/model/Consultant';
import { Doctor } from 'src/app/model/Doctor';
import { Patient } from 'src/app/model/Patient';
import { Room } from 'src/app/model/Room';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { LocalDate } from '@js-joda/core';

@Component({
  selector: 'app-edit-consults',
  templateUrl: './edit-consults.component.html',
  styleUrls: ['./edit-consults.component.css']
})
export class EditConsultsComponent {
  formEditPatient!: FormGroup;
  formEditDoctor!: FormGroup;
  formEditRoom!: FormGroup;
  idConsult!: number;
  selectValueIsPreferential!: boolean;
  selectedValue!: string;
  doctors: Doctor[] = [];
  rooms: Room[] = [];
  doctorsNames: Doctor[] = [];
  numberRoom!: number;
  nameDoctor!: string;
  specialties!: string;
  crm!: string;
  doctorModel!: Doctor;
  idPatient!: number;
  idDoctor!: number;
  idRoom!: number;
  isAvailable!: boolean;
  radioValue!: boolean;
  selectValueSpecialtiesDoctor!: string;
  selectValueNameDoctor!: string;
  selectValueRoom!: number;
  idDoctorUpdate!: number;
  datas: LocalDate[] = [] ;

  constructor(
    private _formBuilder: FormBuilder,
    private service: HospitalService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertDialogService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
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

  radioChange(event: Event | any) {
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
    var valueSelectSpecialties = event.value;
    this.specialties = valueSelectSpecialties;
    const result = this.service.getDoctorBySpecialties(valueSelectSpecialties).subscribe(
      {
        next: (data => {
          this.doctorsNames = data;
          this.nameDoctor = this.doctorsNames[0].name;
          this.specialties = data[0].specialties;
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
          this.crm = data[0].crm;
          this.idDoctor = data[0].id;
          this.nameDoctor = data[0].name;
          this.specialties = data[0].specialties;
          this.populateUpdateFormsDoctor(data);
        }
      }
    )


  }

  valueSelectRoom(event: Event | any | number) {
    var valueSelectRoom = event.value;
    this.idRoom = valueSelectRoom;
  }

  getConsultsById(id: number) {
    this.service.getConsultsById(id).subscribe({
      next: (consult: Consultant) => {
        console.log(consult.patient.isPreferential)
        this.idPatient = consult.patient.id;
        this.nameDoctor = consult.doctor.name;
        this.idDoctor = consult.doctor.id;
        this.radioValue = consult.patient.isPreferential;
        this.idRoom = consult.room.id;
        this.idConsult = consult.id;
        this.loadForm(consult);
      }
    })
  }

  getAllDoctorByName() {
    const result = this.service.getDoctorByName(this.nameDoctor).subscribe(
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

  populateUpdateFormsDoctor(doctor: Doctor[] | any) {
    this.formEditDoctor.controls['crm'].setValue(doctor[0].crm);
  }

  loadForm(consultsData: Consultant) {

    this.formEditPatient = this._formBuilder.group(
      {
        name: [consultsData.patient.name],
        lastName: [consultsData.patient.lastName],
        age: [consultsData.patient.age],
        cpf: [consultsData.patient.cpf],
        isPreferential: [consultsData.patient.isPreferential]
      }
    )
    this.formEditDoctor = this._formBuilder.group(
      {
        id: [this.idDoctor],
        crm: [consultsData.doctor.crm],
        name: [consultsData.doctor.name],
        specialties: [consultsData.doctor.specialties]
      }
    )

    this.formEditRoom = this._formBuilder.group(
      {
        numberRoom: [consultsData.room.numberRoom],
        isAvailable: [consultsData.room.isAvailable]
      }
    )
  }

  populateFormsConsults(consultsData: Consultant) {

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

  updateConsult() {

    const patientForms = this.formEditPatient.getRawValue() as Patient;
    const doctorForms = this.formEditDoctor.getRawValue() as Doctor;
    const roomForms = this.formEditRoom.getRawValue() as Room;

    const updateConsult = new Consultant();
    updateConsult.id = this.idConsult;

    patientForms.isPreferential = this.radioValue;
    patientForms.id = this.idPatient
    updateConsult.patient = patientForms;

    doctorForms.id = this.idDoctor;
    updateConsult.doctor = doctorForms

    roomForms.id = this.idRoom;
    updateConsult.room = roomForms;

    updateConsult.isPatientRoomClinic = false;
    updateConsult.isPatientToken = true;
    updateConsult.isPatientRoomMedication = false;
    updateConsult.isPatientRoomSorting = false;


    this.alertService.openDialog("Confirma as alterações no paciente: " + patientForms.name + " ?")
      .afterClosed().subscribe((res) => {
        if (res == true) {
          this.service.updateConsultant(this.idConsult, updateConsult).subscribe(
            {
              next: (data: Consultant) => {
                this.openSnackBar("Consulta Atualizada com sucesso :)");
                this.router.navigate([''])
              }
            }
          )
        }
        this.alertService.close();
      })

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000});
  }



}
