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
  hyperspaceTech: number;
  explorerClass: number;
  fleetAdmiralLevel: number;
  pathfinders: number;
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
    baseBonus: 0.1,
  },
  {
    id: 'mechas',
    name: 'Mechas',
    description: 'Production specialists',
    bonusType: 'Produkční bonus',
    baseBonus: 0.1,
  },
  {
    id: 'kaelesh',
    name: 'Kaelesh',
    description: 'Expedition specialists',
    bonusType: 'Expediční bonus',
    baseBonus: 0.1,
  },
];

export const getRaceById = (id: Race): RaceInfo => {
  return RACES.find(r => r.id === id) || RACES[0];
};
