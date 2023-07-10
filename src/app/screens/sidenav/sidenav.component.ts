import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  showFiller = false;

  constructor(private router: Router,){

  }

  navigateHome(){
    this.router.navigate([''])
  }


}
