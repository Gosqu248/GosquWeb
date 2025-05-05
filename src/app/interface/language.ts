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
  back: string;
  viewLiveDemo: string;
  usedTechnologies: string;
  languages: string;
  features: string;
  customized: string;
  innovative: string;
  cloudDevOps: string;
  tools: string;

  //kork project
  renovation: string;
  rental: string;
  transport: string;
  eco: string;
  client_portal: string;
  api_integration: string;
  personal_data: string;
  invoices: string;

  //bus control project
  downloadDatabase: string;
  downloadVariant: string;
  mp3: string;
  updateDatabase: string;
  reverseCurse: string;
  sendCurrentLocation: string;
  sendBusOnStop: string;
  sendLostBusOnStop: string;
  wifiCheck: string;
  plannedHours: string;
  showStops: string;

  //gosqu restaurant project
  gosquDescription: string;
  googleAuth: string;
  twoFA: string;
  limitedLoginAttempts: string;
  editUserData: string;
  payments: string;
  adminPanel: string;
  animatedBackgrounds: string;
  menuImageUpload: string;
}

export interface Translations {
  pl: Language;
  en: Language;
}
