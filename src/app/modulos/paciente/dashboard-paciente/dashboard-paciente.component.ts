import { Component } from '@angular/core';
import { TestPsicometricoModelo } from '../../../modelos/TestPsicometrico.modelo';
import { TestPsicometricoService } from '../../../servicios/test-psicometrico.service';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModelo } from '../../../modelos/Usuario.modelo';
import { ConsultaService } from '../../../servicios/consulta.service';
import { ConsultaModelo } from '../../../modelos/Consulta.modelo';
import { ConsultaTestService } from '../../../servicios/consulta-test.service';
import { ConsultaTestModelo } from '../../../modelos/ConsultaTest.modelo';
import { ConsultaResultadoTestService } from '../../../servicios/consulta-resultado-test.service';
import { Router } from '@angular/router';
import { PacienteEjercicioService } from '../../../servicios/paciente-ejercicio.service';
import { PacienteEjercicioModelo } from '../../../modelos/PacienteEjercicio.modelo';
import { EjercicioPracticoService } from '../../../servicios/ejercicio-practico.service';
import { ModuloPsicoeducativoModelo } from '../../../modelos/ModuloPsicoeducativo.modelo';
import { EjercicioPracticoModelo } from '../../../modelos/EjercicioPractico.modelo';
import { ModuloPsicoeducativoService } from '../../../servicios/modulo-psicoeducativo.service';
import { PacienteService } from '../../../servicios/paciente.service';

@Component({
  selector: 'app-dashboard-paciente',
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css'
})
export class DashboardPacienteComponent {
  suscripcion: Subscription = new Subscription;
  idPaciente: number=0;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaConsultas: ConsultaModelo [] = [];
  listaRegistros: TestPsicometricoModelo[] = [];
  listaConsultaTest: ConsultaTestModelo[] = [];
  listaConjunta?: any[] = [];
  listaEjerciciosPracticos : any []  = [];
  listaModulos: ModuloPsicoeducativoModelo [] = [];
  listaEjercicios: EjercicioPracticoModelo [] = [];
  ejerciciosAsignadosConModulo : any [] = [];

  userName: String | undefined = '';
  
  constructor (
    private servicio: TestPsicometricoService,
    private servicioSeguridad: SeguridadService,
    private servicioConsultas: ConsultaService,
    private servicioConsultaTest: ConsultaTestService,
    private servicioConsultaResultadoTest: ConsultaResultadoTestService,
    private servicioPacienteEjercicio: PacienteEjercicioService,
    private servicioEjercicioPractico: EjercicioPracticoService,
    private servicioModuloPsicoeducativo: ModuloPsicoeducativoService,
    private router : Router,
    private servicioPaciente: PacienteService
   ){

  }

  ngOnInit(): void {
    let datos = this.servicioSeguridad.getDataLocalStorage();
    if(datos){
      let objetoDatos = JSON.parse(datos);
      this.idPaciente = objetoDatos.idPersona;
    }

    this.buscarConsultas();
    this.toDoExcersises();

    

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

    this.getUsername();
  }

  getUsername(){
    let datos = this.servicioSeguridad.getDataLocalStorage();
    let objetoDatos : UsuarioModelo;
    if(datos){
      objetoDatos = JSON.parse(datos);
        if(objetoDatos.idPersona){
          let paciente = this.servicioPaciente.findRecord(objetoDatos.idPersona);
          paciente.subscribe({
            next: (data) => {
              // Manejo de autenticación exitosa
              this.userName=data.Nombre+" "+data.ApellidoPaterno+" "+data.ApellidoMaterno;
            }
          });
        }
    }
    
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

  buscarConsultas(){
    this.servicioConsultas.listRecordsPaciente(this.idPaciente).subscribe({
       next: (data) => {
        // Manejo de autenticación exitosa
        this.listaConsultas = data;
        console.log("Datos listados", data);
        this.buscarConsultaTest();
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al listar las consultas");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }

  buscarConsultaTest(){
    for(let consulta of this.listaConsultas){
      this.servicioConsultaTest.findRecords(consulta.id).subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaConsultaTest.push(...data);
          console.log("Datos listados", data);
          this.buscarTests();
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("Error de autenticación", error);
          alert("Error al listar las consultas");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
          console.log('Proceso de guardado completado');
        }
      });
    }
  }

  buscarTests(){
    for(let ConsultaTest of this.listaConsultaTest){
      this.servicio.listRecords().subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaRegistros = data;
          this.juntarListas();
          console.log("lista Registros", this.listaRegistros);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("Error de autenticación", error);
          alert("Error al listar las consultas");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
          console.log('Proceso de guardado completado');
        }
      })
    }
  }

  responderTest(id: number, nombre?: String, consultaId?: number, consultaTestId?: number){
    let obj = new TestPsicometricoModelo();
    obj.id = id;
    obj.Nombre = nombre;
    obj.consultaId = consultaId;
    this.servicioConsultaResultadoTest.getTokenTest(obj).subscribe({
      next: (data: TestPsicometricoModelo) => {
        // Manejo de autenticación exitosa
        this.servicioSeguridad.dataSaveTest(data,consultaTestId);
        this.router.navigate(['/paciente/'+data.test?.Nombre+'-test']);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al obtener token");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }

  juntarListas() {
    console.log("Lista Consultas", this.listaConsultas);
    console.log("Lista ConsultasTest", this.listaConsultaTest);
    console.log("Lista Registros", this.listaRegistros);
  
    // Filtrar consultas con al menos un test sin responder
    this.listaConjunta = this.listaConsultas
      .filter((consulta) => {
        // Obtener relaciones para esta consulta
        const relaciones = this.listaConsultaTest.filter(
          (rel) => rel.consultaId === consulta.id
        );
  
        // Verificar si hay al menos un test sin responder
        return relaciones.some((rel) =>
          this.listaRegistros.some((test) => test.id === rel.testPsicometricoId)
        );
      })
      .map((consulta) => {
        // Obtener relaciones para esta consulta
        const relaciones = this.listaConsultaTest.filter(
          (rel) => rel.consultaId === consulta.id
        );
        console.log(`Relaciones para Consulta ${consulta.id}:`, relaciones);
  
        // Mapear los tests relacionados con sus datos
        const testsRelacionados = relaciones
          .map((rel) => {
            const test = this.listaRegistros.find(
              (test) => test.id === rel.testPsicometricoId
            );
            if (test) {
              return {
                ...test,
                consultaTestId: rel.id, // Añadir el ID de consultaTest
              };
            } else {
              console.warn(`No se encontró el test con ID ${rel.testPsicometricoId}`);
              return null;
            }
          })
          .filter((test) => test !== null); // Eliminar valores nulos
  
        // Retornar el objeto combinado
        return {
          ...consulta,
          tests: testsRelacionados,
        };
      });
  
    console.log("Lista Conjunta:", this.listaConjunta);
  }

  toDoExcersises(){
    this.servicioPacienteEjercicio.findRecords(this.idPaciente).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaEjerciciosPracticos  = data;
        console.log("toDoExcersises",this.listaEjerciciosPracticos)
        this.obtenerModulos();
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error al obtener ejercicios", error);
        alert("Error al obtener ejercicios");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de listado completo');
      }
    });
  }

  obtenerModulos(){
      this.servicioModuloPsicoeducativo.listRecords().subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaModulos = data;
          console.log("listaModulos",this.listaModulos);
          this.listarEjercicios();
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          console.error("Error al obtener ejercicios", error);
          alert("Error al obtener ejercicios");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
          console.log('Proceso de listado completo');
        }
      });
  }

  listarEjercicios(){
    for(let modulo of this.listaModulos){
      this.servicioEjercicioPractico.listRecords(modulo.id).subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaEjercicios.push(...data);
          console.log("lista Ejercicios", this.listaEjercicios);
          this.formarListaEjerciciosFinal();
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
  }

  formarListaEjerciciosFinal(){
    this.ejerciciosAsignadosConModulo = this.listaEjerciciosPracticos.map(ejercicioPractico => {
      // Encontrar el ejercicio correspondiente
      const ejercicio = this.listaEjercicios.find(e => e.id === ejercicioPractico.ejercicioPracticoId);
    
      if (!ejercicio) return null; // Si no se encuentra, ignorarlo
    
      // Encontrar el módulo correspondiente
      const modulo = this.listaModulos.find(m => m.id === ejercicio.moduloPsicoeducativoId);
    
      return {
        id: ejercicio.id,
        nombre: ejercicio.Titulo,
        moduloId: ejercicio.moduloPsicoeducativoId,
        moduloTitulo: modulo ? modulo.Titulo : "Módulo no encontrado",
        checked: false
      };
    }).filter(e => e !== null); // Eliminar posibles nulls
    
    console.log(this.ejerciciosAsignadosConModulo);
  }

  onCheckboxChange(ejercicio: any): void {
    console.log(`${ejercicio.nombre} está ${ejercicio.checked ? 'seleccionado' : 'no seleccionado'}`);
  }

}
