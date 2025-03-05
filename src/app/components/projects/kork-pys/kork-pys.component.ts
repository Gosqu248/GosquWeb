import { Component } from '@angular/core';
import {ProjectDescription} from '../../../interface/project-description';
import {ProjectMainComponent} from '../project-main/project-main.component';

@Component({
  selector: 'app-kork-pys',
  imports: [
    ProjectMainComponent

  ],
  templateUrl: './kork-pys.component.html',
  styleUrl: './kork-pys.component.scss'
})
export class KorkPysComponent  {
  projectDescription: ProjectDescription = {
    title: 'Kork-Pyś Web',
    description: 'korkDescription',
    features: [
      'renovation',
      'rental',
      'transport',
      'eco',
      'client_portal',
      'api_integration',
      'personal_data',
      'invoices'
    ],
    techStack: [
      'Spring Boot',
      'Angular',
      'Docker',
      'Nginx',
      'Ubuntu',
      'Comarch ERP XT API'
    ],
    imageUrls: [
      '/assets/img/kork.png',

    ],
    link: 'https://kork-pyś.pl'
  }


}
