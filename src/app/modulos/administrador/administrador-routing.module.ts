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
import { AgregarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/agregar-modulo-psicoeducativo/agregar-modulo-psicoeducativo.component';
import { EditarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/editar-modulo-psicoeducativo/editar-modulo-psicoeducativo.component';
import { ListarModuloPsicoeducativoComponent } from './modulos-psicoeducativos/listar-modulo-psicoeducativo/listar-modulo-psicoeducativo.component';
import { AgregarEjercicioPracticoComponent } from './ejercicios-practicos/agregar-ejercicio-practico/agregar-ejercicio-practico.component';
import { ListarEjercicioPracticoComponent } from './ejercicios-practicos/listar-ejercicio-practico/listar-ejercicio-practico.component';
import { verificadorAdministradorGuard } from '../../guardianes/verificador-administrador.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardVistaComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'agregar-paciente',
    component: AgregarPacienteComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'editar-paciente/:id',
    component: EditarPacienteComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'listar-paciente',
    component: ListarPacienteComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'agregar-terapeuta',
    component: AgregarTerapeutaComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'editar-terapeuta/:id',
    component: EditarTerapeutaComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'listar-terapeuta',
    component: ListarTerapeutaComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'agregar-test-psicometrico',
    component: AgregarTestPsicometricoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'editar-test-psicometrico/:id',
    component: EditarTestPsicometricoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'listar-test-psicometrico',
    component: ListarTestPsicometricoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'agregar-modulo-psicoeducativo',
    component: AgregarModuloPsicoeducativoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'editar-modulo-psicoeducativo/:id',
    component: EditarModuloPsicoeducativoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path: 'listar-modulo-psicoeducativo',
    component: ListarModuloPsicoeducativoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path : 'agregar-ejercicio-practico',
    component : AgregarEjercicioPracticoComponent,
    canActivate: [verificadorAdministradorGuard]
  },
  {
    path : 'listar-ejercicio-practico',
    component : ListarEjercicioPracticoComponent,
    canActivate: [verificadorAdministradorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
