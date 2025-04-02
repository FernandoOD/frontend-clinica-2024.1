import { Component } from '@angular/core';
import { TestPsicometricoService } from '../../../../servicios/test-psicometrico.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
    selector: 'app-editar-test-psicometrico',
    templateUrl: './editar-test-psicometrico.component.html',
    styleUrl: './editar-test-psicometrico.component.css',
    standalone: false
})
export class EditarTestPsicometricoComponent {
  id: number = 0;
  suscripcion: Subscription = new Subscription;

  fgValidation: FormGroup = new FormGroup({});

  constructor(
    private fb:FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicio: TestPsicometricoService,
    private router:Router,
    private route: ActivatedRoute
  ){ }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      id:['',Validators.required],
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = this.route.snapshot.params["id"];
    this.servicio.findRecord(this.id).subscribe({
      next: (data: TestPsicometricoModelo) => {
        // Manejo de autenticación exitosa
        this.getFGV['id'].setValue(data.id);
        this.getFGV['nombre'].setValue(data.Nombre);
        this.getFGV['descripcion'].setValue(data.Descripcion);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("ENo se encuentra el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  get getFGV(){
    return this.fgValidation.controls;
  }

  actualizarRegistro(){
    let id = this.getFGV['id'].value;
    let nombre = this.getFGV['nombre'].value;
    let descripcion = this.getFGV['descripcion'].value;
    let obj = new TestPsicometricoModelo();

    obj.id = id;
    obj.Nombre = nombre;
    obj.Descripcion = descripcion;

    this.servicio.updateRecord(obj).subscribe({
      next: (data: TestPsicometricoModelo) => {
        // Manejo de autenticación exitosa
        this.router.navigate(["/admin/listar-test-psicometrico"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al actualizar el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }
}
