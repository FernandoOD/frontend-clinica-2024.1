import { Component } from '@angular/core';
import { TestPsicometricoService } from '../../../../servicios/test-psicometrico.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-test-psicometrico',
  templateUrl: './listar-test-psicometrico.component.html',
  styleUrl: './listar-test-psicometrico.component.css'
})
export class ListarTestPsicometricoComponent {
  pagina: number = 1;
  suscripcion: Subscription = new Subscription;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaRegistros: TestPsicometricoModelo[] = [];
  constructor (private servicio: TestPsicometricoService, private servicioSeguridad: SeguridadService, ){

  }

  ngOnInit(): void {

    this.servicio.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaRegistros = data;
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


  ordenarTabla(campo: keyof TestPsicometricoModelo) {


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

  
    this.listaRegistros.sort((a, b) => {
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
          // Manejo de autenticación exitosa
          
          console.log("Registro eliminado", data);
          this.listaRegistros = this.listaRegistros.filter(x => x.id != id);
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
}
