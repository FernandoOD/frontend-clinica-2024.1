import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { PacienteService } from '../../../../servicios/paciente.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { NotaClinicaModelo } from '../../../../modelos/NotaClinica.modelo';
import { NotaClinicaService } from '../../../../servicios/nota-clinica.service';

@Component({
    selector: 'app-agregar-nota-clinica',
    templateUrl: './agregar-nota-clinica.component.html',
    styleUrl: './agregar-nota-clinica.component.css',
    standalone: false
})
export class AgregarNotaClinicaComponent {
  suscripcion: Subscription = new Subscription;
  idConsulta : number = 0;
  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicio: NotaClinicaService,
    private router:Router,
    private route: ActivatedRoute
  ){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      contenido: ['',Validators.required],
      planTratamiento: ['',Validators.required],
      objetivos: ['',Validators.required],
      conceptualizacion: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.idConsulta = parseInt(this.route.snapshot.params["id"]);
  }

  get getFGV(){
    return this.fgValidation.controls;
  }

  guardarRegistro(){
    let contenido = this.getFGV['contenido'].value;
    let planTratamiento = this.getFGV['planTratamiento'].value;
    let objetivos = this.getFGV['objetivos'].value;
    let conceptualizacion = this.getFGV['conceptualizacion'].value;
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
    let obj = new NotaClinicaModelo();

    
    obj.Contenido = contenido;
    obj.PlanTratamiento = planTratamiento;
    obj.Objetivos = objetivos;
    obj.Conceptualizacion = conceptualizacion;
    obj.consultaId = this.idConsulta;
    obj.FechaCreacion = fechaRegistro;

    this.servicio.saveRecord(obj).subscribe({
      next: (data: NotaClinicaModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.router.navigate(["/terapeuta/listar-nota-clinica"]);
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
