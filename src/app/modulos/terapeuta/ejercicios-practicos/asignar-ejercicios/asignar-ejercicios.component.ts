import { Component } from '@angular/core';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { EjercicioPracticoModelo } from '../../../../modelos/EjercicioPractico.modelo';
import { EjercicioPracticoService } from '../../../../servicios/ejercicio-practico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { PacienteEjercicioService } from '../../../../servicios/paciente-ejercicio.service';
import { PacienteEjercicioModelo } from '../../../../modelos/PacienteEjercicio.modelo';

@Component({
    selector: 'app-asignar-ejercicios',
    templateUrl: './asignar-ejercicios.component.html',
    styleUrl: './asignar-ejercicios.component.css',
    standalone: false
})
export class AsignarEjerciciosComponent {
  listaModulos : ModuloPsicoeducativoModelo [] = [];
  listaEjercicios: EjercicioPracticoModelo [] = [];
  selectedModules : string [] = [];
  resumenAsignacion: {nombre: string, ejercicios: any[]}[] = [];

  id : number = 0;

  constructor (private servicio: ModuloPsicoeducativoService,
              private servicioSeguridad: SeguridadService,
              private servicioEjercicio: EjercicioPracticoService,
              private route: ActivatedRoute,
              private servicioPacienteEjercicio: PacienteEjercicioService,
              private router:Router 
  ){

  }


  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params["id"]);

    this.servicio.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaModulos = data;
        console.log("Datos listados", data);
        this.listarEjercicios();
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

  getModuleNameById(moduloId: string) {
    let id = parseInt(moduloId);
    return this.listaModulos.find(mod => mod.id === id)?.Titulo || 'Sin Nombre';
  }

  getEjerciciosByModuleId(moduloId: string) {
    let id = parseInt(moduloId);
    return this.listaEjercicios.filter(ej => ej.moduloPsicoeducativoId === id);
  }

  listarEjercicios(){
    for(let modulo of this.listaModulos){
      this.servicioEjercicio.listRecords(modulo.id).subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaEjercicios.push(...data);
          console.log("Datos listados", this.listaEjercicios);
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

  toggleEjercicioSeleccionado(moduleId: string, ejercicioId: number | undefined, event: any) {
    let ejercicio = this.getEjerciciosByModuleId(moduleId).find(ej => ej.id === ejercicioId);
    let modulo = this.resumenAsignacion.find(mod => mod.nombre === this.getModuleNameById(moduleId));
  
    if (event.target.checked) {
      // Agregar ejercicio
      if (!modulo) {
        this.resumenAsignacion.push({nombre: this.getModuleNameById(moduleId), ejercicios: [ejercicio]});
      } else {
        modulo.ejercicios.push(ejercicio);
      }
    } else {
      // Remover ejercicio
      if(modulo != null){
        modulo.ejercicios = modulo.ejercicios.filter(ej => ej.id !== ejercicioId);
      if (modulo.ejercicios.length === 0) {
        this.resumenAsignacion = this.resumenAsignacion.filter(mod => mod.nombre !== modulo.nombre);
      }
      }
    }
  }

  asignarEjercicios(){
    const idsEjercicios = this.resumenAsignacion.flatMap(modulo =>
      modulo.ejercicios.map(ejercicio => ejercicio.id)
    );
    const obj = {
      pacienteId: this.id,  // ID de la consulta
      ejercicioPracticoId: idsEjercicios// Array de IDs de tests seleccionados
    };
    console.log("idsEjercicios",idsEjercicios); 

    this.servicioPacienteEjercicio.saveRecord(obj).subscribe({
      next: (data: PacienteEjercicioModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.router.navigate(["/terapeuta/mis-pacientes"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al guardar la consulta");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }
}
