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
  listaModulos: ModuloPsicoeducativoModelo [] = [];
  listaEjercicios: EjercicioPracticoModelo [] = [];
  ejerciciosAsignadosConModulo : any [] = [];
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

  async buscarConsultas(){
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

  buscarConsultaTest() {
    const peticiones = this.listaConsultas.map(consulta => 
      this.servicioConsultaTest.findRecords(consulta.id)
    );
  
    forkJoin(peticiones).subscribe({
      next: (resultados) => {
        // Combinar todas las respuestas en `listaConsultaTest`
        this.listaConsultaTest = resultados.flat();
        console.log("Datos listados ConsultaTest", this.listaConsultaTest);
  
        // Llamar a `pintarGraficas()` solo cuando todas las consultas terminen
        this.pintarGraficas();
      },
      error: (error) => {
        console.error("Error al listar las consultas", error);
        alert("Error al listar las consultas");
      },
      complete: () => {
        console.log('Todas las consultas han sido procesadas');
      }
    });
  }
  

  pintarGraficas(){
          this.juntarListas();
          this.graficarBDI();
          //this.graficarDSM5();
          this.graficarETrA();
          this.graficarPBQ();
          this.graficarYSQ();
          this.graficarAutoestima();
          this,this.graficarBAI();
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
  
    // Filtrar consultasTest donde contestado sea igual a false
    const consultasTestNoContestadas = this.listaConsultaTest.filter(
      (rel) => rel.contestado === false
    );
  
    console.log("ConsultasTest no contestadas:", consultasTestNoContestadas);
  
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
  
    console.log("Lista Conjunta", this.listaConjunta);
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

  createDoughnutChart(id : string, data: number [], totalScore: number, currentScore: number, chartRef: { current: Chart | null }, labels: string [],colors: string[]): void {
    const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
    console.log("Puntuación: ",currentScore);
    if (ctx) {
      if (chartRef.current) chartRef.current.destroy(); // Destruye el gráfico anterior si existe
      chartRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data, // Rangos acumulados: [13, 19, 28, 63]
              backgroundColor: colors,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
            datalabels: {
              display: false, // Solo en gráficos de barras
              },
          },
          cutout: '70%', // Ajustar el corte para hacer un donut
          rotation: -90, // Rotación inicial del gráfico
          circumference: 180, // Circunferencia del gráfico (media dona)
          animation: {
            duration: 3000,
            easing: 'easeOutCubic' as 'easeOutCubic' | 'linear' | 'easeInQuad' | 'easeOutQuad',
            onProgress: (animation: any) => {
              const chart = animation.chart;
              const progress = animation.currentStep / animation.numSteps;
              chart.config.options.animationValue = progress * currentScore;
            },
            onComplete: (animation: any) => {
              const chart = animation.chart;
              chart.config.options.animationValue = currentScore;
              chart.config.options.animation = false;
            },
          },
        },
        plugins: [{
          id: 'needle',
          beforeDraw: (chart: any) => {
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            const animationValue = chart.config.options.animationValue || 0;
  
            // Coordenadas del centro
            const centerX = width / 2;
            const centerY = chart.chartArea.bottom-115;
  
            // Calcular el ángulo animado
            const needleValue = (animationValue / totalScore) * 180; // Convertir el puntaje a grados
            const needleLength = height / 2.5;
            const angle = ((needleValue - 180) * Math.PI) / 180;
  
            // Coordenadas del extremo de la aguja
            const endX = centerX + needleLength * Math.cos(angle);
            const endY = centerY + needleLength * Math.sin(angle);
  
            // Dibujar la aguja
            ctx.save();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.restore();
  
            // Dibujar el círculo del centro
            ctx.save();
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }]
      });
    }
  }

  graficarBDI() {
    // Filtrar listaConsultaTest para incluir solo registros con contestado === true
    const consultasContestadas = this.listaConsultaTest.filter(
        (test) => test.contestado === true && test.testPsicometricoId == 1

    );
    console.log("ConsultasContestadas",consultasContestadas);
    if (consultasContestadas.length === 0) {
      console.warn("No hay consultas contestadas.");
      return; // Termina la ejecución si no hay consultas contestadas
    }
  
    // Encontrar la consultaTest con el mayor consultaId
    let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
      if (current.consultaId != undefined && max.consultaId != undefined) {
        return current.consultaId > max.consultaId ? current : max;
      } else {
        return new ConsultaTestModelo();
      }
    });
  
    console.log("Consulta con mayor ID:", consultaTestConMayorId);
  
    // Realizar la consulta para los resultados asociados
    this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
      next: (data: any) => {
        // Manejo de autenticación exitosa
        this.listaConsultaResultadoTest = data;
        this.listaConsultaResultadoTest = this.listaConsultaResultadoTest.filter(
          (test) =>test.testPsicometricoId === 1
        );
  
        // Establecer el currentScore si está definido
        if (this.listaConsultaResultadoTest[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest[0]?.Interpretacion != undefined) {
          this.currentScoreDepresion = parseInt(this.listaConsultaResultadoTest[0].Puntuacion);
          this.interpretacion = this.listaConsultaResultadoTest[0].Interpretacion;
        } else {
          console.warn("Puntuación no definida en el primer registro de resultados.");
        }
        this.createDoughnutChart('depresion',[10, 10, 10, 33], 63, this.currentScoreDepresion, { current: this.chart1 },['Mínima', 'Leve', 'Moderada','Grave'],['#2ecc71', '#f7dc6f', '#f39c12','#e74c3c']);
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }

  graficarAutoestima() {
    // Filtrar listaConsultaTest para incluir solo registros con contestado === true
    const consultasContestadas = this.listaConsultaTest.filter(
        (test) => test.contestado === true && test.testPsicometricoId == 5

    );
    console.log("ConsultasContestadas",consultasContestadas);
    if (consultasContestadas.length === 0) {
      console.warn("No hay consultas contestadas.");
      return; // Termina la ejecución si no hay consultas contestadas
    }
  
    // Encontrar la consultaTest con el mayor consultaId
    let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
      if (current.consultaId != undefined && max.consultaId != undefined) {
        return current.consultaId > max.consultaId ? current : max;
      } else {
        return new ConsultaTestModelo();
      }
    });
  
    console.log("Consulta con mayor ID:", consultaTestConMayorId);
  
    // Realizar la consulta para los resultados asociados
    this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
      next: (data: any) => {
        // Manejo de autenticación exitosa
        this.listaConsultaResultadoTest5 = data;
        this.listaConsultaResultadoTest5 = this.listaConsultaResultadoTest5.filter(
          (test) =>test.testPsicometricoId === 5
        );
  
        // Establecer el currentScore si está definido
        if (this.listaConsultaResultadoTest5[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest5[0]?.Interpretacion != undefined) {
          this.currentScoreAutoestima = parseInt(this.listaConsultaResultadoTest5[0].Puntuacion);
          this.interpretacionAutoestima = this.listaConsultaResultadoTest5[0].Interpretacion;
          console.log("currentScore", this.currentScoreAutoestima);
        } else {
          console.warn("Puntuación no definida en el primer registro de resultados.");
        }

        this.createDoughnutChart('autoestima',[25, 5, 10], 40, this.currentScoreAutoestima, { current: this.chart5 },['Baja', 'Media', 'Elevada'],['#8e44ad', '#345dea', '#fed728']);
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }

  graficarBAI() {
    // Filtrar listaConsultaTest para incluir solo registros con contestado === true
    const consultasContestadas = this.listaConsultaTest.filter(
        (test) => test.contestado === true && test.testPsicometricoId == 7

    );
    console.log("ConsultasContestadas",consultasContestadas);
    if (consultasContestadas.length === 0) {
      console.warn("No hay consultas contestadas.");
      return; // Termina la ejecución si no hay consultas contestadas
    }
  
    // Encontrar la consultaTest con el mayor consultaId
    let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
      if (current.consultaId != undefined && max.consultaId != undefined) {
        return current.consultaId > max.consultaId ? current : max;
      } else {
        return new ConsultaTestModelo();
      }
    });
  
    console.log("Consulta con mayor ID:", consultaTestConMayorId);
  
    // Realizar la consulta para los resultados asociados
    this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
      next: (data: any) => {
        // Manejo de autenticación exitosa
        this.listaConsultaResultadoTest7 = data;
        this.listaConsultaResultadoTest7 = this.listaConsultaResultadoTest7.filter(
          (test) =>test.testPsicometricoId === 7
        );
  
        // Establecer el currentScore si está definido
        if (this.listaConsultaResultadoTest7[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest7[0]?.Interpretacion != undefined) {
          this.currentScoreBAI = parseInt(this.listaConsultaResultadoTest7[0].Puntuacion);
          this.interpretacionBAI = this.listaConsultaResultadoTest7[0].Interpretacion;
          console.log("currentScore", this.currentScoreBAI);
        } else {
          console.warn("Puntuación no definida en el primer registro de resultados.");
        }

        this.createDoughnutChart('BAI',[10, 10, 10, 33], 63, this.currentScoreBAI, { current: this.chart7 },['Mínima', 'Leve', 'Moderada','Grave'],['#2ecc71', '#f7dc6f', '#f39c12','#e74c3c']);
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });
  }


  graficarDSM5(){
    const consultasContestadas = this.listaConsultaTest.filter(
      (test) => test.contestado === true && test.testPsicometricoId == 3

  );
  console.log("ConsultasContestadas",consultasContestadas);
  if (consultasContestadas.length === 0) {
    console.warn("No hay consultas contestadas.");
    return; // Termina la ejecución si no hay consultas contestadas
  }

  // Encontrar la consultaTest con el mayor consultaId
  let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
    if (current.consultaId != undefined && max.consultaId != undefined) {
      return current.consultaId > max.consultaId ? current : max;
    } else {
      return new ConsultaTestModelo();
    }
  });

  console.log("Consulta con mayor ID:", consultaTestConMayorId);

  // Realizar la consulta para los resultados asociados
  this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
    next: (data: any) => {
      // Manejo de autenticación exitosa
      this.listaConsultaResultadoTest3 = data;
      this.listaConsultaResultadoTest3 = this.listaConsultaResultadoTest3.filter(
        (test) =>test.testPsicometricoId === 3
      );

      // Establecer el currentScore si está definido
      if (this.listaConsultaResultadoTest3[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest3[0]?.Interpretacion != undefined) {
        this.puntuacionDSM5 = this.listaConsultaResultadoTest3[0].Puntuacion;
        const valores = this.puntuacionDSM5.split(",").map(Number);
        this.depresion = valores[1];
        this.irritabilidad = valores[2];
        this.ansiedad = valores[3];
        this.autolesion = valores[4];
        this.severidadGeneral = this.listaConsultaResultadoTest3[0].Interpretacion;
        this.createSpiderChart('DSM5',[this.depresion,this.irritabilidad,this.ansiedad,this.autolesion],['Depresión', 'Irritabilidad', 'Ansiedad', 'Autolesión'],{current: this.chart3});
      } else {
        console.warn("Puntuación no definida en el primer registro de resultados.");
      }
    },
    error: (error: any) => {
      // Manejo de error en autenticación
      console.error("Error de autenticación", error);
      alert("Error al listar los resultados");
    },
    complete: () => {
      // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      console.log('Proceso de obtención completado');
    }
  });
  }

  graficarETrA(){
    const consultasContestadas = this.listaConsultaTest.filter(
      (test) => test.contestado === true && test.testPsicometricoId == 4

  );
  console.log("ConsultasContestadas",consultasContestadas);
  if (consultasContestadas.length === 0) {
    console.warn("No hay consultas contestadas.");
    return; // Termina la ejecución si no hay consultas contestadas
  }

  // Encontrar la consultaTest con el mayor consultaId
  let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
    if (current.consultaId != undefined && max.consultaId != undefined) {
      return current.consultaId > max.consultaId ? current : max;
    } else {
      return new ConsultaTestModelo();
    }
  });

  console.log("Consulta con mayor ID:", consultaTestConMayorId);

  // Realizar la consulta para los resultados asociados
  this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
    next: (data: any) => {
      // Manejo de autenticación exitosa
      this.listaConsultaResultadoTest4 = data;
      this.listaConsultaResultadoTest4 = this.listaConsultaResultadoTest4.filter(
        (test) =>test.testPsicometricoId === 4
      );
      console.log("ConsultaResultadoTest4", this.listaConsultaResultadoTest4);

      // Establecer el currentScore si está definido
      if (this.listaConsultaResultadoTest4[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest4[0]?.Interpretacion != undefined) {
        this.puntuacionETrA = this.listaConsultaResultadoTest4[0].Puntuacion;
        console.log("Puntuaciones de ETRA",this.puntuacionETrA);
        const valores = this.puntuacionETrA.split(",").map(Number);
        this.ansiedadGeneralizada = valores[1];
        this.ansiedadSocial = valores[2];
        this.sintomasFisicos = valores[3];
        this.severidadGeneralETrA = this.listaConsultaResultadoTest4[0].Interpretacion;
        //this.createSpiderChart('ETRA',[this.ansiedadGeneralizada,this.ansiedadSocial,this.sintomasFisicos],['Ansiedad Generalizada', 'Ansiedad Social', 'Síntomas Físicos'],{current: this.chart4});
        this.createBarChart('ETRABar',[this.ansiedadGeneralizada, this.ansiedadSocial, this.sintomasFisicos],['Ansiedad Generalizada','Ansiedad Social','Síntomas Físicos'],[17,17,14],{current: this.chart4});
      } else {
        console.warn("Puntuación no definida en el primer registro de resultados.");
      }
    },
    error: (error: any) => {
      // Manejo de error en autenticación
      console.error("Error de autenticación", error);
      alert("Error al listar los resultados");
    },
    complete: () => {
      // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      console.log('Proceso de obtención completado');
    }
  });
  }

  createSpiderChart(id: string,data: number[],labels: string[], chartRef: { current: Chart | null }): void {
    const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels, // Etiquetas
          datasets: [
            {
              label: 'DSM-5',
              data: data, // Puntuaciones dinámicas
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            r: { // Configuración del radio
              suggestedMin: 0,
              suggestedMax: 12, // Ajusta según el puntaje máximo
              ticks: {
                //beginAtZero: true
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
  }



  graficarPBQ(){
    const consultasContestadas = this.listaConsultaTest.filter(
      (test) => test.contestado === true && test.testPsicometricoId == 2

  );
  console.log("ConsultasContestadas",consultasContestadas);
  if (consultasContestadas.length === 0) {
    console.warn("No hay consultas contestadas.");
    return; // Termina la ejecución si no hay consultas contestadas
  }

  // Encontrar la consultaTest con el mayor consultaId
  let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
    if (current.consultaId != undefined && max.consultaId != undefined) {
      return current.consultaId > max.consultaId ? current : max;
    } else {
      return new ConsultaTestModelo();
    }
  });

  console.log("Consulta con mayor ID:", consultaTestConMayorId);

  // Realizar la consulta para los resultados asociados
  this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
    next: (data: any) => {
      // Manejo de autenticación exitosa
      this.listaConsultaResultadoTest2 = data;
      this.listaConsultaResultadoTest2 = this.listaConsultaResultadoTest2.filter(
        (test) =>test.testPsicometricoId === 2
      );
      console.log("ConsultaResultadoTest2", this.listaConsultaResultadoTest2);

      // Establecer el currentScore si está definido
      if (this.listaConsultaResultadoTest2[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest2[0]?.Interpretacion != undefined) {
        this.puntuacionPBQ = this.listaConsultaResultadoTest2[0].Puntuacion;
        console.log("Puntuaciones de PBQ",this.puntuacionPBQ);
        const valores = this.puntuacionPBQ.split(",").map(Number);
        this.evitativo = valores[1];
        this.dependiente = valores[2];
        this.obsesivo = valores[3];
        this.antisocial = valores[4];
        this.narcisista = valores[5];
        this.histrionica = valores[6];
        this.esquizoide = valores[7];
        this.paranoide = valores[8];
        this.limite = valores[9];
        this.clasificacionesPBQ = this.listaConsultaResultadoTest2[0].Interpretacion;
        this.createBarChart('PBQ',[this.evitativo, this.dependiente, this.obsesivo,this.antisocial, this.narcisista, this.histrionica,this.esquizoide, this.paranoide, this.limite],['Evitativo','Dependiente','Obsesivo','Antisocial','Narcisista','Histrionica','Esquizoide','Paranoide','Limite'],[9,8,10,7,9,10,11,8,9],{current : this.chart2})
      } else {
        console.warn("Puntuación no definida en el primer registro de resultados.");
      }
    },
    error: (error: any) => {
      // Manejo de error en autenticación
      console.error("Error de autenticación", error);
      alert("Error al listar los resultados");
    },
    complete: () => {
      // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      console.log('Proceso de obtención completado');
    }
  });
  }

  graficarYSQ(){
    const consultasContestadas = this.listaConsultaTest.filter(
      (test) => test.contestado === true && test.testPsicometricoId == 6

  );
  console.log("ConsultasContestadas",consultasContestadas);
  if (consultasContestadas.length === 0) {
    console.warn("No hay consultas contestadas.");
    return; // Termina la ejecución si no hay consultas contestadas
  }

  // Encontrar la consultaTest con el mayor consultaId
  let consultaTestConMayorId = consultasContestadas.reduce((max, current) => {
    if (current.consultaId != undefined && max.consultaId != undefined) {
      return current.consultaId > max.consultaId ? current : max;
    } else {
      return new ConsultaTestModelo();
    }
  });

  console.log("Consulta con mayor ID:", consultaTestConMayorId);

  // Realizar la consulta para los resultados asociados
  this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
    next: (data: any) => {
      // Manejo de autenticación exitosa
      this.listaConsultaResultadoTest6 = data;
      this.listaConsultaResultadoTest6 = this.listaConsultaResultadoTest6.filter(
        (test) =>test.testPsicometricoId === 6
      );
      console.log("ConsultaResultadoTest6", this.listaConsultaResultadoTest6);

      // Establecer el currentScore si está definido
      if (this.listaConsultaResultadoTest6[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest6[0]?.Interpretacion != undefined) {
        this.puntuacionYSQ = this.listaConsultaResultadoTest6[0].Puntuacion;
        console.log("Puntuaciones de YSQ",this.puntuacionYSQ);
        const valores = this.puntuacionYSQ.split(",").map(Number);
        this.privacionEmocional = valores[1];
        this.abandono = valores[2];
        this.desconfianzaAbuso = valores[3];
        this.aislamientoSocial = valores[4];
        this.defectuosidad = valores[5];
        this.fracaso = valores[6];
        this.incompetencia = valores[7];
        this.vulnerabilidad = valores[8];
        this.simbiosis = valores[9];
        this.subyugacion = valores[10];
        this.sacrificio = valores[11];
        this.inhibicionEmocional = valores[12];
        this.estandaresInalcanzables = valores[13];
        this.grandiosidad = valores[14];
        this.disciplinaInsuficiente = valores[15];
        this.clasificacionesYSQ = this.listaConsultaResultadoTest6[0].Interpretacion;
        this.createBarChart('YSQ',[this.privacionEmocional,this.abandono,this.desconfianzaAbuso,this.aislamientoSocial,this.defectuosidad,this.fracaso,this.incompetencia,this.vulnerabilidad,this.simbiosis,this.subyugacion,this.sacrificio,this.inhibicionEmocional,this.estandaresInalcanzables,this.grandiosidad,this.disciplinaInsuficiente],['Privación Emocional','Abandono','Desconfianza y Abuso','Aislamiento Social','Defectuosidad','Fracaso','Dependencia','Vulnerabilidad','Simbiosis','Subyugación','Sacrificio','Inhibición emocional','Estándares inalcanzables','Grandiosidad','Disciplina insuficiente'],[18,21,19,19,17,18,16,20,19,18,23,20,23,20,20],{current : this.chart6})
      } else {
        console.warn("Puntuación no definida en el primer registro de resultados.");
      }
    },
    error: (error: any) => {
      // Manejo de error en autenticación
      console.error("Error de autenticación", error);
      alert("Error al listar los resultados");
    },
    complete: () => {
      // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      console.log('Proceso de obtención completado');
    }
  });
  }


  createBarChart(id: string,data: number[],labels: string[],referenceValues: number[], chartRef: { current: Chart | null }): void {

    const beforeReference = data.map((value, index) => Math.min(value, referenceValues[index]));
    const afterReference = data.map((value, index) => Math.max(value - referenceValues[index], 0));

    const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (chartRef.current)chartRef.current.destroy();
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels, // Etiquetas de los niveles
          datasets: [
            {
              label: 'Puntuación',
              data: data, // Valores de ejemplo
              backgroundColor: '#2ecc71',
              borderColor: '#ffffff', // Opcional: borde de las barras
              borderWidth: 0,
            }
          ],
        },
        options: {
          responsive: true,
          indexAxis: 'y', // Esto hace que las barras sean horizontales
          plugins: {
            legend: {
              display: true,
              position: 'right',
            },
            datalabels: {
              anchor: 'end',
              align: 'right',
              color: 'black',
              font: {
                weight: 'bold',
                size: 14,
              },
              formatter: (value) => `${value}`,
            }
          },
          layout :{
            padding: {
              right : 30,
            }
          },
          scales: {
            x: {
              beginAtZero: true, // Inicia el eje X desde 0
            },
          },
        },
        plugins: [{
          id: 'linePlugin',
          afterDatasetsDraw: (chart: any) => {
            const { ctx, chartArea, scales: { x, y } } = chart;
             
        
            /*ctx.save();
            chart.data.datasets[0].data.forEach((value: number, index: number) => {
              // Coordenadas de la barra
              const referenceValue = referenceValues[index]; // Valor de referencia donde se dibuja la línea dentro de cada barra
              const yPosition = y.getPixelForValue(index); // Posición vertical de la barra
              const xPosition = x.getPixelForValue(referenceValue); // Posición de la línea en X
        
              // Dibujar la línea dentro de la barra
              ctx.beginPath();
              ctx.moveTo(xPosition, yPosition - y.height / chart.data.labels.length / 2 + 5);
              ctx.lineTo(xPosition, yPosition + y.height / chart.data.labels.length / 2 - 5);
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'black'; // Color de la línea dentro de la barra
              ctx.stroke(); 
            });
            ctx.restore();*/
            ctx.save();

            chart.data.datasets[0].data.forEach((value: number, index: number) => {
            const referenceValue = referenceValues[index]; // Valor de referencia para la barra
            const xReference = x.getPixelForValue(referenceValue); // Posición X de la línea de referencia
            const xValue = x.getPixelForValue(value); // Posición X del final de la barra
            const yPosition = y.getPixelForValue(index); // Posición Y de la barra

            const barHeight = y.height / chart.data.labels.length * 0.72; // Ajusta el grosor de la barra

            // Dibujar la parte después de la referencia (Verde)
            if (value > referenceValue) {
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(xReference, yPosition - barHeight / 2, xValue - xReference, barHeight);
            }
          });

            ctx.restore();
          }
        }]
      });
    }
  }
}
