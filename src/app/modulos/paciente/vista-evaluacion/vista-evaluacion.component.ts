import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData, ChartEvent, ChartType, ChartOptions, Chart, RadialLinearScale, ChartConfiguration, DoughnutController,ArcElement, RadarController, PointElement, LineElement, CategoryScale, BarElement, BarController , LinearScale } from 'chart.js';
import { Subscription, forkJoin } from 'rxjs';
import { ConsultaModelo } from '../../../modelos/Consulta.modelo';
import { ConsultaResultadoTestModelo } from '../../../modelos/ConsultaResultadoTest.modelo';
import { ConsultaTestModelo } from '../../../modelos/ConsultaTest.modelo';
import { EjercicioPracticoModelo } from '../../../modelos/EjercicioPractico.modelo';
import { ModuloPsicoeducativoModelo } from '../../../modelos/ModuloPsicoeducativo.modelo';
import { PacienteModuloModelo } from '../../../modelos/PacienteModulo.modelo';
import { TestPsicometricoModelo } from '../../../modelos/TestPsicometrico.modelo';
import { UsuarioModelo } from '../../../modelos/Usuario.modelo';
import { ConsultaResultadoTestService } from '../../../servicios/consulta-resultado-test.service';
import { ConsultaTestService } from '../../../servicios/consulta-test.service';
import { ConsultaService } from '../../../servicios/consulta.service';
import { EjercicioPracticoService } from '../../../servicios/ejercicio-practico.service';
import { ModuloPsicoeducativoService } from '../../../servicios/modulo-psicoeducativo.service';
import { PacienteEjercicioService } from '../../../servicios/paciente-ejercicio.service';
import { PacienteModuloService } from '../../../servicios/paciente-modulo.service';
import { PacienteService } from '../../../servicios/paciente.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { TestPsicometricoService } from '../../../servicios/test-psicometrico.service';

Chart.register(DoughnutController,ArcElement,RadarController,RadialLinearScale,PointElement,LineElement,CategoryScale,BarElement, BarController, LinearScale);

@Component({
  selector: 'app-vista-evaluacion',
  templateUrl: './vista-evaluacion.component.html',
  styleUrl: './vista-evaluacion.component.css',
  standalone: false
})
export class VistaEvaluacionComponent implements AfterViewInit {
  @ViewChild('depresionCanvas') depresionCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('autoestimaCanvas') autoestimaCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('BAICanvas') BAICanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ETRABarCanvas') ETRABarCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('PBQBarCanvas') PBQBarCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('YSQBarCanvas') YSQBarCanvas!: ElementRef<HTMLCanvasElement>;


    chart1: Chart | null = null;
    chart2: Chart | null = null;
    chart3: Chart | null = null;
    chart4: Chart | null = null;
    chart5: Chart | null = null;
    chart6: Chart | null = null;
    chart7: Chart | null = null;
  
    chartInstances: { [key: string]: Chart | null } = {};
  
    suscripcion: Subscription = new Subscription;
    idConsulta: number=0;
  
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
  
    existeETRA: number = 0;
    puntuacionETrA : string = '';
    ansiedadGeneralizada : number = 0;
    ansiedadSocial: number  = 0;
    sintomasFisicos: number = 0;
    severidadGeneralETrA : String = "No hay Severidad";
  
    existePBQ: number = 0;
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
  
  
    existeYSQ: number = 0;
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
    listaConsultaResultadoTest: ConsultaResultadoTestModelo [] = [];
    listaConsultaResultadoTest2: ConsultaResultadoTestModelo [] = [];
    listaConsultaResultadoTest3: ConsultaResultadoTestModelo [] = [];
    listaConsultaResultadoTest4: ConsultaResultadoTestModelo [] = [];
    listaConsultaResultadoTest5: ConsultaResultadoTestModelo [] = [];
    listaConsultaResultadoTest6: ConsultaResultadoTestModelo [] = [];
    listaConsultaResultadoTest7: ConsultaResultadoTestModelo [] = [];
  
    consultasConEvaluacion: any [] = [];
  
    modulosAsignados: any [] = [];
  
    userName: String | undefined = '';
  
    currentScoreAutoestima : number = 0;
    interpretacionAutoestima : String = "No Hay Interpretación";
  
    currentScoreBAI : number = 0;
    interpretacionBAI : String = "No Hay Interpretación";
    
    constructor (
      private servicioConsultaTest: ConsultaTestService,
      private servicioConsultaResultadoTest: ConsultaResultadoTestService,
      private route: ActivatedRoute,
     ){
  
    }
  
