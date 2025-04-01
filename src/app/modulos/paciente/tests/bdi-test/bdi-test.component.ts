import { Component } from '@angular/core';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { Route, Router } from '@angular/router';
import { RespuestaRelevanteModelo} from '../../../../modelos/RespuestaRelevante.modelo';
import { RespuestasRelevantesService } from '../../../../servicios/respuestas-relevantes.service';
import { ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ArchivoPDFModelo} from '../../../../modelos/ArchivoPDF.modelo';
import { UploadPdfService } from '../../../../servicios/upload-pdf.service';

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

  @ViewChild('formularioTest', { static: false }) formularioTest!: ElementRef;

  respuestasRelevantes: RespuestaRelevanteModelo[] = [];
  respuestasReporte: any[] = [];

  preguntas: { [key: number]: string } = {
    1: "Tristeza",
    2: "Pesimismo",
    3: "Fracaso",
    4: "Pérdida de Placer",
    5: "Sentimientos de culpa",
    6: "Sentimiento de castigo",
    7: "Desagrado con uno mismo",
    8: "Autocrítica",
    9: "Pensamientos suicidas",
    10: "Llorar",
    11: "Agitación",
    12: "Pérdida de interés",
    13: "Indecisión",
    14: "Sentimientos de falta de valor",
    15: "Pérdida de energía",
    16: "Cambios en patrones de sueño",
    17: "Irritabilidad",
    18: "Cambios en el apetito",
    19: "Dificultad para concentrarse",
    20: "Cansancio o fatiga",
    21: "Pérdida de interés en el sexo",
  };

  respuestas: { [key: number]: string } = {
    10: "No me siento triste",
    11: "Me siento triste la mayor parte del tiempo",
    12: "Me siento triste todo el tiempo",
    13: "Me siento tan triste o infeliz que no lo puedo soportar",
    20: "No me siento desalentado sobre mi futuro",
    21: "Me siento más desalentado de lo que solía estar",
    22: "No espero que las cosas me salgan bien",
    23: "Siento que mi futuro no tiene esperanza",
    30: "No me siento como un fracasado",
    31: "He fallado más de lo que debería",
    32: "Cuando reflexiono en mi pasado, veo demasiados fracasos",
    33: "Siento que soy un completo fracaso como persona",
    40: "Me causan tanto placer las cosas que me gustaban como antes",
    41: "No disfruto tanto de las cosas como antes",
    42: "Obtengo muy poco placer de las cosas que antes disfrutaba",
    43: "No puedo obtener placer de las cosas que antes disfrutaba",
    50: "No me siento particularmente culpable",
    51: "Me siento culpable sobre cosas que hice o debí haber hecho",
    52: "Me siento culpable la mayor parte del tiempo",
    53: "Me siento culpable todo el tiempo",
    60: "No siento que me estén castigando",
    61: "Siento que puedo estar siendo castigado",
    62: "Siento que me van a castigar",
    63: "Siento que estoy siendo castigado",
    70: "Me siento igual conmigo mismo que siempre",
    71: "He perdido confianza en mí mismo",
    72: "Estoy decepcionado de mí mismo",
    73: "Me desagrado",
    80: "No me critico ni me culpo más de lo usual",
    81: "Soy más crítico conmigo mismo de lo usual",
    82: "Me critico por todos mis errores o faltas",
    83: "Me culpo de todo lo malo que pasa",
    90: "No tengo ningún pensamiento sobre suicidarme",
    91: "He tenido pensamientos suicidas pero no los llevaría a cabo",
    92: "Quisiera suicidarme",
    93: "Si tuviese la oportunidad, me suicidaría",
    100: "No lloro más de lo usual",
    101: "Lloro más de lo que solía",
    102: "Lloro por cosas insignificantes",
    103: "Me siento como si quisiera llorar pero no puedo",
    110: "No me encuentro más agitado de lo usual",
    111: "Me siento más agitado de lo usual",
    112: "Me siento tan agitado que me es difícil mantenerme quieto",
    113: "Me siento tan agitado que tengo que estar moviéndome o haciendo algo",
    120: "No he perdido el interés en otras personas o actividades",
    121: "Estoy menos interesado en otras personas o actividades que antes",
    122: "He perdido la mayoría del interés en otras personas o actividades",
    123: "Es difícil el interesarme en algo",
    130: "Tomo decisiones tan bien como siempre",
    131: "Encuentro más difícil tomar decisiones que antes",
    132: "Tengo mucha mayor dificultad en tomar decisiones que antes",
    133: "Tengo problemas en tomar cualquier decisión",
    140: "No me siento como una persona sin valía",
    141: "No me considero tan útil o con tanta valía como solía hacerlo",
    142: "Siento que valgo menos comparado con otras personas",
    143: "Me siento completamente devaluado y sin valía alguna como persona",
    150: "Tengo tanta energía como siempre",
    151: "Tengo menos energía de lo usual",
    152: "No tengo suficiente energía para hacer demasiado",
    153: "No tengo suficiente energía para hacer cualquier cosa",
    160: "No he experimentado ningún cambio en mis patrones de sueño",
    161: "Duermo algo más o algo menos de lo usual",
    162: "Duermo mucho más o mucho menos de lo usual",
    163: "Duermo la mayor parte del día o me despierto 1-2 horas más temprano de lo usual y no puedo volver a dormir",
    170: "No me encuentro más irritable de lo usual",
    171: "Estoy más irritable de lo usual",
    172: "Estoy mucho más irritable de lo usual",
    173: "Estoy irritable todo el tiempo",
    180: "No he tenido cambios en mi apetito",
    181: "Mi apetito es algo menos o algo más de lo usual",
    182: "Mi apetito es mucho menos o mucho más de lo usual",
    183: "No tengo apetito o pienso en comida todo el tiempo",
    190: "Me puedo concentrar tan bien como siempre",
    191: "No me puedo concentrar tan bien como antes",
    192: "Me es difícil mantener mi atención en algo por mucho tiempo",
    193: "No me puedo concentrar en nada",
    200: "No me siento más cansado o fatigado de lo normal",
    201: "Me he cansado o fatigado más fácilmente de lo usual",
    202: "Estoy muy cansado o fatigado como para hacer muchas de las cosas que antes hacía",
    203: "Estoy muy cansado o fatigado como para hacer todo lo que hacía antes",
    210: "No he notado cambios recientes en mi interés por el sexo",
    211: " Estoy menos interesado en el sexo de lo que solía estar",
    212: "Estoy mucho menos interesado en el sexo ahora",
    213: "He perdido el interés en el sexo por completo",
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
            respuesta :  this.obtenerTextoRespuesta((i*10)+valor),
            respuestaValor: valor,
          });
        }
        this.respuestasReporte.push({
          pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
          respuesta :  this.obtenerTextoRespuesta((i*10)+valor),
        });
        this.total += valor;
      } else {
        preguntasSinResponder.push(i);
      }
    }

    // Verificar si hay preguntas sin responder
    if (preguntasSinResponder.length > 0) {
      this.error = `Por favor, responde las siguientes preguntas: ${preguntasSinResponder.join(", ")}`;
      this.respuestasReporte.splice(0)
      return;
    }

    // Interpretar la puntuación
    this.interpretarResultados();
    // Generar Reportez|  
    this.generarPDF(this.respuestasReporte);
    

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
      this.clasificacion = 'Sin Depresión';
      this.recomendacion = 'Los síntomas depresivos están dentro del rango normal.';
    } else if (this.total <= 20) {
      this.clasificacion = 'Depresión leve';
      this.recomendacion = 'Se recomienda monitorear los síntomas y considerar una consulta profesional si persisten.';
    } else if (this.total <= 30) {
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

  generarPDF(respuestas: { pregunta: string; respuesta: string}[]){
    const pdf = new jsPDF();
  
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
  
    let y = 20; // Posición inicial en Y
  
    pdf.text('Resultados del Test BDI', 105, y, { align: 'center' });
    y += 10;
  
    pdf.text('Fecha: ' + new Date().toLocaleDateString(), 10, y);
    y += 10;
  
    let puntajeTotal = 0;
  
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
    pdf.text(`Interpretación: ${this.clasificacion}`, 10, y);
  
    // Guardar el archivo
    pdf.save('Resultados_BDI.pdf');

    // Convertir el PDF en un Blob
    const pdfBlob = pdf.output('blob');

    // Crear un FormData para enviarlo
    const formData = new FormData();
    formData.append('file', pdfBlob, 'ResultadosBDI.pdf');


    this.servicioUploadPDF.saveRecord(formData).subscribe({
      next: (data: ArchivoPDFModelo) => {
        // Manejo de autenticación exitosa
        console.log("Guardado Correcto del archivo", data);
      },
      error: (error: any) => {
        // Manejo de error en autenticación
        console.error("Error de autenticación", error);
        alert("Error al guardar el archivo");
      },
      complete: () => {
        // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
        console.log('Proceso de guardado completado');
      }
    });

  }

}
