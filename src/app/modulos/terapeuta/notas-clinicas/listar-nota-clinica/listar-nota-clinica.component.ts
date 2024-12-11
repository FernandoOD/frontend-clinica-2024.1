import { Component } from '@angular/core';
import { NotaClinicaModelo } from '../../../../modelos/NotaClinica.modelo';
import { Subscription } from 'rxjs';
import { PacienteService } from '../../../../servicios/paciente.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { NotaClinicaService } from '../../../../servicios/nota-clinica.service';

@Component({
    selector: 'app-listar-nota-clinica',
    templateUrl: './listar-nota-clinica.component.html',
    styleUrl: './listar-nota-clinica.component.css',
    standalone: false
})
export class ListarNotaClinicaComponent {
  pagina: number = 1;

  isLoggedIn: boolean = false;
  suscripcion: Subscription = new Subscription;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaRegistros: NotaClinicaModelo[] = [];
  constructor (private servicio: NotaClinicaService, private servicioSeguridad: SeguridadService, ){

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


  ordenarTabla(campo: keyof NotaClinicaModelo) {


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
