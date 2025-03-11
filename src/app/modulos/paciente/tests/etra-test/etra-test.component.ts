import { Component } from '@angular/core';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { Router } from '@angular/router';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { RespuestaRelevanteModelo } from '../../../../modelos/RespuestaRelevante.modelo';
import { RespuestasRelevantesService } from '../../../../servicios/respuestas-relevantes.service';

@Component({
    selector: 'app-etra-test',
    templateUrl: './etra-test.component.html',
    styleUrl: './etra-test.component.css',
    standalone: false
})
export class EtraTestComponent {
    // Variables para resultados
  total: number = 0;
  
  preguntasSinResponder: number[] = [];
  resultadoVisible: boolean = false;
  ansiedadGeneralizada: number = 0;
  ansiedadSocial: number = 0;
  sintomasFisicos: number = 0;
  puntuaciones = `${0},${0},${0},${0},${0}`;
  clasificaciones = '';

  consultaId? = 0;
  testPsicometricoId? = 0;
  consultaTestId? = 0;

  respuestasRelevantes: RespuestaRelevanteModelo[] = [];

  preguntas: { [key: number]: string } = {
    1: "Estoy ansioso la mayoría de los días",
    2: "Se me dificulta controlar mi ansiedad",
    3: "Me preocupa que me pueda volver loco",
    4: "Mi ansiedad me causa malestar",
    5: "Me preocupo demasiado",
    6: "Temo perder el control o desmayarme",
    7: "Se me dificulta concentrarme",
    8: "Me asusto fácilmente",
    9: "Me preocupa que si me pongo nervioso los demás lo van a notar",
    10: "Se me dificulta hablar con otras personas",
    11: "Me preocupo de que otros me vean como raro / torpe",
    12: "Me he encontrado preocupándome de no saber que decir en situaciones sociales",
    13: "Siento que diré algo vergonzoso cada vez que hablo",
    14: "Cuando hablo frente a un grupo pienso que me van a ignorar o criticar",
    15: "Me pongo nervioso si tengo que hablar en público",
    16: "Siento dificultad al respirar",
    17: "Siento el cuerpo tenso",
    18: "Siento mareos",
    19: "Se me dificulta relajarme",
    20: "Me molesta la sensación de hormigueo en las manos",
    21: "Siento que mi corazón late más rápido de lo normal",
    22: "Me asustan sensaciones extrañas o inesperadas en mi cuerpo"
  };

  respuestas: { [key: number]: string } = {
    1: "Nada",
    2: "Poco",
    3: "Más o menos",
    4: "Bastante",
    5: "Extremadamente"
  };

  
  // Clasificaciones por categoría
  clasificacionGeneralizada: string = '';
  clasificacionSocial: string = '';
  clasificacionFisica: string = '';

  errorMensaje: string = ''; // Mensaje de error


   constructor (
          private servicioResultadoTest: ConsultaResultadoTestService,
          private servicioSeguridad: SeguridadService,
          private servicioConsultaTest: ConsultaTestService,
          private servicioRespuestasRelevantes: RespuestasRelevantesService,
          private router: Router
        ){
      
        }
  // Método principal: procesar formulario
  procesarFormulario() {
    this.limpiarResultados();
    this.verificarRespuestas();
    this.calcularResultados();
      this.obtenerDatosTest();
            
                let FechaRealizacion = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
                let obj  = new ConsultaResultadoTestModelo();
            
                obj.FechaRealizacion = FechaRealizacion;
                obj.Puntuacion = this.puntuaciones;
                obj.Interpretacion = this.clasificaciones;
                obj.consultaId = this.consultaId;
                obj.testPsicometricoId = this.testPsicometricoId;
            
                this.servicioResultadoTest.saveRecord(obj).subscribe({
                  next: (data: ConsultaResultadoTestModelo) => {
                    // Manejo de autenticación exitosa
                    console.log("Resultados del test guardados", data);
                    this.guardarRespuestasRelevantes(data);
                    this.router.navigate(['paciente/dashboard']);
                  },
                  error: (error: any) => {
                    // Manejo de error en autenticación
                    console.error("Error de autenticación", error);
                    alert("Error al guardar los resultados del test");
                  },
                  complete: () => {
                    // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
                    console.log('Proceso de guardado completado');
                  }
                });
            
                this.marcarContestado();
    
  }

  // Limpiar variables y mensajes previos
  limpiarResultados() {
    this.total = 0;
    this.ansiedadGeneralizada= 0;
    this.ansiedadSocial= 0;
    this.sintomasFisicos= 0;
    this.preguntasSinResponder = [];
    this.resultadoVisible = false;
    this.errorMensaje = '';
  }

