import { Component } from '@angular/core';
import { NotaClinicaService } from '../../../../servicios/nota-clinica.service';
import { NotaClinicaModelo } from '../../../../modelos/NotaClinica.modelo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
    selector: 'app-editar-nota-clinica',
    templateUrl: './editar-nota-clinica.component.html',
    styleUrl: './editar-nota-clinica.component.css',
    standalone: false
})
export class EditarNotaClinicaComponent {
  isLoggedIn: boolean = false;
  id: number = 0;
  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: NotaClinicaService,
    private router:Router,
    private route: ActivatedRoute
  ){ }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      id:['',Validators.required],
      contenido: ['',Validators.required],
      planTratamiento: ['',Validators.required],
      objetivos: ['',Validators.required],
      conceptualizacion: ['',Validators.required],
      fechaCreacion: ['',Validators.required],
      consultaId: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = this.route.snapshot.params["id"];
    this.servicio.findRecord(this.id).subscribe({
      next: (data: NotaClinicaModelo) => {
        // Manejo de autenticación exitosa
        this.getFGV['id'].setValue(data.id);
        this.getFGV['contenido'].setValue(data.Contenido);
        this.getFGV['planTratamiento'].setValue(data.PlanTratamiento);
        this.getFGV['objetivos'].setValue(data.Objetivos);
        this.getFGV['conceptualizacion'].setValue(data.Conceptualizacion);
        this.getFGV['fechaCreacion'].setValue(data.FechaCreacion);
        this.getFGV['consultaId'].setValue(data.consultaId);
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
    let contenido = this.getFGV['contenido'].value;
    let planTratamiento = this.getFGV['planTratamiento'].value;
    let objetivos = this.getFGV['objetivos'].value;
    let conceptualizacion = this.getFGV['conceptualizacion'].value;
    let fechaCreacion = this.getFGV['fechaCreacion'].value;
    let consultaId = this.getFGV['consultaId'].value;
    let obj = new NotaClinicaModelo();

    obj.id = id;
    obj.Contenido = contenido;
    obj.PlanTratamiento = planTratamiento;
    obj.Objetivos = objetivos;
    obj.Conceptualizacion = conceptualizacion;
    obj.FechaCreacion = fechaCreacion;
    obj.consultaId = parseInt(consultaId);

    this.servicio.updateRecord(obj).subscribe({
      next: (data: NotaClinicaModelo) => {
        // Manejo de autenticación exitosa
        console.log("Registro actualizado correctamente", data);
        this.router.navigate(["/terapeuta/listar-nota-clinica"]);
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
