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
import { verificadorTerapeutaGuard } from '../../guardianes/verificador-terapeuta.guard';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardTerapeutaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'mis-pacientes',
    component : ListarPacientesTerapeutaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'agregar-consulta/:id',
    component : AgregarConsultaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'editar-consulta/:id',
    component : EditarConsultaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'listar-consulta',
    component : ListarConsultaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'agregar-nota-clinica/:id',
    component : AgregarNotaClinicaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'editar-nota-clinica/:id',
    component : EditarNotaClinicaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'listar-nota-clinica',
    component : ListarNotaClinicaComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'asignar-ejercicios/:id',
    component : AsignarEjerciciosComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'asignar-modulos/:id',
    component : AsignarModulosComponent,
    canActivate: [verificadorTerapeutaGuard]
  },
  {
    path : 'perfil-paciente/:id',
    component : PerfilPacienteTerapeutaComponent,
    canActivate: [verificadorTerapeutaGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapeutaRoutingModule { }
