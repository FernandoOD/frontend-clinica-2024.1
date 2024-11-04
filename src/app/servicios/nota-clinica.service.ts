import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { NotaClinicaModelo } from '../modelos/NotaClinica.modelo';

@Injectable({
  providedIn: 'root'
})
export class NotaClinicaService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
   }

   listRecords(): Observable<NotaClinicaModelo[]>{
    return this.http.get<NotaClinicaModelo[]>(`${this.url}/notas-clinicas`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  findRecord(id : number): Observable<NotaClinicaModelo>{
    return this.http.get<NotaClinicaModelo>(`${this.url}/notas-clinicas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  saveRecord(model : NotaClinicaModelo): Observable<NotaClinicaModelo>{
    return this.http.post<NotaClinicaModelo>(`${this.url}/notas-clinicas`,{
      Contenido : model.Contenido,
      PlanTratamiento : model.PlanTratamiento,
      Objetivos : model.Objetivos,
      Conceptualizacion : model.Conceptualizacion,
      consultaId : model.consultaId,
      FechaCreacion : model.FechaCreacion
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : NotaClinicaModelo): Observable<NotaClinicaModelo>{
    return this.http.put<NotaClinicaModelo>(`${this.url}/notas-clinicas/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/notas-clinicas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
