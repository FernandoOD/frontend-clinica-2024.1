import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModelo } from '../../../modelos/Usuario.modelo';

@Component({
  selector: 'app-barra-navegacion-superior',
  templateUrl: './barra-navegacion-superior.component.html',
  styleUrl: './barra-navegacion-superior.component.css'
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isLoggedIn: boolean = false;

  suscripcion: Subscription = new Subscription;

  constructor(private servicioSeguridad: SeguridadService) {

  }

  ngOnInit(): void {
    
  }

  isLoggedInFn(){
    this.suscripcion = this.servicioSeguridad.getSessionData().subscribe((datos: UsuarioModelo)=>{
      this.isLoggedIn = datos.isLoggedIn;
    });
    return this.isLoggedIn
  }

}
