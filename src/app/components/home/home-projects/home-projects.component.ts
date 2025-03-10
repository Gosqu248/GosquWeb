import {Component, signal} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {Project} from '../../../interface/project';
import {LanguageService} from '../../../services/language.service';

@Component({
  selector: 'app-home-projects',
  imports: [
    NgForOf
  ],
  templateUrl: './home-projects.component.html',
  styleUrl: './home-projects.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeProjectsComponent {
  selectedType = signal<'commercial' | 'non-commercial'>('commercial');
  projectTypes = ['commercial', 'non-commercial'] as const;

  projects = signal<Project[]>([
    {
      title: 'Kork-Pyś Web',
      type: 'commercial',
      offer: ['webApp'],
      shortDesc: 'korkDescription',
      techStack: ['Spring Boot',
        'Angular',
        'PostgreSQL',
        'REST API',
        'JPA',
        'JWT',
        'Docker',
        'Nginx',
        'Ubuntu',
        'Comarch ERP XT API'],
      route: '/kork-pys'
    },
    {
      title: 'Bus Control',
      type: 'commercial',
      offer: ['mobileTitle', 'gpsTitle'],
      shortDesc: 'busDescription',
      techStack: [  'Java',
        'Android',
        'Room DB',
        'Gradle',
        'REST API',],
      route: '/bus-control'
    },
    {
      title: 'Gosqu Restaurant',
      type: 'non-commercial',
      offer: ['webApp'],
      shortDesc: 'gosquDescription',
      techStack: ['Angular',
        'Spring Boot',
        'PostgreSQL',
        'JWT',
        'REST API',
        'tsParticles',
        'PayU',
        'Angular Material',
        'SCSS'],
      route: '/gosqu-restaurant'
    },
    {
      title: 'Webstaurator',
      type: 'non-commercial',
      offer: ['webApp', 'mobileTitle'],
      shortDesc: 'Kompleksowy system zamówień food delivery z aplikacją mobilną',
      techStack: ['Angular', 'React Native', 'Spring Boot', 'PayU', 'i18n', 'Angular Material', 'PostgreSQL'],
      route: '/webstaurator'
    }
  ]);

  filteredProjects = () =>
    this.projects().filter(p => p.type === this.selectedType());

  constructor(private router: Router,
              private languageService: LanguageService) {}

  navigateToProject(route: string) {
    this.router.navigate([route]);
  }

  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }
}
