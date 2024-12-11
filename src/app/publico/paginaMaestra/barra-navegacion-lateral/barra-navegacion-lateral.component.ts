import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuarioModelo } from '../../../modelos/Usuario.modelo';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { PacienteService } from '../../../servicios/paciente.service';
import { PacienteModelo } from '../../../modelos/Paciente.modelo';
import { TerapeutaService } from '../../../servicios/terapeuta.service';

declare var M: any;

@Component({
    selector: 'app-barra-navegacion-lateral',
    templateUrl: './barra-navegacion-lateral.component.html',
    styleUrl: './barra-navegacion-lateral.component.css',
    standalone: false
})
export class BarraNavegacionLateralComponent implements OnInit {

  isLoggedIn: boolean = false;
  userRole: String = '';
  suscripcion: Subscription = new Subscription;

  userName: String | undefined = '';

  constructor(private servicioSeguridad: SeguridadService, private servicioPaciente: PacienteService, private servicioTerapeuta: TerapeutaService){

  }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(){
    let datos = this.servicioSeguridad.getDataLocalStorage();
    let objetoDatos : UsuarioModelo;
    if(datos){
      objetoDatos = JSON.parse(datos);
      if(objetoDatos.rol === 'paciente'){
        if(objetoDatos.idPersona){
          let paciente = this.servicioPaciente.findRecord(objetoDatos.idPersona);
          paciente.subscribe({
            next: (data) => {
              // Manejo de autenticación exitosa
              this.userName=data.Nombre+" "+data.ApellidoPaterno+" "+data.ApellidoMaterno;
            }
          });
        }
      }else{
        if(objetoDatos.idPersona){
          let terapeuta = this.servicioTerapeuta.findRecord(objetoDatos.idPersona);
          terapeuta.subscribe({
            next: (data) => {
              // Manejo de autenticación exitosa
              this.userName=data.Nombre+" "+data.ApellidoPaterno+" "+data.ApellidoMaterno;
            }
          });
        }
      }
    }
    
  }

  ngAfterViewInit(){
    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse, {
      accordion: false // Cambia a true si quieres que solo se abra un submenú a la vez
    });
  }
  

  isAdmin(): boolean {
    return this.servicioSeguridad.hasRole('admin');
  }

  isPaciente(): boolean {
    return this.servicioSeguridad.hasRole('paciente');
  }

  isTerapeuta(): boolean {
    return this.servicioSeguridad.hasRole('terapeuta');
  }

}
