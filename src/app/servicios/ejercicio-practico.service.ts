import { Injectable } from '@angular/core';
import { EjercicioPracticoModelo } from '../modelos/EjercicioPractico.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { ModuloPsicoeducativoModelo } from '../modelos/ModuloPsicoeducativo.modelo';

@Injectable({
  providedIn: 'root'
})
export class EjercicioPracticoService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
   }

   listRecords(idModulo?:number): Observable<EjercicioPracticoModelo[]>{
    return this.http.get<EjercicioPracticoModelo[]>(`${this.url}/modulo-psicoeducativos/${idModulo}/ejercicio-practicos`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  findRecord(id : number): Observable<EjercicioPracticoModelo>{
    return this.http.get<EjercicioPracticoModelo>(`${this.url}/modulos-psicoeducativos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  findModule(id?: number) : Observable<ModuloPsicoeducativoModelo>{
    return this.http.get<ModuloPsicoeducativoModelo>(`${this.url}/ejercicio-practicos/${id}/modulo-psicoeducativo`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }

  saveRecord(model : EjercicioPracticoModelo): Observable<EjercicioPracticoModelo>{
    return this.http.post<EjercicioPracticoModelo>(`${this.url}//modulo-psicoeducativos/${model.moduloPsicoeducativoId}/ejercicio-practicos`,{
      Titulo: model.Titulo,
      Descripcion: model.Descripcion,
      Instrucciones: model.Instrucciones,
      FechaCreacion: model.FechaCreacion,
      moduloPsicoeducativoId: model.moduloPsicoeducativoId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  updateRecord(model : EjercicioPracticoModelo): Observable<EjercicioPracticoModelo>{
    return this.http.put<EjercicioPracticoModelo>(`${this.url}/modulos-psicoeducativos/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/ejercicios-practicos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.servicioSeguridad.getToken()}`
      })
    });
  }
}
