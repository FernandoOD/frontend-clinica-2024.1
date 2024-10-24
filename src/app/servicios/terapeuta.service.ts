import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { TerapeutaModelo } from '../modelos/Terapeuta.modelo';

@Injectable({
  providedIn: 'root'
})
export class TerapeutaService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
    console.log(this.token);
   }

   listRecords(): Observable<TerapeutaModelo[]>{
    return this.http.get<TerapeutaModelo[]>(`${this.url}/terapeutas`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  findRecord(id : number): Observable<TerapeutaModelo>{
    return this.http.get<TerapeutaModelo>(`${this.url}/terapeutas/${id}`,{
      headers: new HttpHeaders({
      })
    });
  }

  saveRecord(model : TerapeutaModelo): Observable<TerapeutaModelo>{
    return this.http.post<TerapeutaModelo>(`${this.url}/terapeutas`,{
      Nombre: model.Nombre,
      ApellidoPaterno: model.ApellidoPaterno,
      ApellidoMaterno: model.ApellidoMaterno,
      CedulaLicenciatura: model.CedulaLicenciatura,
      CedulaEspecialidad: model.CedulaEspecialidad,
      Especialidad: model.Especialidad,
      Telefono: model.Telefono,
      Email : model.Email,
      FechaRegistro: model.FechaRegistro
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : TerapeutaModelo): Observable<TerapeutaModelo>{
    return this.http.put<TerapeutaModelo>(`${this.url}/terapeutas/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/terapeutas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
