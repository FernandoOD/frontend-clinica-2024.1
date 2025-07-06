import { Injectable } from '@angular/core';
import { HistoriaClinicaModelo } from '../modelos/HistoriaClinica.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecords(): Observable<HistoriaClinicaModelo[]>{
    return this.http.get<HistoriaClinicaModelo[]>(`${this.url}/historias-clinicas`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecord(id : number): Observable<HistoriaClinicaModelo>{
    return this.http.get<HistoriaClinicaModelo>(`${this.url}/historias-clinicas/${id}`,{
      headers: new HttpHeaders({
      })
    });
  }

  saveRecord(model : HistoriaClinicaModelo): Observable<HistoriaClinicaModelo>{
    return this.http.post<HistoriaClinicaModelo>(`${this.url}/historias-clinicas`,{
      FechaCreacion: model.FechaCreacion,
      Descripcion: model.Descripcion,
      pacienteId: model.pacienteId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : HistoriaClinicaModelo): Observable<HistoriaClinicaModelo>{
    return this.http.put<HistoriaClinicaModelo>(`${this.url}/historias-clinicas/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/historias-clinicas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

}
