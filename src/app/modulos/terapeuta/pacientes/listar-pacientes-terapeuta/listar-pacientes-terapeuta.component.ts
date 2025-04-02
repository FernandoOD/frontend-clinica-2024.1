import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { PacienteService } from '../../../../servicios/paciente.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { PacienteTerapeutaService } from '../../../../servicios/paciente-terapeuta.service';

@Component({
    selector: 'app-listar-pacientes-terapeuta',
    templateUrl: './listar-pacientes-terapeuta.component.html',
    styleUrl: './listar-pacientes-terapeuta.component.css',
    standalone: false
})
export class ListarPacientesTerapeutaComponent {
  pagina: number = 1;
  suscripcion: Subscription = new Subscription;

  IdPersona: number = 0;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaRegistros: PacienteModelo[] = [];
  constructor (private servicio: PacienteService, private servicioSeguridad: SeguridadService, private servicoPacienteTerapeuta: PacienteTerapeutaService ){

  }

  ngOnInit(): void {
    let datos = this.servicioSeguridad.getDataLocalStorage();
    if(datos){
      let info = JSON.parse(datos);
      this.IdPersona = info.idPersona;
    }
    this.servicoPacienteTerapeuta.listRecords(this.IdPersona).subscribe({
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
    })
  }


  ordenarTabla(campo: keyof PacienteModelo) {


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
