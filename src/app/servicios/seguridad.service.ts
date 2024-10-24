import { Injectable } from '@angular/core';
import { UsuarioModelo } from '../modelos/Usuario.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url: String = DatosGenerales.urlBackend;
  datosUsuarioSession = new BehaviorSubject<UsuarioModelo> (new UsuarioModelo);

  constructor(private http: HttpClient ) {
    this.verifyDataSession();
   }

  verifyDataSession(){
    let datos = this.getDataLocalStorage();
    if(datos){
      let objetoDatos:UsuarioModelo = JSON.parse(datos);
      objetoDatos.isLoggedIn = true;
      this.refreshSessionData(objetoDatos);
    }
  }

  getDataLocalStorage(){
    let datos = localStorage.getItem("sessionData");
    return datos;
  }

  refreshSessionData(usuario:UsuarioModelo){
    this.datosUsuarioSession.next(usuario);
  }

  getSessionData(){
    return this.datosUsuarioSession.asObservable();
  }

  userAuthentication(user : UsuarioModelo): Observable<any>{
    return this.http.post<any>(this.url+'/identificar',{
      email:user.Email,
      password: user.Password
    },{
      headers: new HttpHeaders({

      })
    });
  }

  dataSaveInLocal(usuario: UsuarioModelo) : boolean{
    let datosLocales = localStorage.getItem("sessionData");
    if(datosLocales){
      return false;
    }else{
      let datos = {
        id: usuario.user?.id,
        email : usuario.user?.Email,
        token : usuario.token,
        roleId : usuario.user?.rolId,
        rol : usuario.rol,
        idPersona : usuario.user?.idPersona
      };

      let datosString = JSON.stringify(datos);
      localStorage.setItem("sessionData", datosString);
      usuario.isLoggedIn=true;
      this.refreshSessionData(usuario);
      return true;
    }
  }

  getToken(){
    let datos = this.getDataLocalStorage();
    if(datos){
      let objetoDatos: UsuarioModelo = JSON.parse(datos);
      return objetoDatos.token;
    }
    return "";
  }

  getRole(){
    let datos = this.getDataLocalStorage();
    if(datos){
      let objetoDatos: UsuarioModelo = JSON.parse(datos);
      return objetoDatos.rol;
    }
    return "";
  }

  hasRole(role : String){

    return this.getRole() === role;
  }

  closeSession(){
    localStorage.removeItem("sessionData");
    this.refreshSessionData(new UsuarioModelo());
  }
}
