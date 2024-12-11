import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../../servicios/paciente.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { TerapeutaModelo } from '../../../../modelos/Terapeuta.modelo';
import { TerapeutaService } from '../../../../servicios/terapeuta.service';
import { PacienteTerapeutaService } from '../../../../servicios/paciente-terapeuta.service';
import { PacienteTerapeutaModelo } from '../../../../modelos/PacienteTerapeuta.modelo';


@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrl: './editar-paciente.component.css'
})
export class EditarPacienteComponent {
  id: number = 0;
  terapeutaId?: number;
  suscripcion: Subscription = new Subscription;
  terapeutaList: TerapeutaModelo[] = [];
  fgValidation: FormGroup = new FormGroup({});

  fechaRegistro?: String = '';
  idRelacion?: number = 0;

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: PacienteService,
    private servicioTerapeuta: TerapeutaService,
    private servicioPacienteTerapeuta: PacienteTerapeutaService,
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
      terapeutaId: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = parseInt(this.route.snapshot.params["id"]);
    this.listarTerapeutas();
    this.encontrarTerapeuta();
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
        this.getFGV['terapeutaId'].setValue(this.terapeutaId);
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
        this.actualizarTerapeuta(data);
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

  actualizarTerapeuta(data: PacienteModelo){
    let IdTerapeuta =parseInt(this.getFGV['terapeutaId'].value);
    let obj = new PacienteTerapeutaModelo();

    if(IdTerapeuta != this.terapeutaId){
      let fechaActual = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
      obj.FechaFin = fechaActual;
      obj.FechaInicio = this.fechaRegistro;
      obj.terapeutaId = this.terapeutaId;
      obj.pacienteId = this.id;
      obj.id = this.idRelacion;

      this.servicioPacienteTerapeuta.updateRecord(obj).subscribe({
        next: (data: PacienteTerapeutaModelo) => {
          console.log('Registro Actulizado',data);
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("Error al obtener terapeuta", error);
          alert("Error al actualizar el registro de la relacion");
        }
      });

      obj.FechaInicio = fechaActual;
      obj.pacienteId = this.id;
      obj.terapeutaId = IdTerapeuta;

      this.servicioPacienteTerapeuta.saveRecord(obj).subscribe({
        next: (data: PacienteTerapeutaModelo) => {
          // Manejo de autenticación exitosa
          console.log("Terapeuta modificado correctamente", data);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("Error de autenticación", error);
          alert("Error al asignar terapeuta");
        }
      })
    }
  }

  encontrarTerapeuta(){
    this.servicioPacienteTerapeuta.findRecord(this.id).subscribe({
      next: (data: PacienteTerapeutaModelo) => {
        this.terapeutaId = data.terapeutaId;
        this.fechaRegistro = data.FechaInicio;
        this.idRelacion = data.id;
        console.log('terapeutaId: ',this.terapeutaId);
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error al obtener terapeuta", error);
        alert("Error al obtener terapeuta el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de obtención completado');
      }
    });

  }

  listarTerapeutas(){
    this.servicioTerapeuta.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.terapeutaList = data;
        console.log("Datos listados", data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al listar los datos");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }
}
