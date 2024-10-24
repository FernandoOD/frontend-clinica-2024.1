import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../../servicios/paciente.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';


@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrl: './editar-paciente.component.css'
})
export class EditarPacienteComponent {
  isLoggedIn: boolean = false;
  id: number = 0;
  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: PacienteService,
    private router:Router,
    private route: ActivatedRoute
  ){ }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      id:['',Validators.required],
      nombre: ['',Validators.required],
      apellidoPaterno: ['',Validators.required],
      apellidoMaterno: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono: ['',[Validators.required, Validators.maxLength(10)]],
      email: ['',[Validators.required, Validators.email]],
      fechaRegistro: ['',Validators.required],
      fechaNacimiento: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = this.route.snapshot.params["id"];
    this.servicio.findRecord(this.id).subscribe({
      next: (data: PacienteModelo) => {
        // Manejo de autenticación exitosa
        this.getFGV['id'].setValue(data.id);
        this.getFGV['nombre'].setValue(data.Nombre);
        this.getFGV['apellidoPaterno'].setValue(data.ApellidoPaterno);
        this.getFGV['apellidoMaterno'].setValue(data.ApellidoMaterno);
        this.getFGV['direccion'].setValue(data.Direccion);
        this.getFGV['telefono'].setValue(data.Telefono);
        this.getFGV['email'].setValue(data.Email);
        this.getFGV['fechaRegistro'].setValue(data.FechaRegistro);
        this.getFGV['fechaNacimiento'].setValue(data.FechaNacimiento);
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
    let direccion = this.getFGV['direccion'].value;
    let telefono = this.getFGV['telefono'].value;
    let email = this.getFGV['email'].value;
    let fechaNacimiento = this.getFGV['fechaNacimiento'].value;
    let fechaRegistro= this.getFGV['fechaRegistro'].value;
    let obj = new PacienteModelo();

    obj.id = id;
    obj.Nombre = nombre;
    obj.ApellidoPaterno = apellidoPaterno;
    obj.ApellidoMaterno = apellidoMaterno;
    obj.Direccion = direccion;
    obj.Telefono = telefono;
    obj.Email = email;
    obj.FechaNacimiento = fechaNacimiento;
    obj.FechaRegistro = fechaRegistro;

    this.servicio.updateRecord(obj).subscribe({
      next: (data: PacienteModelo) => {
        // Manejo de autenticación exitosa
        console.log("Registro actualizado correctamente", data);
        this.router.navigate(["/admin/listar-paciente"]);
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
