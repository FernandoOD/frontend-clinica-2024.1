import { Injectable } from '@angular/core';
import { UsuarioModelo } from '../modelos/Usuario.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { Token } from '@angular/compiler';
import { TestPsicometricoModelo } from '../modelos/TestPsicometrico.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  url: String = DatosGenerales.urlBackend;
  datosUsuarioSession = new BehaviorSubject<UsuarioModelo> (new UsuarioModelo);
  datosTest = new BehaviorSubject<TestPsicometricoModelo> (new TestPsicometricoModelo); 

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

  getDataTestLocal(){
    let datos = localStorage.getItem("testData");
    return datos;
  }

  refreshSessionData(usuario:UsuarioModelo){
    this.datosUsuarioSession.next(usuario);
  }

  refreshTestData(test : TestPsicometricoModelo){
    this.datosTest.next(test);
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

  dataSaveTest(test: TestPsicometricoModelo, consultaTestId?: number) : boolean{
    let datosLocales = localStorage.getItem("testData");
    if(datosLocales){
      return false;
    }else{
      let datos = {
        id: test.test?.id,
        nombre : test.test?.Nombre,
        consultaId: test.consultaId,
        token : test.token,
        consultaTestId: consultaTestId,
        descripcion : test.test?.Descripcion
      };

      let datosString = JSON.stringify(datos);
      localStorage.setItem("testData", datosString);
      this.refreshTestData(test);
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

  getTokenTest(){
    let datos = this.getDataTestLocal();
    if(datos){
      let objetoDatos: TestPsicometricoModelo = JSON.parse(datos);
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

  deleteDataTest(){
    localStorage.removeItem("testData");
    this.refreshTestData(new TestPsicometricoModelo());
  }
}
