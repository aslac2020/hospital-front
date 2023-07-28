import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultant } from 'src/app/model/Consultant';
import { Doctor } from 'src/app/model/Doctor';
import { Room } from 'src/app/model/Room';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-view-consults',
  templateUrl: './view-consults.component.html',
  styleUrls: ['./view-consults.component.css']
})
export class ViewConsultsComponent {
  formViewPatient!: FormGroup;
  formViewDoctor!: FormGroup;
  formViewRoom!: FormGroup;
  radioValue!: boolean;
  doctors: Doctor[] = [];
  doctorsNames: Doctor[] = [];
  selectValueRoom!: number;
  rooms: Room[] = [];
  nameDoctor!: string;
  idConsult!: number;

  constructor(
    private _formBuilder: FormBuilder,
    private service: HospitalService,
    private activatedRoute: ActivatedRoute,
    private router: Router

    ) {
      this.createFormIsBlankDoctors();
      this.createFormIsBlankPatient();
      this.createFormIsBlankRooms();
    }

    ngOnInit(): void {
      this.idConsult = this.activatedRoute.snapshot.params["id"];
      this.getConsultsById(this.idConsult);
    }


    createFormIsBlankPatient() {
      this.formViewPatient = this._formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        age: [''],
        cpf: ['', Validators.required],
        isPreferential: ['', Validators.required]
      })
    }

    createFormIsBlankDoctors() {
      this.formViewDoctor = this._formBuilder.group({
        name: [''],
        crm: [''],
        specialties: [''],
      })
    }

    createFormIsBlankRooms() {
      this.formViewRoom = this._formBuilder.group({
        numberRoom: [''],
        isAvailable: ['']
      })
    }


  getConsultsById(id: number) {
    this.service.getConsultsById(id).subscribe({
      next: (consult: Consultant) => {
        this.loadForm(consult);
      }
    })
  }

  loadForm(consultsData: Consultant) {

    this.radioValue = consultsData.patient.isPreferential;

    this.formViewPatient = this._formBuilder.group(
      {
        name: new FormControl({value: consultsData.patient.name, disabled: true}),
        lastName: new FormControl({value: consultsData.patient.lastName, disabled: true}),
        age:new FormControl({value: consultsData.patient.age, disabled: true}),
        cpf: new FormControl({value: consultsData.patient.cpf, disabled: true}),
        isPreferential: new FormControl({value: consultsData.patient.isPreferential, disabled: true}),
      }
    )
    this.formViewDoctor = this._formBuilder.group(
      {
        crm: new FormControl({value: consultsData.doctor.crm, disabled: true}),
        name: new FormControl({value: consultsData.doctor.name, disabled: true}),
        specialties: new FormControl({value: consultsData.doctor.specialties, disabled: true})
      }
    )

    this.formViewRoom = this._formBuilder.group(
      {
        numberRoom: new FormControl({value: consultsData.room.numberRoom, disabled: true}),
      }
    )
  }

  backHome(){
    this.router.navigate([''])
  }


}
