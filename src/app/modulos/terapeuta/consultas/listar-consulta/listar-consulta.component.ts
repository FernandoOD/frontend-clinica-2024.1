import { Component } from '@angular/core';
import { ConsultaModelo } from '../../../../modelos/Consulta.modelo';
import { ConsultaService } from '../../../../servicios/consulta.service';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
    selector: 'app-listar-consulta',
    templateUrl: './listar-consulta.component.html',
    styleUrl: './listar-consulta.component.css',
    standalone: false
})
export class ListarConsultaComponent {
  
  pagina: number = 1;
  suscripcion: Subscription = new Subscription;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  IdPersona: number = 0;
  ordenActual: string = '';  // Columna que está ordenada

  listaRegistros: ConsultaModelo[] = [];
  constructor (private servicio: ConsultaService, private servicioSeguridad: SeguridadService ){

  }

  ngOnInit(): void {
    let datos = this.servicioSeguridad.getDataLocalStorage();
    if(datos){
      let info = JSON.parse(datos);
      this.IdPersona = info.idPersona;
    }
    this.servicio.listRecordsTerapeuta(this.IdPersona).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaRegistros = data;
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al listar los datos");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }


  ordenarTabla(campo: keyof ConsultaModelo) {


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
}
