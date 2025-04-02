import { Component } from '@angular/core';
import { PacienteModuloService } from '../../../../servicios/paciente-modulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';

@Component({
  selector: 'app-asignar-modulos',
  templateUrl: './asignar-modulos.component.html',
  styleUrl: './asignar-modulos.component.css',
  standalone: false
})
export class AsignarModulosComponent {
   listaModulos : ModuloPsicoeducativoModelo [] = [];
    resumenAsignacion: {nombre: string, id: number}[] = [];
  
    pacienteId : number = 0;
  
    constructor (private servicio: ModuloPsicoeducativoService,
                private route: ActivatedRoute,
                private servicioPacienteModulo: PacienteModuloService,
                private router:Router 
    ){
  
    }
  
  
    ngOnInit(): void {
      this.pacienteId = parseInt(this.route.snapshot.params["id"]);
  
      this.servicio.listRecords().subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaModulos = data;
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
  
    getModuleNameById(moduloId?: number) {
      return this.listaModulos.find(mod => mod.id === moduloId)?.Titulo || 'Sin Nombre';
    }
  
    toggleModuloSeleccionado(moduleId: number, event: any) {
      let moduloIndex = this.resumenAsignacion.findIndex(mod => mod.id === moduleId);
      if (event.target.checked) {
        // Agregar módulo si no está en la lista
        if (moduloIndex === -1) {
          this.resumenAsignacion.push({
            id: moduleId,
            nombre: this.getModuleNameById(moduleId)
          });
        }
      } else {
        // Remover módulo si se deselecciona
        this.resumenAsignacion = this.resumenAsignacion.filter(mod => mod.id !== moduleId);
      }
    }
    
    asignarModulos() {
      const idsModulos = this.resumenAsignacion.map(modulo => modulo.id);
    
      const obj = {
        pacienteId: this.pacienteId,  // ID del paciente
        moduloPsicoeducativoId: idsModulos // Array de IDs de módulos seleccionados
      };
  
    
      this.servicioPacienteModulo.saveRecord(obj).subscribe({
        next: (data) => {
          this.router.navigate(["/terapeuta/perfil-paciente",this.pacienteId]);
        },
        error: (error: any) => {
          alert("Error al guardar la asignación");
        },
        complete: () => {
        }
      });
    }
}
