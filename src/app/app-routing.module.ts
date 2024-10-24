import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { verificadorSesionGuard } from './guardianes/verificador-sesion.guard';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path: 'parametros',
    loadChildren: () => import('./modulos/parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule),
    canActivate: [verificadorSesionGuard]
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modulos/administrador/administrador.module').then(m => m.AdministradorModule),
    canActivateChild: [verificadorSesionGuard]
  },
  {
    path: 'paciente',
    loadChildren: () => import('./modulos/paciente/paciente.module').then(m => m.PacienteModule),
    canActivateChild: [verificadorSesionGuard]
  },
  {
    path: 'terapeuta',
    loadChildren: () => import('./modulos/terapeuta/terapeuta.module').then(m => m.TerapeutaModule),
    canActivateChild: [verificadorSesionGuard]
  },
  {
    path: 'error-404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/error-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }