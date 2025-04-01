import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModelo } from '../../../modelos/Usuario.modelo';

@Component({
    selector: 'app-barra-navegacion-superior',
    templateUrl: './barra-navegacion-superior.component.html',
    styleUrl: './barra-navegacion-superior.component.css',
    standalone: false
})
export class BarraNavegacionSuperiorComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;

  constructor(private servicioSeguridad: SeguridadService,
  ) {

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.servicioSeguridad.getSessionData().pipe(
      map(datos => datos.isLoggedIn)
    );

  }

}
