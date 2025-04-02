import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { RespuestaRelevanteModelo } from '../../../../modelos/RespuestaRelevante.modelo';
import { RespuestasRelevantesService } from '../../../../servicios/respuestas-relevantes.service';
import { ArchivoPDFModelo } from '../../../../modelos/ArchivoPDF.modelo';
import { UploadPdfService } from '../../../../servicios/upload-pdf.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-autoestima-test',
  templateUrl: './autoestima-test.component.html',
  styleUrl: './autoestima-test.component.css',
  standalone: false,
})
export class AutoestimaTestComponent {

  total: number = 0;

  respuestasReporte: any[] = [];
  
  preguntasSinResponder: number[] = [];
  resultadoVisible: boolean = false;
  errorMensaje: string = ''; // Mensaje de error

  
  puntuaciones = `${0},${0},${0},${0},${0}`;
  clasificaciones = '';

  nivelAutoestima : String = '';

  consultaId? = 0;
  testPsicometricoId? = 0;
  consultaTestId? = 0;

  respuestasRelevantes: RespuestaRelevanteModelo[] = [];

  preguntas: { [key: number]: string } = {
    1: "Siento que soy una persona digna, al menos tanto como las demás",
    2: "Estoy convencido de que tengo buenas cualidades",
    3: "Soy capaz de hacer las cosas tan bien como la mayoría de la gente",
    4: "Tengo una actitud positiva hacia mí mismo/a",
    5: "En general, estoy satisfecho conmigo mismo/a",
    6: "Siento que no tengo mucho de qué estar orgulloso/a",
    7: "En general, me inclino a pensar que soy un fracasado/a",
    8: "Me gustaría poder sentir más respeto por mí mismo",
    9: "Hay veces que realmente pienso que soy un inútil",
    10: "A menudo creo que no soy una buena persona",
  };

  respuestas: { [key: number]: string } = {
    1: "Muy de acuerdo",
    2: "De acuerdo",
    3: "En desacuerdo",
    4: "Muy en desacuerdo",
  };


   constructor (
            private servicioResultadoTest: ConsultaResultadoTestService,
            private servicioSeguridad: SeguridadService,
            private servicioConsultaTest: ConsultaTestService,
            private servicioRespuestasRelevantes: RespuestasRelevantesService,
            private servicioUploadPDF: UploadPdfService,
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
          this.guardarRespuestasRelevantes(data);
          this.router.navigate(['paciente/dashboard']);
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al guardar los resultados del test");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
  
      this.marcarContestado();

    }
  
    // Limpiar variables y mensajes previos
    limpiarResultados() {
      this.total = 0;
      this.preguntasSinResponder = [];
      this.resultadoVisible = false;
      this.errorMensaje = '';
    }
  
    // Verificar respuestas
    verificarRespuestas() {
      for (let i = 1; i <= 10; i++) {
        const respuesta =  document.querySelector<HTMLInputElement>(`input[name="q${i}"]:checked`);
        if (respuesta !== undefined && respuesta !== null) {
          const valor = parseInt(respuesta.value, 10);
          if (valor === 1 || valor === 2) {
            this.respuestasRelevantes.push({
              preguntaNumero: i,
              pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
              respuesta :  this.obtenerTextoRespuesta(valor),
              respuestaValor: valor,
            });
          }
          this.respuestasReporte.push({
            pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
            respuesta :  this.obtenerTextoRespuesta(valor),
          });
          this.total += valor;
  
        } else {
          this.preguntasSinResponder.push(i);
        }
      }
    }

    obtenerTextoPregunta(numero: number): string {
      return this.preguntas[numero] || "Pregunta desconocida";
    }
  
    obtenerTextoRespuesta(numero: number): string {
      return this.respuestas[numero] || "Respuesta desconocida";
    }
  
    // Calcular clasificaciones finales
    calcularResultados() {
      if (this.preguntasSinResponder.length > 0) {
        this.errorMensaje = `Por favor, responde las siguientes preguntas: ${this.preguntasSinResponder.join(', ')}`;
        this.respuestasReporte.splice(0);
      } else {
        // Interpretar puntuaciones
        this.nivelAutoestima = this.total >= 30 ? "Autoestima Elevada" : this.total >= 26 ? "Autoestima Media" : "Autoestima Baja";
  
        this.resultadoVisible = true; // Mostrar resultados
  
        this.puntuaciones = `${this.total}`;
        this.clasificaciones = `${this.nivelAutoestima}`;
        // Generar Reporte
        this.generarPDF(this.respuestasReporte);
      }
    }
  
    obtenerDatosTest(){
      let datos = this.servicioSeguridad.getDataTestLocal();
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
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al guardar los resultados del test");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
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
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al guardar las respuestas relevantes");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
    }

    generarPDF(respuestas: { pregunta: string; respuesta: string}[]){
      const pdf = new jsPDF();
        
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
        
      let y = 20; // Posición inicial en Y
        
      pdf.text('Resultados del Test Autoestima', 105, y, { align: 'center' });
      y += 10;
        
      pdf.text('Fecha: ' + new Date().toLocaleDateString(), 10, y);
      y += 10;
        
      // Agregar resultados del test
      respuestas.forEach(({ pregunta, respuesta}, index) => {
        pdf.text(`\n ${index + 1}. ${pregunta} \n Respuesta: ${respuesta}`, 10, y);
        y += 14;
        
        // Control de página
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      });
        
      y += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Puntaje total: ${this.total}`, 10, y);
        
        
      y += 10;
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Interpretación: ${this.clasificaciones}`, 10, y);
        
      // Guardar el archivo
      pdf.save('Resultados_Autoestima.pdf');
      
      // Convertir el PDF en un Blob
      const pdfBlob = pdf.output('blob');
      
      // Crear un FormData para enviarlo
      const formData = new FormData();
      formData.append('file', pdfBlob, 'ResultadosAutoestima.pdf');
      
      
      this.servicioUploadPDF.saveRecord(formData).subscribe({
        next: (data: ArchivoPDFModelo) => {
          // Manejo de autenticación exitosa
        },
        error: (error: any) => {
          // Manejo de error en autenticación
          alert("Error al guardar el archivo");
        },
        complete: () => {
          // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        }
      });
      
    }
}
