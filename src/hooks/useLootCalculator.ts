import { useMemo } from 'react';
import { Planet, LootResult, getRaceById } from '@/types/ogame';

// Research bonuses
const SENSOR_TECH_BONUS = 0.002; // 2% per level
const SIXTH_SENSE_BONUS = 0.002; // 1% per level
const KAELESH_PIONEER_BONUS = 0.002; // 0.2% per level (opraveno z 2% na 0.2%)

// Building bonuses (efficiency increase)
const METROPOLIS_EFFICIENCY = 0.005; // 0.5% per level
const TRANSFORMER_EFFICIENCY = 0.003; // 0.3% per level
const CHIP_PRODUCTION_EFFICIENCY = 0.004; // 0.4% per level
const CLONING_LAB_EFFICIENCY = 0.0025; // 0.25% per level
const RACE_LEVEL_EFFICIENCY = 0.001; // 0.1% per level

export const useLootCalculator = (planets: Planet[], universeSpeed: number): LootResult => {
  return useMemo(() => {
    if (planets.length === 0) {
      return { metal: 0, crystal: 0, deuterium: 0, darkMatter: 0, total: 0 };
    }

    // 1. Výpočet základního lootu pro rychlost vesmíru
    const rawBaseMetal = 5000000 * (1.5 * universeSpeed) * 2;

    let totalMetal = rawBaseMetal;
    let totalCrystal = 0;
    let totalDeuterium = 0;

    // 2. Výpočet lootu pro každou planetu
    let totalAdjustedPioneerBonus = 0;
    let totalAdjustedResearchBonus = 0;

    planets.forEach((planet) => {
      // Výpočet základních bonusů za technologie pro TUTO planetu
      const pioneerBonus = (planet.kaeleshPioneerUpgrade || 0) * KAELESH_PIONEER_BONUS;
      const researchBonus = ((planet.improvedSensorTech || 0) * SENSOR_TECH_BONUS) + ((planet.sixthSense || 0) * SIXTH_SENSE_BONUS);
      
      // Výpočet bonusu z budov pro efektivitu
      let buildingEfficiency = 1;
      if (planet.race === 'humans') {
        buildingEfficiency += (planet.metropolis || 0) * METROPOLIS_EFFICIENCY;
      } else if (planet.race === 'mechas') {
        buildingEfficiency *= (1 + (planet.highPerformanceTransformer || 0) * TRANSFORMER_EFFICIENCY);
        buildingEfficiency *= (1 + (planet.massChipProduction || 0) * CHIP_PRODUCTION_EFFICIENCY);
      } else if (planet.race === 'kaelesh') {
        buildingEfficiency += (planet.cloningLab || 0) * CLONING_LAB_EFFICIENCY;
      }
      
      // Výpočet bonusu z úrovně rasy (0.1% za úroveň)
      const raceLevelMultiplier = 1 + (planet.raceLevel * RACE_LEVEL_EFFICIENCY);

      // Finální procentuální bonusy pro tuto konkrétní planetu
      // Bonusy jsou navýšeny o efektivitu budov, úroveň rasy a základní bonus rasy
      const raceInfo = getRaceById(planet.race);
      const raceBonusMultiplier = 1 + (raceInfo.baseBonus || 0);
      
      const adjustedPioneerBonus = pioneerBonus * buildingEfficiency * raceLevelMultiplier * raceBonusMultiplier;
      const adjustedResearchBonus = researchBonus * buildingEfficiency * raceLevelMultiplier * raceBonusMultiplier;
      
      totalAdjustedPioneerBonus += adjustedPioneerBonus;
      totalAdjustedResearchBonus += adjustedResearchBonus;

      // 3. Výpočet bonusu planety
      // Postupná aplikace bonusů dle požadavku:
      // 1. Nejdřív spočítat navýšení z pioneer bonusu
      // 2. Z tohoto výsledku spočítat ostatní výzkumy
      const metalAfterPioneer = rawBaseMetal * (1 + adjustedPioneerBonus);
      const pioneerBonusAmount = metalAfterPioneer - rawBaseMetal;
      const researchBonusAmount = metalAfterPioneer * adjustedResearchBonus;
      
      // Přičítáme pouze BONUS k celkovému impériu
      const planetBonusMetal = pioneerBonusAmount + researchBonusAmount;

      console.log(`--- Planet: ${planet.name} (${planet.race}) ---`);
      console.log(`  Raw Base Metal: ${rawBaseMetal.toLocaleString()}`);
      console.log(`  Pioneer Bonus (Base): ${(pioneerBonus * 100).toFixed(6)}%`);
      console.log(`  Research Bonus (Base): ${(researchBonus * 100).toFixed(6)}%`);
      console.log(`  Building Efficiency: ${buildingEfficiency.toFixed(8)}x`);
      console.log(`  Race Level Multiplier: ${raceLevelMultiplier.toFixed(8)}x`);
      console.log(`  Race Bonus Multiplier: ${raceBonusMultiplier.toFixed(8)}x`);
      console.log(`  Adjusted Pioneer Bonus: ${(adjustedPioneerBonus * 100).toFixed(6)}%`);
      console.log(`  Adjusted Research Bonus: ${(adjustedResearchBonus * 100).toFixed(6)}%`);
      console.log(`  Pioneer Bonus Amount: ${pioneerBonusAmount.toLocaleString()}`);
      console.log(`  Research Bonus Amount: ${researchBonusAmount.toLocaleString()}`);
      console.log(`  Total Planet Bonus Metal: ${planetBonusMetal.toLocaleString()}`);

      totalMetal += planetBonusMetal;
    });

    console.log(`=== Empire Stats ===`);
    console.log(`  Total Pioneer % Bonus: ${(totalAdjustedPioneerBonus * 100).toFixed(6)}%`);
    console.log(`  Total Research % Bonus: ${(totalAdjustedResearchBonus * 100).toFixed(6)}%`);
    console.log(`  Final Empire Metal: ${totalMetal.toLocaleString()}`);

    totalCrystal = (totalMetal / 2);
    totalDeuterium = totalMetal / 3;

    const totalLoot: LootResult = { 
      metal: totalMetal, 
      crystal: totalCrystal, 
      deuterium: totalDeuterium, 
      darkMatter: 0, 
      total: totalMetal + totalCrystal + totalDeuterium 
    };

    return totalLoot;
  }, [planets, universeSpeed]);
};
