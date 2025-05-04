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
      stacks: ["TYPESCRIPT", "JAVA", "ANGULAR", "SPRINGBOOT"],
      content: "Nowoczesne witryny oraz aplikacje webowe, tworzone z myślą o Twoich potrzebach",
      image: "/img/laptop.png"
    },
    {
      id: 2,
      stacks: ["Java", "Kotlin", "Android"],
      content: "Nowoczesne witryny oraz aplikacje webowe, tworzone z myślą o Twoich potrzebach",
      image: "/img/phone.png"
    },
    {
      id: 3,
      stacks: ["Python", "Django", "Flask"],
      content: "Nowoczesne witryny oraz aplikacje webowe, tworzone z myślą o Twoich potrzebach",
      image: "/img/GPS.png"
    },
    {
      id: 4,
      stacks: ["Java", "Spring Boot", "REST API"],
      content: "Nowoczesne witryny oraz aplikacje webowe, tworzone z myślą o Twoich potrzebach",
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
