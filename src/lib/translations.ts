export type Language = 'en' | 'cs' | 'de';

export interface Translations {
  // Header
  headerTitle: string;
  headerSubtitle: string;
  
  // Loot Display
  maxLoot: string;
  perExpedition: string;
  metal: string;
  crystal: string;
  deuterium: string;
  darkMatter: string;
  
  // Index page
  universeSpeed: string;
  language: string;
  yourPlanets: string;
  addPlanet: string;
  footerText: string;
  
  // Planet Card
  planetNamePlaceholder: string;
  race: string;
  researchTechnologies: string;
  buildings: string;
  clonePlanet: string;
  
  // Technologies
  improvedSensorTech: string;
  sixthSense: string;
  kaeleshPioneerUpgrade: string;
  
  // Buildings
  metropolis: string;
  cloningLab: string;
  highPerformanceTransformer: string;
  massChipProduction: string;
  
  // Race bonus types
  economicBonus: string;
  miningBonus: string;
  productionBonus: string;
  expeditionBonus: string;
  
  // Race names
  humans: string;
  rocktal: string;
  mechas: string;
  kaelesh: string;
  
  // Race bonus type keys
  raceBonusType: Record<string, string>;
  
  // Language names
  english: string;
  czech: string;
  german: string;
  
  // Other
  planet: string;
  raceLevel: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    headerTitle: 'OGame Expedition Calculator',
    headerSubtitle: 'Calculate maximum loot from your expeditions',
    maxLoot: 'Maximum Loot',
    perExpedition: 'Per expedition',
    metal: 'Metal',
    crystal: 'Crystal',
    deuterium: 'Deuterium',
    darkMatter: 'Dark Matter',
    universeSpeed: 'Universe Speed',
    language: 'Language',
    yourPlanets: 'Your Planets',
    addPlanet: 'Add Planet',
    footerText: 'OGame Expedition Calculator • Created for OGame players',
    planetNamePlaceholder: 'Planet name',
    race: 'Race',
    researchTechnologies: 'Research Technologies',
    buildings: 'Buildings',
    clonePlanet: 'Clone planet',
    improvedSensorTech: 'Improved Sensor Technology',
    sixthSense: 'Sixth Sense',
    kaeleshPioneerUpgrade: 'Kaelesh Pioneer Upgrade',
    metropolis: 'Metropolis',
    cloningLab: 'Cloning Lab',
    highPerformanceTransformer: 'High Performance Transformer',
    massChipProduction: 'Mass Chip Production',
    economicBonus: 'Economic Bonus',
    miningBonus: 'Mining Bonus',
    productionBonus: 'Production Bonus',
    expeditionBonus: 'Expedition Bonus',
    humans: 'Humans',
    rocktal: "Rock'tal",
    mechas: 'Mechas',
    kaelesh: 'Kaelesh',
    english: 'English',
    czech: 'Czech',
    german: 'German',
    planet: 'Planet',
    raceLevel: 'Race Level',
    raceBonusType: {
      humans: 'Economic Bonus',
      rocktal: 'Mining Bonus',
      mechas: 'Production Bonus',
      kaelesh: 'Expedition Bonus',
    },
  },
  cs: {
    headerTitle: 'OGame Expedice Kalkulačka',
    headerSubtitle: 'Vypočítejte maximální loot z vašich expedic',
    maxLoot: 'Maximální Loot',
    perExpedition: 'Za jednu expedici',
    metal: 'Metal',
    crystal: 'Krystal',
    deuterium: 'Deuterium',
    darkMatter: 'Temná hmota',
    universeSpeed: 'Rychlost vesmíru',
    language: 'Jazyk',
    yourPlanets: 'Vaše planety',
    addPlanet: 'Přidat planetu',
    footerText: 'OGame Expedice Kalkulačka • Vytvořeno pro hráče OGame',
    planetNamePlaceholder: 'Název planety',
    race: 'Rasa',
    researchTechnologies: 'Výzkumné technologie',
    buildings: 'Budovy',
    clonePlanet: 'Klonovat planetu',
    improvedSensorTech: 'Vylepšená senzorová technologie',
    sixthSense: 'Šestý smysl',
    kaeleshPioneerUpgrade: 'Kaeleshské vylepšení průkopníka',
    metropolis: 'Metropolis',
    cloningLab: 'Klonovací laboratoř',
    highPerformanceTransformer: 'Vysoce výkonný transformátor',
    massChipProduction: 'Hromadná produkce čipů',
    economicBonus: 'Ekonomický bonus',
    miningBonus: 'Těžební bonus',
    productionBonus: 'Produkční bonus',
    expeditionBonus: 'Expediční bonus',
    humans: 'Humans',
    rocktal: "Rock'tal",
    mechas: 'Mechas',
    kaelesh: 'Kaelesh',
    english: 'Angličtina',
    czech: 'Čeština',
    german: 'Němčina',
    planet: 'Planeta',
    raceLevel: 'Úroveň rasy',
    raceBonusType: {
      humans: 'Ekonomický bonus',
      rocktal: 'Těžební bonus',
      mechas: 'Produkční bonus',
      kaelesh: 'Expediční bonus',
    },
  },
  de: {
    headerTitle: 'OGame Expedition Rechner',
    headerSubtitle: 'Berechnen Sie maximale Beute aus Ihren Expeditionen',
    maxLoot: 'Maximale Beute',
    perExpedition: 'Pro Expedition',
    metal: 'Metall',
    crystal: 'Kristall',
    deuterium: 'Deuterium',
    darkMatter: 'Dunkle Materie',
    universeSpeed: 'Universumsgeschwindigkeit',
    language: 'Sprache',
    yourPlanets: 'Ihre Planeten',
    addPlanet: 'Planet hinzufügen',
    footerText: 'OGame Expedition Rechner • Erstellt für OGame Spieler',
    planetNamePlaceholder: 'Planetenname',
    race: 'Rasse',
    researchTechnologies: 'Forschungstechnologien',
    buildings: 'Gebäude',
    clonePlanet: 'Planet klonen',
    improvedSensorTech: 'Verbesserte Sensortechnologie',
    sixthSense: 'Sechster Sinn',
    kaeleshPioneerUpgrade: 'Kaelesh Pionier-Upgrade',
    metropolis: 'Metropolis',
    cloningLab: 'Klonlabor',
    highPerformanceTransformer: 'Hochleistungstransformator',
    massChipProduction: 'Massenchip-Produktion',
    economicBonus: 'Wirtschaftsbonus',
    miningBonus: 'Bergbaubonus',
    productionBonus: 'Produktionsbonus',
    expeditionBonus: 'Expeditionsbonus',
    humans: 'Menschen',
    rocktal: "Rock'tal",
    mechas: 'Mechas',
    kaelesh: 'Kaelesh',
    english: 'Englisch',
    czech: 'Tschechisch',
    german: 'Deutsch',
    planet: 'Planet',
    raceLevel: 'Rassen-Stufe',
    raceBonusType: {
      humans: 'Wirtschaftsbonus',
      rocktal: 'Bergbaubonus',
      mechas: 'Produktionsbonus',
      kaelesh: 'Expeditionsbonus',
    },
  },
};

export const getTranslation = (lang: Language, key: keyof Translations): string => {
  return translations[lang]?.[key] || translations.en[key];
};

export const getRaceName = (lang: Language, raceId: string): string => {
  const raceKey = raceId as keyof Translations;
  return translations[lang]?.[raceKey] as string || translations.en[raceKey] as string;
};

export const getRaceBonusType = (lang: Language, raceId: string): string => {
  const raceBonusTypes = translations[lang]?.raceBonusType as Record<string, string> || translations.en.raceBonusType as Record<string, string>;
  return raceBonusTypes[raceId] || raceBonusTypes.humans;
};
