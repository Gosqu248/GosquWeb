import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf} from '@angular/common';

interface OfferItem {
  id: number;
  stacks: string[];
  content: string;
  image: string;
}

@Component({
  selector: 'app-offer-item',
  imports: [
    NgForOf
  ],
  templateUrl: './offer-item.component.html',
  styleUrl: './offer-item.component.scss'
})
export class OfferItemComponent implements OnInit, OnChanges{
  @Input() selectedExp!: number;
  selectedItem!: OfferItem;
  offerItems: OfferItem[] = [
    {
      id: 1,
      stacks: ["TypeScript", "Angular", "Angular Material", "HTML", "SCSS", "Java", "Spring Boot", "REST API"],
      content: "Nowoczesne, responsywne aplikacje webowe tworzone z wykorzystaniem najnowszych technologii frontendowych i backendowych. Płynne interfejsy użytkownika, szybkie ładowanie stron oraz perfekcyjne działanie na wszystkich urządzeniach - dostosowane dokładnie do Twoich potrzeb biznesowych.",
      image: "/img/laptop.png"
    },
    {
      id: 2,
      stacks: ["React Native", "Android", "Room DB", "TypeScript", "Node.js", "Spring Boot", "MongoDB"],
      content: "Wydajne i intuicyjne aplikacje mobilne na systemy Android oraz iOS, zapewniające najwyższą jakość użytkowania. Zoptymalizowane pod kątem szybkości działania, niskiego zużycia baterii oraz płynnych animacji - wszystko to zapakowane w atrakcyjny i funkcjonalny interfejs użytkownika.",
      image: "/img/phone.png"
    },
    {
      id: 3,
      stacks: ["Spring Boot", "REST API", "Angular", "Android", "Kafka", "Redis", "Docker", "AWS", "PostgreSQL"],
      content: "Zaawansowane systemy nawigacji i monitoringu GPS z wykorzystaniem technologii real-time. Precyzyjne śledzenie, analiza danych przestrzennych oraz integracja z istniejącymi systemami, dostępne zarówno na urządzeniach mobilnych jak i platformach webowych. Idealne dla firm transportowych, logistycznych oraz służb ratunkowych.",
      image: "/img/GPS.png"
    },
    {
      id: 4,
      stacks: ["Spring Boot", "REST API", "Kafka", "Redis", "Docker", "AWS", "Kubernetes", "Hibernate", "JUnit", "Swagger"],
      content: "Specjalistyczne oprogramowanie dostosowane do indywidualnych potrzeb biznesowych. Architektura mikroserwisowa, skalowalność, wysoka dostępność oraz bezpieczeństwo danych. Kompleksowe rozwiązania serwerowe i infrastrukturalne wspierające rozwój Twojego biznesu w chmurze i on-premise.",
      image: "/img/laptop2.png"
    }
  ];

  ngOnInit() {
    this.updateSelectedItem();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedExp']) {
      this.updateSelectedItem();
    }
  }

  updateSelectedItem() {
    this.selectedItem = this.getOfferItem();
  }

  getOfferItem(): OfferItem {
    return this.offerItems.find(item => item.id === this.selectedExp) || this.offerItems[0];
  }

}
