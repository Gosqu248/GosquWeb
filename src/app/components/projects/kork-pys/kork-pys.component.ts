import { Component } from '@angular/core';
import {ProjectDescription} from '../../../interface/project-description';
import {ProjectMainComponent} from '../project-main/project-main.component';
import {HomeContactComponent} from "../../home/home-contact/home-contact.component";

@Component({
  selector: 'app-kork-pys',
    imports: [
        ProjectMainComponent,
        HomeContactComponent

    ],
  templateUrl: './kork-pys.component.html',
  styleUrl: './kork-pys.component.scss'
})
export class KorkPysComponent  {
  projectDescription: ProjectDescription = {
    title: 'Kork-Pyś Web',
    description: 'korkDescription',
    features: [
      'api_integration',
      'client_portal',
      'personal_data',
      'invoices',
      'renovation',
      'rental',
      'transport',
      'eco'
    ],
    techStack: [
      'Spring Boot',
      'Angular',
      'PostgreSQL',
      'REST API',
      'JPA',
      'JWT',
      'Docker',
      'Nginx',
      'Ubuntu',
      'Comarch ERP XT API'
    ],
    imageUrls: [
      '/assets/img/kork1.png',
      '/assets/img/kork2.png',
      '/assets/img/kork3.png',
      '/assets/img/kork4.png',
      '/assets/img/kork5.png',
      '/assets/img/kork6.png',
      '/assets/img/kork7.png',
      '/assets/img/kork8.png',
      '/assets/img/kork9.png',
      '/assets/img/kork10.png',
      '/assets/img/kork11.png',
    ],
    link: 'https://kork-pyś.pl'
  }


}
