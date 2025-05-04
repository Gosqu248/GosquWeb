import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface Technology {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-home-move-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home-move-list.component.html',
  styleUrl: './home-move-list.component.scss'
})
export class HomeMoveListComponent implements OnInit, AfterViewInit, OnDestroy {
  techs: Technology[] = [
    // Core Languages
    { name: 'Java',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },

    // Backend
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
    { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Postman',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },

    // Databases
    { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'Room DB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },

    // Frontend
    { name: 'Angular',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
    { name: 'React Native',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Android',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },

    // Other Tools
    { name: 'Git',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Docker',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Nginx',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' }
  ];

  displayTechs: Technology[] = [];

  private translateX = 0;
  private readonly itemWidth = 150 + 25; // 150px szerokość + 24px (1.5rem) gap
  private scrollInterval: Subscription | null = null;
  private readonly scrollDelay = 2000; // 2 sekundy pomiędzy przesunięciami
  private readonly animationDuration = 500; // czas trwania animacji w ms

  ngOnInit(): void {
    // Duplikujemy listę dla zapętlenia
    this.displayTechs = [...this.techs, ...this.techs];
  }

  ngAfterViewInit(): void {
    // Od razu zaczynamy przewijanie, bo znamy już szerokość elementu
    this.startScrolling();
  }

  ngOnDestroy(): void {
    if (this.scrollInterval) {
      this.scrollInterval.unsubscribe();
    }
  }

  startScrolling(): void {
    const list = document.querySelector('.move-list') as HTMLElement;
    if (!list) return;

    // Aktualizuj pozycję co 2 sekundy
    this.scrollInterval = interval(this.scrollDelay).subscribe(() => {
      // Przesunięcie o szerokość jednego elementu
      this.translateX -= this.itemWidth;

      // Ustawienie płynnej animacji
      list.style.transition = `transform ${this.animationDuration}ms ease`;
      list.style.transform = `translateX(${this.translateX}px)`;

      // Sprawdzenie, czy potrzebujemy reset
      const resetThreshold = -(this.itemWidth * this.techs.length);

      if (this.translateX <= resetThreshold) {
        // Po zakończeniu animacji przesunięcia, resetujemy pozycję bez animacji
        setTimeout(() => {
          list.style.transition = 'none';
          this.translateX = 0;
          list.style.transform = `translateX(${this.translateX}px)`;
        }, this.animationDuration);
      }
    });
  }
}
