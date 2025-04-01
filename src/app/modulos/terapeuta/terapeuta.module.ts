import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerapeutaRoutingModule } from './terapeuta-routing.module';
import { DashboardTerapeutaComponent } from './dashboard-terapeuta/dashboard-terapeuta.component';
import { AgregarConsultaComponent } from './consultas/agregar-consulta/agregar-consulta.component';
import { EditarConsultaComponent } from './consultas/editar-consulta/editar-consulta.component';
import { ListarConsultaComponent } from './consultas/listar-consulta/listar-consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AgregarNotaClinicaComponent } from './notas-clinicas/agregar-nota-clinica/agregar-nota-clinica.component';
import { EditarNotaClinicaComponent } from './notas-clinicas/editar-nota-clinica/editar-nota-clinica.component';
import { ListarNotaClinicaComponent } from './notas-clinicas/listar-nota-clinica/listar-nota-clinica.component';
import { ListarPacientesTerapeutaComponent } from './pacientes/listar-pacientes-terapeuta/listar-pacientes-terapeuta.component';
import { AsignarEjerciciosComponent } from './ejercicios-practicos/asignar-ejercicios/asignar-ejercicios.component';
import { PerfilPacienteTerapeutaComponent } from './pacientes/perfil-paciente-terapeuta/perfil-paciente-terapeuta.component';
import { AsignarModulosComponent } from './modulos-psicoeducativos/asignar-modulos/asignar-modulos.component';



@NgModule({
  declarations: [
    DashboardTerapeutaComponent,
    AgregarConsultaComponent,
    EditarConsultaComponent,
    ListarConsultaComponent,
    AgregarNotaClinicaComponent,
    EditarNotaClinicaComponent,
    ListarNotaClinicaComponent,
    ListarPacientesTerapeutaComponent,
    PerfilPacienteTerapeutaComponent,
    AsignarEjerciciosComponent,
    AsignarModulosComponent
  ],
  imports: [
    CommonModule,
    TerapeutaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TerapeutaModule { }
