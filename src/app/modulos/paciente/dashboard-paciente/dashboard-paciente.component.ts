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

import { ChartData, ChartEvent, ChartType, ChartOptions, Chart, RadialLinearScale, ChartConfiguration, DoughnutController,ArcElement, RadarController, PointElement, LineElement, CategoryScale, BarElement, BarController , LinearScale } from 'chart.js';
import { forkJoin } from 'rxjs';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import { ConsultaResultadoTestModelo } from '../../../modelos/ConsultaResultadoTest.modelo';
import { PacienteModuloService } from '../../../servicios/paciente-modulo.service';
import { PacienteModuloModelo } from '../../../modelos/PacienteModulo.modelo';

Chart.register(DoughnutController,ArcElement,RadarController,RadialLinearScale,PointElement,LineElement,CategoryScale,BarElement, BarController, LinearScale, ChartDataLabels);


@Component({
    selector: 'app-dashboard-paciente',
    templateUrl: './dashboard-paciente.component.html',
    styleUrl: './dashboard-paciente.component.css',
    standalone: false
})
export class DashboardPacienteComponent {

  chart1: Chart | null = null;
  chart2: Chart | null = null;
  chart3: Chart | null = null;
  chart4: Chart | null = null;
  chart5: Chart | null = null;
  chart6: Chart | null = null;
  chart7: Chart | null = null;

  chartInstances: { [key: string]: Chart | null } = {};

  suscripcion: Subscription = new Subscription;
  idPaciente: number=0;

  ordenAscendente: boolean = true;
  campoOrdenar: string = '';

  currentScoreDepresion : number = 0;
  interpretacion : String = "No Hay Interpretación";

  puntuacionDSM5 : string = '';
  depresion : number = 0;
  irritabilidad: number = 0;
  ansiedad: number = 0;
  autolesion: number = 0;
  severidadGeneral : String = "No hay Severidad";

  puntuacionETrA : string = '';
  ansiedadGeneralizada : number = 0;
  ansiedadSocial: number  = 0;
  sintomasFisicos: number = 0;
  severidadGeneralETrA : String = "No hay Severidad";

  consultasConEvaluacion : any [] = [];

  puntuacionPBQ : string = '';
  evitativo: number = 0;
  dependiente: number = 0;
  obsesivo: number = 0;
  antisocial: number = 0;
  narcisista: number = 0;
  histrionica: number = 0;
  esquizoide: number = 0;
  paranoide:number = 0;
  limite:number = 0;
  clasificacionesPBQ : String = '';


  puntuacionYSQ : string = '';
  privacionEmocional: number = 0;
  abandono: number = 0;
  desconfianzaAbuso: number = 0;
  aislamientoSocial: number = 0;
  defectuosidad: number = 0;
  fracaso: number = 0;
  incompetencia: number = 0;
  vulnerabilidad:number = 0;
  simbiosis:number = 0;
  subyugacion : number = 0;
  sacrificio : number = 0;
  inhibicionEmocional : number = 0;
  estandaresInalcanzables : number = 0;
  grandiosidad : number = 0;
  disciplinaInsuficiente : number = 0;
  clasificacionesYSQ : String = '';

  ordenActual: string = '';  // Columna que está ordenada

  listaConsultas: ConsultaModelo [] = [];
  listaRegistros: TestPsicometricoModelo[] = [];
  listaConsultaTest: any[] = [];
  listaConjunta?: any[] = [];
  listaEjerciciosPracticos : any []  = [];
  listaModulosPsicoeducativos: PacienteModuloModelo [] = [];
  listaModulos: ModuloPsicoeducativoModelo [] = [];
  listaEjercicios: EjercicioPracticoModelo [] = [];
  ejerciciosAsignados : any [] = [];
  modulosAsignados: any [] = [];
  listaConsultaResultadoTest: ConsultaResultadoTestModelo [] = [];
  listaConsultaResultadoTest2: ConsultaResultadoTestModelo [] = [];
  listaConsultaResultadoTest3: ConsultaResultadoTestModelo [] = [];
  listaConsultaResultadoTest4: ConsultaResultadoTestModelo [] = [];
  listaConsultaResultadoTest5: ConsultaResultadoTestModelo [] = [];
  listaConsultaResultadoTest6: ConsultaResultadoTestModelo [] = [];
  listaConsultaResultadoTest7: ConsultaResultadoTestModelo [] = [];
  userName: String | undefined = '';

  currentScoreAutoestima : number = 0;
  interpretacionAutoestima : String = "No Hay Interpretación";

  currentScoreBAI : number = 0;
  interpretacionBAI : String = "No Hay Interpretación";
  
  constructor (
    private servicio: TestPsicometricoService,
    private servicioSeguridad: SeguridadService,
    private servicioConsultas: ConsultaService,
    private servicioConsultaTest: ConsultaTestService,
    private servicioConsultaResultadoTest: ConsultaResultadoTestService,
    private servicioPacienteEjercicio: PacienteEjercicioService,
    private servicioPacienteModulo: PacienteModuloService,
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
    this.toDoModules();
    

    this.servicio.listRecords().subscribe({
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

  consultasEnEvaluacion(){
    this.consultasConEvaluacion = this.listaConsultas.map((consulta, index) => ({
      ...consulta,
      evaluacion: `Evaluación ${index + 1}`,
      color: this.getRandomBlue()
  }));
  }

  getRandomBlue(): string {
    const r = 100; // Rojo bajo
    const g = 150; // Verde medio
    const b = Math.floor(Math.random() * 156) + 100; // Azul varía entre 100 y 255
    return `rgb(${r}, ${g}, ${b})`;
  }

  buscarConsultas(){
    this.servicioConsultas.listRecordsPaciente(this.idPaciente).subscribe({
       next: (data) => {
        // Manejo de autenticación exitosa
        this.listaConsultas = data;
        this.buscarConsultaTest();
        this.consultasEnEvaluacion();
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al listar las consultas");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  buscarConsultaTest() {
    const peticiones = this.listaConsultas.map(consulta => 
      this.servicioConsultaTest.findRecords(consulta.id)
    );
  
    forkJoin(peticiones).subscribe({
      next: (resultados) => {
        // Combinar todas las respuestas en `listaConsultaTest`
        this.listaConsultaTest = resultados.flat();
        this.juntarListas();
      },
      error: (error) => {
        alert("Error al listar las consultas");
      },
      complete: () => {
      }
    });
  }


  responderTest(id: number, nombre?: String, consultaId?: number, consultaTestId?: number){
    let obj = new TestPsicometricoModelo();
    obj.id = id;
    obj.Nombre = nombre;
    obj.consultaId = consultaId;
    this.servicioSeguridad.deleteDataTest();
    this.servicioConsultaResultadoTest.getTokenTest(obj).subscribe({
      next: (data: TestPsicometricoModelo) => {
        // Manejo de autenticación exitosa
        this.servicioSeguridad.dataSaveTest(data,consultaTestId);
        this.router.navigate(['/paciente/'+data.test?.Nombre+'-test']);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al obtener token");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  juntarListas() {
  
    // Filtrar consultasTest donde contestado sea igual a false
    const consultasTestNoContestadas = this.listaConsultaTest.filter(
      (rel) => rel.contestado === false
    );
  
    // Filtrar consultas con al menos un test sin responder
    this.listaConjunta = this.listaConsultas
      .filter((consulta) => {
        // Obtener relaciones para esta consulta
        const relaciones = consultasTestNoContestadas.filter(
          (rel) => rel.consultaId === consulta.id
        );
  
        // Verificar si hay al menos un test sin responder
        return relaciones.some((rel) =>
          this.listaRegistros.some((test) => test.id === rel.testPsicometricoId)
        );
      })
      .map((consulta) => {
        // Obtener relaciones para esta consulta
        const relaciones = consultasTestNoContestadas.filter(
          (rel) => rel.consultaId === consulta.id
        );
  
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
              console.warn(
                `No se encontró el test con ID ${rel.testPsicometricoId}`
              );
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
  }

  toDoExcersises(){
    this.servicioPacienteEjercicio.findRecords(this.idPaciente).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaEjerciciosPracticos  = data;
        this.obtenerModulos();
        this.formarListaEjerciciosFinal();
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al obtener ejercicios");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  toDoModules(){
    this.servicioPacienteModulo.findRecords(this.idPaciente).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaModulosPsicoeducativos  = data;
        this.formarListaModulosFinal();
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxit
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al obtener ejercicios");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  obtenerModulos(){
      this.servicioModuloPsicoeducativo.listRecords().subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaModulos = data;
          this.listarEjercicios();
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al obtener modulos");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
  }

  listarEjercicios(){
    for(let modulo of this.listaModulos){
      this.servicioEjercicioPractico.listRecords(modulo.id).subscribe({
        next: (data) => {
          // Manejo de autenticación exitosa
          this.listaEjercicios.push(...data);
          this.formarListaEjerciciosFinal();
          this.formarListaModulosFinal();
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
  }

  formarListaEjerciciosFinal(){
    this.ejerciciosAsignados= this.listaEjerciciosPracticos.map(ejercicioPractico => {
      // Encontrar el ejercicio correspondiente
      const ejercicio = this.listaEjercicios.find(e => e.id === ejercicioPractico.ejercicioPracticoId);
    
      if (!ejercicio) return null; // Si no se encuentra, ignorarlo
  
    
      return {
        id: ejercicioPractico.id,
        ejercicioPracticoId: ejercicio.id,
        nombre: ejercicio.Titulo,
        moduloId: ejercicio.moduloPsicoeducativoId,
        contestado: ejercicioPractico.contestado
      };
    }).filter(e => e !== null && e.contestado !== true); // Eliminar posibles nulls
  }

  formarListaModulosFinal(){
    this.modulosAsignados= this.listaModulosPsicoeducativos.map(moduloPsicoeducativo => {
      // Encontrar el ejercicio correspondiente
      const modulo = this.listaModulos.find(m => m.id === moduloPsicoeducativo.moduloPsicoeducativoId);
    
      if (!modulo) return null; // Si no se encuentra, ignorarlo
  
    
      return {
        id: moduloPsicoeducativo.id,
        moduloPsicoeducativoId: modulo.id,
        nombre: modulo.Titulo,
        descripcion: modulo.Descripcion,
        contestado: moduloPsicoeducativo.contestado
      };
    }).filter(m => m !== null && m?.contestado !== true); // Eliminar posibles nulls
  }

  onCheckboxChangeEjercicio(ejercicio: any): void {
    this.marcarEjercicioContestado(ejercicio);
  }

  onCheckboxChangeModulo(modulo: any): void {
    this.marcarModuloContestado(modulo);
  }

  marcarEjercicioContestado(ejercicio: any){
    let obj = new PacienteEjercicioModelo();

    obj.id = ejercicio.id;
    obj.pacienteId = this.idPaciente;
    obj.ejercicioPracticoId = ejercicio.ejercicioPracticoId;
    obj.contestado = true;

    this.servicioPacienteEjercicio.updateRecord(obj).subscribe({
      next: (data: PacienteEjercicioModelo) => {
        // Manejo de autenticación exitosa
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al marcar contestado en pacienteEjercicio");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }

  marcarModuloContestado(modulo: any){
    let obj = new PacienteModuloModelo();

    obj.id = modulo.id;
    obj.pacienteId = this.idPaciente;
    obj.moduloPsicoeducativoId = modulo.moduloPsicoeducativoId;
    obj.contestado = true;

    this.servicioPacienteModulo.updateRecord(obj).subscribe({
      next: (data: PacienteModuloModelo) => {
        // Manejo de autenticación exitosa
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al marcar contestado en pacienteModulo");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
  }
}
