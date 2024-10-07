import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';

const routes: Routes = [
  {
    path:'iniciar-sesion',
    component:IniciarSesionComponent
  },
  {
    path:'cerrar-sesion',
    component:CerrarSesionComponent
  },
  {
    path:'cambiar-clave',
    component:CambiarClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
