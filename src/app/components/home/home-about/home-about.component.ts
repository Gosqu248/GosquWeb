import { Component } from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';
import {Language} from '../../../interface/language';
import {LanguageService} from '../../../services/language.service';


@Component({
  selector: 'app-home-about',
  imports: [
    LottieComponent,
  ],
  standalone: true,
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss'

})
export class HomeAboutComponent {
  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/coding.json',
  }

  constructor(private languageService: LanguageService) {}

  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }

  onAnimationCreated(animation: any) {
    animation.setSpeed(0.7);
  }
}
