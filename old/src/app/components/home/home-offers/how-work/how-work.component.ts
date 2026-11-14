import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LanguageService} from '../../../../services/language.service';
import {NgForOf, NgIf} from '@angular/common';
import {Language} from '../../../../interface/language';

@Component({
  selector: 'app-how-work',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './how-work.component.html',
  styleUrl: './how-work.component.scss'
})
export class HowWorkComponent implements OnInit, OnDestroy{
  private languageSubscription!: Subscription;
  processSteps: {title: string; description: string}[] = [];
  animateNumbers = false;
  animateLines = false;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.updateProcessSteps();
    this.languageSubscription = this.languageService.languageChangeSubject.subscribe(() => {
      this.updateProcessSteps();
    });

    // Uruchomienie animacji po załadowaniu komponentu
    this.startAnimations();
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private startAnimations() {
    // Animacja numerów kroków po 1 sekundzie
    setTimeout(() => {
      this.animateNumbers = true;
    }, 1000);

    // Animacja linii łączących po 1.5 sekundy
    setTimeout(() => {
      this.animateLines = true;
    }, 1500);
  }

  updateProcessSteps() {
    this.processSteps = [
      {
        title: this.getTranslation('analyze'),
        description: this.getTranslation('analyzeDescription'),
      },
      {
        title: this.getTranslation('design'),
        description: this.getTranslation('designDescription'),
      },
      {
        title: this.getTranslation('development'),
        description: this.getTranslation('developmentDescription'),
      },
      {
        title: this.getTranslation('deploy'),
        description: this.getTranslation('deployDescription'),
      }
    ];
  }

  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }


}