    ngOnInit(): void {
      this.idConsulta = this.route.snapshot.params["id"];
      this.buscarConsultaTest();
    }

    ngAfterViewInit() {
    }
  
    buscarConsultaTest() {
      this.servicioConsultaTest.findRecords(this.idConsulta).subscribe({
        next: (resultados) => {
          // Combinar todas las respuestas en `listaConsultaTest`
          this.listaConsultaTest = resultados.flat();
          this.pintarGraficas();
        },
        error: (error) => {
          alert("Error al listar las consultas");
        },
        complete: () => {
        }
      });
    }
    
  
    pintarGraficas(){
            this.graficarBDI();
            //this.graficarDSM5();
            this.graficarETrA();
            this.graficarPBQ();
            this.graficarYSQ();
            this.graficarAutoestima();
            this,this.graficarBAI();
    }
  
    createDoughnutChart(canvas: HTMLCanvasElement, data: number [], totalScore: number, currentScore: number, chartRef: { current: Chart | null }, labels: string [],colors: string[]): void {
      if (!canvas) return;
        if (chartRef.current) chartRef.current.destroy(); // Destruye el gráfico anterior si existe
        chartRef.current = new Chart(canvas, {
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
  
    graficarBDI() {
      // Filtrar listaConsultaTest para incluir solo registros con contestado === true
      const consultasContestadas = this.listaConsultaTest.filter(
          (test) => test.contestado === true && test.testPsicometricoId == 1
  
      );
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
          setTimeout(() => {
            const canvasDepresion = this.depresionCanvas.nativeElement;
            this.createDoughnutChart(canvasDepresion,[10, 10, 10, 33], 63, this.currentScoreDepresion, { current: this.chart1 },['Mínima', 'Leve', 'Moderada','Grave'],['#2ecc71', '#f7dc6f', '#f39c12','#e74c3c']);
          }, 0);
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al listar los resultados");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
    }
  
    graficarAutoestima() {
      // Filtrar listaConsultaTest para incluir solo registros con contestado === true
      const consultasContestadas = this.listaConsultaTest.filter(
          (test) => test.contestado === true && test.testPsicometricoId == 5
  
      );
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
          } else {
            console.warn("Puntuación no definida en el primer registro de resultados.");
          }
          setTimeout(() => {
            const canvasAutoestima = this.autoestimaCanvas.nativeElement;
            this.createDoughnutChart(canvasAutoestima,[25, 5, 10], 40, this.currentScoreAutoestima, { current: this.chart5 },['Baja', 'Media', 'Elevada'],['#8e44ad', '#345dea', '#fed728']);
          }, 0);
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al listar los resultados");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
    }
  
    graficarBAI() {
      // Filtrar listaConsultaTest para incluir solo registros con contestado === true
      const consultasContestadas = this.listaConsultaTest.filter(
          (test) => test.contestado === true && test.testPsicometricoId == 7
  
      );
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
          } else {
            console.warn("Puntuación no definida en el primer registro de resultados.");
          }
          setTimeout(() => {
            const canvasBAI = this.BAICanvas.nativeElement;
            this.createDoughnutChart(canvasBAI,[10, 10, 10, 33], 63, this.currentScoreBAI, { current: this.chart7 },['Mínima', 'Leve', 'Moderada','Grave'],['#2ecc71', '#f7dc6f', '#f39c12','#e74c3c']);
          }, 0);
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al listar los resultados");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
    }
  
  
    graficarDSM5(){
      const consultasContestadas = this.listaConsultaTest.filter(
        (test) => test.contestado === true && test.testPsicometricoId == 3
  
    );
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
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
    }
  
    graficarETrA(){
      const consultasContestadas = this.listaConsultaTest.filter(
        (test) => test.contestado === true && test.testPsicometricoId == 4
    );
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
  
    // Realizar la consulta para los resultados asociados
    this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
      next: (data: any) => {
        // Manejo de autenticación exitosa
        this.listaConsultaResultadoTest4 = data;
        this.listaConsultaResultadoTest4 = this.listaConsultaResultadoTest4.filter(
          (test) =>test.testPsicometricoId === 4
        );
  
        // Establecer el currentScore si está definido
        if (this.listaConsultaResultadoTest4[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest4[0]?.Interpretacion != undefined) {
          this.puntuacionETrA = this.listaConsultaResultadoTest4[0].Puntuacion;
          this.existeETRA = 1;
          const valores = this.puntuacionETrA.split(",").map(Number);
          this.ansiedadGeneralizada = valores[1];
          this.ansiedadSocial = valores[2];
          this.sintomasFisicos = valores[3];
          this.severidadGeneralETrA = this.listaConsultaResultadoTest4[0].Interpretacion;
          //this.createSpiderChart('ETRA',[this.ansiedadGeneralizada,this.ansiedadSocial,this.sintomasFisicos],['Ansiedad Generalizada', 'Ansiedad Social', 'Síntomas Físicos'],{current: this.chart4});
          setTimeout(() => {
            const canvasETRA = this.ETRABarCanvas.nativeElement;
            this.createBarChart(canvasETRA,[this.ansiedadGeneralizada, this.ansiedadSocial, this.sintomasFisicos],['Ansiedad Generalizada','Ansiedad Social','Síntomas Físicos'],[17,17,14],{current: this.chart4});
          }, 0);
        } else {
          console.warn("Puntuación no definida en el primer registro de resultados.");
        }
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
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
  
    // Realizar la consulta para los resultados asociados
    this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
      next: (data: any) => {
        // Manejo de autenticación exitosa
        this.listaConsultaResultadoTest2 = data;
        this.listaConsultaResultadoTest2 = this.listaConsultaResultadoTest2.filter(
          (test) =>test.testPsicometricoId === 2
        );
  
        // Establecer el currentScore si está definido
        if (this.listaConsultaResultadoTest2[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest2[0]?.Interpretacion != undefined) {
          this.puntuacionPBQ = this.listaConsultaResultadoTest2[0].Puntuacion;
          this.existePBQ=1;
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

          setTimeout(() => {
            const canvasPBQ = this.PBQBarCanvas.nativeElement;
            this.createBarChart(canvasPBQ,[this.evitativo, this.dependiente, this.obsesivo,this.antisocial, this.narcisista, this.histrionica,this.esquizoide, this.paranoide, this.limite],['Evitativo','Dependiente','Obsesivo','Antisocial','Narcisista','Histrionica','Esquizoide','Paranoide','Limite'],[9,8,10,7,9,10,11,8,9],{current : this.chart2})
          }, 0);
        } else {
          console.warn("Puntuación no definida en el primer registro de resultados.");
        }
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
    }
  
    graficarYSQ(){
      const consultasContestadas = this.listaConsultaTest.filter(
        (test) => test.contestado === true && test.testPsicometricoId == 6
  
    );
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
  
    // Realizar la consulta para los resultados asociados
    this.servicioConsultaResultadoTest.findRecord(consultaTestConMayorId.consultaId).subscribe({
      next: (data: any) => {
        // Manejo de autenticación exitosa
        this.listaConsultaResultadoTest6 = data;
        this.listaConsultaResultadoTest6 = this.listaConsultaResultadoTest6.filter(
          (test) =>test.testPsicometricoId === 6
        );
  
        // Establecer el currentScore si está definido
        if (this.listaConsultaResultadoTest6[0]?.Puntuacion != undefined && this.listaConsultaResultadoTest6[0]?.Interpretacion != undefined) {
          this.puntuacionYSQ = this.listaConsultaResultadoTest6[0].Puntuacion;
          this.existeYSQ=1;
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
          setTimeout(() => {
            const canvasYSQ = this.YSQBarCanvas.nativeElement;
            this.createBarChart(canvasYSQ,[this.privacionEmocional,this.abandono,this.desconfianzaAbuso,this.aislamientoSocial,this.defectuosidad,this.fracaso,this.incompetencia,this.vulnerabilidad,this.simbiosis,this.subyugacion,this.sacrificio,this.inhibicionEmocional,this.estandaresInalcanzables,this.grandiosidad,this.disciplinaInsuficiente],['Privación Emocional','Abandono','Desconfianza y Abuso','Aislamiento Social','Defectuosidad','Fracaso','Dependencia','Vulnerabilidad','Simbiosis','Subyugación','Sacrificio','Inhibición emocional','Estándares inalcanzables','Grandiosidad','Disciplina insuficiente'],[18,21,19,19,17,18,16,20,19,18,23,20,23,20,20],{current : this.chart6})
          }, 0);
        } else {
          console.warn("Puntuación no definida en el primer registro de resultados.");
        }
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        alert("Error al listar los resultados");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
      }
    });
    }
  
  
    createBarChart(canvas: HTMLCanvasElement,data: number[],labels: string[],referenceValues: number[], chartRef: { current: Chart | null }): void {
  
      const beforeReference = data.map((value, index) => Math.min(value, referenceValues[index]));
      const afterReference = data.map((value, index) => Math.max(value - referenceValues[index], 0));
  
      if (!canvas) return;  
      if (chartRef.current)chartRef.current.destroy();
        chartRef.current = new Chart(canvas, {
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
