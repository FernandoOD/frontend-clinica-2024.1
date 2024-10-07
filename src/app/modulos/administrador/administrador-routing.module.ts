import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardVistaComponent } from './dashboard-vista/dashboard-vista.component';
import { AgregarPacienteComponent } from './pacientes/agregar-paciente/agregar-paciente.component';
import { EditarPacienteComponent } from './pacientes/editar-paciente/editar-paciente.component';
import { ListarPacienteComponent } from './pacientes/listar-paciente/listar-paciente.component';
import { EliminarPacienteComponent } from './pacientes/eliminar-paciente/eliminar-paciente.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardVistaComponent
  },
  {
    path: 'agregar-paciente',
    component: AgregarPacienteComponent
  },
  {
    path: 'editar-paciente',
    component: EditarPacienteComponent
  },
  {
    path: 'listar-paciente',
    component: ListarPacienteComponent
  },
  {
    path: 'eliminar-paciente',
    component: EliminarPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
