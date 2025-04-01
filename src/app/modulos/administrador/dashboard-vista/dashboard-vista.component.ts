import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-vista',
    templateUrl: './dashboard-vista.component.html',
    styleUrl: './dashboard-vista.component.css',
    standalone: false
})
export class DashboardVistaComponent {

    constructor(
        public router : Router,
    ){

    }
}
