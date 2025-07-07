import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {OfferItem} from '../../../../interface/offer-item';
import {LanguageService} from '../../../../services/language.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-offer-item',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './offer-item.component.html',
  styleUrl: './offer-item.component.scss'
})
export class OfferItemComponent implements OnInit, OnDestroy {
  @Input() selectedOffer!: OfferItem;
  private languageSubscription!: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.languageChangeSubject.subscribe(() => {
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
