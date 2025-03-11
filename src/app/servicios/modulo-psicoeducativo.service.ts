import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { ModuloPsicoeducativoModelo } from '../modelos/ModuloPsicoeducativo.modelo';



@Injectable({
  providedIn: 'root'
})
export class ModuloPsicoeducativoService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
   }

   listRecords(): Observable<ModuloPsicoeducativoModelo[]>{
    return this.http.get<ModuloPsicoeducativoModelo[]>(`${this.url}/modulos-psicoeducativos`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  findRecord(id : number): Observable<ModuloPsicoeducativoModelo>{
    return this.http.get<ModuloPsicoeducativoModelo>(`${this.url}/modulos-psicoeducativos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  saveRecord(model : ModuloPsicoeducativoModelo): Observable<ModuloPsicoeducativoModelo>{
    return this.http.post<ModuloPsicoeducativoModelo>(`${this.url}/modulos-psicoeducativos`,{
      Titulo: model.Titulo,
      Descripcion: model.Descripcion,
      FechaCreacion: model.FechaCreacion,
      UrlVideo : model.UrlVideo,
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  updateRecord(model : ModuloPsicoeducativoModelo): Observable<ModuloPsicoeducativoModelo>{
    return this.http.put<ModuloPsicoeducativoModelo>(`${this.url}/modulos-psicoeducativos/${model.id}`, model,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  deleteRecord(id:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/modulos-psicoeducativos/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
}
