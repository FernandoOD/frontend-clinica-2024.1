import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from '../../../../servicios/paciente.service';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { UsuarioModelo } from '../../../../modelos/Usuario.modelo';
import { TerapeutaModelo } from '../../../../modelos/Terapeuta.modelo';
import { TerapeutaService } from '../../../../servicios/terapeuta.service';
import { PacienteTerapeutaModelo } from '../../../../modelos/PacienteTerapeuta.modelo';
import { PacienteTerapeutaService } from '../../../../servicios/paciente-terapeuta.service';
import { HistoriaClinicaModelo } from '../../../../modelos/HistoriaClinica.modelo';
import { HistoriaClinicaService } from '../../../../servicios/historia-clinica.service';

@Component({
    selector: 'app-agregar-paciente',
    templateUrl: './agregar-paciente.component.html',
    styleUrl: './agregar-paciente.component.css',
    standalone: false
})
export class AgregarPacienteComponent implements OnInit{
  isLoggedIn: boolean = false;

  suscripcion: Subscription = new Subscription;
  terapeutaList: TerapeutaModelo[] = [];
  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: PacienteService,
    private servicioUser: UsuarioService,
    private servicioTerapeuta: TerapeutaService,
    private servicioPacienteTerapeuta: PacienteTerapeutaService,
    private servicioHistoriaClinica: HistoriaClinicaService,
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
      terapeutaId: ['',Validators.required],
      descripcion: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.servicioTerapeuta.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.terapeutaList = data;
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al listar los datos");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
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
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
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
        this.crearUsuario(data);
        this.asignarTerapeuta(data);
        this.crearHistorial(data);
        this.router.navigate(["/admin/listar-paciente"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al guardar el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  crearUsuario(data : PacienteModelo){
    let obj = new UsuarioModelo();
    obj.idPersona = data.id;
    obj.Email  =data.Email;
    obj.rolId = "67eda60a0b73c998eff4819c";
    this.servicioUser.saveUser(obj).subscribe({
      next: (data: UsuarioModelo) => {

        alert("Su contraseña es:"+data.Password,);
        // Manejo de autenticación exitosa
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al crear Usuario");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  asignarTerapeuta(data : PacienteModelo){
    let terapeutaId = this.getFGV['terapeutaId'].value;
    let fechaRegistro= new Date().toISOString().split('T')[0]
    let obj = new PacienteTerapeutaModelo();
    obj.pacienteId = data.id;
    obj.terapeutaId = parseInt(terapeutaId);
    obj.FechaInicio = fechaRegistro;
    this.servicioPacienteTerapeuta.saveRecord(obj).subscribe({
      next: (data: PacienteTerapeutaModelo) => {
        // Manejo de autenticación exitosa
        this.router.navigate(["/admin/listar-paciente"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al asignar terapeuta");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  crearHistorial(data: PacienteModelo){
    let descripcion = this.getFGV['descripcion'].value;
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
    let obj = new HistoriaClinicaModelo ();

    obj.Descripcion = descripcion;
    obj.FechaCreacion = fechaRegistro;
    obj.pacienteId = data.id;

    this.servicioHistoriaClinica.saveRecord(obj).subscribe({
      next: (data: HistoriaClinicaModelo) => {
        // Manejo de autenticación exitosa
        this.router.navigate(["/admin/listar-paciente"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al asignar terapeuta");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }
}
