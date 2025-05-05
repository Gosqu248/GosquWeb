import {Component, HostListener} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf, ViewportScroller} from '@angular/common';
import {LanguageService} from '../../../services/language.service';
import {Language} from '../../../interface/language';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  imports: [
    RouterLink,
    NgIf,
    NgClass
  ],
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent {
  ukFlag = 'assets/icons/uk-logo.png';
  plFlag = '/assets/icons/poland-logo.png';
  isMenuOpen = false;
  currentLanguage: string;
  currentFlag: string;
  showLanguageDropdown = false;
  isVisible: boolean = true;

  constructor(private languageService: LanguageService, private router: Router) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.currentFlag = this.getCurrentFlag();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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

  @HostListener('window:scroll', [])
  onWindowsScroll(): void {
    this.isVisible = window.scrollY < 150;
  }

  setLanguage(language: string) {
    if (this.currentLanguage !== language) {
      this.languageService.switchLanguage();
      this.currentLanguage = language;
      this.currentFlag = this.getCurrentFlag();
    }
    this.showLanguageDropdown = false;
  }

  getTranslation<K extends keyof Language>(key: K) {
    return this.languageService.getTranslation(key);
  }

  private getCurrentFlag() {
    return this.currentLanguage === 'pl' ? this.plFlag : this.ukFlag;
  }

}
