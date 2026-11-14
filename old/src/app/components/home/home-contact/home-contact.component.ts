import { Component } from '@angular/core';
import {Language} from '../../../interface/language';
import {LanguageService} from '../../../services/language.service';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'app-home-contact',
  imports: [
    LottieComponent
  ],
  templateUrl: './home-contact.component.html',
  styleUrl: './home-contact.component.scss'
})
export class HomeContactComponent {
  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/dev.json',
  }

  constructor(private languageService: LanguageService) {
  }
  getTranslation<K extends keyof Language>(key: K): string {
    return this.languageService.getTranslation(key);
  }

  onAnimationCreated(animation: any) {
    animation.setSpeed(0.7);
  }
}
