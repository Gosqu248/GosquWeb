import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Language } from '../../../interface/language';
import { LanguageService } from '../../../services/language.service';
import {NgClass, NgForOf} from '@angular/common';
import {OfferItemComponent} from './offer-item/offer-item.component';

@Component({
  selector: 'app-home-offers',
  imports: [
    NgForOf,
    OfferItemComponent,
    NgClass
  ],
  templateUrl: './home-offers.component.html',
  styleUrls: ['./home-offers.component.scss']
})
export class HomeOffersComponent implements OnInit, OnDestroy {
  expertise: { id: number, title: string; description: string, icon: string }[] = [];
  selectedExp: number = 0;
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
        id: 1,
        title: this.getTranslation("webTitle"),
        description: this.getTranslation("webDescription"),
        icon: "fa-code" // Przykładowa ikona
      },
      {
        id: 2,
        title: this.getTranslation("mobileTitle"),
        description: this.getTranslation("mobileDescription"),
        icon: "fa-mobile-alt"
      },
      {
        id: 3,
        title: this.getTranslation("gpsTitle"),
        description: this.getTranslation("gpsDescription"),
        icon: "fa-map-marker-alt"
      },
      {
        id: 4,
        title: this.getTranslation("dedicatedTitle"),
        description: this.getTranslation("dedicatedDescription"),
        icon: "fa-server"
      }
    ];
  }

  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }


  selectExp(id: number) {
    this.selectedExp !== id ? this.selectedExp = id : null;
  }
}
