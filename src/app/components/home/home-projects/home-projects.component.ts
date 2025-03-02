import {Component, signal} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

interface Project {
  title: string;
  type: 'commercial' | 'non-commercial';
  shortDesc: string;
  techStack: string[];
  route: string;
}

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
      shortDesc: 'Kompleksowa platforma usług budowlanych i ekologicznych z integracją Comarch ERP XT',
      techStack: ['Angular', 'Spring Boot', 'Docker', 'Nginx', 'Comarch ERP XT API'],
      route: '/kork-pys'
    },
    {
      title: 'BusControl',
      type: 'commercial',
      shortDesc: 'Aplikacja mobilna dla MPK Zgierz z trackingiem pozycji autobusów',
      techStack: ['Android Studio', 'Java', 'REST API', 'Room DB'],
      route: '/bus-control'
    },
    {
      title: 'Gosqu Restaurant',
      type: 'non-commercial',
      shortDesc: 'System zarządzania restauracją z płatnościami online i panelem admina',
      techStack: ['Angular', 'Spring Boot', 'PostgreSQL', 'PayU', 'tsParticles'],
      route: '/gosqu'
    },
    {
      title: 'Webstaurator',
      type: 'non-commercial',
      shortDesc: 'Kompleksowy system zamówień food delivery z aplikacją mobilną',
      techStack: ['Angular', 'React Native', 'Spring Boot', 'PayU', 'i18n'],
      route: '/webstaurator'
    }
  ]);

  filteredProjects = () =>
    this.projects().filter(p => p.type === this.selectedType());

  constructor(private router: Router) {}

  navigateToProject(route: string) {
    this.router.navigate([route]);
  }
}
