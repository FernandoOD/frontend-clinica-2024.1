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

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
   }

   listRecords(id:number): Observable<ConsultaModelo[]>{
    return this.http.get<ConsultaModelo[]>(`${this.url}/terapeutas/${id}/consultas`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecord(id : number): Observable<ConsultaModelo>{
    return this.http.get<ConsultaModelo>(`${this.url}/pacientes/${id}`,{
      headers: new HttpHeaders({
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
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : ConsultaModelo): Observable<ConsultaModelo>{
    return this.http.put<ConsultaModelo>(`${this.url}/pacientes/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/pacientes/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
