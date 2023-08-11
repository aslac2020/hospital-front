import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consultant } from 'src/app/model/Consultant';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-consults-patient',
  templateUrl: './consults-patient.component.html',
  styleUrls: ['./consults-patient.component.css']
})
export class ConsultsPatientComponent {
  formViewPatient!: FormGroup;
  formViewAvaliate!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private hospitalService: HospitalService
  ) {
    this.createFormIsBlankPatient();
    this.createFormSortingBlankPatient();
  }

  ngOnInit() {
    this.getPatientFirstConsult()
  }

  createFormIsBlankPatient() {
    this.formViewPatient = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
    })
  }

  createFormSortingBlankPatient() {
    this.formViewAvaliate = this._formBuilder.group({
      pressureBlood: [''],
      temperature: [''],
      saturation: [''],
      meditionDiabetes: [''],
      observation: [''],
      levelGravities: ['']
    }
    )

  }


  populateFormsPatient() {
  }

  getPatientFirstConsult() {
    this.hospitalService.doctorCallPatient().subscribe(
      (
        {
          next: (data: Consultant) => {
            data.isPatientWaitingClinic = false;
            data.isPatientRoomClinic = true;
           this.hospitalService.callPatient(data).subscribe(
            (
              {
                next: (data: Consultant) => {console.log(data)}
              }
            )
           )
          }
        }
      )
    )
  }
}
