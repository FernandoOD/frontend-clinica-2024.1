import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TerapeutaModelo} from '../../../../modelos/Terapeuta.modelo';
import { TerapeutaService } from '../../../../servicios/terapeuta.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { UsuarioModelo } from '../../../../modelos/Usuario.modelo';
import { UsuarioService } from '../../../../servicios/usuario.service';

@Component({
    selector: 'app-agregar-terapeuta',
    templateUrl: './agregar-terapeuta.component.html',
    styleUrl: './agregar-terapeuta.component.css',
    standalone: false
})
export class AgregarTerapeutaComponent implements OnInit{
  isLoggedIn: boolean = false;

  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: TerapeutaService,
    private servicioUser: UsuarioService,
    private router:Router){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      nombre: ['',Validators.required],
      apellidoPaterno: ['',Validators.required],
      apellidoMaterno: ['',Validators.required],
      cedulaLicenciatura: ['',[Validators.required, Validators.maxLength(10)]],
      cedulaEspecialidad: ['',[Validators.required, Validators.maxLength(10)]],
      especialidad: ['',Validators.required],
      telefono: ['',[Validators.required, Validators.maxLength(10)]],
      email: ['',[Validators.required, Validators.email]],
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
    let cedulaLicenciatura = this.getFGV['cedulaLicenciatura'].value;
    let cedulaEspecialidad = this.getFGV['cedulaEspecialidad'].value;
    let especialidad = this.getFGV['especialidad'].value;
    let telefono = this.getFGV['telefono'].value;
    let email = this.getFGV['email'].value;
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
    let obj = new TerapeutaModelo();

    obj.Nombre = nombre;
    obj.ApellidoPaterno = apellidoPaterno;
    obj.ApellidoMaterno = apellidoMaterno;
    obj.CedulaLicenciatura = cedulaLicenciatura;
    obj.CedulaEspecialidad = cedulaEspecialidad;
    obj.Especialidad = especialidad;
    obj.Telefono = telefono;
    obj.Email = email;
    obj.FechaRegistro = fechaRegistro;

    this.servicio.saveRecord(obj).subscribe({
      next: (data: TerapeutaModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.crearUsuario(data);
        this.router.navigate(["/admin/listar-terapeuta"]);
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

  crearUsuario(data : TerapeutaModelo){
    let obj = new UsuarioModelo();
    obj.idPersona = data.id;
    obj.Email  =data.Email;
    obj.rolId = "66d2532a7142ea3216140932";
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
