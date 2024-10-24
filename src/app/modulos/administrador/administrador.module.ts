import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { DashboardVistaComponent } from './dashboard-vista/dashboard-vista.component';
import { AgregarPacienteComponent } from './pacientes/agregar-paciente/agregar-paciente.component';
import { EditarPacienteComponent } from './pacientes/editar-paciente/editar-paciente.component';
import { ListarPacienteComponent } from './pacientes/listar-paciente/listar-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarTerapeutaComponent } from './terapeutas/agregar-terapeuta/agregar-terapeuta.component';
import { EditarTerapeutaComponent } from './terapeutas/editar-terapeuta/editar-terapeuta.component';
import { ListarTerapeutaComponent } from './terapeutas/listar-terapeuta/listar-terapeuta.component';


@NgModule({
  declarations: [
    DashboardVistaComponent,
    AgregarPacienteComponent,
    EditarPacienteComponent,
    ListarPacienteComponent,
    AgregarTerapeutaComponent,
    EditarTerapeutaComponent,
    ListarTerapeutaComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdministradorModule { }
