import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from '../../../../servicios/consulta.service';
import { ConsultaModelo } from '../../../../modelos/Consulta.modelo';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { forkJoin, Observable } from 'rxjs';
import { TestPsicometricoService } from '../../../../servicios/test-psicometrico.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { RespuestasRelevantesService } from '../../../../servicios/respuestas-relevantes.service';
import { PacienteEjercicioService } from '../../../../servicios/paciente-ejercicio.service';
import { EjercicioPracticoModelo } from '../../../../modelos/EjercicioPractico.modelo';
import { ModuloPsicoeducativoService } from '../../../../servicios/modulo-psicoeducativo.service';
import { ModuloPsicoeducativoModelo } from '../../../../modelos/ModuloPsicoeducativo.modelo';
import { EjercicioPracticoService } from '../../../../servicios/ejercicio-practico.service';
import { PacienteModuloService } from '../../../../servicios/paciente-modulo.service';
import { PacienteEjercicioModelo } from '../../../../modelos/PacienteEjercicio.modelo';
import { PacienteModuloModelo } from '../../../../modelos/PacienteModulo.modelo';
import { ChartData, ChartEvent, ChartType, ChartOptions, Chart, RadialLinearScale, ChartConfiguration, DoughnutController,ArcElement, RadarController, PointElement, LineElement, CategoryScale, BarElement, BarController , LinearScale } from 'chart.js';
import { NotaClinicaService } from '../../../../servicios/nota-clinica.service';
import { NotaClinicaModelo } from '../../../../modelos/NotaClinica.modelo';

Chart.register(DoughnutController,ArcElement,RadarController,RadialLinearScale,PointElement,LineElement,CategoryScale,BarElement, BarController, LinearScale);

declare var M: any;

@Component({
  selector: 'app-perfil-paciente-terapeuta',
  templateUrl: './perfil-paciente-terapeuta.component.html',
  styleUrl: './perfil-paciente-terapeuta.component.css',
  standalone: false
})
export class PerfilPacienteTerapeutaComponent implements AfterViewInit {
  @ViewChild('velocimetroCanvas') velocimetroCanvas!: ElementRef<HTMLCanvasElement>;

  chart1: Chart | null = null;
  chart2: Chart | null = null;

  idPaciente : number = 0;

  listaConsultas: ConsultaModelo [] = [];
  listaTests: TestPsicometricoModelo[] = [];
  consultasConEvaluacion: any [] = [];

  listaNotasClinicas: NotaClinicaModelo [] = [];
  notasConTratamiento: any [] = [];

  listaConsultaTest: any[] = [];
  listaRespuestasRelevantes: any[] = [];
  testsConConsultas: any[] = [];
  testsConConsultasActualizados: any[] = [];

  listaEjerciciosPracticos: PacienteEjercicioModelo [] = [];
  listaModulosPsicoeducativos: PacienteModuloModelo [] = [];
  listaModulos: ModuloPsicoeducativoModelo [] = [];
  listaEjercicios: EjercicioPracticoModelo [] = [];
  ejerciciosAsignados: any [] = [];
  modulosAsignados: any [] = [];

  resultadosMostrar: any [] = [];

  testSeleccionado :any = null;
  cuadroPatologico :any;

  sesiones: any [] = [];

  constructor (
      private route: ActivatedRoute,
      private servicio: TestPsicometricoService,
      private servicioConsultas: ConsultaService,
      private servicioNotasClinas: NotaClinicaService,
      private servicioConsultaResultadoTest: ConsultaResultadoTestService,
      private servicioRespuestasRelevantes: RespuestasRelevantesService,
      private servicioPacienteEjercicio: PacienteEjercicioService,
      private servicioPacienteModulo: PacienteModuloService,
      private servicioModuloPsicoeducativo: ModuloPsicoeducativoService,
      private servicioEjercicioPractico: EjercicioPracticoService
  ) {}

  ngAfterViewInit(){
    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {
      swipeable: true
    });
  }

  ngOnInit (): void {
    this.idPaciente = parseInt(this.route.snapshot.params["id"]);

    this.buscarNotasClinicas()
    this.listarTestsPsicometricos();
    this.buscarConsultas();
    this.toDoExcersises();
    this.toDoModules(); 
  }

  listarTestsPsicometricos(){
    this.servicio.listRecords().subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaTests = data;
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

  buscarConsultas(){
    this.servicioConsultas.listRecordsPaciente(this.idPaciente).subscribe({
       next: (data) => {
        // Manejo de autenticación exitosa
        this.listaConsultas = data;
        this.buscarConsultaTest();
        this.consultasEnSesiones();
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
      this.servicioConsultaResultadoTest.findRecord(consulta.id)
    );
  
    forkJoin(peticiones).subscribe({
      next: (resultados) => {
        // Combinar todas las respuestas en `listaConsultaTest`
        this.listaConsultaTest = resultados.flat();
        this.buscarRespuestasRelevantes();
      },
      error: (error) => {
        alert("Error al listar las consultas");
      },
      complete: () => {
      }
    }); 
  }

  buscarNotasClinicas(){
    this.servicioNotasClinas.listRecordsPaciente(this.idPaciente).subscribe({
      next: (data) => {
       // Manejo de autenticación exitosa
       this.listaNotasClinicas = data;
       this.notasConTratamiento = this.listaNotasClinicas.map((nota, index) => ({
        ...nota,
        tratamiento: `Tratamiento ${index + 1}`
    }));
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

  buscarRespuestasRelevantes(){

    this.testsConConsultas = this.listaConsultas.map(consulta => ({
      ...consulta,
      tests: this.listaConsultaTest.filter(test => test.consultaId === consulta.id).map(test => ({
        ...test,
        nombreTest: this.listaTests[test.testPsicometricoId-1]?.Nombre || "Desconocido"
    }))
  }));
    this.consultasConEvaluacion = this.testsConConsultas.map((consulta, index) => ({
      ...consulta,
      evaluacion: `Evaluación ${index + 1}`
  }));

    const peticiones: Observable<any>[]  = this.testsConConsultas.flatMap(consulta =>
      consulta.tests.map((test: TestPsicometricoModelo) => 
          this.servicioRespuestasRelevantes.findRecords(test.id)
      )
  );
  
    if(peticiones.length > 0){
      forkJoin(peticiones).subscribe({
        next: (resultados) => {
          // Combinar todas las respuestas en `listaConsultaTest`
          this.listaRespuestasRelevantes = resultados.flat();
          const respuestasMap = this.listaRespuestasRelevantes.reduce((map, resp) => {
            if (!map[resp.resultadoTestId]) {
                map[resp.resultadoTestId] = []; // Si no existe el array, lo inicializa
            }
            map[resp.resultadoTestId] = [
              ...(map[resp.resultadoTestId] || []),
              [resp.preguntaNumero, resp.pregunta, resp.respuesta, resp.respuestaValor]
            ]; // Agrega la respuesta al array
            return map;
        }, {} as Record<number, string[]>);
        
        // Fusionar la respuesta relevante en cada test
        this.testsConConsultasActualizados = this.consultasConEvaluacion.map(consulta => ({
            ...consulta,
            tests: consulta.tests.map((test : TestPsicometricoModelo) => ({
                ...test,
                respuesta: respuestasMap[test.id] || ["Sin respuesta"]  // Agrega respuesta si existe
            }))
        }));

        },
        error: (error) => {
          alert("Error al listar las consultas");
        },
        complete: () => {
        }
      });
    }
  }

  toDoExcersises(){
    this.servicioPacienteEjercicio.findRecords(this.idPaciente).subscribe({
      next: (data) => {
        // Manejo de autenticación exitosa
        this.listaEjerciciosPracticos  = data;
        this.obtenerModulos();
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
          alert("Error al obtener ejercicios");
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
    this.ejerciciosAsignados = this.listaEjerciciosPracticos.map(ejercicioPractico => {
      // Encontrar el ejercicio correspondiente
      const ejercicio = this.listaEjercicios.find(e => e.id === ejercicioPractico.ejercicioPracticoId);
    
      if (!ejercicio) return null; // Si no se encuentra, ignorarlo
    
      return {
        id: ejercicio.id,
        nombre: ejercicio.Titulo,
        descripcion: ejercicio.Descripcion, 
        contestado: ejercicioPractico.contestado
      };
    }).filter(e => e !== null); // Eliminar posibles nulls
  }

  formarListaModulosFinal(){
    this.modulosAsignados = this.listaModulosPsicoeducativos.map(moduloPsicoeducativo => {
      // Encontrar el ejercicio correspondiente
      const modulo = this.listaModulos.find(m => m.id === moduloPsicoeducativo.moduloPsicoeducativoId);
    
      if (!modulo) return null; // Si no se encuentra, ignorarlo
    
      return {
        id: modulo.id,
        nombre: modulo.Titulo,
        descripcion: modulo.Descripcion,
        contestado: moduloPsicoeducativo.contestado
      };
    }).filter(e => e !== null); // Eliminar posibles nulls
  }

  consultasEnSesiones(){
    this.sesiones = this.listaConsultas.map((consulta, index) => ({
      ...consulta,
      sesion: `Sesión ${index + 1}`
  }));
  }

  visualizarResultados(test: any) {
    this.testSeleccionado = test;
  
    // 🔹 Asegurar que el gráfico anterior se destruye antes de crear uno nuevo
    if (this.chart1) {
      this.chart1.destroy();
      this.chart1 = null;
    }
  
    setTimeout(() => {
      let canvas = this.velocimetroCanvas.nativeElement;
  
      if (test.nombreTest === 'BDI') {
        const interpretacion = test.Interpretacion.split(",").map(String);
        const patologias = ['Depresión'];
        this.cuadroPatologico = interpretacion.map((valor:string, index:number) => ({
          puntuacion: valor,
          patologia: patologias[index]
        }));
        this.chart1 = this.createDoughnutChart(
          canvas, 
          [10, 10, 10, 33], 
          63, 
          test.Puntuacion, 
          ['Mínima', 'Leve', 'Moderada', 'Grave'], 
          ['#2ecc71', '#f7dc6f', '#f39c12', '#e74c3c']
        );
      } else if (test.nombreTest === 'Autoestima') {
        const interpretacion = test.Interpretacion.split(",").map(String);
        const patologias = ['Autoestima'];
        this.cuadroPatologico = interpretacion.map((valor:string, index:number) => ({
          puntuacion: valor,
          patologia: patologias[index]
        }));
        this.chart1 = this.createDoughnutChart(
          canvas, 
          [25, 5, 10], 
          40, 
          test.Puntuacion, 
          ['Baja', 'Media', 'Elevada'], 
          ['#8e44ad', '#345dea', '#fed728']
        );
      }else if (test.nombreTest === 'BAI') {
        const interpretacion = test.Interpretacion.split(",").map(String);
        const patologias = ['Ansiedad'];
        this.cuadroPatologico = interpretacion.map((valor:string, index:number) => ({
          puntuacion: valor,
          patologia: patologias[index]
        }));
        this.chart1 = this.createDoughnutChart(
          canvas,
          [10, 10, 10, 33],
          63,
          test.Puntuacion,
          ['Mínima', 'Leve', 'Moderada','Grave'],
          ['#2ecc71', '#f7dc6f', '#f39c12','#e74c3c']
        );
      }else if (test.nombreTest === 'ETrA'){
        const valores = test.Puntuacion.split(",").map(Number);
        const interpretacion = test.Interpretacion.split(",").map(String);
        const patologias = ['Ansiedad Generalizada','Ansiedad Social','Síntomas Físicos'];
        this.cuadroPatologico = interpretacion.map((valor:string, index:number) => ({
          puntuacion: valor,
          patologia: patologias[index]
        }));
        this.chart1 = this.createBarChart(
        canvas,
        [valores[1],valores[2],valores[3]],
        patologias,
        [17,17,14]
        );
      }else if (test.nombreTest === 'PBQ'){
        const valores = test.Puntuacion.split(",").map(Number);
        const interpretacion = test.Interpretacion.split(",").map(String);
        const patologias = ['Evitativo','Dependiente','Obsesivo','Antisocial','Narcisista','Histrionica','Esquizoide','Paranoide','Limite'];
        this.cuadroPatologico = interpretacion.map((valor:string, index:number) => ({
          puntuacion: valor,
          patologia: patologias[index]
        }));
        this.chart1 = this.createBarChart(
        canvas,
        [valores[1], valores[2], valores[3],valores[4],valores[5],valores[6],valores[7],valores[8],valores[9]],
        patologias,
        [9,8,10,7,9,10,11,8,9]
        );
      }else if (test.nombreTest === 'YSQ'){
        const valores = test.Puntuacion.split(",").map(Number);
        const interpretacion = test.Interpretacion.split(",").map(String);
        const patologias = ['Privación Emocional','Abandono','Desconfianza y Abuso','Aislamiento Social','Defectuosidad','Fracaso','Dependencia','Vulnerabilidad','Simbiosis','Subyugación','Sacrificio','Inhibición emocional','Estándares inalcanzables','Grandiosidad','Disciplina insuficiente'];
        this.cuadroPatologico = interpretacion.map((valor:string, index:number) => ({
          puntuacion: valor,
          patologia: patologias[index]
        }));
        this.chart1 = this.createBarChart(
        canvas,
        [valores[1], valores[2], valores[3],valores[4],valores[5],valores[6],valores[7],valores[8],valores[9],valores[10],valores[11],valores[12],valores[13],valores[14],valores[15]],
        patologias,
        [18,21,19,19,17,18,16,20,19,18,23,20,23,20,20]
        );
      }
    }, 10); // 🔹 Pequeño retraso para asegurar que el canvas está disponible
  }

  createDoughnutChart(
    canvas: HTMLCanvasElement, 
    data: number[], 
    totalScore: number, 
    currentScore: number, 
    labels: string[], 
    colors: string[]
  ): Chart {
    return new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        cutout: '70%',
        rotation: -90,
        circumference: 180,
        animation: {
          duration: 3000,
          easing: 'easeOutCubic',
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
  
          const centerX = width / 2;
          const centerY = chart.chartArea.bottom - 115;
          const needleValue = (animationValue / totalScore) * 180;
          const needleLength = height / 2.5;
          const angle = ((needleValue - 180) * Math.PI) / 180;
  
          const endX = centerX + needleLength * Math.cos(angle);
          const endY = centerY + needleLength * Math.sin(angle);
  
          ctx.save();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#000';
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();
  
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

  createBarChart(
    canvas: HTMLCanvasElement,
    data: number[],
    labels: string[],
    referenceValues: number[]
  ): Chart {

    // Crear el nuevo gráfico
    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Puntuación',
            data: data, // Usamos valores antes de la referencia
            backgroundColor: '#2ecc71',
            borderColor: '#ffffff',
            borderWidth: 0,
          }
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y', // Barras horizontales
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
        layout: {
          padding: {
            right: 30,
          }
        },
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
      plugins: [
        {
          id: 'linePlugin',
          afterDatasetDraw: (chart: any) => {

            const { ctx, scales: { x, y }, chartArea } = chart;

            if (!chartArea) return; // Asegurar que el gráfico ya está renderizado

            ctx.save();

            chart.data.datasets[0].data.forEach((value: number, index: number) => {
              const referenceValue = referenceValues[index]; // Valor de referencia
              const xReference = x.getPixelForValue(referenceValue); // Posición X de la línea
              const xValue = x.getPixelForValue(value); // Posición X del final de la barra
              const yPosition = y.getPixelForValue(index); // Posición Y de la barra

              if (!xReference || !yPosition) return; // Evita dibujar si las coordenadas no son válidas

              // 🔴 Pintar el segmento rojo si la barra supera la referencia
              if (value > referenceValue) {
                const barHeight = (y.height / chart.data.labels.length) * 0.72;
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(xReference, yPosition - barHeight / 2, xValue - xReference, barHeight);
              }
            });

            ctx.restore();
          }
        }
      ]
    });
  }

}

