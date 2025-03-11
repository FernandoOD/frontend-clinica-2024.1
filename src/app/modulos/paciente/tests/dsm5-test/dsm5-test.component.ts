import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaResultadoTestModelo } from '../../../../modelos/ConsultaResultadoTest.modelo';
import { ConsultaTestModelo } from '../../../../modelos/ConsultaTest.modelo';
import { TestPsicometricoModelo } from '../../../../modelos/TestPsicometrico.modelo';
import { ConsultaResultadoTestService } from '../../../../servicios/consulta-resultado-test.service';
import { ConsultaTestService } from '../../../../servicios/consulta-test.service';
import { SeguridadService } from '../../../../servicios/seguridad.service';

@Component({
    selector: 'app-dsm5-test',
    templateUrl: './dsm5-test.component.html',
    styleUrl: './dsm5-test.component.css',
    standalone: false
})
export class Dsm5TestComponent {
    error: string = '';
    resultado: string = '';

    puntuaciones = `${0},${0},${0},${0},${0}`;
    severidadGeneral = "";

    consultaId? = 0;
    testPsicometricoId? = 0;
    consultaTestId? = 0;

     constructor (
        private servicioResultadoTest: ConsultaResultadoTestService,
        private servicioSeguridad: SeguridadService,
        private servicioConsultaTest: ConsultaTestService,
        private router: Router
      ){
    
      }

    onSubmit(event: Event): void{
        event.preventDefault();
    
        // Limpiar mensajes anteriores
        const resultadoDiv = document.getElementById("resultado") as HTMLDivElement;

        this.error= '';
        resultadoDiv.style.display = "none";
    
        let total = 0;
        let preguntasSinResponder: number[] = [];
    
        // Categorías específicas
        let depresion = 0; // Preguntas 1-2
        let irritabilidad = 0; // Preguntas 3-5
        let ansiedad = 0; // Preguntas 6-7
        let autolesion = 0; // Pregunta 37
    
        // Verificar respuestas
        for (let i = 1; i <= 37; i++) {
            const respuesta = document.querySelector<HTMLInputElement>(`input[name="p${i}"]:checked`);
            if (respuesta) {
                const valor = parseInt(respuesta.value, 10);
                total += valor;
    
                // Sumar a categorías específicas
                if (i <= 2) depresion += valor;
                if (i >= 3 && i <= 5) irritabilidad += valor;
                if (i >= 6 && i <= 7) ansiedad += valor;
                if (i === 37) autolesion = valor;
            } else {
                preguntasSinResponder.push(i);
            }
        }
    
        // Verificar si hay preguntas sin responder
        if (preguntasSinResponder.length > 0) {
            this.error = `Por favor, responde las siguientes preguntas: ${preguntasSinResponder.join(", ")}`;
            console.log("Preguntas sin responder",preguntasSinResponder);
            return;
        }
    
        // Calcular severidad general
        this.severidadGeneral = "";

        if (total <= 37) {
            this.severidadGeneral = "Sintomatología leve";
        } else if (total <= 74) {
            this.severidadGeneral = "Sintomatología moderada";
        } else {
            this.severidadGeneral = "Sintomatología severa";
        }
    
        // Generar string de puntuaciones
        this.puntuaciones = `${total},${depresion},${irritabilidad},${ansiedad},${autolesion}`;
    
        // Mostrar el resultado
        this.resultado = `
            <h3>Resultados de la Evaluación DSM-5</h3>
            <p><strong>Puntaje total:</strong> ${total} - ${this.severidadGeneral}</p>
            <p><strong>Puntuaciones (Total, Depresión, Irritabilidad, Ansiedad, Autolesión):</strong> ${this.puntuaciones}</p>
            <div class="categoria">
                <h4>Análisis por categorías:</h4>
                <p>Depresión: ${depresion}/8 ${this.getSeveridadClass(depresion, 8)}</p>
                <p>Irritabilidad: ${irritabilidad}/12 ${this.getSeveridadClass(irritabilidad, 12)}</p>
                <p>Ansiedad: ${ansiedad}/8 ${this.getSeveridadClass(ansiedad, 8)}</p>
                ${autolesion > 0 ? '<p class="severidad-alta"><strong>Se detectaron indicadores de autolesión</strong></p>' : ''}
            </div>
            <p><strong>Recomendaciones:</strong></p>
            <ul>
                ${this.getRecomendaciones(total, autolesion)}
            </ul>
            <p><em>Nota importante: Esta evaluación es una herramienta de screening y no sustituye una evaluación profesional completa. 
            Si presentas síntomas significativos o tienes preocupaciones sobre tu salud mental, 
            es importante que consultes con un profesional de la salud mental calificado.</em></p>
        `;

        console.log("Puntuaciones",this.puntuaciones);
        resultadoDiv.style.display = "block";
    
        // Scroll hasta el resultado
        resultadoDiv.scrollIntoView({ behavior: "smooth" });


        this.obtenerDatosTest();
        
            let FechaRealizacion = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
            let obj  = new ConsultaResultadoTestModelo();
        
            obj.FechaRealizacion = FechaRealizacion;
            obj.Puntuacion = this.puntuaciones;
            obj.Interpretacion = this.severidadGeneral;
            obj.consultaId = this.consultaId;
            obj.testPsicometricoId = this.testPsicometricoId;
        
            this.servicioResultadoTest.saveRecord(obj).subscribe({
              next: (data: ConsultaResultadoTestModelo) => {
                // Manejo de autenticación exitosa
                console.log("Resultados del test guardados", data);
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

        
    getSeveridadClass(valor: number, maximo: number): string {
        const porcentaje = (valor / maximo) * 100;
        if (porcentaje <= 25) return '<span class="severidad-baja">(Leve)</span>';
        if (porcentaje <= 50) return '<span class="severidad-media">(Moderado)</span>';
        return '<span class="severidad-alta">(Severo)</span>';
    }
    
    getRecomendaciones(total: number, autolesion: number): string {
        const recomendaciones: string[] = [];
    
        if (total <= 37) {
            recomendaciones.push("Mantén un registro de tus síntomas y consulta si estos aumentan.");
            recomendaciones.push("Considera implementar técnicas de manejo del estrés y autocuidado.");
        } else if (total <= 74) {
            recomendaciones.push("Se recomienda una evaluación profesional para un mejor manejo de los síntomas.");
            recomendaciones.push("Implementa estrategias de afrontamiento saludables y busca apoyo social.");
        } else {
            recomendaciones.push("Es importante buscar ayuda profesional lo antes posible.");
            recomendaciones.push("Considera contactar servicios de salud mental para una evaluación completa.");
        }
    
        if (autolesion > 0) {
            recomendaciones.push("<strong>Es importante buscar ayuda profesional inmediata debido a los indicadores de autolesión.</strong>");
        }
    
        return recomendaciones.map(r => `<li>${r}</li>`).join('');
    
}
}
