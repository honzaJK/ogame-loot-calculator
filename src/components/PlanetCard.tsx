import { Planet, RACES, Race } from '@/types/ogame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Globe, Trash2, Rocket, Gauge, Shield, Ship, 
  Copy, Building2, FlaskConical, Cpu, Zap, Factory,
  Eye, Brain, Sparkles
} from 'lucide-react';

interface PlanetCardProps {
  planet: Planet;
  onUpdate: (planet: Planet) => void;
  onRemove: (id: string) => void;
  onClone: (planet: Planet) => void;
  canRemove: boolean;
}

export const PlanetCard = ({ planet, onUpdate, onRemove, onClone, canRemove }: PlanetCardProps) => {
  const handleChange = (field: keyof Planet, value: string | number) => {
    onUpdate({ ...planet, [field]: value });
  };

  const handleNumberChange = (field: keyof Planet, value: string) => {
    const num = parseInt(value) || 0;
    handleChange(field, Math.max(0, num));
  };

  const renderRaceBuildings = () => {
    switch (planet.race) {
      case 'humans':
        return (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4 text-chart-1" />
              Metropolis
            </Label>
            <Input
              type="number"
              min={0}
              value={planet.metropolis}
              onChange={(e) => handleNumberChange('metropolis', e.target.value)}
              className="bg-input border-border"
            />
          </div>
        );
      case 'kaelesh':
        return (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-chart-5" />
              Klonovací laboratoř
            </Label>
            <Input
              type="number"
              min={0}
              value={planet.cloningLab}
              onChange={(e) => handleNumberChange('cloningLab', e.target.value)}
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
                Vysoce výkonný transformátor
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.highPerformanceTransformer}
                onChange={(e) => handleNumberChange('highPerformanceTransformer', e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground flex items-center gap-2">
                <Factory className="w-4 h-4 text-secondary" />
                Hromadná produkce čipů
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.massChipProduction}
                onChange={(e) => handleNumberChange('massChipProduction', e.target.value)}
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
                className="bg-transparent border-none p-0 h-auto text-xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Název planety"
              />
            </CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onClone(planet)}
              className="text-primary hover:text-primary hover:bg-primary/10"
              title="Klonovat planetu"
            >
              <Copy className="w-4 h-4" />
            </Button>
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
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Race Selection */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Rasa</Label>
          <Select value={planet.race} onValueChange={(value: Race) => handleChange('race', value)}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {RACES.map((race) => (
                <SelectItem key={race.id} value={race.id}>
                  <span className="flex items-center gap-2">
                    <span>{race.name}</span>
                    <span className="text-xs text-muted-foreground">({race.bonusType})</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Base Technologies */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Základní technologie
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Rocket className="w-3 h-3 text-primary" />
                Hyperspace Tech
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.hyperspaceTech}
                onChange={(e) => handleNumberChange('hyperspaceTech', e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Gauge className="w-3 h-3 text-secondary" />
                Explorer Class
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.explorerClass}
                onChange={(e) => handleNumberChange('explorerClass', e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Shield className="w-3 h-3 text-accent" />
                Fleet Admiral
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.fleetAdmiralLevel}
                onChange={(e) => handleNumberChange('fleetAdmiralLevel', e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Ship className="w-3 h-3 resource-crystal" />
                Pathfinders
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.pathfinders}
                onChange={(e) => handleNumberChange('pathfinders', e.target.value)}
                className="bg-input border-border"
              />
            </div>
          </div>
        </div>

        {/* Research Technologies */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            Výzkumné technologie
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="w-3 h-3 text-chart-1" />
                Vylepšená senzorová technologie
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.improvedSensorTech}
                onChange={(e) => handleNumberChange('improvedSensorTech', e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Brain className="w-3 h-3 text-chart-2" />
                Šestý smysl
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.sixthSense}
                onChange={(e) => handleNumberChange('sixthSense', e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-chart-5" />
                Kaeleshské vylepšení průkopníka
              </Label>
              <Input
                type="number"
                min={0}
                value={planet.kaeleshPioneerUpgrade}
                onChange={(e) => handleNumberChange('kaeleshPioneerUpgrade', e.target.value)}
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
              Budovy ({RACES.find(r => r.id === planet.race)?.name})
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
