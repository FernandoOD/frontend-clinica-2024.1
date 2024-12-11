import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EjercicioPracticoModelo } from '../../../../modelos/EjercicioPractico.modelo';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';
import { EjercicioPracticoService } from '../../../../servicios/ejercicio-practico.service';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
    selector: 'app-agregar-ejercicio-practico',
    templateUrl: './agregar-ejercicio-practico.component.html',
    styleUrl: './agregar-ejercicio-practico.component.css',
    standalone: false
})
export class AgregarEjercicioPracticoComponent {
  suscripcion: Subscription = new Subscription;
  fgValidation: FormGroup = new FormGroup({});
  terapeutaId: number = 0;
  modulosList: ModuloPsicoeducativoModelo [] = [];
  

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: EjercicioPracticoService,
    private servicioModulos: ModuloPsicoeducativoService,
    private router:Router,
    private route : ActivatedRoute){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      instrucciones: ['',Validators.required],
      moduloId : ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.servicioModulos.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.modulosList = data;
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

  get getFGV(){
    return this.fgValidation.controls;
  }

  guardarRegistro(){
    let titulo = this.getFGV['titulo'].value;
    let descripcion = this.getFGV['descripcion'].value;
    let instrucciones = this.getFGV['instrucciones'].value;
    let moduloId = this.getFGV['moduloId'].value;
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
    let obj = new EjercicioPracticoModelo();

    obj.Titulo = titulo; 
    obj.Descripcion = descripcion;
    obj.Instrucciones = instrucciones;
    obj.FechaCreacion = fechaRegistro;
    obj.moduloPsicoeducativoId = parseInt(moduloId);

    this.servicio.saveRecord(obj).subscribe({
      next:(data: EjercicioPracticoModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.router.navigate(["/admin/listar-ejercicio-practico"]);
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
}
