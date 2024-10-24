import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPacienteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
