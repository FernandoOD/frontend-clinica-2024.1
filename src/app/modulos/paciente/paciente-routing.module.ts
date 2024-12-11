import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { BDITestComponent } from './tests/bdi-test/bdi-test.component';
import { EtraTestComponent } from './tests/etra-test/etra-test.component';
import { PbqTestComponent } from './tests/pbq-test/pbq-test.component';
import { Dsm5TestComponent } from './tests/dsm5-test/dsm5-test.component';


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
    path: 'ETRA-test',
    component: EtraTestComponent,
  },
  {
    path: 'PBQ-test',
    component: PbqTestComponent,
  },
  {
    path: 'DSM5-test',
    component: Dsm5TestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
