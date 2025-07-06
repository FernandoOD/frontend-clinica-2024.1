import { Injectable } from '@angular/core';
import { RespuestaRelevanteModelo } from '../modelos/RespuestaRelevante.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { RespuestaRelevanteEnvioModelo } from '../modelos/RespuestaRelevanteEnvioModelo.modelo';

@Injectable({
  providedIn: 'root'
})
export class RespuestasRelevantesService {
 url: String = DatosGenerales.urlBackend;
  token?:String ="";

  filter = encodeURIComponent(`{"include":[{"relation":"consultas"}]}`);

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecords(): Observable<RespuestaRelevanteModelo[]>{
    return this.http.get<RespuestaRelevanteModelo[]>(`${this.url}/consulta-tests`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecords(id?: number): Observable<RespuestaRelevanteModelo[]>{
    return this.http.get<RespuestaRelevanteModelo[]>(`${this.url}/resultado-tests/${id}/respuesta-relevantes`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  saveRecord(model : RespuestaRelevanteEnvioModelo): Observable<RespuestaRelevanteEnvioModelo>{
    return this.http.post<RespuestaRelevanteEnvioModelo>(`${this.url}/resultado-tests/${model.resultadoTestId}/respuesta-relevantes`,{
      respuestasRelevantes : model.respuestasRelevantes,
      resultadoTestId : model.resultadoTestId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : RespuestaRelevanteModelo): Observable<RespuestaRelevanteModelo>{
    return this.http.put<RespuestaRelevanteModelo>(`${this.url}/consulta-tests/${model.id}`,{
      id : model.id,
      pregunta : model.pregunta,
      preguntaNumero : model.preguntaNumero,
      respuesta : model.respuesta,
      respuestaValor : model.respuestaValor,
      resultadoTestId : model.resultadoTestId
      },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  deleteRecord(id?:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/consulta-tests/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
}
