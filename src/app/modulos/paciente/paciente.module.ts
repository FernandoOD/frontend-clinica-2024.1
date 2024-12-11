import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { BDITestComponent } from './tests/bdi-test/bdi-test.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardPacienteComponent,
    BDITestComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FormsModule
  ]
})
export class PacienteModule { }
