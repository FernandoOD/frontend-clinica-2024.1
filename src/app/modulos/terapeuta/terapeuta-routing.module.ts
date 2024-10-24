import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTerapeutaComponent } from './dashboard-terapeuta/dashboard-terapeuta.component';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardTerapeutaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapeutaRoutingModule { }
