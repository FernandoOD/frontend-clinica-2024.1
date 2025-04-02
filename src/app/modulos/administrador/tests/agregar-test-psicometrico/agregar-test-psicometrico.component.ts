import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { TerapeutaModelo } from '../../../../modelos/Terapeuta.modelo';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { TerapeutaService } from '../../../../servicios/terapeuta.service';
import { TestPsicometricoService } from '../../../../servicios/test-psicometrico.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';

@Component({
    selector: 'app-agregar-test-psicometrico',
    templateUrl: './agregar-test-psicometrico.component.html',
    styleUrl: './agregar-test-psicometrico.component.css',
    standalone: false
})
export class AgregarTestPsicometricoComponent {

  suscripcion: Subscription = new Subscription;
  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: TestPsicometricoService,
    private router:Router){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  get getFGV(){
    return this.fgValidation.controls;
  }

  guardarRegistro(){
    let nombre = this.getFGV['nombre'].value;
    let descripcion = this.getFGV['descripcion'].value;
    let obj = new TestPsicometricoModelo();

    obj.Nombre = nombre;
    obj.Descripcion = descripcion;

    this.servicio.saveRecord(obj).subscribe({
      next: (data: TestPsicometricoModelo) => {
        // Manejo de autenticación exitosa
        this.router.navigate(["/admin/listar-test-psicometrico"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al guardar el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }
}
