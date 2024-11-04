import { Injectable } from '@angular/core';
import { PacienteTerapeutaModelo } from '../modelos/PacienteTerapeuta.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteTerapeutaService {

  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
   }

   listRecords(idPersona : number): Observable<PacienteTerapeutaModelo[]>{
    return this.http.get<PacienteTerapeutaModelo[]>(`${this.url}/terapeutas/${idPersona}/pacientes`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecord(id : number): Observable<PacienteTerapeutaModelo>{
    return this.http.get<PacienteTerapeutaModelo>(`${this.url}/paciente-terapeutas/${id}`,{
      headers: new HttpHeaders({
      })
    });
  }

  saveRecord(model : PacienteTerapeutaModelo): Observable<PacienteTerapeutaModelo>{
    return this.http.post<PacienteTerapeutaModelo>(`${this.url}/paciente-terapeutas`,{
      FechaInicio : model.FechaInicio,
      pacienteId : model.pacienteId,
      terapeutaId : model.terapeutaId,
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : PacienteTerapeutaModelo): Observable<PacienteTerapeutaModelo>{
    return this.http.put<PacienteTerapeutaModelo>(`${this.url}/paciente-terapeutas/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/paciente-terapeutas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
