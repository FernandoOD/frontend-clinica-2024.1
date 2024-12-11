import { Component } from '@angular/core';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';

@Component({
    selector: 'app-bdi-test',
    templateUrl: './bdi-test.component.html',
    styleUrl: './bdi-test.component.css',
    standalone: false
})
export class BDITestComponent {
  error: string = '';
  resultado: string = '';
  total: number = 0;
  clasificacion: string = '';
  recomendacion: string = '';

  consultaId? = 0;
  testPsicometricoId? = 0;
  consultaTestId? = 0;

  constructor (
    private servicioResultadoTest: ConsultaResultadoTestService,
    private servicioSeguridad: SeguridadService,
    private servicioConsultaTest: ConsultaTestService
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
    const preguntasSinResponder: number[] = [];

    // Obtener las respuestas seleccionadas
    for (let i = 1; i <= 21; i++) {
      const respuesta = (document.querySelector(`input[name="p${i}"]:checked`) as HTMLInputElement | null);
      if (respuesta) {
        this.total += parseInt(respuesta.value, 10);
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

  interpretarResultados(): void {
    if (this.total <= 13) {
      this.clasificacion = 'Depresión mínima';
      this.recomendacion = 'Los síntomas depresivos están dentro del rango normal.';
    } else if (this.total <= 19) {
      this.clasificacion = 'Depresión leve';
      this.recomendacion = 'Se recomienda monitorear los síntomas y considerar una consulta profesional si persisten.';
    } else if (this.total <= 28) {
      this.clasificacion = 'Depresión moderada';
      this.recomendacion = 'Se recomienda buscar ayuda profesional para una evaluación más detallada.';
    } else {
      this.clasificacion = 'Depresión grave';
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
    obj.Puntuacion = this.total;
    obj.Interpretacion = this.clasificacion;
    obj.consultaId = this.consultaId;
    obj.testPsicometricoId = this.testPsicometricoId;

    this.servicioResultadoTest.saveRecord(obj).subscribe({
      next: (data: ConsultaResultadoTestModelo) => {
        // Manejo de autenticación exitosa
        console.log("Resultados del test guardados", data);
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
}
