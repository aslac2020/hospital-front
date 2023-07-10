import { EditConsultsComponent } from './screens/consults/edit-consults/edit-consults.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { HomeComponent } from './screens/home/home.component';
import { CreateConsultsComponent } from './screens/consults/create-consults/create-consults.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'consulta',
    component: CreateConsultsComponent
  },
  {
    path: 'consulta/:id',
    component: EditConsultsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
