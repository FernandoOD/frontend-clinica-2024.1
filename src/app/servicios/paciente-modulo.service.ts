import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { PacienteModuloModelo } from '../modelos/PacienteModulo.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteModuloService {

  url: String = DatosGenerales.urlBackend;
    token?:String ="";
  
    filter = encodeURIComponent(`{"include":[{"relation":"consultas"}]}`);
  
    constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
     }
  
     listRecords(): Observable<PacienteModuloModelo[]>{
      return this.http.get<PacienteModuloModelo[]>(`${this.url}/paciente-modulo-psicoeducativos`,{
        headers: new HttpHeaders({
        })
      });
    }
  
    findRecords(id?: number): Observable<PacienteModuloModelo[]>{
      return this.http.get<PacienteModuloModelo[]>(`${this.url}/paciente-modulos-psicoeducativos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
        })
      });
    }
  
    saveRecord(model : PacienteModuloModelo): Observable<PacienteModuloModelo>{
      return this.http.post<PacienteModuloModelo>(`${this.url}/paciente-modulo-psicoeducativos`,{
        pacienteId: model.pacienteId,
        moduloPsicoeducativoId: model.moduloPsicoeducativoId,
      },{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
        })
      });
    }
    updateRecord(model : PacienteModuloModelo): Observable<PacienteModuloModelo>{
      return this.http.put<PacienteModuloModelo>(`${this.url}/paciente-modulo-psicoeducativos/${model.id}`, model,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
        })
      });
    }
    deleteRecord(id?:number): Observable<any>{
      return this.http.delete<any>(`${this.url}/paciente-modulo-psicoeducativos/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
        })
      });
    }
}
