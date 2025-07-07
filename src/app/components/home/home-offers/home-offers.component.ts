import {Component, OnInit, OnDestroy, signal} from '@angular/core';
import { Subscription } from 'rxjs';
import { Language } from '../../../interface/language';
import { LanguageService } from '../../../services/language.service';
import {NgClass, NgForOf} from '@angular/common';
import {OfferItemComponent} from './offer-item/offer-item.component';
import {OfferItem} from '../../../interface/offer-item';

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
  private languageSubscription!: Subscription;
  offerItems: OfferItem[] = [];
  selectedOffer = signal<OfferItem>({} as OfferItem);

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
    this.offerItems = [
      {
        id: 1,
        title: this.getTranslation("www"),
        content: this.getTranslation("wwwDescription"),
        stacks: ["TypeScript", "Angular", "Angular Material", "HTML", "SCSS"],
        image: "/img/laptop.png",
        features: [
          this.getTranslation("responsive"),
          this.getTranslation("SEO"),
          this.getTranslation("fastLoading"),
          this.getTranslation("techSupport"),
        ]
      },
      {
        id: 2,
        title: this.getTranslation("webApp"),
        content: this.getTranslation("webDescription"),
        stacks: ["TypeScript", "Angular", "Angular Material", "HTML", "SCSS", "Java", "Spring Boot", "REST API"],
        image: "/img/laptop.png",
        features: [
          this.getTranslation("PWA"),
          this.getTranslation("SPA"),
          this.getTranslation("API"),
          this.getTranslation("safety"),
          this.getTranslation("scaleArchitecture"),

        ]
      },
      {
        id: 3,
        title: this.getTranslation("mobileTitle"),
        content: this.getTranslation("mobileDescription"),
        stacks: ["React Native", "Android", "Room DB", "TypeScript", "Node.js", "Spring Boot", "MongoDB"],
        image: "/img/phone.png",
        features: [
          this.getTranslation("IOSAndroid"),
          this.getTranslation("ReactFlutter"),
          this.getTranslation("notification"),
          this.getTranslation("offlineMode"),
          this.getTranslation("appStore"),
        ]
      },
      {
        id: 4,
        title: this.getTranslation("gpsTitle"),
        content: this.getTranslation("gpsDescription"),
        stacks: ["Spring Boot", "REST API", "Angular", "Android", "Kafka", "Redis", "Docker", "AWS", "PostgreSQL"],
        image: "/img/GPS.png",
        features: [
          this.getTranslation("realTime"),
          this.getTranslation("geoFencing"),
          this.getTranslation("routeOptimization"),
          this.getTranslation("fleetManagement"),
          this.getTranslation("customMaps"),

        ]
      },
      {
        id: 5,
        title: this.getTranslation("dedicatedTitle"),
        content: this.getTranslation("dedicatedDescription"),
        stacks: ["Spring Boot", "REST API", "Kafka", "Redis", "Docker", "AWS", "Kubernetes", "Hibernate", "JUnit", "Swagger"],
        image: "/img/laptop2.png",
        features: [
          this.getTranslation("customERPTMS"),
          this.getTranslation("businessAutomation"),
          this.getTranslation("thirdPartyIntegration"),
          this.getTranslation("databaseDesign"),
          this.getTranslation("cloudDeployment"),

        ]
      },
      {
        id: 6,
        title: this.getTranslation("ecomerce"),
        content: this.getTranslation("ecomerceDescription"),
        stacks: ["TypeScript", "Angular", "Angular Material", "HTML", "SCSS", "Java", "Spring Boot", "REST API"],
        image: "/img/laptop.png",
        features: [
          this.getTranslation("paymentIntegration"),
          this.getTranslation("inventoryManagement"),
          this.getTranslation("orderTracking"),
          this.getTranslation("multiCurrency"),
          this.getTranslation("SEO"),

        ]
      }
    ];
  }

  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }


  selectExp(offerItem: OfferItem) {
    this.selectedOffer() !== offerItem ? this.selectedOffer.set(offerItem) : null;
  }
}
