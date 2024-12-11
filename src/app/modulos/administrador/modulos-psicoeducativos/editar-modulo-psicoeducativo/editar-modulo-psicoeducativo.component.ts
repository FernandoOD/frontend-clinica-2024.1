import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
  selector: 'app-editar-modulo-psicoeducativo',
  templateUrl: './editar-modulo-psicoeducativo.component.html',
  styleUrl: './editar-modulo-psicoeducativo.component.css'
})
export class EditarModuloPsicoeducativoComponent {
  id: number = 0;
  idTerapeuta:number = 0;
  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: ModuloPsicoeducativoService,
    private router:Router,
    private route: ActivatedRoute
  ){ }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      id:['',Validators.required],
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      fechaCreacion: ['',Validators.required],
      terapeutaId: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = this.route.snapshot.params["id"];
    let datos = this.servicioSeguridad.getDataLocalStorage();
    if(datos){
      let info = JSON.parse(datos);
      this.idTerapeuta = info.idPersona;
    }
    this.servicio.findRecord(this.id).subscribe({
      next: (data: ModuloPsicoeducativoModelo) => {
        // Manejo de autenticación exitosa
        this.getFGV['id'].setValue(data.id);
        this.getFGV['titulo'].setValue(data.Titulo);
        this.getFGV['descripcion'].setValue(data.Descripcion);
        this.getFGV['fechaCreacion'].setValue(data.FechaCreacion);
        this.getFGV['terapeutaId'].setValue(data.terapeutaId);
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
    let titulo = this.getFGV['titulo'].value;
    let descripcion = this.getFGV['descripcion'].value;
    let fechaCreacion = this.getFGV['fechaCreacion'].value;
    let terapeutaId = this.getFGV['terapeutaId'].value;
    let obj = new ModuloPsicoeducativoModelo();

    obj.id = id;
    obj.Titulo = titulo;
    obj.Descripcion = descripcion;
    obj.FechaCreacion = fechaCreacion;
    obj.terapeutaId = terapeutaId;

    this.servicio.updateRecord(obj).subscribe({
      next: (data: ModuloPsicoeducativoModelo) => {
        // Manejo de autenticación exitosa
        console.log("Registro actualizado correctamente", data);
        this.router.navigate(["/terapeuta/listar-modulo-psicoeducativo"]);
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
