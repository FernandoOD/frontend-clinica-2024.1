import { Injectable } from '@angular/core';
import { ConsultaModelo } from '../modelos/Consulta.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  filter = encodeURIComponent(`{"include":[{"relation":"pacienteConsulta"}]}`);
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecordsTerapeuta(id:number): Observable<ConsultaModelo[]>{
    return this.http.get<ConsultaModelo[]>(`${this.url}/terapeutas/${id}/consultas/?filter=${this.filter}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  listRecordsPaciente(id:number): Observable<ConsultaModelo[]>{
    return this.http.get<ConsultaModelo[]>(`${this.url}/pacientes/${id}/consultas/?filter=${this.filter}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  findRecord(id : number): Observable<ConsultaModelo>{
    return this.http.get<ConsultaModelo>(`${this.url}/consulta/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  saveRecord(model : ConsultaModelo): Observable<ConsultaModelo>{
    return this.http.post<ConsultaModelo>(`${this.url}/pacientes/${model.pacienteId}/consultas`,{
      FechaConsulta: model.FechaConsulta,
      NotasConsulta: model.NotasConsulta,
      terapeutaId: model.terapeutaId,
      pacienteId: model.pacienteId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : ConsultaModelo): Observable<ConsultaModelo>{
    return this.http.patch<ConsultaModelo>(`${this.url}/pacientes/${model.pacienteId}/consultas?where[id]=${model.id}`,{
      id : model.id,
      FechaConsulta: model.FechaConsulta,
      NotasConsulta: model.NotasConsulta,
      terapeutaId: model.terapeutaId,
      pacienteId: model.pacienteId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/pacientes/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
}
