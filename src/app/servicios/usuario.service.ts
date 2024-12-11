import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { UsuarioModelo } from '../modelos/Usuario.modelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: String = DatosGenerales.urlBackend;
  token?:String ="";

  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = servicioSeguridad.getToken();
  }

  saveUser(model : UsuarioModelo): Observable<UsuarioModelo>{
    return this.http.post<UsuarioModelo>(`${this.url}/usuarios`,{
      Email: model.Email,
      idPersona: model.idPersona,
      rolId: model.rolId
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  deleteUser(id?:number): Observable<any>{
    return this.http.delete<any>(`${this.url}/usuarios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

}
