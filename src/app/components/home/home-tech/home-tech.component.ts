import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {LanguageService} from '../../../services/language.service';
import {Language} from '../../../interface/language';
interface Technology {
  name: string;
  icon: string;
  rating: number;

}
@Component({
  selector: 'app-home-tech',
  imports: [
    NgForOf,

  ],
  templateUrl: './home-tech.component.html',
  styleUrl: './home-tech.component.scss'
})
export class HomeTechComponent {
  backendTechs: Technology[] = [
    {
      name: 'Spring Boot',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
      rating: 3
    },
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
      rating: 3
    },
    {
      name: 'REST API',
      icon: 'assets/icons/REST.png',
      rating: 3
    },
    {
      name: 'Postman',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
      rating: 3
    },

  ];

  databaseTechs: Technology[] = [
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
      rating: 3
    },

    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
      rating: 1
    }
  ];
  frontendTechs: Technology[] = [
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
      rating: 3
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      rating: 3
    },
    {
      name: 'HTML',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      rating: 3
    },
    {
      name: 'SCSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
      rating: 3
    },
    {
      name: 'React Native',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      rating: 2
    },
    {
      name: 'Android',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
      rating: 2
    }
  ];
  othersTechs: Technology[] = [
    {
      name: 'Nginx',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
      rating: 1
    },
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
      rating: 2
    },
    {
      name: 'Linux',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
      rating: 2
    }
    ];

  constructor(private languageService: LanguageService) {}

  getStars(rating: number): string[] {
    return Array(rating).fill('★');
  }

  getEmptyStars(rating: number): number[] {
    return Array(3 - rating).fill(0);
  }

  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }
}
