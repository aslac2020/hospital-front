import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultStatus } from 'src/app/model/ConsultStatus';
import { Consultant } from 'src/app/model/Consultant';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['namePatient', 'nameDoctor', 'specialities', 'room', 'status', 'dataConsult', 'actions'];
  consults: Consultant[] = [];
  dataSource = new MatTableDataSource<Consultant>;
  frmConsultant!: FormGroup;
  status!: String;
  constructor(
    private formBuilder: FormBuilder,
    private hospitalApi: HospitalService

  ) { }

  ngOnInit(): void {
    this.getAllConsults();
  }


  createFormBlank() {
    this.frmConsultant = this.formBuilder.group({
      namePatient: ['', [Validators.required]],
      nameDoctor: ['', [Validators.required]],
      specialities: [''],
      room: [''],
      status: ['']
    })
  }

  getAllConsults() {
    const result = this.hospitalApi.getAllConsults()
      .subscribe(
        {
          next: (data: Consultant[] | any) => {
            let result = this.consults = data;
            this.statusConsult(data);
            this.dataSource = new MatTableDataSource(result);
          }
        }
      )
  }

  statusConsult(data: Consultant[]) {
    const result = data.forEach(dataResult => {
      if(dataResult.isPatientToken == true) {
        dataResult.status = ConsultStatus.FazendoFicha
        this.getColor(ConsultStatus.FazendoFicha)
      }
      if(dataResult.isPatientRoomSorting == true) {
        dataResult.status = ConsultStatus.SalaTriagem
        this.getColor(ConsultStatus.SalaTriagem)
      }

    })
  }

  getColor(color: string | any) {
    if(color == ConsultStatus.FazendoFicha ){
      return color = 'blue'
    }
    if(color == ConsultStatus.SalaTriagem){
      return color = 'green'
    }
    return null
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
