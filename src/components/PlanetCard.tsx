import { Planet, RACES, Race } from '@/types/ogame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Globe, Trash2, Copy, Building2, FlaskConical, Zap, Factory,
  Eye, Brain, Sparkles, Landmark
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRaceName, getRaceBonusType } from '@/lib/translations';

interface PlanetCardProps {
  planet: Planet;
  onUpdate: (planet: Planet) => void;
  onRemove: (id: string) => void;
  onClone: (planet: Planet) => void;
  canRemove: boolean;
}

export const PlanetCard = ({ planet, onUpdate, onRemove, onClone, canRemove }: PlanetCardProps) => {
  const { t, language } = useLanguage();
  
  const handleChange = (field: keyof Planet, value: string | number) => {
    onUpdate({ ...planet, [field]: value });
  };

  const handleNumberChange = (field: keyof Planet, value: string, min: number = 0, max: number = Infinity) => {
    const num = parseInt(value) || 0;
    handleChange(field, Math.min(max, Math.max(min, num)));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, field?: keyof Planet) => {
    const defaultValue = field === 'raceLevel' ? '1' : '0';
    if (e.target.value === defaultValue) {
      handleChange(field || 'name', '');
    } else {
      e.target.select();
    }
  };

  const renderRaceBuildings = () => {
    switch (planet.race) {
      case 'humans':
        return (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Landmark className="w-4 h-4 text-chart-1" />
              {t('metropolis')}
            </Label>
            <Input
              type="number"
              min={0}
              value={planet.metropolis}
              onChange={(e) => handleNumberChange('metropolis', e.target.value)}
              onFocus={(e) => handleFocus(e, 'metropolis')}
              className="bg-input border-border"
            />
          </div>
        );
      case 'kaelesh':
        return (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-chart-5" />
              {t('cloningLab')}
            </Label>
            <Input
              type="number"
              min={0}
              value={planet.cloningLab}
              onChange={(e) => handleNumberChange('cloningLab', e.target.value)}
              onFocus={(e) => handleFocus(e, 'cloningLab')}
              className="bg-input border-border"
            />
          </div>
        );
      case 'mechas':
        return (
          <>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                {t('highPerformanceTransformer')}
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.highPerformanceTransformer}
                onChange={(e) => handleNumberChange('highPerformanceTransformer', e.target.value)}
                onFocus={(e) => handleFocus(e, 'highPerformanceTransformer')}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <Factory className="w-4 h-4 text-secondary" />
                {t('massChipProduction')}
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.massChipProduction}
                onChange={(e) => handleNumberChange('massChipProduction', e.target.value)}
                onFocus={(e) => handleFocus(e, 'massChipProduction')}
                className="bg-input border-border"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="card-space relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="font-display text-xl tracking-wide">
              <Input
                value={planet.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onFocus={(e) => e.target.select()}
                className="bg-transparent border-none p-0 h-auto text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={t('planetNamePlaceholder')}
              />
            </CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {canRemove && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(planet.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onClone(planet)}
              className="text-primary hover:text-primary hover:bg-primary/10"
              title={t('clonePlanet')}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Race Selection */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">{t('race')}</Label>
          <Select value={planet.race} onValueChange={(value: Race) => handleChange('race', value)}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {RACES.map((race) => (
                <SelectItem key={race.id} value={race.id}>
                  <span className="flex items-center gap-2">
                    <span>{getRaceName(language, race.id)}</span>
                    <span className="text-xs text-muted-foreground">({getRaceBonusType(language, race.id)})</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Race Level */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">{t('raceLevel')} (1-100)</Label>
          <Input
            type="text"
            value={planet.raceLevel}
            onChange={(e) => handleNumberChange('raceLevel', e.target.value, 1, 100)}
            onFocus={(e) => handleFocus(e, 'raceLevel')}
            className="bg-input border-border"
          />
        </div>


        {/* Research Technologies */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            {t('researchTechnologies')}
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="w-3 h-3 text-chart-1" />
                {t('improvedSensorTech')}
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.improvedSensorTech}
                onChange={(e) => handleNumberChange('improvedSensorTech', e.target.value)}
                onFocus={(e) => handleFocus(e, 'improvedSensorTech')}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Brain className="w-3 h-3 text-chart-2" />
                {t('sixthSense')}
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.sixthSense}
                onChange={(e) => handleNumberChange('sixthSense', e.target.value)}
                onFocus={(e) => handleFocus(e, 'sixthSense')}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-chart-5" />
                {t('kaeleshPioneerUpgrade')}
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.kaeleshPioneerUpgrade}
                onChange={(e) => handleNumberChange('kaeleshPioneerUpgrade', e.target.value)}
                onFocus={(e) => handleFocus(e, 'kaeleshPioneerUpgrade')}
                className="bg-input border-border"
              />
            </div>
          </div>
        </div>

        {/* Race-specific Buildings */}
        {planet.race !== 'rocktal' && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {t('buildings')} ({getRaceName(language, planet.race)})
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {renderRaceBuildings()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
