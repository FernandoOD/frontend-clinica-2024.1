import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuloPsicoeducativoService } from '../../../servicios/modulo-psicoeducativo.service';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { ModuloPsicoeducativoModelo } from '../../../modelos/ModuloPsicoeducativo.modelo';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vista-modulo',
  templateUrl: './vista-modulo.component.html',
  styleUrl: './vista-modulo.component.css',
  standalone: false
})
export class VistaModuloComponent {
  id: number = 0;

  Titulo? : String = '';
  Descripcion?: String = '';
  urlVideo: String = '';

  safeUrl?: SafeResourceUrl;

  constructor(
      private fb:FormBuilder,
      private servicioSeguridad: SeguridadService,
      private servicio: ModuloPsicoeducativoService,
      private router:Router,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer
    ){
      
     }

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];

    this.servicio.findRecord(this.id).subscribe({
          next: (data: ModuloPsicoeducativoModelo) => {
            // Manejo de autenticación exitosa
            this.Titulo = data.Titulo;
            this.Descripcion = data.Descripcion;
            if(data.UrlVideo != undefined){
              this.urlVideo = data.UrlVideo;
            }
            this.safeUrl = this.getSafeUrl(this.urlVideo);
            console.log("Información Modulo",data);
            //this.getFGV['terapeutaId'].setValue(data.terapeutaId);
            // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
          },
          error: (error: any) => {
            // Manejo de error en autenticación
            console.error("No se encontro el registro", error);
            alert("ENo se encuentra el registro");
          },
          complete: () => {
            // Opcional: Puedes manejar alguna acción cuando el observable termine, si es necesario
            console.log('Proceso de obtención completado');
          }
        });
  }

  getSafeUrl(url: String): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Extrae el ID del video de la URL
  extractVideoId(url: String): string {
    const regExp = /(?:\?v=|\/embed\/|\/v\/|\/.+?vi?\/|youtu\.be\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : '';
  }
}
