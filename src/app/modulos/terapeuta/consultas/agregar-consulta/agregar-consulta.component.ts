import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PacienteModelo } from '../../../../modelos/Paciente.modelo';
import { PacienteService } from '../../../../servicios/paciente.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { ConsultaModelo } from '../../../../modelos/Consulta.modelo';
import { ConsultaService } from '../../../../servicios/consulta.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { TestPsicometricoService } from '../../../../servicios/test-psicometrico.service';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';

@Component({
    selector: 'app-agregar-consulta',
    templateUrl: './agregar-consulta.component.html',
    styleUrl: './agregar-consulta.component.css',
    standalone: false
})
export class AgregarConsultaComponent {

  suscripcion: Subscription = new Subscription;
  id: number = 0;
  idTerapeuta: number  = 0;
  fgValidation: FormGroup = new FormGroup({});
  formulario: FormGroup = new FormGroup({});

  testsDisponibles: TestPsicometricoModelo [] = [];

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private servicio: ConsultaService,
    private servicioSeguridad: SeguridadService,
    private servicioTest: TestPsicometricoService,
    private servicioConsultaTest: ConsultaTestService
  ){

  }

  construirFormulario(){
    this.fgValidation = this.fb.group({
      notasConsulta: ['',Validators.required],
      tests: this.fb.array([]),
    });

  }

  ngOnInit(): void {
    this.construirFormulario();
    this.id = parseInt(this.route.snapshot.params["id"]);
    let datos = this.servicioSeguridad.getDataLocalStorage();
    if(datos){
      let info = JSON.parse(datos);
      this.idTerapeuta = info.idPersona;
    }

    this.servicioTest.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.testsDisponibles = data;
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

  get getFGV(){
    return this.fgValidation.controls;
  }

  guardarRegistro(){
    let notasConsulta = this.getFGV['notasConsulta'].value;
    let fechaRegistro= new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });

    let obj = new ConsultaModelo();

    obj.FechaConsulta = fechaRegistro;
    obj.NotasConsulta = notasConsulta;
    obj.pacienteId = this.id;
    obj.terapeutaId = this.idTerapeuta;

    this.servicio.saveRecord(obj).subscribe({
      next: (data: ConsultaModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.asignarTest(data);
        this.router.navigate(["/terapeuta/listar-consulta"]);
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

  get tests(): FormArray {
    return this.fgValidation.get('tests') as FormArray;
  }

  // Agrega un nuevo campo select al FormArray
  agregarTest() {
    this.tests.push(this.fb.control(''));
  }

  // Remueve un campo select específico del FormArray
  eliminarTest(index: number) {
    this.tests.removeAt(index);
  }

  asignarTest(data: ConsultaModelo){
    const testsSeleccionados =this.fgValidation.value.tests.map(Number);
    console.log("IDs",testsSeleccionados);
    const obj = {
      consultaId: data.id,  // ID de la consulta
      testPsicometricoId: testsSeleccionados,
      testPsicometricos : new TestPsicometricoModelo   // Array de IDs de tests seleccionados
    };
    this.servicioConsultaTest.saveRecord(obj).subscribe({
      next: (data: ConsultaTestModelo) => {
        // Manejo de autenticación exitosa
        console.log("Datos Correctos", data);
        this.router.navigate(["/terapeuta/listar-consulta"]);
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
