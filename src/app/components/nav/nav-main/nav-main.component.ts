import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {LanguageService} from '../../../services/language.service';
import {Language} from '../../../interface/language';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  imports: [
    RouterLink,
    NgIf
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

  constructor(private languageService: LanguageService) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.currentFlag = this.getCurrentFlag();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguage(): void {
    this.languageService.switchLanguage();
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
