import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Consultant } from 'src/app/model/Consultant';
import { Patient } from 'src/app/model/Patient';
import { RoomAvaliate } from 'src/app/model/RoomAvaliate';
import { HospitalService } from 'src/app/services/hospital.service';

export interface Gravities {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Gravities[];
}

@Component({
  selector: 'app-room-avaliate',
  templateUrl: './room-avaliate.component.html',
  styleUrls: ['./room-avaliate.component.css']
})
export class RoomAvaliateComponent {
  formAvaliatePatient!: FormGroup
  formSortingPatient!: FormGroup
  radioValue!: boolean;
  patient!: Patient;
  isVisiblePainel: boolean = false;
  consult!: Consultant;
  selectedValueGravities!: string;
  selectedValueRoomAvaliate!: RoomAvaliate;
  isMinusAge!: boolean ;
  isValuePressedBlood!: number;
  isValueMedicationDiabetes= 0.0;
  nivelGravities!: string;


 levelGravities: Gravities = {
  name: 'Indeterminate',
  completed: false,
  color: 'primary',
  subtasks: [
    {name: 'Green', completed: false, color: 'primary'},
    {name: 'Blue', completed: false, color: 'accent'},
    {name: 'Yellow', completed: false, color: 'warn'},
    {name: 'Red', completed: false, color: 'warn'},
  ],
 }

  constructor(
    private _formBuilder: FormBuilder,
    private service: HospitalService,
    private router: Router,
    private snackBar: MatSnackBar


  ) {
    this.createFormIsBlankPatient();
    this.createFormSortingBlankPatient();

  }

  ngOnInit(): void {
    this.getAllPatientsFirst();
    this.isValuePressedBlood = 25

  }

  createFormIsBlankPatient() {
    this.formAvaliatePatient = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      cpf: ['', Validators.required],
      isPreferential: ['', Validators.required]
    })
  }

  createFormSortingBlankPatient(){
    this.formSortingPatient = this._formBuilder.group({
      pressureBlood: [''],
      temperature: [''],
      saturation: [''],
      meditionDiabetes: [''],
      observation: [''],
      levelGravities: ['']
      }
    )

  }

  getAllPatientsFirst() {
    this.isMinusAge = false;

    this.service.getOrderConsult().subscribe(
      {
        next: (data: Consultant) => {
          if(data.patient.age < 10){
            this.isMinusAge = true;
            this.isValuePressedBlood = 0
          }
          this.populateFormsPatient(data);
          this.consult = data;
        }
      }
    )
  }

  populateFormsPatient(data: Consultant) {

    this.radioValue = data.patient.isPreferential;

    this.formAvaliatePatient = this._formBuilder.group(
      {
        name: new FormControl({ value: data.patient.name, disabled: true }),
        lastName: new FormControl({ value: data.patient.lastName, disabled: true }),
        age: new FormControl({ value: data.patient.age, disabled: true }),
        cpf: new FormControl({ value: data.patient.cpf, disabled: true }),
        isPreferential: new FormControl({ value: data.patient.isPreferential, disabled: true }),
      }
    )
  }

  getCallPatient(){
    this.service.callPatient(this.consult).subscribe(
      {
        next: (data: Consultant) => {
          if(this.isMinusAge == true){
            this.populateFormsRoomAvaliate();
           }
        }
      }
    )
  }

  openPanel(){
    this.isVisiblePainel = !this.isVisiblePainel;
    this.getCallPatient()
  }

  valueSelectGravities(event: Event | any) {
   this.selectedValueGravities = event.value
  }

  creteAvaliatePatient(){
   this.selectedValueRoomAvaliate = this.formSortingPatient.getRawValue() as RoomAvaliate;
    this.updateConsult(this.consult);
  }

  updateConsult(consult: Consultant){

    const updateConsult = new Consultant();
    const idConsult = updateConsult.id = consult.id;
    updateConsult.patient = consult.patient;
    updateConsult.doctor = consult.doctor;
    updateConsult.room = consult.room;

    updateConsult.roomAvaliate = this.selectedValueRoomAvaliate

    updateConsult.isPatientRoomClinic = false;
    updateConsult.isPatientToken = false;
    updateConsult.isPatientRoomMedication = false;
    updateConsult.isPatientRoomSorting = true;

   this.service.updateConsultant(idConsult, updateConsult).subscribe(
    {
      next: (data: Consultant) => {
        console.log(data)
        this.openSnackBar("Triagem realizada com sucesso");
        this.router.navigate(['']);
      }
    }
   )

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000});
  }

populateFormsRoomAvaliate(){
  this.formSortingPatient = this._formBuilder.group(
    {
      pressureBlood: [0.0],
      meditionDiabetes: [0.0],
      temperature: [''],
      observation: [''],
      saturation: ['']
    }
  )
}

radioChange(event: Event | any) {
  console.log(event.value)
  this.nivelGravities = event.value;
  console.log(this.nivelGravities)
}


}
