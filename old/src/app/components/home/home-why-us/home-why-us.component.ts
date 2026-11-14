import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { NgForOf } from '@angular/common';
import {Language} from '../../../interface/language';

@Component({
  selector: 'app-home-why-us',
  imports: [NgForOf],
  templateUrl: './home-why-us.component.html',
  styleUrl: './home-why-us.component.scss'
})
export class HomeWhyUsComponent implements OnInit, OnDestroy {
  private languageSubscription!: Subscription;
  whyUsItems: { id: number, title: string, description: string, icon: string }[] = [];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.updateWhyUsItems();

    this.languageSubscription = this.languageService.languageChangeSubject.subscribe(() => {
      this.updateWhyUsItems();
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private updateWhyUsItems() {
    this.whyUsItems = [
      {
        id: 1,
        title: this.getTranslation("modernTech"),
        description: this.getTranslation("modernTechDesc"),
        icon: "⚡"
      },
      {
        id: 2,
        title: this.getTranslation("competitivePrices"),
        description: this.getTranslation("competitivePricesDesc"),
        icon: "💰"
      },

      {
        id: 3,
        title: this.getTranslation("timelyDelivery"),
        description: this.getTranslation("timelyDeliveryDesc"),
        icon: "⏱️"
      },
      {
        id: 4,
        title: this.getTranslation("flexibleApproach"),
        description: this.getTranslation("flexibleApproachDesc"),
        icon: "🎯"
      },
      {
        id: 5,
        title: this.getTranslation("fullSupport"),
        description: this.getTranslation("fullSupportDesc"),
        icon: "🛡️"
      },
      {
        id: 6,
        title: this.getTranslation("expertTeam"),
        description: this.getTranslation("expertTeamDesc"),
        icon: "🏆"
      },
    ];
  }

  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }
}
