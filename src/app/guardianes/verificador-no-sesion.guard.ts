import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service';

export const verificadorNoSesionGuard: CanActivateFn = (route, state) => {
  const servicioSeguridad = inject(SeguridadService);
  const router  = inject(Router); 

  let tieneSesionActiva = servicioSeguridad.getToken() != "";
  if(!tieneSesionActiva){
    return true;
  }else{
    
    return false;
  }
};
