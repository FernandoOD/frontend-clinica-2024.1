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
import jsPDF from 'jspdf';
import { ArchivoPDFModelo } from '../../../../modelos/ArchivoPDF.modelo';
import { UploadPdfService } from '../../../../servicios/upload-pdf.service';

@Component({
  selector: 'app-ysq-test',
  templateUrl: './ysq-test.component.html',
  styleUrl: './ysq-test.component.css',
  standalone: false
})
export class YsqTestComponent {
   total = 0;
  
      errorMessage = '';
      resultado = false;
  
      consultaId? = 0;
      testPsicometricoId? = 0;
      consultaTestId? = 0;
  
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


      respuestasRelevantes: RespuestaRelevanteModelo[] = [];
      respuestasReporte: any[] = [];

          
      preguntas: { [key: number]: string } = {
        1: "La mayor parte del tiempo, no he tenido a alguien que me cuide, comparta conmigo, o le importe lo que me pasa",
        2: "En general, las personas no me han dado cariño y afecto",
        3: "Gran parte de mi vida, no me he sentido especial para alguien",
        4: "En su mayor parte, no he tenido a alguien que realmente me escuche, me entienda, o comprenda mis necesidades y sentimientos",
        5: "Casi nunca he tenido a una persona fuerte para que me de consejos cuando no he sabido qué hacer",
        6: "Me aferro a la gente que siento cercana porque me da miedo que me dejarán",
        7: "Necesito tanto a otras personas que me preocupo que los perderé",
        8: "Me preocupo que la gente cercana a mí me dejarán o abandonarán",
        9: "Cuando siento que alguien que quiero se aleja de mí, me siento desesperado",
        10: "A veces me preocupo tanto que la gente me deje que los alejo",
        11: "Siento que la gente se va a aprovechar de mí",
        12: "Siento que no puedo bajar la guardia frente a otras personas, o ellas podrían lastimarme intencionalmente",
        13: "Es solo cuestión de tiempo antes de que alguien me traicione",
        14: "Sospecho de los motivos de otras personas",
        15: "Usualmente estoy al pendiente de los motivos escondidos de la gente",
        16: "No encajo (socialmente)",
        17: "Soy fundamentalmente diferente a los demás",
        18: "No pertenezco, soy solitario",
        19: "Me siento alejado de otras personas",
        20: "Siempre me siento externo a los grupos",
        21: "Nadie que yo desee me podría amar cuando vea mis defectos",
        22: "Nadie que yo desee quisiera estar cerca de mí si conociera mi verdadero yo",
        23: "No merezco el amor, atención y respeto de otros",
        24: "Siento que no soy digno de ser amado",
        25: "Siento que soy inaceptable y no quiero que otros se den cuenta",
        26: "Casi nada de lo que hago me sale tan bien que a los demás",
        27: "Soy incompetente cuando se refiere a logros",
        28: "La mayoría de las personas son más capaces que yo en áreas de trabajo y logros",
        29: "No tengo tanto talento como la mayoría de las personas en sus trabajos",
        30: "No soy tan inteligente como la mayoría de las personas cuando se refiere al trabajo",
        31: "No me siento capaz de arreglármelas solo en la vida diaria",
        32: "Me veo a mí mismo como dependiente cuando se refiere al funcionamiento de todos los días",
        33: "No tengo sentido común",
        34: "No puedo confiar en mi juicio para situaciones cotidianas",
        35: "No siento confianza en mi capacidad para resolver los problemas diarios que surgen",
        36: "No puedo evitar sentir que algo malo está a punto de suceder",
        37: "Siento que un desastre (natural, criminal, financiero, médico) puede suceder en cualquier momento",
        38: "Me preocupa ser atacado",
        39: "Me preocupa perder todo mi dinero y quedarme en quiebra",
        40: "Me preocupa que puedo desarrollar una enfermedad grave, aunque el médico no me ha diagnosticado nada serio",
        41: "No me he podido separar de mis padres (o uno de ellos) de la misma manera que otras personas de mi edad lo han hecho",
        42: "Mis padres (o uno de ellos) y yo nos sobreinvolucramos en nuestras vidas y nuestros problemas",
        43: "Es muy difícil que mis padres (o uno de ellos) y yo nos guardemos detalles íntimos, sin sentirnos traicionados o culpables",
        44: "Seguido siento que mis padres (o uno de ellos) viven a través de mí; no tengo vida propia",
        45: "Seguido siento que no tengo identidad separada de mis padres (o uno de ellos) o de mi pareja",
        46: "Pienso que si hago lo que quiero, solo me encontraré con problemas",
        47: "Siento que no tengo opción más que acceder a los deseos de otros, o ellos se pueden vengar o rechazarme de alguna manera",
        48: "En relaciones, permito que el otro tenga la ventaja",
        49: "Siempre he permitido que otros tomen decisiones por mí, así que no sé realmente qué quiero para mí",
        50: "Se me dificulta exigir que mis derechos se respeten y que mis sentimientos sean tomados en cuenta",
        51: "Usualmente soy el que termina cuidando a la gente cercana a mí",
        52: "Soy una buena persona porque pienso en otros más que en mí mismo",
        53: "Estoy tan ocupado haciendo cosas por otros, que casi no tengo tiempo para mí mismo",
        54: "Siempre he sido el que escucha los problemas de los demás",
        55: "Otras personas ven que hago demasiado por otros y no suficiente por mí",
        56: "Me siento incómodo mostrando sentimientos positivos (Ej. afecto, preocupación)",
        57: "Me da pena expresar mis emociones a otros",
        58: "Se me dificulta ser cálido y espontáneo",
        59: "Me controlo tanto que mucha gente cree que no tengo emociones",
        60: "La gente me ve como emocionalmente tenso / frío",
        61: "Tengo que ser el mejor en lo que hago; no puedo aceptar ser segundo lugar",
        62: "Intento hacer todo lo mejor posible; no me puedo conformar con 'suficiente'",
        63: "Tengo que cumplir todas mis responsabilidades a la perfección",
        64: "Siento que hay presión constante para que tenga logros y termine las cosas",
        65: "No me puedo disculpar fácilmente o hacer excusas por mis errores",
        66: "Se me dificulta aceptar que me digan que 'no' cuando quiero algo de otras personas",
        67: "Soy especial y no debería de aceptar las restricciones que se le ponen a otras personas",
        68: "Odio ser limitado o que no me permitan hacer lo que quiero",
        69: "Siento que no debería tener que seguir las mismas reglas que otras personas",
        70: "Siento que lo que tengo que ofrecer es de mayor valor que las contribuciones de otros",
        71: "No me puedo disciplinar para terminar tareas o labores aburridas",
        72: "Si no puedo alcanzar una meta, me frustro fácilmente y renuncio",
        73: "Se me dificulta sacrificar gratificación inmediata para alcanzar una meta a largo plazo",
        74: "No me puedo forzar a hacer algo que no disfrute, aunque sepa que es por mi bien",
        75: "Raramente he podido mantener mis propósitos",
      };
          
      respuestas: { [key: number]: string } = {
        1: "Completamente falso en mí",
        2: "Mayormente falso en mí",
        3: "Un poco más cierto que falso",
        4: "Bastante cierto en mí",
        5: "Mayormente cierto en mí",
        6: "Me describe perfectamente"
      };
  
      puntuaciones = `${0},${0},${0},${0},${0}`;
      
      // Clasificaciones por categoría
      clasificacionPrivacionEmocional: string = '';
      clasificacionAbandono: string = '';
      clasificacionDesconfianzaAbuso: string = '';
      clasificacionAislamientoSocial: string = '';
      clasificacionDefectuosidad: string = '';
      clasificacionFracaso: string = '';
      clasificacionIncompetencia: string = '';
      clasificacionVulnerabilidad: string = '';
      clasificacionSimbiosis: string = '';
      clasificacionSubyugacion: string = '';
      clasificacionSacrificio : string = '';
      clasificacionInhibicionEmocional : string = '';
      clasificacionEstandaresInalcanzables : string = '';
      clasificacionGrandiosidad : string = '';
      clasificacionDisciplinaInsuficiente : string = '';
  
      clasificaciones = '';
  
  
      constructor (
          private servicioResultadoTest: ConsultaResultadoTestService,
          private servicioSeguridad: SeguridadService,
          private servicioConsultaTest: ConsultaTestService,
          private servicioRespuestasRelevantes: RespuestasRelevantesService,
          private servicioUploadPDF: UploadPdfService,
          private router: Router
        ){
      
        }
  
