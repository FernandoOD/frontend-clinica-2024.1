import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerapeutaRoutingModule } from './terapeuta-routing.module';
import { DashboardTerapeutaComponent } from './dashboard-terapeuta/dashboard-terapeuta.component';
import { AgregarConsultaComponent } from './consultas/agregar-consulta/agregar-consulta.component';
import { EditarConsultaComponent } from './consultas/editar-consulta/editar-consulta.component';
import { ListarConsultaComponent } from './consultas/listar-consulta/listar-consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarEjercicioComponent } from './ejercicios-practicos/agregar-ejercicio/agregar-ejercicio.component';
import { EditarEjercicioComponent } from './ejercicios-practicos/editar-ejercicio/editar-ejercicio.component';
import { ListarEjercicioComponent } from './ejercicios-practicos/listar-ejercicio/listar-ejercicio.component';
import { AgregarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/agregar-modulo-psicoeducativo/agregar-modulo-psicoeducativo.component';
import { EditarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/editar-modulo-psicoeducativo/editar-modulo-psicoeducativo.component';
import { ListarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/listar-modulo-psicoeducativo/listar-modulo-psicoeducativo.component';
import { AgregarNotaClinicaComponent } from './notas-clinicas/agregar-nota-clinica/agregar-nota-clinica.component';
import { EditarNotaClinicaComponent } from './notas-clinicas/editar-nota-clinica/editar-nota-clinica.component';
import { ListarNotaClinicaComponent } from './notas-clinicas/listar-nota-clinica/listar-nota-clinica.component';
import { ListarPacientesTerapeutaComponent } from './pacientes/listar-pacientes-terapeuta/listar-pacientes-terapeuta.component';



@NgModule({
  declarations: [
    DashboardTerapeutaComponent,
    AgregarConsultaComponent,
    EditarConsultaComponent,
    ListarConsultaComponent,
    AgregarEjercicioComponent,
    EditarEjercicioComponent,
    ListarEjercicioComponent,
    AgregarModuloPsicoeducativoComponent,
    EditarModuloPsicoeducativoComponent,
    ListarModuloPsicoeducativoComponent,
    AgregarNotaClinicaComponent,
    EditarNotaClinicaComponent,
    ListarNotaClinicaComponent,
    ListarPacientesTerapeutaComponent
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
