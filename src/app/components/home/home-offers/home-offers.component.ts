import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForOf } from '@angular/common';
import { Language } from '../../../interface/language';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-home-offers',
  imports: [
    NgForOf
  ],
  templateUrl: './home-offers.component.html',
  styleUrls: ['./home-offers.component.scss']
})
export class HomeOffersComponent implements OnInit, OnDestroy {
  expertise: { title: string; description: string, icon:string }[] = [];
  private languageSubscription!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.updateExpertise();

    this.languageSubscription = this.languageService.languageChangeSubject.subscribe(() => {
      this.updateExpertise();
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  updateExpertise() {
    this.expertise = [
      {
        title: this.getTranslation("webTitle"),
        description: this.getTranslation("webDescription"),
        icon: "fa-code" // Przykładowa ikona
      },
      {
        title: this.getTranslation("mobileTitle"),
        description: this.getTranslation("mobileDescription"),
        icon: "fa-mobile-alt"
      },
      {
        title: this.getTranslation("gpsTitle"),
        description: this.getTranslation("gpsDescription"),
        icon: "fa-map-marker-alt"
      },
      {
        title: this.getTranslation("dedicatedTitle"),
        description: this.getTranslation("dedicatedDescription"),
        icon: "fa-server"
      }
    ];
  }

  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }


}
