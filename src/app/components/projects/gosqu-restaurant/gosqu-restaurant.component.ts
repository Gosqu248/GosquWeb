import {Component} from '@angular/core';
import {ProjectDescription} from '../../../interface/project-description';
import {ProjectMainComponent} from '../project-main/project-main.component';
import {HomeContactComponent} from '../../home/home-contact/home-contact.component';

@Component({
  selector: 'app-gosqu-restaurant',
  imports: [
    ProjectMainComponent,
    HomeContactComponent
  ],
  templateUrl: './gosqu-restaurant.component.html',
  styleUrl: './gosqu-restaurant.component.scss'
})
export class GosquRestaurantComponent {
  projectDescription: ProjectDescription = {
    title: 'Gosqu Restaurant',
    description: 'gosquDescription',
    features: [
      'googleAuth',
      'twoFA',
      'limitedLoginAttempts',
      'editUserData',
      'payments',
      'adminPanel',
      'animatedBackgrounds',
      'menuImageUpload',
    ],
    techStack: [
      'Angular',
      'Spring Boot',
      'PostgreSQL',
      'JWT',
      'REST API',
      'tsParticles',
      'PayU',
      'Angular Material',
      'SCSS',
    ],
    imageUrls: [
      '/assets/img/restaurant.png',
      '/assets/img/restaurant9.png',
      '/assets/img/restaurant10.png',
      '/assets/img/restaurant11.png',
      '/assets/img/restaurant12.png',
      '/assets/img/restaurant13.png',
      '/assets/img/restaurant4.png',
      '/assets/img/restaurant5.png',
      '/assets/img/restaurant6.png',
      '/assets/img/restaurant7.png',

    ],
    link: 'https://gosqu-restaurant.netlify.app'
  }

}
