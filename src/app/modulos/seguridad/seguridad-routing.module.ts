import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { verificadorSesionGuard } from '../../guardianes/verificador-sesion.guard';
import { verificadorNoSesionGuard } from '../../guardianes/verificador-no-sesion.guard';

const routes: Routes = [
  {
    path:'iniciar-sesion',
    component:IniciarSesionComponent,
    canActivate: [verificadorNoSesionGuard]
  },
  {
    path:'cerrar-sesion',
    component:CerrarSesionComponent,
    canActivate: [verificadorSesionGuard]
  },
  {
    path:'cambiar-clave',
    component:CambiarClaveComponent,
    canActivate: [verificadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
