import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionSuperiorComponent } from './publico/paginaMaestra/barra-navegacion-superior/barra-navegacion-superior.component';
import { BarraNavegacionLateralComponent } from './publico/paginaMaestra/barra-navegacion-lateral/barra-navegacion-lateral.component';
import { FooterComponent } from './publico/paginaMaestra/footer/footer.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { Error404Component } from './publico/errores/error404/error404.component';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionSuperiorComponent,
    BarraNavegacionLateralComponent,
    FooterComponent,
    InicioComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),],
  bootstrap: [AppComponent]
})
export class AppModule { }

