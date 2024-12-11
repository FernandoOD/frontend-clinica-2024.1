import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { ConsultaService } from '../../../../servicios/consulta.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { TestPsicometricoService } from '../../../../servicios/test-psicometrico.service';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { ConsultaModelo } from '../../../../modelos/Consulta.modelo';

@Component({
    selector: 'app-editar-consulta',
    templateUrl: './editar-consulta.component.html',
    styleUrl: './editar-consulta.component.css',
    standalone: false
})
export class EditarConsultaComponent {
  suscripcion: Subscription = new Subscription;
  id: number = 0;
  idTerapeuta: number  = 0;
  fgValidation: FormGroup = new FormGroup({});
  formulario: FormGroup = new FormGroup({});

  testsDisponibles: TestPsicometricoModelo [] = [];
  testActuales: ConsultaTestModelo [] = [];

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
      id: ['',Validators.required],
      fechaConsulta: ['',Validators.required],
      idPaciente: ['',Validators.required],
      idTerapeuta: ['',Validators.required],
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

    this.listarTest();
    this.encontrarTests();

    this.servicio.findRecord(this.id).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.getFGV['id'].setValue(data.id);
        this.getFGV['notasConsulta'].setValue(data.NotasConsulta);
        this.getFGV['fechaConsulta'].setValue(data.FechaConsulta);
        this.getFGV['idPaciente'].setValue(data.pacienteId);
        this.getFGV['idTerapeuta'].setValue(data.terapeutaId);

        for (let i = 0; i < this.testActuales.length; i++) {
          this.agregarTest();
          this.tests.at(i).setValue(this.testActuales[i].testPsicometricoId);
        }          
        console.log("Tests", this.testActuales);
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

  get tests(): FormArray {
    return this.fgValidation.get('tests') as FormArray;
  }
  
  agregarTest() {
    this.tests.push(this.fb.control(''));
  }

  // Remueve un campo select específico del FormArray
  eliminarTest(index: number) {
    this.tests.removeAt(index);
  }

  actualizarRegistro(){
    let id = this.getFGV['id'].value;
    let notasConsulta = this.getFGV['notasConsulta'].value;
    let fechaConsulta = this.getFGV['fechaConsulta'].value;
    let idPaciente = this.getFGV['idPaciente'].value;
    let idTerapeuta = this.getFGV['idTerapeuta'].value;

    let obj = new ConsultaModelo();

    obj.id = id;
    obj.FechaConsulta = fechaConsulta;
    obj.NotasConsulta = notasConsulta;
    obj.pacienteId = idPaciente;
    obj.terapeutaId = idTerapeuta;

    this.servicio.updateRecord(obj).subscribe({
      next: (data: ConsultaModelo) => {
        // Manejo de autenticación exitosa
        console.log("Registro actualizado correctamente", data);
        this.updateTest(data);
        this.router.navigate(["/terapeuta/listar-consulta"]);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error al actualizar", error);
        alert("Error al actualizar el registro");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de actualizado completado');
      }
    });
  }

  listarTest(){
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
  
  encontrarTests(){
    this.servicioConsultaTest.findRecords(this.id).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.testActuales = data;
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al listar los datos");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de obtención completado');
      }
    });
  }

  updateTest(data :ConsultaModelo){
    const testsSeleccionados =this.fgValidation.value.tests.map(Number);
     let agregar = testsSeleccionados.filter((id: ConsultaTestModelo) => !this.testActuales.includes(id));
     let eliminar = this.testActuales.filter((id: ConsultaTestModelo) => !testsSeleccionados.includes(id));

     console.log("agregar",agregar);
     console.log("eliminar",eliminar);

     if(eliminar != null){
      for(let  consultaTest of eliminar){
        this.servicioConsultaTest.deleteRecord(consultaTest.id).subscribe({
          next: (data) => {
            console.log("Test eliminado correctamente");
          },
          error: (error: any) => {
            // Manejo de error en autenticación
            console.error("No pudimos eliminar el test", error);
            alert("No se pudo eliminar el test");
          }
        });
       }
     }

     if(agregar != null){
      const obj = {
        consultaId: this.id,  // ID de la consulta
        testPsicometricoId: agregar,
        testPsicometricos : new TestPsicometricoModelo   // Array de IDs de tests seleccionados
      };
      this.servicioConsultaTest.saveRecord(obj).subscribe({
        next: (data) => {
          console.log("Test agregado correctamente",data);
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("No pudimos agregar el test", error);
          alert("No se pudo agregar el test");
        }
      });
    }
  }
}
