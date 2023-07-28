import { EditConsultsComponent } from './screens/consults/edit-consults/edit-consults.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { HomeComponent } from './screens/home/home.component';
import { CreateConsultsComponent } from './screens/consults/create-consults/create-consults.component';
import { ViewConsultsComponent } from './screens/consults/view-consults/view-consults.component';
import { RoomAvaliateComponent } from './screens/roomavaliate/room-avaliate.component';

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
    path: 'consultas/:id',
    component: ViewConsultsComponent
  },
  {
    path: 'consulta/:id',
    component: EditConsultsComponent
  },
  {
    path: 'pacientes/avaliacao',
    component: RoomAvaliateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
