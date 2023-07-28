import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalDate } from '@js-joda/core';
import { ConsultStatus } from 'src/app/model/ConsultStatus';
import { Consultant } from 'src/app/model/Consultant';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['namePatient', 'nameDoctor', 'specialities', 'room', 'status', 'dataConsult', 'isPreferential', 'actions'];
  consults: Consultant[] = [];
  dataSource = new MatTableDataSource<Consultant>;
  frmConsultant!: FormGroup;
  status!: String;
  datas: LocalDate[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalApi: HospitalService,
    private router: Router,
    private alertService: AlertDialogService,
    private snackBar: MatSnackBar

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
          next: (data: Consultant[]) => {
            this.consults = data;
            this.statusConsult(data);
            this.dataSource = new MatTableDataSource(this.consults);
          }
        }
      )
  }


  statusConsult(data: Consultant[]) {
    const result = data.forEach(dataResult => {
      if (dataResult.isPatientToken == true) {
        dataResult.status = ConsultStatus.FazendoFicha
        this.getColor(ConsultStatus.FazendoFicha)
      }
      if (dataResult.isPatientRoomSorting == true) {
        dataResult.status = ConsultStatus.SalaTriagem
        this.getColor(ConsultStatus.SalaTriagem)
      }
      if(dataResult.isPatientWaitingClinic == true){
        dataResult.status = ConsultStatus.AguardandoConsulta
        this.getColor(ConsultStatus.AguardandoConsulta)
      }

    })
  }

  getColor(color: string | any) {
    if (color == ConsultStatus.FazendoFicha) {
      return color = 'blue'
    }
    if (color == ConsultStatus.SalaTriagem) {
      return color = 'green'
    }
    if (color == ConsultStatus.AguardandoConsulta) {
      return color = 'red'
    }
    return null
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nextPageConsult() {
    this.router.navigate(['/consulta'])
  }

  updateConsult(id: number | any) {
    this.router.navigate(['/consulta/', id]);
  }

  deleteConsult(id: number | any) {

    this.alertService.openDialog("Deseja excluir essa consulta ?")
      .afterClosed().subscribe((res => {
        if (res == true) {
          this.hospitalApi.deleteConsultant(id).subscribe(
            {
              next: (data: Consultant) => {
                console.log(data)
                this.openSnackBar("Consulta excluida com sucesso :)")
                this.getAllConsults();
              },

            }
          )
        }
        this.alertService.close()
      }))
  }

  viewConsult(id: number) {
    this.router.navigate(['/consultas/', id]);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }


}
