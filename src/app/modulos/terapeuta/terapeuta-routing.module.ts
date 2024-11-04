import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTerapeutaComponent } from './dashboard-terapeuta/dashboard-terapeuta.component';
import { AgregarConsultaComponent } from './consultas/agregar-consulta/agregar-consulta.component';
import { EditarConsultaComponent } from './consultas/editar-consulta/editar-consulta.component';
import { ListarConsultaComponent } from './consultas/listar-consulta/listar-consulta.component';
import { AgregarNotaClinicaComponent } from './notas-clinicas/agregar-nota-clinica/agregar-nota-clinica.component';
import { EditarNotaClinicaComponent } from './notas-clinicas/editar-nota-clinica/editar-nota-clinica.component';
import { ListarNotaClinicaComponent } from './notas-clinicas/listar-nota-clinica/listar-nota-clinica.component';
import { AgregarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/agregar-modulo-psicoeducativo/agregar-modulo-psicoeducativo.component';
import { EditarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/editar-modulo-psicoeducativo/editar-modulo-psicoeducativo.component';
import { ListarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/listar-modulo-psicoeducativo/listar-modulo-psicoeducativo.component';
import { AgregarEjercicioComponent } from './ejercicios-practicos/agregar-ejercicio/agregar-ejercicio.component';
import { EditarEjercicioComponent } from './ejercicios-practicos/editar-ejercicio/editar-ejercicio.component';
import { ListarEjercicioComponent } from './ejercicios-practicos/listar-ejercicio/listar-ejercicio.component';
import { ListarPacienteComponent } from '../administrador/pacientes/listar-paciente/listar-paciente.component';
import { ListarPacientesTerapeutaComponent } from './pacientes/listar-pacientes-terapeuta/listar-pacientes-terapeuta.component';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardTerapeutaComponent
  },
  {
    path : 'mis-pacientes',
    component : ListarPacientesTerapeutaComponent
  },
  {
    path : 'agregar-consulta/:id',
    component : AgregarConsultaComponent
  },
  {
    path : 'editar-consulta',
    component : EditarConsultaComponent
  },
  {
    path : 'listar-consulta',
    component : ListarConsultaComponent
  },
  {
    path : 'agregar-nota-clinica',
    component : AgregarNotaClinicaComponent
  },
  {
    path : 'editar-nota-clinica',
    component : EditarNotaClinicaComponent
  },
  {
    path : 'listar-nota-clinica',
    component : ListarNotaClinicaComponent
  },
  {
    path : 'agregar-modulo-psicoeducativo',
    component : AgregarModuloPsicoeducativoComponent
  },
  {
    path : 'editar-modulo-psicoeducativo',
    component : EditarModuloPsicoeducativoComponent
  },
  {
    path : 'listar-modulo-psicoeducativo',
    component : ListarModuloPsicoeducativoComponent
  },
  {
    path : 'agregar-ejercicio-practico',
    component : AgregarEjercicioComponent
  },
  {
    path : 'editar-ejercicio-practico',
    component : EditarEjercicioComponent
  },
  {
    path : 'listar-ejercicio-practico',
    component : ListarEjercicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapeutaRoutingModule { }
