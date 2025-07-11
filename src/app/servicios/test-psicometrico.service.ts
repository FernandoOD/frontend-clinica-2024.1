import { Injectable } from '@angular/core';
import { TestPsicometricoModelo } from '../modelos/TestPsicometrico.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class TestPsicometricoService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecords(): Observable<TestPsicometricoModelo[]>{
    return this.http.get<TestPsicometricoModelo[]>(`${this.url}/tests-psicometricos/`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  findRecord(id : number): Observable<TestPsicometricoModelo>{
    return this.http.get<TestPsicometricoModelo>(`${this.url}/tests-psicometricos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  saveRecord(model : TestPsicometricoModelo): Observable<TestPsicometricoModelo>{
    return this.http.post<TestPsicometricoModelo>(`${this.url}/tests-psicometricos`,{
      Nombre: model.Nombre,
      Descripcion: model.Descripcion
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : TestPsicometricoModelo): Observable<TestPsicometricoModelo>{
    return this.http.put<TestPsicometricoModelo>(`${this.url}/tests-psicometricos/${model.id}`,{
      Descripcion: model.Descripcion,
      Nombre: model.Nombre,
      id : model.id
    },{headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/tests-psicometricos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
}
