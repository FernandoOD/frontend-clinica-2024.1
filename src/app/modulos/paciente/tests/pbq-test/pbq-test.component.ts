import { Component } from '@angular/core';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { Router } from '@angular/router';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';
import { RespuestaRelevanteModelo } from '../../../../modelos/RespuestaRelevante.modelo';
import { RespuestasRelevantesService } from '../../../../servicios/respuestas-relevantes.service';
import { ArchivoPDFModelo } from '../../../../modelos/ArchivoPDF.modelo';
import jsPDF from 'jspdf';
import { UploadPdfService } from '../../../../servicios/upload-pdf.service';

@Component({
    selector: 'app-pbq-test',
    templateUrl: './pbq-test.component.html',
    styleUrl: './pbq-test.component.css',
    standalone: false
})
export class PbqTestComponent {

    total = 0;

    errorMessage = '';
    resultado = false;

    consultaId? = 0;
    testPsicometricoId? = 0;
    consultaTestId? = 0;

    evitativo: number = 0;
    dependiente: number = 0;
    obsesivo: number = 0;
    antisocial: number = 0;
    narcisista: number = 0;
    histrionica: number = 0;
    esquizoide: number = 0;
    paranoide:number = 0;
    limite:number = 0;

    respuestasRelevantes: RespuestaRelevanteModelo[] = [];
    respuestasReporte: any[] = [];
    
      preguntas: { [key: number]: string } = {
        1: "Soy socialmente inepto e indeseable en el trabajo y/o en situaciones sociales",
        2: "Debo evitar situaciones desagradables a toda costa",
        3: "Debo evitar las situaciones en las que llamo la atención o ser tan discreto como me sea posible",
        4: "Es mejor no hacer nada que intentar algo que podría fallar",
        5: "Si ignoro un problema, este desaparece",
        6: "Necesito a alguien disponible en todo momento para que me ayude a llevar a cabo lo que tengo que hacer o en caso de que algo malo suceda",
        7: "Lo peor que me puede pasar es ser abandonado",
        8: "Si no soy amado, siempre seré infeliz",
        9: "Debo ser sumiso para tener a la gente de buenas conmigo",
        10: "Necesito que otros me ayuden a tomar decisiones o que me digan que hacer",
        11: "Tengo que depender de mí mismo para ver que las cosas se hagan bien",
        12: "Es importante hacer un trabajo perfecto en todo",
        13: "Tengo que estar en completo control de mis emociones",
        14: "Fallas, defectos o errores son intolerables",
        15: "Mi forma de hacer las cosas, es generalmente la mejor manera",
        16: "Está bien mentir y engañar mientras no me descubran",
        17: "Otras personas son débiles y se merecen que se aprovechen de ellos",
        18: "Debo hacer todo lo que quiera mientras no me atrapen",
        19: "Como puedo salirme con la mía, no tengo que  preocuparme por las consecuencias",
        20: "Si la gente no puede cuidarse a sí misma, es su problema",
        21: "Dado que soy tan superior tengo derecho a un trato especial y privilegios",
        22: "Es muy importante obtener reconocimiento, halagos y admiración",
        23: "La gente debe reconocer lo especial que soy",
        24: "Las necesidades de otras personas no deben interferir con las mías",
        25: "Trato de socializar únicamente con gente de mi estatus o nivel",
        26: "Para ser feliz, necesito que otras personas me presten atención",
        27: "La manera de obtener lo que quiero es deslumbrar o divertir la gente",
        28: "Es terrible si la gente me ignora",
        29: "Me gusta ser el centro de atención",
        30: "La gente me presta atención sólo si actúo de manera extrema",
        31: "Disfruto más hacer las cosas por mí mismo que con otras personas",
        32: "En muchas situaciones, estoy mejor estando solo",
        33: "Mi privacidad es mucho más importante que la cercanía con la gente",
        34: "Puedo usar a la gente para mis propósitos, mientras no me involucre",
        35: "",
        36: "Tengo que estar con la guardia alta en todo momento",
        37: "No es seguro confiar en otras personas",
        38: "Si la gente actúa amigablemente, seguramente es porque quieren algo",
        39: "La gente se aprovecharía de mí si se los permito",
        40: "Si las personas averiguan cosas de mí, van a utilizarlas en mi contra",
        41: "Si las personas se acercan a mí, van a descubrir mi verdadero “yo” y me rechazarán",
        42: "Si tengo emociones desagradables se intensificarán y se saldrán de control",
        43: "Cualquier señal de tensión en una relación indica que la relación está mal y debo terminarla",
        44: "Soy débil y necesito de la gente",
        45: "Las personas cercanas a mí pueden ser desleales o infieles",
      };
    
      respuestas: { [key: number]: string } = {
        4: "Creo totalmente",
        3: "Creo mucho",
        2: "Creo moderadamente",
        1: "Creo poco",
        0: "No lo creo"
      };

    puntuaciones = `${0},${0},${0},${0},${0}`;
    
    // Clasificaciones por categoría
    clasificacionEvitativo: string = '';
    clasificacionDependiente: string = '';
    clasificacionObsesivo: string = '';
    clasificacionAntisocial: string = '';
    clasificacionNarcisista: string = '';
    clasificacionHistrionica: string = '';
    clasificacionEsquizoide: string = '';
    clasificacionParanoide: string = '';
    clasificacionLimite: string = '';

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
    this.evitativo = 0;
    this.dependiente = 0;
    this.obsesivo = 0;
    this.antisocial = 0;
    this.narcisista = 0;
    this.histrionica = 0;
    this.esquizoide = 0;
    this.paranoide = 0;
    this.limite = 0;

