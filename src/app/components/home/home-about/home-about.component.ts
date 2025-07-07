import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';
import {Language} from '../../../interface/language';
import {LanguageService} from '../../../services/language.service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home-about',
  imports: [
    LottieComponent,
    NgForOf,
  ],
  standalone: true,
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.scss'

})
export class HomeAboutComponent implements OnInit, OnDestroy{
  lottieOptions: AnimationOptions = {
    path: 'assets/lottie/coding.json',
  }
  stats: {number: string, label: string}[] = [];
  private languageSubscription: Subscription;

  constructor(private languageService: LanguageService,
              private router: Router) {}

  ngOnInit() {
    this.updateSpecializations();

    this.languageSubscription = this.languageService.languageChangeSubject.subscribe(() => {
      this.updateSpecializations();
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private updateSpecializations() {
    this.stats = [
      { number: '2+', label: this.getTranslation('yearsOfExperience') },
      { number: '10+', label: this.getTranslation('doneProjects') },
      { number: '24/7', label: this.getTranslation('techSupport') },
      { number: '10+', label: this.getTranslation('technologies') },
      { number: '100%', label: this.getTranslation('engagement') }
    ];
  }

  scrollTo(id: string): void {
    if (this.router.url === '/') {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/'], { fragment: id }).then(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: yOffset, behavior: 'smooth' });
        }
      });
    }
  }


  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }

  onAnimationCreated(animation: any) {
    animation.setSpeed(0.7);
  }
}
