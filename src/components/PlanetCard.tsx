import { Planet, RACES, Race } from '@/types/ogame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, Trash2, Rocket, Gauge, Shield, Ship } from 'lucide-react';

interface PlanetCardProps {
  planet: Planet;
  onUpdate: (planet: Planet) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const PlanetCard = ({ planet, onUpdate, onRemove, canRemove }: PlanetCardProps) => {
  const handleChange = (field: keyof Planet, value: string | number) => {
    onUpdate({ ...planet, [field]: value });
  };

  const handleNumberChange = (field: keyof Planet, value: string) => {
    const num = parseInt(value) || 0;
    handleChange(field, Math.max(0, num));
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
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Rasa</Label>
          <Select value={planet.race} onValueChange={(value: Race) => handleChange('race', value)}>
            <SelectTrigger className="bg-input border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Rocket className="w-4 h-4 text-primary" />
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
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Gauge className="w-4 h-4 text-secondary" />
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
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
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
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Ship className="w-4 h-4 resource-crystal" />
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
      </CardContent>
    </Card>
  );
};
