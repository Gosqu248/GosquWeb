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
      skills: 'Stos technologiczny',
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
      korkDescription: 'Aplikacja webowa dla firmy Kork-Pyś z możliwością pobrania przez klientów swoich faktur.',
      busDescription: 'Aplikacja mobilna dla kierowców MPK Zgierz do systemu zarządzania komunikacją miejską.',
      back: "Powrót",
      viewLiveDemo: "Zobacz na żywo",
      usedTechnologies: "Wykorzystane technologie",
      languages: "Języki",
      features: "Funkcjonalności",
      customized: "Dedykowane oprogramowanie dostosowane do Twoich potrzeb.",
      innovative: "Innowacyjne technologie napędzające rozwój Twojej firmy.",
      cloudDevOps: 'Chmura i DevOps',
      tools: 'Narzędzia',

      //Kork Project
      renovation: "Sekcja usług remontowo-budowlanych",
      rental: "Sekcja wypożyczalnii sprzętu budowlanego",
      transport: "Sekcja usułg transportowych HDS",
      eco: "Sekcja usług związanych z utylizacją odpadów",
      client_portal: "Portal klienta z możliwością logowania",
      api_integration: "Integracja z systemem Comarch ERP XT",
      personal_data: "Dostęp do danych osobowych klienta",
      invoices: "Przeglądanie i pobieranie wystawionych faktur",

      //Bus Control Project
      downloadDatabase: "Pobieranie bazy danych",
      downloadVariant: "Pobieranie wyznaczonej linii oraz ustawianie przystanków",
      mp3: "Zapowiedzi głosowe dla aktualnego przystanku oraz następnego",
      updateDatabase: "Aktualizacja bazy danych z serwera",
      reverseCurse: "Pobieranie następnej linii po dotarciu na końcowy przystanek",
      sendCurrentLocation: "Wysyłanie biężącej lokalizacji do serwera co 200 milisekund lub co 1 metr",
      sendBusOnStop: "Wysyłanie informacji o dotarciu autobusu na przystanek",
      sendLostBusOnStop: "Wysyłanie niedostarczonych informacji o dotarciu autobusu na przystanek",
      wifiCheck: "Sprawdzanie dostępności sieci WiFi w autobusie i ustawianie odpowiedniego trybu pracy aplikacji",
      plannedHours: "Wyświetlanie planowanych godzin przyjazdu autobu na przystanek",
      showStops: "Wyświetlanie nazw przystanków: poprzedni / aktualny / następny",

      //Gosqu Restaurant Project
      gosquDescription: "Nowoczesna aplikacja dla restauracji, upraszczająca przeglądanie menu, zamawianie dań i bezpieczne płatności, z zaawansowaną weryfikacją i efektywnym zarządzaniem zamówieniami.",
      googleAuth: "Logowanie za pomocą konta Google",
      twoFA: "Autoryzacja dwuetapowa",
      limitedLoginAttempts: "Ograniczenie liczby prób logowania",
      editUserData: "Edycja danych użytkownika",
      payments: "Płatności online za pomocą PayU",
      adminPanel: "Panel administracyjny z dodawaniem / edycją / usuwaniem pozycji z menu oraz zarządzaniem zamówieniami",
      animatedBackgrounds: "Animowane tła",
      menuImageUpload: "Przesyłanie zdjęć menu z komputera",



    },
    en: {
      about: 'About me',
      whatIDo: 'Offers',
      skills: 'Technology stack',
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
      busDescription: 'Mobile application for MPK Zgierz drivers for the existing system of managing public transport.',
      back: "Back",
      viewLiveDemo: "View live",
      usedTechnologies: "Used technologies",
      languages: "Languages",
      features: "Features",
      customized: "Customized software solutions for your needs.",
      innovative: "Innovative technologies driving your business forward.",
      cloudDevOps: 'Cloud & DevOps',
      tools: 'Tools',

      //Kork Project
      renovation: "Renovation and construction services section",
      rental: "Construction equipment rental section",
      transport: "HDS transport services section",
      eco: "Waste disposal services section",
      client_portal: "Customer portal with login option",
      api_integration: "Integration with Comarch ERP XT system",
      personal_data: "Access to customer's personal data",
      invoices: "Viewing and downloading issued invoices",

      //Bus Control Project
      downloadDatabase: "Downloading database",
      downloadVariant: "Downloading the designated line and setting stops",
      mp3: "Voice announcements for the current and next stop",
      updateDatabase: "Updating the database from the server",
      reverseCurse: "Downloading the next line after reaching the final stop",
      sendCurrentLocation: "Sending the current location to the server every 200 milliseconds or every 1 meter",
      sendBusOnStop: "Sending information about the bus reaching the stop",
      sendLostBusOnStop: "Sending undelivered information about the bus reaching the stop",
      wifiCheck: "Checking the availability of WiFi network on the bus and setting the appropriate application mode",
      plannedHours: "Display of planned bus arrival times at the stop",
      showStops: "Display of stops names: previous / current / next",

      //Gosqu Restaurant Project
      gosquDescription: "Modern application for restaurants, simplifying menu browsing, ordering dishes and secure payments, with advanced verification and efficient order management.",
      googleAuth: "Login using Google account",
      twoFA: "Two-step authorization",
      limitedLoginAttempts: "Limiting the number of login attempts",
      editUserData: "User data editing",
      payments: "Online payments using PayU",
      adminPanel: "Administrative panel with add / edit / delete menu items and order management",
      animatedBackgrounds: "Animated backgrounds",
      menuImageUpload: "Uploading menu photos from the computer",

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
