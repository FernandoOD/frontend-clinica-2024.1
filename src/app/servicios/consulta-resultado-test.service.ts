import { Injectable } from '@angular/core';
import { ConsultaResultadoTestModelo } from '../modelos/ConsultaResultadoTest.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { TestPsicometricoModelo } from '../modelos/TestPsicometrico.modelo';

@Injectable({
  providedIn: 'root'
})
export class ConsultaResultadoTestService {

  url: String = DatosGenerales.urlBackend;
  tokenTest?:String ="";
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.tokenTest = servicioSeguridad.getTokenTest();
    console.log(this.tokenTest);
    this.token = servicioSeguridad.getToken();
    console.log(this.token);
   }

   listRecords(): Observable<ConsultaResultadoTestModelo[]>{
    return this.http.get<ConsultaResultadoTestModelo[]>(`${this.url}/pacientes`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecord(id?: number): Observable<ConsultaResultadoTestModelo>{
    return this.http.get<ConsultaResultadoTestModelo>(`${this.url}/consultas/${id}/resultado-tests`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  saveRecord(model : ConsultaResultadoTestModelo): Observable<ConsultaResultadoTestModelo>{
    return this.http.post<ConsultaResultadoTestModelo>(`${this.url}/consultas/${model.consultaId}/resultado-tests`,{
      FechaRealizacion: model.FechaRealizacion,
      Puntuacion: model.Puntuacion,
      Interpretacion: model.Interpretacion,
      consultaId: model.consultaId,
      testPsicometricoId: model.testPsicometricoId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.tokenTest}`
      })
    });
  }
  updateRecord(model : ConsultaResultadoTestModelo): Observable<ConsultaResultadoTestModelo>{
    return this.http.put<ConsultaResultadoTestModelo>(`${this.url}/pacientes/${model.id}`, model,{
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

  getTokenTest(model : TestPsicometricoModelo) : Observable<any>{
    return this.http.post<TestPsicometricoModelo>(`${this.url}/generarToken`,{
      id : model.id,
      nombre : model.Nombre,
      consultaId : model.consultaId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

}
