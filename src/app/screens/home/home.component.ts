import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalApi: HospitalService,
    private router: Router

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
            this.consults = data;
            this.statusConsult(data);
            this.dataSource = new MatTableDataSource(this.consults);
          }
        }
      )
  }

  statusConsult(data: Consultant[]) {
    console.log(data)
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

  nextPageConsult(){
    this.router.navigate(['/consulta'])
  }


}
