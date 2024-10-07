import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public router: Router) {}

  title = 'FrontendClinica';

  isLoginRoute(): boolean {
    return this.router.url === '/seguridad/iniciar-sesion';
  }

  isIndexRoute(): boolean {
    return this.router.url === '/inicio';
  }
}
