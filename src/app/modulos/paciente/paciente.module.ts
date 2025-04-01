import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { BDITestComponent } from './tests/bdi-test/bdi-test.component';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Dsm5TestComponent } from './tests/dsm5-test/dsm5-test.component';
import { EtraTestComponent } from './tests/etra-test/etra-test.component';
import { PbqTestComponent } from './tests/pbq-test/pbq-test.component';
import { VistaModuloComponent } from './vista-modulo/vista-modulo.component';
import { AutoestimaTestComponent } from './tests/autoestima-test/autoestima-test.component';
import { YsqTestComponent } from './tests/ysq-test/ysq-test.component';
import { BaiTestComponent } from './tests/bai-test/bai-test.component';
import { VistaEvaluacionComponent } from './vista-evaluacion/vista-evaluacion.component';


@NgModule({
  declarations: [
    DashboardPacienteComponent,
    BDITestComponent,
    Dsm5TestComponent,
    EtraTestComponent,
    PbqTestComponent,
    YsqTestComponent,
    BaiTestComponent,
    AutoestimaTestComponent,
    VistaModuloComponent,
    VistaEvaluacionComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FormsModule,
    BaseChartDirective,
    
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PacienteModule { }
