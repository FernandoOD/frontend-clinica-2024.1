import { Component } from '@angular/core';
import { EjercicioPracticoService } from '../../../../servicios/ejercicio-practico.service';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';
import { EjercicioPracticoModelo } from '../../../../modelos/EjercicioPractico.modelo';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';

@Component({
    selector: 'app-listar-ejercicio-practico',
    templateUrl: './listar-ejercicio-practico.component.html',
    styleUrl: './listar-ejercicio-practico.component.css',
    standalone: false
})
export class ListarEjercicioPracticoComponent {
  
  pagina: number = 1;
  suscripcion: Subscription = new Subscription;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaEjercicios: EjercicioPracticoModelo[] = [];
  listaModulos: ModuloPsicoeducativoModelo[] = []; 

  constructor (
    private servicio: EjercicioPracticoService,
    private servicioSeguridad: SeguridadService,
    private servicioModelo: ModuloPsicoeducativoService
   ){

  }

  ngOnInit(): void {
    this.listarModulos();
  }


  ordenarTabla(campo: keyof EjercicioPracticoModelo) {


    if (this.campoOrdenar === campo) {
      this.ordenAscendente = !this.ordenAscendente; // Alterna el orden
    } else {
      this.ordenAscendente = true; // Restablece a ascendente si cambia de campo
      this.campoOrdenar = campo;
    }
  

    const ths = document.querySelectorAll('th.sortable');
    ths.forEach((th) => {
      th.classList.remove('asc', 'desc');
      if (th.getAttribute('data-column') === campo) {
        th.classList.add(this.ordenAscendente ? 'asc' : 'desc');
      }
    });

  
    this.listaEjercicios.sort((a, b) => {
      let valorA = a[campo];
      let valorB = b[campo];
  
      // Verificar si alguno es undefined
      if (valorA === undefined) return 1;
      if (valorB === undefined) return -1;
  
      // Convertir a número si es necesario
      if (typeof valorA === 'number' && typeof valorB === 'number') {
        return this.ordenAscendente ? valorA - valorB : valorB - valorA;
      }
  
      // Ordenar por texto o fecha
      return this.ordenAscendente 
        ? valorA.toString().localeCompare(valorB.toString()) 
        : valorB.toString().localeCompare(valorA.toString());
    });
  }

  VerificarEliminacion(id?:number, nombre?: String){
    if(window.confirm("Realmente desea eliminar el registro de  " + nombre)){
      this.servicio.deleteRecord(id!).subscribe({
        next: (data) => {
          // Manejo de autenticación exitoso
          console.log("Registro eliminado", data);
          this.listaEjercicios = this.listaEjercicios.filter(x => x.id != id);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("Error de autenticación", error);
          alert("Error al eliminar el registro");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
          console.log('Proceso de guardado completado');
        }
      });
    }
  }

  deleteUsuario(idPersona: number){
    this.servicio.deleteRecord(idPersona).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        console.log("Usuario eliminado", data);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al eliminar el Usuario");
      }
    })
  }

  listarModulos(){
    this.servicioModelo.listRecords().subscribe({
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

  listarEjercicios(){
    for(let modulo of this.listaModulos){
      this.servicio.listRecords(modulo.id).subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaEjercicios.push(...data);
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
}
