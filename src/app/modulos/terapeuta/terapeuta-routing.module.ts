import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTerapeutaComponent } from './dashboard-terapeuta/dashboard-terapeuta.component';
import { AgregarConsultaComponent } from './consultas/agregar-consulta/agregar-consulta.component';
import { EditarConsultaComponent } from './consultas/editar-consulta/editar-consulta.component';
import { ListarConsultaComponent } from './consultas/listar-consulta/listar-consulta.component';
import { AgregarNotaClinicaComponent } from './notas-clinicas/agregar-nota-clinica/agregar-nota-clinica.component';
import { EditarNotaClinicaComponent } from './notas-clinicas/editar-nota-clinica/editar-nota-clinica.component';
import { ListarNotaClinicaComponent } from './notas-clinicas/listar-nota-clinica/listar-nota-clinica.component';
import { ListarPacientesTerapeutaComponent } from './pacientes/listar-pacientes-terapeuta/listar-pacientes-terapeuta.component';
import { AsignarEjerciciosComponent } from './ejercicios-practicos/asignar-ejercicios/asignar-ejercicios.component';

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
    path : 'editar-consulta/:id',
    component : EditarConsultaComponent
  },
  {
    path : 'listar-consulta',
    component : ListarConsultaComponent
  },
  {
    path : 'agregar-nota-clinica/:id',
    component : AgregarNotaClinicaComponent
  },
  {
    path : 'editar-nota-clinica/:id',
    component : EditarNotaClinicaComponent
  },
  {
    path : 'listar-nota-clinica',
    component : ListarNotaClinicaComponent
  },
  {
    path : 'asignar-ejercicios/:id',
    component : AsignarEjerciciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapeutaRoutingModule { }
