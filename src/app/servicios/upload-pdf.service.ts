import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { SeguridadService } from './seguridad.service';
import { ArchivoPDFModelo} from '../modelos/ArchivoPDF.modelo';

@Injectable({
  providedIn: 'root'
})
export class UploadPdfService {

   url: String = DatosGenerales.urlBackend;
    tokenTest?:String ="";
    token?:String ="";
  
    constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
      this.tokenTest = servicioSeguridad.getTokenTest();
      console.log(this.tokenTest);
      this.token = servicioSeguridad.getToken();
      console.log(this.token);
     }
  
     listRecords(): Observable<any[]>{
      return this.http.get<any[]>(`${this.url}/pacientes`,{
        headers: new HttpHeaders({
        })
      });
    }
  
    findRecord(id?: number): Observable<any>{
      return this.http.get<any>(`${this.url}/consultas/${id}/resultado-tests`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
  
    saveRecord(archivo : FormData): Observable<any>{
      return this.http.post<any>(`${this.url}/uploadPDF`,archivo,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.tokenTest}`
        })
      });
    }

    updateRecord(model : any): Observable<any>{
      return this.http.put<any>(`${this.url}/pacientes/${model.id}`, model,{
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
  
    getTokenTest(model : any) : Observable<any>{
      return this.http.post<any>(`${this.url}/generarToken`,{
        id : model.id,
        nombre : model.Nombre,
        consultaId : model.consultaId
      },{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
}
