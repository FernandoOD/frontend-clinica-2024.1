import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModelo } from '../../../modelos/Usuario.modelo';

import * as crypto from 'crypto-js'
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {

  fgValidation: FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, private servicioSeguridad: SeguridadService, private router:Router ){
  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      email: ['',Validators.required, Validators.email],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  userAuthentication(){
    let email = this.getFGV['email'].value;
    let password = this.getFGV['password'].value;
    let model = new UsuarioModelo();
    model.Email = email;
  
    // Hashear la contraseña usando crypto-js MD5
    model.Password = crypto.MD5(password).toString();
  
    // Llamar al servicio de autenticación
    this.servicioSeguridad.userAuthentication(model).subscribe({
      next: (data: UsuarioModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.servicioSeguridad.dataSaveInLocal(data);
        this.router.navigate(["/admin/dashboard"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Datos Incorrectos");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de autenticación completado');
      }
    });
  }

  get getFGV(){
    return this.fgValidation.controls;
  }
}
