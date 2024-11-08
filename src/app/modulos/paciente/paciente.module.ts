import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';


@NgModule({
  declarations: [
    DashboardPacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule
  ]
})
export class PacienteModule { }
