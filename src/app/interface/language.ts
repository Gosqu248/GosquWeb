export interface Language {
  about: string;
  whatIDo: string;
  skills: string;
  projects: string;
  contact: string;
  changeLanguage: string;
  textAbout1: string;
  textAbout2: string;
  webTitle: string;
  webDescription: string;
  mobileTitle: string;
  mobileDescription: string;
  gpsTitle: string;
  gpsDescription: string;
  dedicatedTitle: string;
  dedicatedDescription: string;
  database: string;
  others: string;
  webApp: string;
  commercial: string;
  nonCommercial: string;
  viewDetails: string;
  korkDescription: string;
  busDescription: string;
}

export interface Translations {
  pl: Language;
  en: Language;
}
