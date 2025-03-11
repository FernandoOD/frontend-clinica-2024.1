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


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPacienteComponent,
  },
  {
    path: 'BDI-test',
    component: BDITestComponent,
  },
  {
    path: 'ETrA-test',
    component: EtraTestComponent,
  },
  {
    path: 'PBQ-test',
    component: PbqTestComponent,
  },
  {
    path: 'YSQ-test',
    component: YsqTestComponent,
  },
  {
    path: 'BAI-test',
    component: BaiTestComponent,
  },
  {
    path: 'DSM5-test',
    component: Dsm5TestComponent,
  },
  {
    path: 'vista-modulo/:id',
    component: VistaModuloComponent,
  },
  {
    path: 'Autoestima-test',
    component: AutoestimaTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
