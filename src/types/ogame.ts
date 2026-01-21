export type Race = 'humans' | 'rocktal' | 'mechas' | 'kaelesh';

export interface RaceInfo {
  id: Race;
  name: string;
  description: string;
  bonusType: string;
  baseBonus: number;
}

export interface Planet {
  id: string;
  name: string;
  race: Race;
  // Research technologies (all races)
  improvedSensorTech: number;
  sixthSense: number;
  kaeleshPioneerUpgrade: number;
  // Race-specific buildings
  metropolis: number; // Humans only
  cloningLab: number; // Kaelesh only
  highPerformanceTransformer: number; // Mechas only
  massChipProduction: number; // Mechas only
  raceLevel: number;
}

export interface LootResult {
  metal: number;
  crystal: number;
  deuterium: number;
  darkMatter: number;
  total: number;
}

export const RACES: RaceInfo[] = [
  {
    id: 'humans',
    name: 'Humans',
    description: 'Balanced economy and fleet',
    bonusType: 'Ekonomický bonus',
    baseBonus: 0,
  },
  {
    id: 'rocktal',
    name: "Rock'tal",
    description: 'Mining specialists',
    bonusType: 'Těžební bonus',
    baseBonus: 0,
  },
  {
    id: 'mechas',
    name: 'Mechas',
    description: 'Production specialists',
    bonusType: 'Produkční bonus',
    baseBonus: 0,
  },
  {
    id: 'kaelesh',
    name: 'Kaelesh',
    description: 'Expedition specialists',
    bonusType: 'Expediční bonus',
    baseBonus: 0,
  },
];

export const getRaceById = (id: Race): RaceInfo => {
  return RACES.find(r => r.id === id) || RACES[0];
};

export const createDefaultPlanet = (index: number, planetName?: string): Planet => ({
  id: crypto.randomUUID(),
  name: planetName || `Planet ${index}`,
  race: 'humans',
  improvedSensorTech: 0,
  sixthSense: 0,
  kaeleshPioneerUpgrade: 0,
  metropolis: 0,
  cloningLab: 0,
  highPerformanceTransformer: 0,
  massChipProduction: 0,
  raceLevel: 1,
});

export const clonePlanet = (planet: Planet, newIndex: number): Planet => ({
  ...planet,
  id: crypto.randomUUID(),
  name: `Planet ${newIndex}`,
});
