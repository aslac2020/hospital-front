import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  showFiller = false;

  constructor(
    private router: Router,
    private alertService: AlertDialogService
    ){
  }

  navigateHome(){
    this.router.navigate([''])
  }

  openDialog(){
   this.router.navigate(['/doutor/paciente']);
  }


}
