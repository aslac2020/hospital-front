import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Consultant } from 'src/app/model/Consultant';
import { Patient } from 'src/app/model/Patient';
import { PatientHistory } from 'src/app/model/PatientHistory';
import { RoomAvaliate } from 'src/app/model/RoomAvaliate';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-consults-patient',
  templateUrl: './consults-patient.component.html',
  styleUrls: ['./consults-patient.component.css']
})
export class ConsultsPatientComponent {
  formViewPatient!: FormGroup;
  formViewCheckup!: FormGroup;
  formMedicalRecord!: FormGroup;
  valueInputLevelgravities!: string;
  isVisibleObservation: boolean = false;
  consult!: Consultant;
  isCertificate: boolean = false;
  favoriteSeason!: string;
  listExams: string[] = [];
  examsPrescribedData = [
    { id: 1, name: 'Hemograma', isChecked: false },
    { id: 2, name: 'Ultrassonagrafia' },
    { id: 3, name: 'Exame de Urina/Fezes' },
    { id: 4, name: 'Eletrocardiograma' },
    { id: 5, name: 'Radiografia' },
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createFormIsBlankPatient();
    this.createFormCheckupPatient();
    this.createFormMedicalRecord();
  }

  ngOnInit() {
    this.getPatientFirstConsult()
  }

  createFormIsBlankPatient() {
    this.formViewPatient = this._formBuilder.group({
      name: [''],
      lastName: [''],
      age: [''],
    })
  }

  createFormCheckupPatient() {
    this.formViewCheckup = this._formBuilder.group({
      pressureBlood: [''],
      temperature: [''],
      saturation: [''],
      meditionDiabetes: [''],
      observation: [''],
      levelGravities: ['']
    }
    )

  }

  createFormMedicalRecord() {
    this.formMedicalRecord = this._formBuilder.group({
      prescriton: [''],
      examsPrescribed: [''],
      medications: [''],
      isCertificate: [''],
      resultsExams: [''],
      dataConsult: ['']
    }
    )

  }

  getPatientFirstConsult() {
    this.hospitalService.doctorCallPatient().subscribe(
      (
        {
          next: (data: Consultant) => {
            data.isPatientWaitingClinic = false;
            data.isPatientRoomClinic = true;
            this.consult = data;
            console.log(this.consult)
            this.populateFormsPatient(this.consult.patient);
            this.populateFormsCheckupPatient(this.consult.roomAvaliate);
            this.populateInputClassifiedRisk(this.consult.roomAvaliate.levelGravities);
            this.isVisibleInputObservation(this.consult.roomAvaliate.observation)
          }
        }
      )
    )
  }

  populateFormsPatient(datePatient: Patient) {
    this.formViewPatient.controls['name'].setValue(datePatient.name);
    this.formViewPatient.controls['lastName'].setValue(datePatient.lastName);
    this.formViewPatient.controls['age'].setValue(datePatient.age);
  }

  populateFormsCheckupPatient(dateCheckupPatient: RoomAvaliate) {
    this.formViewCheckup.controls['pressureBlood'].setValue(dateCheckupPatient.pressureBlood);
    this.formViewCheckup.controls['temperature'].setValue(dateCheckupPatient.temperature);
    this.formViewCheckup.controls['saturation'].setValue(dateCheckupPatient.saturation);
    this.formViewCheckup.controls['meditionDiabetes'].setValue(dateCheckupPatient.meditionDiabetes);
    this.formViewCheckup.controls['observation'].setValue(dateCheckupPatient.observation);
    this.formViewCheckup.controls['levelGravities'].setValue(dateCheckupPatient.levelGravities);
  }

  populateInputClassifiedRisk(statusRisk: string) {
    switch (statusRisk) {
      case 'NOT_URGENT':
        this.valueInputLevelgravities = 'Não Urgência'
        break;
      case 'LITTLE_URGENT':
        this.valueInputLevelgravities = 'Pouca Urgência'
        break;
      case 'URGENT':
        this.valueInputLevelgravities = 'Urgência'
        break;
      case 'EMERGENCY':
        this.valueInputLevelgravities = 'Emergência'
        break;
    }
  }

  isVisibleInputObservation(observation: string) {
    console.log(observation)
    if (observation == null) {
      this.isVisibleObservation = true;
    } else {
      this.isVisibleObservation = false;
    }
  }

  getCallPatient(data: Consultant) {
    this.hospitalService.callPatient(data).subscribe(
      (
        {
          next: (data: Consultant) => { console.log(data) }
        }
      )
    )
  }

  onChange(event: Event | any) {
    let total = 0;
    if (event.target.checked) {
      this.listExams.push(event.target.value)
      console.log(this.listExams);
    } else {
      let index = this.listExams.indexOf(event.target.value);
      this.listExams.splice(index, 1);
    }
  }

  radioChange(event: Event | any) {
    this.isCertificate = event.value;
  }

  getInfoForms() {
    var valueFormMedicalRecord = this.formMedicalRecord.getRawValue() as PatientHistory;
    valueFormMedicalRecord.examsPrescribed = this.listExams;
    valueFormMedicalRecord.isCertificate = this.isCertificate;
    valueFormMedicalRecord.dataConsult = this.consult.dateConsult;
    valueFormMedicalRecord.patient = this.consult.patient;
    valueFormMedicalRecord.patient = this.consult.patient;
    this.saveConsultRecordPatient(valueFormMedicalRecord);
  }

  saveConsultRecordPatient(patientHistory: PatientHistory) {
    var updateConsult = new Consultant();
    updateConsult.id = this.consult.id;
    updateConsult.isPatientRoomClinic = this.consult.isPatientRoomClinic;
    updateConsult.isPatientRoomSorting = this.consult.isPatientRoomSorting;
    updateConsult.isPatientWaitingClinic = true;
    updateConsult.isPatientToken = this.consult.isPatientToken;
    updateConsult.patient = this.consult.patient;
    updateConsult.room = this.consult.room;
    updateConsult.doctor = this.consult.doctor;
    updateConsult.roomAvaliate = this.consult.roomAvaliate;
    updateConsult.patientHistory = patientHistory;

    this.hospitalService.updateConsultant(this.consult.id, updateConsult).subscribe(
      (
        {
          next: (data: Consultant) => {
            this.openSnackBar("Informações gravadas com suceso");
            this.router.navigate(['']);
          }
        }
      )
    )
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

}
