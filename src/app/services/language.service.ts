import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Translations} from '../interface/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private  currentLanguage: 'pl' | 'en' = 'pl';
  public languageChangeSubject = new BehaviorSubject<'pl' | 'en'>('pl');
  languageChange$ = this.languageChangeSubject.asObservable();

  constructor() {
    if(this.isLocalStorageAvailable()) {
      const savedLanguage = localStorage.getItem('language');
      if(savedLanguage === 'pl' || savedLanguage === 'en') {
        this.currentLanguage = savedLanguage;
        this.languageChangeSubject.next(this.currentLanguage);
      }
    }
  }

  translations: Translations = {
    pl: {
      about: 'O mnie',
      whatIDo: 'Oferta',
      skills: 'Technologie',
      projects: 'Projekty',
      contact: 'Kontakt',
      changeLanguage: 'Zmień język na angielski',
      textAbout1: "Gosqu Software, założone przez Grzegorza Urbana, to dynamiczna firma technologiczna, która łączy kreatywność z nowoczesnymi rozwiązaniami cyfrowymi. ",
      textAbout2: "Nasz zespół wykorzystuje najnowsze technologie, realizując projekty, które przyczyniają się do rozwoju biznesu.",
      webTitle: 'Strony internetowe i apliakcje webowe',
      webDescription: 'Nowoczesne witryny oraz aplikacje webowe, tworzone z myślą o Twoich potrzebach',
      mobileTitle: 'Aplikacje mobilne',
      mobileDescription: 'Aplikacje mobilne na systemy Android oraz iOS, zapewniające najwyższą jakość użytkowania',
      gpsTitle: 'Systemy GPS',
      gpsDescription: 'Zaawansowane systemy nawigacji i monitoringu GPS',
      dedicatedTitle: 'Systemy dedykowane',
      dedicatedDescription: 'Specjalistyczne oprogramowanie, dostosowane do indywidualnych potrzeb klienta',
      database: 'Bazy danych',
      others: 'Inne',
      webApp: 'Aplikacje webowe',
      commercial: 'Komercyjne',
      nonCommercial: 'Prywatne',
      viewDetails: 'Zobacz szczegóły',
      korkDescription: 'Aplikacja webowa dla firmy budowlanej Kork-Pyś z możliwością pobrania przez klientów swoich faktur.',
      busDescription: 'Aplikacja mobilna dla kierowców MPK Zgierz do istniejącego systemu.',
    },
    en: {
      about: 'About me',
      whatIDo: 'Offers',
      skills: 'Technologies',
      projects: 'Projects',
      contact: 'Contact',
      changeLanguage: 'Change language to polish',
      textAbout1: "Gosqu Software, founded by Grzegorz Urban, is a dynamic technology company that blends creativity with modern digital solutions. ",
      textAbout2: "Our team leverages cutting-edge technologies to deliver projects that drive business growth.",
      webTitle: 'Websites and web applications',
      webDescription: 'Modern websites and web applications, created with your needs in mind',
      mobileTitle: 'Mobile applications',
      mobileDescription: 'Mobile applications for Android and iOS systems, providing the highest quality of use',
      gpsTitle: 'GPS systems',
      gpsDescription: 'Advanced GPS navigation and monitoring systems',
      dedicatedTitle: 'Dedicated systems',
      dedicatedDescription: 'Specialized software tailored to the individual needs of the client',
      database: 'Databases',
      others: 'Others',
      webApp: 'Web applications',
      commercial: 'Commercial',
      nonCommercial: 'Private',
      viewDetails: 'View details',
      korkDescription: 'Web application for the construction company Kork-Pyś with the possibility of downloading invoices by customers.',
      busDescription: 'Mobile application for MPK Zgierz drivers for the existing system.',
    }
  }

  getCurrentLanguage(): 'pl' | 'en' {
    return this.currentLanguage;
  }

  switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'pl' ? 'en' : 'pl';
    localStorage.setItem('language', this.currentLanguage);
    this.languageChangeSubject.next(this.currentLanguage);
  }

  getTranslation<K extends keyof Translations[typeof this.currentLanguage]>(key: K) {
    return this.translations[this.currentLanguage][key];
  }

  isLocalStorageAvailable() {
    return typeof localStorage !== 'undefined';
  }
}
