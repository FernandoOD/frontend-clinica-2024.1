import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
    selector: 'app-agregar-modulo-psicoeducativo',
    templateUrl: './agregar-modulo-psicoeducativo.component.html',
    styleUrl: './agregar-modulo-psicoeducativo.component.css',
    standalone: false
})
export class AgregarModuloPsicoeducativoComponent {
  suscripcion: Subscription = new Subscription;
  fgValidation: FormGroup = new FormGroup({});
  terapeutaId: number = 0;
  

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: ModuloPsicoeducativoService,
    private router:Router,
    private route : ActivatedRoute){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      url: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    let datos = this.servicioSeguridad.getDataLocalStorage();
    if(datos){
      let info = JSON.parse(datos);
      this.terapeutaId = info.idPersona;
    }
  }

  get getFGV(){
    return this.fgValidation.controls;
  }

  guardarRegistro(){
    let titulo = this.getFGV['titulo'].value;
    let descripcion = this.getFGV['descripcion'].value;
    let url = this.getFGV['url'].value;
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
    let obj = new ModuloPsicoeducativoModelo();

    obj.Titulo = titulo;
    obj.Descripcion = descripcion;
    obj.FechaCreacion = fechaRegistro;
    obj.UrlVideo = url;

    this.servicio.saveRecord(obj).subscribe({
      next:(data: ModuloPsicoeducativoModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.router.navigate(["/admin/listar-modulo-psicoeducativo"]);
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
