import { Injectable } from '@angular/core';
import { ConsultaTestModelo } from '../modelos/ConsultaTest.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaTestService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  filter = encodeURIComponent(`{"include":[{"relation":"consultas"}]}`);

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecords(): Observable<ConsultaTestModelo[]>{
    return this.http.get<ConsultaTestModelo[]>(`${this.url}/consulta-tests`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecords(id?: number): Observable<ConsultaTestModelo[]>{
    return this.http.get<ConsultaTestModelo[]>(`${this.url}/consulta-tests/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  saveRecord(model : ConsultaTestModelo): Observable<ConsultaTestModelo>{
    return this.http.post<ConsultaTestModelo>(`${this.url}/consulta-tests`,{
      consultaId: model.consultaId,
      testPsicometricoId: model.testPsicometricoId,
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : ConsultaTestModelo): Observable<ConsultaTestModelo>{
    return this.http.put<ConsultaTestModelo>(`${this.url}/consulta-tests/${model.id}`,{
      id : model.id,
      consultaId : model.consultaId,
      testPsicometricoId : model.testPsicometricoIdOnly,
      contestado : model.contestado
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