  // Verificar respuestas
  verificarRespuestas() {
    for (let i = 1; i <= 22; i++) {
      const respuesta =  document.querySelector<HTMLInputElement>(`input[name="p${i}"]:checked`);
      if (respuesta !== undefined && respuesta !== null) {
        const valor = parseInt(respuesta.value, 10);

        if (valor === 4 || valor === 5) {
          this.respuestasRelevantes.push({
            preguntaNumero: i,
            pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
            respuesta :  this.obtenerTextoRespuesta(valor),
            respuestaValor: valor,
          });
        }

        this.total += valor;

        // Sumar a categorías específicas
        if (i >= 1 && i <= 8) {
          this.ansiedadGeneralizada += valor; // Preguntas 1-8 para Ansiedad Generalizada
      }
      if (i >= 9 && i <= 15) {
          this.ansiedadSocial += valor; // Preguntas 9-15 para Ansiedad Social
      }
      if (i >= 16 && i <= 22) {
          this.sintomasFisicos += valor; // Preguntas 16-22 para Síntomas Físicos
      }

      } else {
        this.preguntasSinResponder.push(i);
      }
    }
  }

  // Calcular clasificaciones finales
  calcularResultados() {
    if (this.preguntasSinResponder.length > 0) {
      this.errorMensaje = `Por favor, responde las siguientes preguntas: ${this.preguntasSinResponder.join(', ')}`;
    } else {
      // Interpretar puntuaciones
      this.clasificacionGeneralizada = this.ansiedadGeneralizada >= 17 ? "Ansiedad Generalizada significativa" : "Ansiedad Generalizada no significativa";
      this.clasificacionSocial = this.ansiedadSocial >= 17 ? "Ansiedad Social significativa" : "Ansiedad Social no significativa";
      this.clasificacionFisica = this.sintomasFisicos >= 14 ? "Síntomas físicos significativos" : "Síntomas físicos no significativos";

      this.resultadoVisible = true; // Mostrar resultados

      this.puntuaciones = `${this.total},${this.ansiedadGeneralizada},${this.ansiedadSocial},${this.sintomasFisicos}`;
      this.clasificaciones = `${this.clasificacionGeneralizada},${this.clasificacionSocial},${this.clasificacionFisica}`;
    }
  }

   obtenerDatosTest(){
          let datos = this.servicioSeguridad.getDataTestLocal();
          console.log("Datos Test",datos);
          let objetoDatos : TestPsicometricoModelo;
          if(datos){
            objetoDatos = JSON.parse(datos);
            
            this.consultaId = objetoDatos.consultaId;
            this.testPsicometricoId = objetoDatos.id;
            this.consultaTestId = objetoDatos.consultaTestId;
          }
        }
      
        marcarContestado(){
          let obj = new ConsultaTestModelo();
      
          obj.id = this.consultaTestId;
          obj.consultaId = this.consultaId;
          obj.testPsicometricoIdOnly = this.testPsicometricoId;
          obj.contestado = true;
      
          this.servicioConsultaTest.updateRecord(obj).subscribe({
            next: (data: ConsultaTestModelo) => {
              // Manejo de autenticación exitosa
              console.log("Actualización del contestado correcta", data);
            },
            error: (error: any) => {
              // Manejo de error en autenticación
              console.error("Error de autenticación", error);
              alert("Error al guardar los resultados del test");
            },
            complete: () => {
              // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
              console.log('Proceso de guardado completado');
            }
          });
        }

        obtenerTextoPregunta(numero: number): string {
          return this.preguntas[numero] || "Pregunta desconocida";
        }
      
        obtenerTextoRespuesta(numero: number): string {
          return this.respuestas[numero] || "Respuesta desconocida";
        }
      
        guardarRespuestasRelevantes(data : ConsultaResultadoTestModelo){
          const obj = {
            resultadoTestId : data.id,  // ID de la consulta
            respuestasRelevantes: this.respuestasRelevantes,
          };
          
          this.servicioRespuestasRelevantes.saveRecord(obj).subscribe({
            next: (data: RespuestaRelevanteModelo) => {
              // Manejo de autenticación exitosa
              console.log("Respuestas Relevantes guardadas correctamente", data);
            },
            error: (error: any) => {
              // Manejo de error en autenticación
              console.error("Error de autenticación", error);
              alert("Error al guardar las respuestas relevantes");
            },
            complete: () => {
              // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
              console.log('Proceso de guardado completado');
            }
          });
        }
}
