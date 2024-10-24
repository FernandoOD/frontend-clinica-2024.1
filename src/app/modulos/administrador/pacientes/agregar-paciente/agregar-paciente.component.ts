import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../../../servicios/paciente.service';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { UsuarioModelo } from '../../../../modelos/Usuario.modelo';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrl: './agregar-paciente.component.css'
})
export class AgregarPacienteComponent implements OnInit{
  isLoggedIn: boolean = false;

  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: PacienteService,
    private servicioUser: UsuarioService,
    private router:Router){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      nombre: ['',Validators.required],
      apellidoPaterno: ['',Validators.required],
      apellidoMaterno: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['',[Validators.required, Validators.maxLength(10)]],
      email: ['',[Validators.required, Validators.email]],
      fechaNacimiento: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get getFGV(){
    return this.fgValidation.controls;
  }

  guardarRegistro(){
    let nombre = this.getFGV['nombre'].value;
    let apellidoPaterno = this.getFGV['apellidoPaterno'].value;
    let apellidoMaterno = this.getFGV['apellidoMaterno'].value;
    let direccion = this.getFGV['direccion'].value;
    let telefono = this.getFGV['telefono'].value;
    let email = this.getFGV['email'].value;
    let fechaNacimiento = this.getFGV['fechaNacimiento'].value;
    let fechaRegistro= new Date().toISOString().split('T')[0]
    let obj = new PacienteModelo();

    obj.Nombre = nombre;
    obj.ApellidoPaterno = apellidoPaterno;
    obj.ApellidoMaterno = apellidoMaterno;
    obj.Direccion = direccion;
    obj.Telefono = telefono;
    obj.Email = email;
    obj.FechaNacimiento = fechaNacimiento;
    obj.FechaRegistro = fechaRegistro;

    this.servicio.saveRecord(obj).subscribe({
      next: (data: PacienteModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.crearUsuario(data);
        this.router.navigate(["/admin/listar-paciente"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al guardar el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }

  crearUsuario(data : PacienteModelo){
    let obj = new UsuarioModelo();
    obj.idPersona = data.id;
    obj.Email  =data.Email;
    obj.rolId = "66d2530b7142ea3216140931";
    this.servicioUser.saveUser(obj).subscribe({
      next: (data: UsuarioModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al crear Usuario");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }
}
