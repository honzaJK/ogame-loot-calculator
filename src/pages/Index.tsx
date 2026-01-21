import { useState } from 'react';
import { Planet, createDefaultPlanet, clonePlanet } from '@/types/ogame';
import { StarField } from '@/components/StarField';
import { Header } from '@/components/Header';
import { PlanetCard } from '@/components/PlanetCard';
import { LootDisplay } from '@/components/LootDisplay';
import { useLootCalculator } from '@/hooks/useLootCalculator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PlusCircle, Gauge, Languages } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Language, translations } from '@/lib/translations';

const IndexContent = () => {
  const { t, language, setLanguage } = useLanguage();
  const [planets, setPlanets] = useState<Planet[]>([createDefaultPlanet(1)]);
  const [planetCounter, setPlanetCounter] = useState(2);
  const [universeSpeed, setUniverseSpeed] = useState<number>(1);
  const loot = useLootCalculator(planets, universeSpeed);
  
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

        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Label htmlFor="universe-speed" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Gauge className="w-4 h-4 text-primary" />
                {t('universeSpeed')}
              </Label>
              <Select 
                value={universeSpeed.toString()} 
                onValueChange={(value) => setUniverseSpeed(Number(value))}
              >
                <SelectTrigger id="universe-speed" className="w-32 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="4">4x</SelectItem>
                  <SelectItem value="8">8x</SelectItem>
                  <SelectItem value="10">10x</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="language" className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" />
                {t('language')}
              </Label>
              <Select 
                value={language} 
                onValueChange={(value) => setLanguage(value as Language)}
              >
                <SelectTrigger id="language" className="w-40 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="cs">{t('czech')}</SelectItem>
                  <SelectItem value="de">{t('german')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground">
            {t('yourPlanets')} ({planets.length})
          </h2>
          <Button 
            onClick={addPlanet}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {t('addPlanet')}
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
            {t('footerText')}
          </p>
        </footer>
      </div>
    </div>
  );
};

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
