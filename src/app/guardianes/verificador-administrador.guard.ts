import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../servicios/seguridad.service';

export const verificadorAdministradorGuard: CanActivateFn = (route, state) => {
  const servicioSeguridad = inject(SeguridadService);
    const router  = inject(Router); 
  
    let tieneSesionActiva = servicioSeguridad.getToken() != "";
    let rol = servicioSeguridad.getRole();
    if(tieneSesionActiva){
      if(rol=="admin"){
        return true;
      }
      else{
        return router.parseUrl("/"+rol+"/dashboard");
      }
    }else{
      return router.parseUrl("/");
    }
};