      onSubmit(event: Event): void {
  
        event.preventDefault();
  
      this.total = 0;
      this.errorMessage = '';
      this.resultado = false;
  
      // Inicializamos variables en 0
      this.privacionEmocional = 0;
      this.abandono = 0;
      this.desconfianzaAbuso = 0;
      this.aislamientoSocial = 0;
      this.defectuosidad = 0;
      this.fracaso = 0;
      this.incompetencia = 0;
      this.vulnerabilidad = 0;
      this.simbiosis = 0;
      this.subyugacion = 0;
      this.sacrificio = 0;
      this.inhibicionEmocional = 0;
      this.estandaresInalcanzables = 0;
      this.grandiosidad = 0;
      this.disciplinaInsuficiente = 0;
  
      let preguntasSinResponder: number[] = [];
      
      // RANGOS DE CLASIFICACIÓN SEGÚN SEXO Y CATEGORÍA
      const rangos = {
        privacionEmocional: { bajo: 6, alto: 18 },
        abandono: { bajo: 8, alto: 21 },
        desconfianzaAbuso: { bajo: 7, alto: 19 },
        aislamientoSocial: { bajo: 7, alto: 19 },
        defectuosidad: { bajo: 5, alto: 17 },
        fracaso: { bajo: 6, alto: 18 },
        incompetencia: { bajo: 6, alto: 16 },
        vulnerabilidad: { bajo: 8, alto: 20 },
        simbiosis: { bajo: 7, alto: 19 },
        subyugacion: { bajo: 7, alto: 18 },
        sacrificio : {bajo: 10, alto: 23},
        inhibicionEmocional: {bajo: 7, alto: 20},
        estandaresInalcanzables: {bajo: 12, alto: 23},
        grandiosidad: {bajo: 9, alto: 20},
        disciplinaInsuficiente: {bajo: 8, alto:20}
    };
  
      // Función para clasificar cada categoría según el sexo
  
      for (let i = 1; i <= 75; i++) {
          const respuesta = document.querySelector<HTMLInputElement>(`input[name="p${i}"]:checked`);
          if (respuesta !== null) {
              const valor = parseInt(respuesta.value, 10);

              if (valor === 4 || valor === 5 || valor === 6 ) {
                this.respuestasRelevantes.push({
                  preguntaNumero: i,
                  pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
                  respuesta :  this.obtenerTextoRespuesta(valor),
                  respuestaValor: valor,
                });
              }
              this.respuestasReporte.push({
                pregunta: this.obtenerTextoPregunta(i), // Método para obtener el texto
                respuesta :  this.obtenerTextoRespuesta((i*10)+valor),
              });
              this.total += valor;
              if (i <= 5) this.privacionEmocional += valor;
              if (i >= 6 && i <= 10) this.abandono += valor;
              if (i >= 11 && i <= 15) this.desconfianzaAbuso += valor;
              if (i >= 16 && i <= 20) this.aislamientoSocial += valor;
              if (i >= 21 && i <= 25) this.defectuosidad += valor;
              if (i >= 26 && i <= 30) this.fracaso += valor;
              if (i >= 31 && i <= 35) this.incompetencia += valor;
              if (i >= 36 && i <= 40) this.vulnerabilidad += valor;
              if (i >= 41 && i <= 45) this.simbiosis += valor;
              if (i >= 46 && i <= 50) this.subyugacion += valor;
              if (i >= 51 && i <= 55) this.sacrificio += valor;
              if (i >= 56 && i <= 60) this.inhibicionEmocional += valor;
              if (i >= 61 && i <= 65) this.estandaresInalcanzables += valor;
              if (i >= 66 && i <= 70) this.grandiosidad += valor;
              if (i >= 71) this.disciplinaInsuficiente += valor;
          } else {
              preguntasSinResponder.push(i);
          }
      }
  
      if (preguntasSinResponder.length > 0) {
          this.errorMessage = `Por favor, responde las siguientes preguntas: ${preguntasSinResponder.join(", ")}`;
          this.respuestasReporte.splice(0);
          return;
      }
  
      const clasificar = (valor: number, categoria: keyof typeof rangos) => {
        return valor < rangos[categoria].bajo ? 'Bajo' :
               valor > rangos[categoria].alto ? 'Alto' : '  Normal';
    };
  
      // Aplicar clasificación según los rangos de cada categoría
      this.clasificacionPrivacionEmocional = clasificar(this.privacionEmocional, "privacionEmocional");
      this.clasificacionAbandono = clasificar(this.abandono, "abandono");
      this.clasificacionDesconfianzaAbuso = clasificar(this.desconfianzaAbuso, "desconfianzaAbuso");
      this.clasificacionAislamientoSocial = clasificar(this.aislamientoSocial, "aislamientoSocial");
      this.clasificacionDefectuosidad = clasificar(this.defectuosidad, "defectuosidad");
      this.clasificacionFracaso = clasificar(this.fracaso, "fracaso");
      this.clasificacionIncompetencia = clasificar(this.incompetencia, "incompetencia");
      this.clasificacionVulnerabilidad = clasificar(this.vulnerabilidad, "vulnerabilidad");
      this.clasificacionSimbiosis = clasificar(this.simbiosis, "simbiosis");
      this.clasificacionSubyugacion = clasificar(this.subyugacion, "subyugacion");
      this.clasificacionSacrificio = clasificar(this.sacrificio, "sacrificio");
      this.clasificacionInhibicionEmocional = clasificar(this.inhibicionEmocional, "inhibicionEmocional");
      this.clasificacionEstandaresInalcanzables = clasificar(this.estandaresInalcanzables, "estandaresInalcanzables");
      this.clasificacionGrandiosidad = clasificar(this.grandiosidad, "grandiosidad");
      this.clasificacionDisciplinaInsuficiente = clasificar(this.disciplinaInsuficiente, "disciplinaInsuficiente");
      
  
        const resultadoDiv = document.getElementById("resultado") as HTMLDivElement;
          // Mostrar el resultado
          if (resultadoDiv) {
              resultadoDiv.scrollIntoView({ behavior: 'smooth' });
            }
          this.resultado = true;
  
          this.puntuaciones = `${this.total},${this.privacionEmocional},${this.abandono},${this.desconfianzaAbuso},${this.aislamientoSocial},${this.defectuosidad},${this.fracaso},${this.incompetencia},${this.vulnerabilidad},${this.simbiosis},${this.subyugacion},${this.sacrificio},${this.inhibicionEmocional},${this.estandaresInalcanzables},${this.grandiosidad},${this.disciplinaInsuficiente}`;
          this.clasificaciones = `${this.clasificacionPrivacionEmocional},${this.clasificacionAbandono},${this.clasificacionDesconfianzaAbuso},${this.clasificacionAislamientoSocial},${this.clasificacionDefectuosidad},${this.clasificacionFracaso},${this.clasificacionIncompetencia},${this.clasificacionVulnerabilidad},${this.clasificacionSimbiosis},${this.clasificacionSubyugacion},${this.clasificacionSacrificio},${this.clasificacionInhibicionEmocional},${this.clasificacionEstandaresInalcanzables},${this.clasificacionGrandiosidad},${this.clasificacionDisciplinaInsuficiente}`;
  
          // Generar Reporte
          this.generarPDF(this.respuestasReporte);
  
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
  generarPDF(respuestas: { pregunta: string; respuesta: string}[]){
        const pdf = new jsPDF();
      
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
      
        let y = 20; // Posición inicial en Y
      
        pdf.text('Resultados del Test YSQ', 105, y, { align: 'center' });
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
        pdf.save('Resultados_YSQ.pdf');
    
        // Convertir el PDF en un Blob
        const pdfBlob = pdf.output('blob');
    
        // Crear un FormData para enviarlo
        const formData = new FormData();
        formData.append('file', pdfBlob, 'ResultadosYSQ.pdf');
    
    
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
