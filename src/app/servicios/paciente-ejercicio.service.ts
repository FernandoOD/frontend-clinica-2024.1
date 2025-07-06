import { Injectable } from '@angular/core';
import { PacienteEjercicioModelo } from '../modelos/PacienteEjercicio.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteEjercicioService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  filter = encodeURIComponent(`{"include":[{"relation":"consultas"}]}`);

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecords(): Observable<PacienteEjercicioModelo[]>{
    return this.http.get<PacienteEjercicioModelo[]>(`${this.url}/paciente-ejercicios-practicos`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecords(id?: number): Observable<PacienteEjercicioModelo[]>{
    return this.http.get<PacienteEjercicioModelo[]>(`${this.url}/paciente-ejercicios-practicos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  saveRecord(model : PacienteEjercicioModelo): Observable<PacienteEjercicioModelo>{
    return this.http.post<PacienteEjercicioModelo>(`${this.url}/paciente-ejercicios-practicos`,{
      pacienteId: model.pacienteId,
      ejercicioPracticoId: model.ejercicioPracticoId,
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : PacienteEjercicioModelo): Observable<PacienteEjercicioModelo>{
    return this.http.patch<PacienteEjercicioModelo>(`${this.url}/paciente-ejercicios-practicos/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  deleteRecord(id?:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/paciente-ejercicios-practicos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
}
