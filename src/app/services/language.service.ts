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
      about: 'O nas',
      whatIDo: 'Nasza Oferta',
      skills: 'Stos technologiczny',
      projects: 'Projekty',
      contact: 'Kontakt',
      changeLanguage: 'Zmień język na angielski',
      textAbout1: " Gosqu Software to specjalistyczna firma zajmująca się kompleksowym tworzeniem\n" +
        "              oprogramowania dla przedsiębiorstw każdej wielkości. Nasza misja to dostarczanie\n" +
        "              najwyższej jakości rozwiązań technologicznych, które wspierają rozwój i efektywność biznesu.",
      textAbout2: "Specjalizujemy się w nowoczesnych technologiach,\n" +
        "              tworząc skalowalne aplikacje webowe, mobilne oraz systemy dedykowane,\n" +
        "              w tym zaawansowane rozwiązania GPS/TMS dla branży logistycznej.",
      specialization: "Nasze specjalizacje technologiczne:",
      www: "Strony internetowe",
      web: "Aplikacje webowe (SPA/PWA)",
      mobile: "Aplikacje mobilne (iOS/Android)",
      gps: "Systemy GPS i geolokalizacja",
      dedicated: "Systemy dedykowane (TMS/ERP)",
      ecomerce: "E-commerce i sklepy online",
      api: "API i integracje zewnętrzne",
      optimization: "Optymalizacja wydajności",
      readyFor: 'Gotowy na rozpoczęcie projektu?',
      contactUs: 'Skontaktuj się z nami już dziś i przekonaj się, jak Gosqu Software może pomóc Twojemu biznesowi osiągnąć cele technologiczne.',
      tellAboutYourProject: 'Porozmawiajmy o Twoim projekcie',
      yearsOfExperience: 'Lat doświadczenia',
      doneProjects: 'Zrealizowanych projektów',
      techSupport: 'Wsparcie techniczne',
      technologies: 'Technologii',
      engagement: 'Zaangażowanie',

      webTitle: 'Strony internetowe i apliakcje webowe',
      wwwDescription: 'Nowoczesne, responsywne strony internetowe, które wyróżniają Twój biznes w sieci.',
      webDescription: 'Zaawansowane aplikacje SPA/PWA z nowoczesnym interfejsem użytkownika.',
      mobileTitle: 'Aplikacje mobilne',
      mobileDescription: 'Natywne i hybrydowe aplikacje mobilne na iOS i Android.',
      gpsTitle: 'Systemy GPS',
      gpsDescription: 'Zaawansowane systemy nawigacji i monitoringu GPS',
      dedicatedTitle: 'Systemy dedykowane',
      dedicatedDescription: 'Niestandardowe rozwiązania dopasowane do specyficznych potrzeb biznesowych.',
      ecomerceDescription: 'Kompleksowe sklepy internetowe z systemami płatności i zarządzania.',

      responsive: 'Responsywny design',
      SEO: 'Optymalizacja SEO',
      fastLoading: 'Szybkie ładowanie',
      adminPanels: 'Panel administracyjny',
      PWA: 'Progressive Web App (PWA)',
      SPA: 'Single Page Application (SPA)',
      API: 'Integracja z API',
      safety: 'Bezpieczeństwo danych',
      scaleArchitecture: 'Skalowalna architektura',
      IOSAndroid: 'iOS & Android',
      ReactFlutter: 'React Native / Android / Swift',
      notification: 'Powiadomienia push',
      offlineMode: 'Funkcjonalność offline',
      appStore: 'Publikacja w App Store',
      realTime: 'Śledzenie w czasie rzeczywistym',
      geoFencing: 'Geofencing',
      routeOptimization: 'Optymalizacja trasy',
      fleetManagement: 'Zarządzanie flotą',
      customMaps: 'Niestandardowe warstwy map',
      customERPTMS: 'Niestandardowe systemy ERP/TMS',
      businessAutomation: 'Automatyzacja biznesu',
      thirdPartyIntegration: 'Integracje zewnętrzne',
      databaseDesign: 'Projektowanie baz danych',
      cloudDeployment: 'Wdrożenie w chmurze',
      paymentIntegration: 'Integracja płatności',
      inventoryManagement: 'Zarządzanie zapasami',
      orderTracking: 'Śledzenie zamówień',
      multiCurrency: 'Obsługa wielu walut',

      // Why Us section
      whyChooseUs: "Dlaczego my?",
      whyChooseUsSubtitle: "Poznaj powody, dla czego warto wybrać Gosqu Software",
      expertTeam: "Innowacyjni wizjonerzy",
      expertTeamDesc: "Nasz zespół to grupa kreatywnych pasjonatów technologii, którzy potrafią przekształcić najbardziej złożone wyzwania w eleganckie rozwiązania cyfrowe.",
      modernTech: "Nowoczesne technologie",
      modernTechDesc: "Wykorzystujemy najnowsze technologie i frameworks, aby dostarczać wydajne i skalowalne rozwiązania dopasowane do przyszłości.",
      fullSupport: "Pełne wsparcie 24/7",
      fullSupportDesc: "Oferujemy kompleksowe wsparcie techniczne i konserwację przez całą dobę, zapewniając ciągłość działania Twojego biznesu.",
      provenResults: "Sprawdzone rezultaty",
      provenResultsDesc: "Nasze portfolio obejmuje ponad 10 udanych projektów dla różnych branż, co potwierdza naszą skuteczność i profesjonalizm.",
      flexibleApproach: "Elastyczne podejście",
      flexibleApproachDesc: "Dostosowujemy nasze metody pracy do specyficznych potrzeb każdego klienta, oferując personalizowane rozwiązania.",
      timelyDelivery: "Terminowa realizacja",
      timelyDeliveryDesc: "Dotrzymujemy ustalonych terminów realizacji projektów, stosując sprawdzone metodologie zarządzania projektami.",
      readyToStart: "Gotowy na rozpoczęcie współpracy?",
      readyToStartDesc: "Skontaktuj się z nami już dziś i rozpocznij transformację cyfrową swojego biznesu z ekspertami Gosqu Software.",
      competitivePrices: "Konkurencyjne ceny",
      competitivePricesDesc: "Oferujemy atrakcyjne ceny przy zachowaniu najwyższej jakości usług, co zapewnia optymalny stosunek wartości do ceny.",

      our: 'Nasza',
      offer: 'oferta',
      how: 'Jak',
      work: 'pracujemy',

      realizationProcess: 'Sprawdzony proces realizacji projektów krok po kroku',
      analyze: 'Analiza',
      analyzeDescription: 'Szczegółowa analiza wymagań i określenie zakresu projektu',
      design: 'Projektowanie',
      designDescription: 'Tworzenie mockupów, prototypów i architektury systemu',
      development: 'Rozwój',
      developmentDescription: 'Implementacja rozwiązania z użyciem nowoczesnych technologii',
      deploy: 'Wdrożenie',
      deployDescription: 'Deploy, testy oraz przekazanie projektu do użytkowania',
      projectsSubtitle: 'Zobacz kilka z naszych zrealizowanych projektów',
      webstauratorDescription: 'Kompleksowa platforma do zamawiania jedzenia online i zarządzania restauracjami, oferująca klientom intuicyjny sposób szukania restauracji, przeglądania menu, składania zamówień i dokonywania płatności, a restauracjom zaawansowane narzędzia do przetwarzania zamówień i zarządzania w czasie rzeczywistym.',

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
      haveProject: 'Masz projekt w głowie? Skontaktuj się ze mną i omówmy szczegóły!',

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
      about: 'About us',
      whatIDo: 'Our offer',
      skills: 'Technology stack',
      projects: 'Projects',
      contact: 'Contact',
      changeLanguage: 'Change language to polish',
      textAbout1: "Gosqu Software is a specialist company dealing with comprehensive creation\n" +
        "              software for enterprises of every size. Our mission is providing\n" +
        "              the highest quality technological solutions that support the development and efficiency of business.",
      textAbout2: "We specialize in modern technologies,\n" +
        "              creating scalable web, mobile and dedicated systems,\n" +
        "              Including advanced GPS/TMS solutions for the logistics industry.",
      specialization: "Our technological specializations:",
      www: "Websites",
      web: "Web applications (SPA/PWA)",
      mobile: "Mobile applications (iOS/Android)",
      gps: "GPS systems and geolocation",
      dedicated: "Dedicated systems (TMS/ERP)",
      ecomerce: "E-commerce and online stores",
      api: "API and external integrations",
      optimization: "Performance optimization",
      readyFor: 'Ready to start the project?',
      contactUs: 'Contact us today and see how Gosqu Software can help your business achieve its technological goals.',
      tellAboutYourProject: 'Let\'s talk about your project',
      yearsOfExperience: 'Years of experience',
      doneProjects: 'Completed projects',
      techSupport: 'Technical support',
      technologies: 'Technologies',
      engagement: 'Engagement',

      webTitle: 'Websites and web applications',
      wwwDescription: 'Modern, responsive websites that make your business stand out online.',
      webDescription: 'Advanced SPA/PWA applications with a modern user interface.',
      mobileTitle: 'Mobile applications',
      mobileDescription: 'Native and hybrid mobile applications for iOS and Android.',
      gpsTitle: 'GPS systems',
      gpsDescription: 'Advanced GPS navigation and monitoring systems',
      dedicatedTitle: 'Dedicated systems',
      dedicatedDescription: 'Custom solutions tailored to specific business needs.',
      ecomerceDescription: 'Comprehensive online stores with payment and management systems.',

      responsive: 'Responsive Web Design',
      SEO: 'SEO Optimization',
      fastLoading: 'Fast loading',
      adminPanels: 'Admin panel',
      PWA: 'Progressive Web App (PWA)',
      SPA: 'Single Page Application (SPA)',
      API: 'API Integration',
      safety: 'Data security',
      scaleArchitecture: 'Scalable architecture',
      IOSAndroid: 'iOS & Android',
      ReactFlutter: 'React Native / Android / Swift',
      notification: 'Push notifications',
      offlineMode: 'Offline functionality',
      appStore: 'App Store deployment',
      realTime: 'Real-time tracking',
      geoFencing: 'Geofencing',
      routeOptimization: 'Route optimization',
      fleetManagement: 'Fleet management',
      customMaps: 'Custom map layers',
      customERPTMS: 'Custom ERP/TMS',
      businessAutomation: 'Business automation',
      thirdPartyIntegration: 'Third-party integrations',
      databaseDesign: 'Database design',
      cloudDeployment: 'Cloud deployment',
      paymentIntegration: 'Payment integration',
      inventoryManagement: 'Inventory management',
      orderTracking: 'Order tracking',
      multiCurrency: 'Multi-currency support',

      our: 'Our',
      offer: 'offer',
      how: 'How',
      work: 'we work',

      realizationProcess: 'Proven project implementation process step by step',
      analyze: 'Analysis',
      analyzeDescription: 'Detailed requirements analysis and project scope definition',
      design: 'Design',
      designDescription: 'Creating mockups, prototypes and system architecture',
      development: 'Development',
      developmentDescription: 'Implementing the solution using modern technologies',
      deploy: 'Deployment',
      deployDescription: 'Deploy, testing and handover of the project for use',

      // Why Us section
      whyChooseUs: "Why us?",
      whyChooseUsSubtitle: "Discover the reasons why you should choose Gosqu Software",
      expertTeam: "Innovative visionaries",
      expertTeamDesc: "Our team is a group of creative technology enthusiasts who can transform the most complex challenges into elegant digital solutions.",
      modernTech: "Modern technologies",
      modernTechDesc: "We use the latest technologies and frameworks to deliver efficient and scalable solutions tailored for the future.",
      fullSupport: "Full 24/7 support",
      fullSupportDesc: "We offer comprehensive technical support and maintenance around the clock, ensuring business continuity.",
      provenResults: "Proven results",
      provenResultsDesc: "Our portfolio includes over 10 successful projects for various industries, confirming our effectiveness and professionalism.",
      flexibleApproach: "Flexible approach",
      flexibleApproachDesc: "We adapt our working methods to the specific needs of each client, offering personalized solutions.",
      timelyDelivery: "Timely delivery",
      timelyDeliveryDesc: "We meet established project deadlines by applying proven project management methodologies.",
      readyToStart: "Ready to start cooperation?",
      readyToStartDesc: "Contact us today and begin your business digital transformation with Gosqu Software experts.",
      competitivePrices: "Competitive prices",
      competitivePricesDesc: "We offer attractive prices while maintaining the highest quality of services, ensuring optimal value for money.",
      projectsSubtitle: 'See some of our completed projects',
      webstauratorDescription: 'Comprehensive platform for ordering food online and managing restaurants, offering customers an intuitive way to search for restaurants, browse menus, place orders and make payments, and providing restaurants with advanced tools for processing orders and real-time management.',


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
      haveProject: 'Do you have a project in mind? Contact me and let\'s discuss the details!',

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
