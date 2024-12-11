import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cerrar-sesion',
    imports: [],
    templateUrl: './cerrar-sesion.component.html',
    styleUrl: './cerrar-sesion.component.css'
})
export class CerrarSesionComponent implements OnInit {

  constructor (private servicioSeguridad: SeguridadService, private router: Router){

  }

  ngOnInit(): void {
    this.servicioSeguridad.closeSession();
    this.router.navigate(["/"]);
  }


}
