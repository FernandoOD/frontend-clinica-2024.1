import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerapeutaRoutingModule } from './terapeuta-routing.module';
import { DashboardTerapeutaComponent } from './dashboard-terapeuta/dashboard-terapeuta.component';



@NgModule({
  declarations: [
    DashboardTerapeutaComponent
  ],
  imports: [
    CommonModule,
    TerapeutaRoutingModule
  ]
})
export class TerapeutaModule { }
