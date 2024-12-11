import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacienteModelo } from '../modelos/Paciente.modelo';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
    console.log(this.token);
   }

   listRecords(): Observable<PacienteModelo[]>{
    return this.http.get<PacienteModelo[]>(`${this.url}/pacientes`,{
      headers: new HttpHeaders({
      })
    });
  }

  findRecord(id : number): Observable<PacienteModelo>{
    return this.http.get<PacienteModelo>(`${this.url}/pacientes/${id}`,{
      headers: new HttpHeaders({
      })
    });
  }

  saveRecord(model : PacienteModelo): Observable<PacienteModelo>{
    return this.http.post<PacienteModelo>(`${this.url}/pacientes`,{
      Nombre: model.Nombre,
      ApellidoPaterno: model.ApellidoPaterno,
      ApellidoMaterno: model.ApellidoMaterno,
      Direccion: model.Direccion,
      Telefono: model.Telefono,
      Email : model.Email,
      FechaNacimiento: model.FechaNacimiento,
      FechaRegistro: model.FechaRegistro
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : PacienteModelo): Observable<PacienteModelo>{
    return this.http.put<PacienteModelo>(`${this.url}/pacientes/${model.id}`, model,{
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
