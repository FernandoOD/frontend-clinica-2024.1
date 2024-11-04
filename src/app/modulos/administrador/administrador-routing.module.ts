import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardVistaComponent } from './dashboard-vista/dashboard-vista.component';
import { AgregarPacienteComponent } from './pacientes/agregar-paciente/agregar-paciente.component';
import { EditarPacienteComponent } from './pacientes/editar-paciente/editar-paciente.component';
import { ListarPacienteComponent } from './pacientes/listar-paciente/listar-paciente.component';
import { AgregarTerapeutaComponent } from './terapeutas/agregar-terapeuta/agregar-terapeuta.component';
import { EditarTerapeutaComponent } from './terapeutas/editar-terapeuta/editar-terapeuta.component';
import { ListarTerapeutaComponent } from './terapeutas/listar-terapeuta/listar-terapeuta.component';
import { verificadorSesionGuard } from '../../guardianes/verificador-sesion.guard';
import { AgregarTestPsicometricoComponent } from './tests/agregar-test-psicometrico/agregar-test-psicometrico.component';
import { EditarTestPsicometricoComponent } from './tests/editar-test-psicometrico/editar-test-psicometrico.component';
import { ListarTestPsicometricoComponent } from './tests/listar-test-psicometrico/listar-test-psicometrico.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardVistaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'agregar-paciente',
    component: AgregarPacienteComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'editar-paciente/:id',
    component: EditarPacienteComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'listar-paciente',
    component: ListarPacienteComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'agregar-terapeuta',
    component: AgregarTerapeutaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'editar-terapeuta/:id',
    component: EditarTerapeutaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'listar-terapeuta',
    component: ListarTerapeutaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'agregar-test-psicometrico',
    component: AgregarTestPsicometricoComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'editar-test-psicometrico/:id',
    component: EditarTestPsicometricoComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'listar-test-psicometrico',
    component: ListarTestPsicometricoComponent,
    canActivate: [verificadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
