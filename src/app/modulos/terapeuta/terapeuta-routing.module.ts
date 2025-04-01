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
import { PerfilPacienteTerapeutaComponent } from './pacientes/perfil-paciente-terapeuta/perfil-paciente-terapeuta.component';
import { AsignarModulosComponent } from './modulos-psicoeducativos/asignar-modulos/asignar-modulos.component';
import { verificadorSesionGuard } from '../../guardianes/verificador-sesion.guard';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardTerapeutaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'mis-pacientes',
    component : ListarPacientesTerapeutaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'agregar-consulta/:id',
    component : AgregarConsultaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'editar-consulta/:id',
    component : EditarConsultaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'listar-consulta',
    component : ListarConsultaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'agregar-nota-clinica/:id',
    component : AgregarNotaClinicaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'editar-nota-clinica/:id',
    component : EditarNotaClinicaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'listar-nota-clinica',
    component : ListarNotaClinicaComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'asignar-ejercicios/:id',
    component : AsignarEjerciciosComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'asignar-modulos/:id',
    component : AsignarModulosComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path : 'perfil-paciente/:id',
    component : PerfilPacienteTerapeutaComponent,
    canActivate: [verificadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapeutaRoutingModule { }
