import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

interface Technology {
  name: string;
  icon: string;
}

interface TechnologyGroup {
  id: number;
  desc: string;
  techs?: Technology[];
  subgroups?: {
    name: string;
    technologies: Technology[];
  }[];
}

@Component({
  selector: 'app-home-tech',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './home-tech.component.html',
  styleUrl: './home-tech.component.scss'
})
export class HomeTechComponent implements OnInit {
  selectedTech: string = '';
  selectedTechGroup: TechnologyGroup | null = null;

  webFrontendTechs: Technology[] = [
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    },
    {
      name: 'Angular',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
    },
    {
      name: 'HTML',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    },
    {
      name: 'SCSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    },
    {
      name: 'Angular Material',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
    },
  ];

  webBackendTechs: Technology[] = [
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Spring Boot',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    },
    {
      name: 'Hibernate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg',
    },
    {
      name: 'Kafka',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg',
    },
    {
      name: 'Redis',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
    },
    {
      name: 'REST API',
      icon: 'assets/icons/REST.png',
    },
    {
      name: "JUnit",
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/junit/junit-original.svg',
    },
    {
      name: 'Swagger',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg',
    }
  ];

  // Mobile Apps
  mobileAppsTechs: Technology[] = [
    {
      name: 'React Native',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    },
    {
      name: 'Android',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
    },
    {
      name: 'Room DB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
    },
  ];

  // Database
  databaseTechs: Technology[] = [
    {
      name: 'PostgreSQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    },
    {
      name: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',
    },
  ];

  cloudDevOpsTechs: Technology[] = [
    {
      name: 'Docker',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    },
    {
      name: 'Linux',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    },
    {
      name: 'Nginx',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
    },
    {
      name: 'Kubernetes',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
    },
    {
      name: 'AWS',
      icon: 'assets/icons/aws.svg',
    }
  ];

  toolsTechs: Technology[] = [
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    },
    {
      name: 'GitHub',
      icon: 'assets/icons/github.png',
    },
    {
      name: 'Maven',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg',
    },
    {
      name: 'NPM',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg',
    },
    {
      name: 'Gradle',
      icon: 'assets/icons/gradle.svg',
    },
    {
      name: 'Postman',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    },
  ];

  allTechs: TechnologyGroup[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.setAllTechs();
    if (this.allTechs.length > 0) {
      this.selectedTech = this.allTechs[0].desc;
      this.updateSelectedTechGroup();
    }
  }

  setAllTechs(): void {
    this.allTechs = [
      {
        id: 1,
        desc: this.getTranslation('webApp'),
        subgroups: [
          {
            name: 'Backend',
            technologies: this.webBackendTechs
          },
          {
            name: 'Frontend',
            technologies: this.webFrontendTechs
          }
        ]
      },
      {
        id: 2,
        desc: this.getTranslation('mobileTitle'),
        techs: this.mobileAppsTechs
      },
      {
        id: 3,
        desc: this.getTranslation('database'),
        techs: this.databaseTechs
      },
      {
        id: 4,
        desc: this.getTranslation('cloudDevOps'),
        techs: this.cloudDevOpsTechs
      },
      {
        id: 5,
        desc: this.getTranslation('tools'),
        techs: this.toolsTechs
      }
    ]
  }

  selectTech(tech: string): void {
    this.selectedTech = tech;
    this.updateSelectedTechGroup();
  }

  updateSelectedTechGroup(): void {
    this.selectedTechGroup = this.allTechs.find(tech => tech.desc === this.selectedTech) || null;
  }
  getTranslation(key: any): string {
    return this.languageService.getTranslation(key);
  }
}
