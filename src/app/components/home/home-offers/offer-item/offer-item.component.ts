import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf} from '@angular/common';
import {OfferItem} from '../../../../interface/offer-item';


@Component({
  selector: 'app-offer-item',
  imports: [
    NgForOf
  ],
  templateUrl: './offer-item.component.html',
  styleUrl: './offer-item.component.scss'
})
export class OfferItemComponent{
  @Input() selectedOffer!: OfferItem;
}
