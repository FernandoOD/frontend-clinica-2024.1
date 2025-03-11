import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { RespuestaRelevanteModelo } from '../../../../modelos/RespuestaRelevante.modelo';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { RespuestasRelevantesService } from '../../../../servicios/respuestas-relevantes.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
  selector: 'app-bai-test',
  templateUrl: './bai-test.component.html',
  styleUrl: './bai-test.component.css',
  standalone: false
})
export class BaiTestComponent {
  error: string = '';
    resultado: string = '';
    total: number = 0;
    clasificacion: string = '';
    recomendacion: string = '';
  
    consultaId? = 0;
    testPsicometricoId? = 0;
    consultaTestId? = 0;
  
    respuestasRelevantes: RespuestaRelevanteModelo[] = [];
  
    preguntas: { [key: number]: string } = {
      1: "Entumecimiento / Hormigueo",
      2: "Sensación de aumento en temperatura corporal (independiente del clima)",
      3: "Piernas temblorosas",
      4: "Incapacidad de relajarse",
      5: "Temor a que lo peor pueda suceder",
      6: "Mareado",
      7: "Taquicardia / latidos acelerados",
      8: "Inestabilidad",
      9: "Aterrado",
      10: "Nerviosismo",
      11: "Sentimiento de Asfixia",
      12: "Manos temblorosas",
      13: "Temblor general",
      14: "Miedo a perder el control",
      15: " Dificultad para respirar",
      16: "Miedo a morir",
      17: "Asustado",
      18: "Indigestión o incomodidad en el abdomen",
      19: "Debilidade",
      20: "Sonrojamiento en el rostro",
      21: "Sudoración (no por calor)",
    };
  
    respuestas: { [key: number]: string } = {
      0: "Nada",
      1: "Mediano",
      2: "Moderado",
      3: "Severo",
    };
  
    constructor (
      private servicioResultadoTest: ConsultaResultadoTestService,
      private servicioSeguridad: SeguridadService,
      private servicioConsultaTest: ConsultaTestService,
      private servicioRespuestasRelevantes: RespuestasRelevantesService,
      private router: Router
    ){
  
    }
  
    onInit(){
      
    }
  
    onSubmit(event: Event): void {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  
      // Reiniciar mensajes y resultado
      this.error = '';
      this.resultado = '';
      this.total = 0;
      let preguntasSinResponder: number[] = [];
  
      this.respuestasRelevantes = [];
  
      // Obtener las respuestas seleccionadas
      for (let i = 1; i <= 21; i++) {
        const respuesta = document.querySelector<HTMLInputElement>(`input[name="p${i}"]:checked`);
        if (respuesta) {
          const valor = parseInt(respuesta.value, 10);
           // Si la respuesta tiene puntaje 2 o 3, la guardamos
          if (valor === 2 || valor === 3) {
            this.respuestasRelevantes.push({
              preguntaNumero: i,
              pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
              respuesta :  this.obtenerTextoRespuesta(valor),
              respuestaValor: valor,
            });
          }
          this.total += valor;
        } else {
          preguntasSinResponder.push(i);
        }
      }
  
      // Verificar si hay preguntas sin responder
      if (preguntasSinResponder.length > 0) {
        this.error = `Por favor, responde las siguientes preguntas: ${preguntasSinResponder.join(", ")}`;
        return;
      }
  
      // Interpretar la puntuación
      this.interpretarResultados();
  
      // Mostrar el resultado con scroll suave
      const resultadoDiv = document.getElementById('resultado');
      if (resultadoDiv) {
        resultadoDiv.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    obtenerTextoPregunta(numero: number): string {
      return this.preguntas[numero] || "Pregunta desconocida";
    }
  
    obtenerTextoRespuesta(numero: number): string {
      return this.respuestas[numero] || "Respuesta desconocida";
    }
  
    interpretarResultados(): void {
      if (this.total <= 10) {
        this.clasificacion = 'Sin Ansiedad';
        this.recomendacion = 'Los síntomas de ansiedad están dentro del rango normal.';
      } else if (this.total <= 20) {
        this.clasificacion = 'Ansiedad leve';
        this.recomendacion = 'Se recomienda monitorear los síntomas y considerar una consulta profesional si persisten.';
      } else if (this.total <= 30) {
        this.clasificacion = 'Ansiedad moderada';
        this.recomendacion = 'Se recomienda buscar ayuda profesional para una evaluación más detallada.';
      } else {
        this.clasificacion = 'Ansiedad severa';
        this.recomendacion = 'Se recomienda buscar ayuda profesional inmediatamente.';
      }
  
      // Actualizar resultado
      this.resultado = `
        <h3>Resultados del Test BDI-II</h3>
        <p><strong>Puntaje total:</strong> ${this.total}</p>
        <p><strong>Clasificación:</strong> ${this.clasificacion}</p>
        <p><strong>Recomendación:</strong> ${this.recomendacion}</p>
        <p><em>Nota: Este test es una herramienta de screening y no sustituye una evaluación profesional. 
        Si tienes preocupaciones sobre tu salud mental, consulta con un profesional de la salud.</em></p>
      `;
  
      this.obtenerDatosTest();
  
      let FechaRealizacion = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
      let obj  = new ConsultaResultadoTestModelo();
  
      obj.FechaRealizacion = FechaRealizacion;
      obj.Puntuacion = this.total.toString();
      obj.Interpretacion = this.clasificacion;
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