    let preguntasSinResponder: number[] = [];
    const sexoInput = document.querySelector<HTMLInputElement>('input[name="sexo"]:checked');

    if (!sexoInput) {
        this.errorMessage = `Por favor, selecciona tu sexo`;
        return;
    }

    const sexo = sexoInput.value as "masculino" | "femenino";

    console.log("sexo",sexo);

    // RANGOS DE CLASIFICACIÓN SEGÚN SEXO Y CATEGORÍA
    const rangos = {
        masculino: {
            evitativo: { bajo: 2, alto: 9 },
            dependiente: { bajo: 3, alto: 8 },
            obsesivo: { bajo: 4, alto: 10 },
            antisocial: { bajo: 2, alto: 7 },
            narcisista: { bajo: 3, alto: 9 },
            histrionica: { bajo: 4, alto: 10 },
            esquizoide: { bajo: 5, alto: 11 },
            paranoide: { bajo: 3, alto: 8 },
            limite: { bajo: 4, alto: 9 }
        },
        femenino: {
            evitativo: { bajo: 3, alto: 8 },
            dependiente: { bajo: 4, alto: 9 },
            obsesivo: { bajo: 5, alto: 11 },
            antisocial: { bajo: 3, alto: 8 },
            narcisista: { bajo: 4, alto: 10 },
            histrionica: { bajo: 5, alto: 12 },
            esquizoide: { bajo: 6, alto: 12 },
            paranoide: { bajo: 4, alto: 9 },
            limite: { bajo: 5, alto: 10 }
        }
    };

    // Función para clasificar cada categoría según el sexo

    for (let i = 1; i <= 45; i++) {
        const respuesta = document.querySelector<HTMLInputElement>(`input[name="p${i}"]:checked`);
        if (respuesta !== null) {
            const valor = parseInt(respuesta.value, 10);

            if (valor === 3 || valor === 4) {
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
            if (i <= 5) this.evitativo += valor;
            if (i >= 6 && i <= 10) this.dependiente += valor;
            if (i >= 11 && i <= 15) this.obsesivo += valor;
            if (i >= 16 && i <= 20) this.antisocial += valor;
            if (i >= 21 && i <= 25) this.narcisista += valor;
            if (i >= 26 && i <= 30) this.histrionica += valor;
            if (i >= 31 && i <= 35) this.esquizoide += valor;
            if (i >= 36 && i <= 40) this.paranoide += valor;
            if (i >= 41) this.limite += valor;
        } else {
            preguntasSinResponder.push(i);
        }
    }

    if (preguntasSinResponder.length > 0) {
        this.errorMessage = `Por favor, responde las siguientes preguntas: ${preguntasSinResponder.join(", ")}`;
        this.respuestasReporte.splice(0);
        return;
    }

    const clasificar = (valor: number, categoria: keyof typeof rangos["masculino"], sexo: "masculino" | "femenino") => {
      return valor < rangos[sexo][categoria].bajo ? 'Bajo' :
             valor > rangos[sexo][categoria].alto ? 'Alto' : 'Normal';
  };

    // Aplicar clasificación según los rangos de cada categoría
    this.clasificacionEvitativo = clasificar(this.evitativo, "evitativo", sexo);
    this.clasificacionDependiente = clasificar(this.dependiente, "dependiente", sexo);
    this.clasificacionObsesivo = clasificar(this.obsesivo, "obsesivo", sexo);
    this.clasificacionAntisocial = clasificar(this.antisocial, "antisocial", sexo);
    this.clasificacionNarcisista = clasificar(this.narcisista, "narcisista", sexo);
    this.clasificacionHistrionica = clasificar(this.histrionica, "histrionica", sexo);
    this.clasificacionEsquizoide = clasificar(this.esquizoide, "esquizoide", sexo);
    this.clasificacionParanoide = clasificar(this.paranoide, "paranoide", sexo);
    this.clasificacionLimite = clasificar(this.limite, "limite", sexo);
    

      const resultadoDiv = document.getElementById("resultado") as HTMLDivElement;
        // Mostrar el resultado
        if (resultadoDiv) {
            resultadoDiv.scrollIntoView({ behavior: 'smooth' });
          }
        this.resultado = true;

        this.puntuaciones = `${this.total},${this.evitativo},${this.dependiente},${this.obsesivo},${this.antisocial},${this.narcisista},${this.histrionica},${this.esquizoide},${this.paranoide},${this.limite}`;
        this.clasificaciones = `${this.clasificacionEvitativo},${this.clasificacionDependiente},${this.clasificacionObsesivo},${this.clasificacionAntisocial},${this.clasificacionNarcisista},${this.clasificacionHistrionica},${this.clasificacionEsquizoide},${this.clasificacionParanoide},${this.clasificacionLimite}`;

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

        obtenerTextoPregunta(numero: number): string {
          return this.preguntas[numero] || "Pregunta desconocida";
        }
      
        obtenerTextoRespuesta(numero: number): string {
          return this.respuestas[numero] || "Respuesta desconocida";
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
    
      pdf.text('Resultados del Test PBQ', 105, y, { align: 'center' });
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
      pdf.save('Resultados_PBQ.pdf');
  
      // Convertir el PDF en un Blob
      const pdfBlob = pdf.output('blob');
  
      // Crear un FormData para enviarlo
      const formData = new FormData();
      formData.append('file', pdfBlob, 'ResultadosPBQ.pdf');
  
  
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
