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
    this.token = servicioSeguridad.getToken();
   }

   listRecords(): Observable<TestPsicometricoModelo[]>{
    return this.http.get<TestPsicometricoModelo[]>(`${this.url}/tests-psicometricos/`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  findRecord(id : number): Observable<TestPsicometricoModelo>{
    return this.http.get<TestPsicometricoModelo>(`${this.url}/tests-psicometricos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  saveRecord(model : TestPsicometricoModelo): Observable<TestPsicometricoModelo>{
    return this.http.post<TestPsicometricoModelo>(`${this.url}/tests-psicometricos`,{
      Nombre: model.Nombre,
      Descripcion: model.Descripcion
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : TestPsicometricoModelo): Observable<TestPsicometricoModelo>{
    return this.http.put<TestPsicometricoModelo>(`${this.url}/tests-psicometricos/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/tests-psicometricoss/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
