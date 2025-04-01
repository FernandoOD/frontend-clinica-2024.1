import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { BDITestComponent } from './tests/bdi-test/bdi-test.component';
import { EtraTestComponent } from './tests/etra-test/etra-test.component';
import { PbqTestComponent } from './tests/pbq-test/pbq-test.component';
import { Dsm5TestComponent } from './tests/dsm5-test/dsm5-test.component';
import { VistaModuloComponent } from './vista-modulo/vista-modulo.component';
import { AutoestimaTestComponent } from './tests/autoestima-test/autoestima-test.component';
import { YsqTestComponent } from './tests/ysq-test/ysq-test.component';
import { BaiTestComponent } from './tests/bai-test/bai-test.component';
import { VistaEvaluacionComponent } from './vista-evaluacion/vista-evaluacion.component';
import { verificadorSesionGuard } from '../../guardianes/verificador-sesion.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPacienteComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'BDI-test',
    component: BDITestComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'ETrA-test',
    component: EtraTestComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'PBQ-test',
    component: PbqTestComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'YSQ-test',
    component: YsqTestComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'BAI-test',
    component: BaiTestComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'DSM5-test',
    component: Dsm5TestComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'vista-modulo/:id',
    component: VistaModuloComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'vista-evaluacion/:id',
    component: VistaEvaluacionComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'Autoestima-test',
    component: AutoestimaTestComponent,
    canActivate: [verificadorSesionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
