import { useMemo } from 'react';
import { Planet, LootResult, getRaceById } from '@/types/ogame';

// Base loot values for expeditions
const BASE_METAL = 200000;
const BASE_CRYSTAL = 100000;
const BASE_DEUTERIUM = 50000;
const BASE_DARK_MATTER = 1000;

// Bonus multipliers per level
const HYPERSPACE_BONUS = 0.05; // 5% per level
const EXPLORER_BONUS = 0.02; // 2% per level
const ADMIRAL_BONUS = 0.03; // 3% per level
const PATHFINDER_BONUS = 0.01; // 1% per ship (capped)
const PATHFINDER_CAP = 200; // Max pathfinders considered

// Research bonuses
const SENSOR_TECH_BONUS = 0.02; // 2% per level
const SIXTH_SENSE_BONUS = 0.01; // 1% per level
const KAELESH_PIONEER_BONUS = 0.03; // 3% per level

// Race-specific building bonuses
const METROPOLIS_BONUS = 0.02; // Humans
const CLONING_LAB_BONUS = 0.03; // Kaelesh
const TRANSFORMER_BONUS = 0.015; // Mechas
const CHIP_PRODUCTION_BONUS = 0.015; // Mechas

export const useLootCalculator = (planets: Planet[]): LootResult => {
  return useMemo(() => {
    if (planets.length === 0) {
      return { metal: 0, crystal: 0, deuterium: 0, darkMatter: 0, total: 0 };
    }

    // Calculate the best planet's loot
    let bestLoot: LootResult = { metal: 0, crystal: 0, deuterium: 0, darkMatter: 0, total: 0 };

    for (const planet of planets) {
      const race = getRaceById(planet.race);
      
      // Calculate total bonus multiplier - base technologies
      const hyperspaceBonus = planet.hyperspaceTech * HYPERSPACE_BONUS;
      const explorerBonus = planet.explorerClass * EXPLORER_BONUS;
      const admiralBonus = planet.fleetAdmiralLevel * ADMIRAL_BONUS;
      const pathfinderBonus = Math.min(planet.pathfinders, PATHFINDER_CAP) * PATHFINDER_BONUS;
      
      // Research technologies
      const sensorBonus = planet.improvedSensorTech * SENSOR_TECH_BONUS;
      const sixthSenseBonus = planet.sixthSense * SIXTH_SENSE_BONUS;
      const kaeleshPioneerBonus = planet.kaeleshPioneerUpgrade * KAELESH_PIONEER_BONUS;
      
      // Race bonus (Kaelesh gets expedition bonus)
      const raceBonus = planet.race === 'kaelesh' ? 0.1 + (planet.explorerClass * 0.01) : 0;
      
      // Race-specific building bonuses
      let buildingBonus = 0;
      switch (planet.race) {
        case 'humans':
          buildingBonus = planet.metropolis * METROPOLIS_BONUS;
          break;
        case 'kaelesh':
          buildingBonus = planet.cloningLab * CLONING_LAB_BONUS;
          break;
        case 'mechas':
          buildingBonus = (planet.highPerformanceTransformer * TRANSFORMER_BONUS) +
                          (planet.massChipProduction * CHIP_PRODUCTION_BONUS);
          break;
      }
      
      // Total multiplier
      const totalMultiplier = 1 + hyperspaceBonus + explorerBonus + admiralBonus + pathfinderBonus +
                              sensorBonus + sixthSenseBonus + kaeleshPioneerBonus +
                              raceBonus + buildingBonus;
      
      const metal = Math.floor(BASE_METAL * totalMultiplier);
      const crystal = Math.floor(BASE_CRYSTAL * totalMultiplier);
      const deuterium = Math.floor(BASE_DEUTERIUM * totalMultiplier);
      const darkMatter = Math.floor(BASE_DARK_MATTER * (1 + raceBonus + explorerBonus + kaeleshPioneerBonus));
      
      const total = metal + crystal + deuterium;
      
      if (total > bestLoot.total) {
        bestLoot = { metal, crystal, deuterium, darkMatter, total };
      }
    }

    return bestLoot;
  }, [planets]);
};
