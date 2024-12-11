import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../../servicios/paciente.service';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../../../servicios/usuario.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrl: './listar-paciente.component.css'
})
export class ListarPacienteComponent implements OnInit {

  pagina: number = 1;
  suscripcion: Subscription = new Subscription;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaRegistros: PacienteModelo[] = [];
  constructor (
    private servicio: PacienteService,
    private servicioSeguridad: SeguridadService,
    private servicioUsuario: UsuarioService
   ){

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

  VerificarEliminacion(id?:number, nombre?: String){
    if(window.confirm("Realmente desea eliminar el registro de  " + nombre)){
      this.servicio.deleteRecord(id!).subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.deleteUsuario(id!);
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

  deleteUsuario(idPersona: number){
    this.servicioUsuario.deleteUser(idPersona).subscribe({
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
}
