import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {LanguageService} from '../../../services/language.service';
import {Language} from '../../../interface/language';
interface Technology {
  name: string;
  icon: string;
  rating: number;
}

interface AllTechnology {
  desc: string;
  techs: Technology[];
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
  languagesTechs: Technology[] = [
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
      rating: 3
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      rating: 3
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      rating: 3
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      rating: 2
    },
    {
      name: 'C++',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
      rating: 1
    },
  ];

  backendTechs: Technology[] = [
    {
      name: 'Spring Boot',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
      rating: 3
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      rating: 2
    },
    {
      name: 'Hibernate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg',
      rating: 2
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
    {
      name: 'Swagger',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg',
      rating: 2
    },
    {
      name: "JUnit",
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg',
      rating: 2
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
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
      rating: 1
    },
    {
      name: 'Room DB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
      rating: 2
    }
  ];
  frontendTechs: Technology[] = [
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
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
    },
    {
      name: 'Bootstrap',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-plain.svg',
      rating: 2
    },
    {
      name: 'Angular Material',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
      rating: 3
    }
  ];
  othersTechs: Technology[] = [
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      rating: 3
    },
    {
      name: 'Maven',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg',
      rating: 3
    },
    {
      name: 'NPM',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg',
      rating: 3
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
    },
    {
      name: 'Nginx',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
      rating: 1
    }
  ];

  allTechs: AllTechnology[] = [
    {
      desc: 'languages',
      techs: this.languagesTechs
    },
    {
      desc: 'Backend',
      techs: this.backendTechs
    },
    {
      desc: 'Frontend',
      techs: this.frontendTechs
    },
    {
      desc: 'database',
      techs: this.databaseTechs
    },
    {
      desc: 'others',
      techs: this.othersTechs
    }
  ];

  constructor(private languageService: LanguageService) {}

  getStars(rating: number): string[] {
    return Array(rating).fill('★');
  }

  getEmptyStars(rating: number): number[] {
    return Array(3 - rating).fill(0);
  }

  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }
}
