import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { TerapeutaModelo } from '../../../../modelos/Terapeuta.modelo';
import { TerapeutaService } from '../../../../servicios/terapeuta.service';

@Component({
    selector: 'app-editar-terapeuta',
    templateUrl: './editar-terapeuta.component.html',
    styleUrl: './editar-terapeuta.component.css',
    standalone: false
})
export class EditarTerapeutaComponent {

  isLoggedIn: boolean = false;
  id: number = 0;
  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: TerapeutaService,
    private router:Router,
    private route: ActivatedRoute
  ){ }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      id:['',Validators.required],
      nombre: ['',Validators.required],
      apellidoPaterno: ['',Validators.required],
      apellidoMaterno: ['',Validators.required],
      cedulaLicenciatura: ['',[Validators.required, Validators.maxLength(10)]],
      cedulaEspecialidad: ['',[Validators.required, Validators.maxLength(10)]],
      especialidad: ['',Validators.required],
      telefono: ['',[Validators.required, Validators.maxLength(10)]],
      email: ['',[Validators.required, Validators.email]],
      fechaRegistro: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = this.route.snapshot.params["id"];
    this.servicio.findRecord(this.id).subscribe({
      next: (data: TerapeutaModelo) => {
        // Manejo de autenticación exitosa
        this.getFGV['id'].setValue(data.id);
        this.getFGV['nombre'].setValue(data.Nombre);
        this.getFGV['apellidoPaterno'].setValue(data.ApellidoPaterno);
        this.getFGV['apellidoMaterno'].setValue(data.ApellidoMaterno);
        this.getFGV['cedulaLicenciatura'].setValue(data.CedulaLicenciatura);
        this.getFGV['cedulaEspecialidad'].setValue(data.CedulaEspecialidad);
        this.getFGV['especialidad'].setValue(data.Especialidad);
        this.getFGV['telefono'].setValue(data.Telefono);
        this.getFGV['email'].setValue(data.Email);
        this.getFGV['fechaRegistro'].setValue(data.FechaRegistro);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("No se encontro el registro", error);
        alert("ENo se encuentra el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de obtención completado');
      }
    });
  }

  get getFGV(){
    return this.fgValidation.controls;
  }

  actualizarRegistro(){
    let id = this.getFGV['id'].value;
    let nombre = this.getFGV['nombre'].value;
    let apellidoPaterno = this.getFGV['apellidoPaterno'].value;
    let apellidoMaterno = this.getFGV['apellidoMaterno'].value;
    let cedulaLicenciatura = this.getFGV['cedulaLicenciatura'].value;
    let cedulaEspecialidad = this.getFGV['cedulaEspecialidad'].value;
    let especialidad = this.getFGV['especialidad'].value;
    let telefono = this.getFGV['telefono'].value;
    let email = this.getFGV['email'].value;
    let fechaRegistro= this.getFGV['fechaRegistro'].value;
    let obj = new TerapeutaModelo();

    obj.id = id;
    obj.Nombre = nombre;
    obj.ApellidoPaterno = apellidoPaterno;
    obj.ApellidoMaterno = apellidoMaterno;
    obj.CedulaLicenciatura = cedulaLicenciatura;
    obj.CedulaEspecialidad = cedulaEspecialidad;
    obj.Especialidad = especialidad;
    obj.Telefono = telefono;
    obj.Email = email;
    obj.FechaRegistro = fechaRegistro;

    this.servicio.updateRecord(obj).subscribe({
      next: (data: TerapeutaModelo) => {
        // Manejo de autenticación exitosa
        console.log("Registro actualizado correctamente", data);
        this.router.navigate(["/admin/listar-terapeuta"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error al actualizar", error);
        alert("Error al actualizar el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de actualizado completado');
      }
    });
  }
}
