import { useState } from 'react';
import { Planet, createDefaultPlanet, clonePlanet } from '@/types/ogame';
import { StarField } from '@/components/StarField';
import { Header } from '@/components/Header';
import { PlanetCard } from '@/components/PlanetCard';
import { LootDisplay } from '@/components/LootDisplay';
import { useLootCalculator } from '@/hooks/useLootCalculator';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  const [planets, setPlanets] = useState<Planet[]>([createDefaultPlanet(1)]);
  const [planetCounter, setPlanetCounter] = useState(2);
  const loot = useLootCalculator(planets);

  const addPlanet = () => {
    setPlanets([...planets, createDefaultPlanet(planetCounter)]);
    setPlanetCounter(prev => prev + 1);
  };

  const updatePlanet = (updatedPlanet: Planet) => {
    setPlanets(planets.map(p => p.id === updatedPlanet.id ? updatedPlanet : p));
  };

  const removePlanet = (id: string) => {
    setPlanets(planets.filter(p => p.id !== id));
  };

  const handleClonePlanet = (planet: Planet) => {
    const cloned = clonePlanet(planet, planetCounter);
    setPlanets([...planets, cloned]);
    setPlanetCounter(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        <Header />

        <div className="mt-8 mb-6">
          <LootDisplay loot={loot} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground">
            Vaše planety ({planets.length})
          </h2>
          <Button 
            onClick={addPlanet}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Přidat planetu
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {planets.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onUpdate={updatePlanet}
              onRemove={removePlanet}
              onClone={handleClonePlanet}
              canRemove={planets.length > 1}
            />
          ))}
        </div>

        <footer className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            OGame Expedition Calculator • Vytvořeno pro hráče OGame
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
