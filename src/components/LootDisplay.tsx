import { LootResult } from '@/types/ogame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Droplets, Hexagon, Sparkles, Trophy } from 'lucide-react';

interface LootDisplayProps {
  loot: LootResult;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toLocaleString('cs-CZ');
};

export const LootDisplay = ({ loot }: LootDisplayProps) => {
  return (
    <Card className="card-space border-primary/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <CardHeader className="relative text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-8 h-8 text-accent" />
          <CardTitle className="font-display text-2xl tracking-wider text-primary glow-text">
            Maximální Loot
          </CardTitle>
          <Trophy className="w-8 h-8 text-accent" />
        </div>
        <p className="text-muted-foreground text-sm">Za jednu expedici</p>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Hexagon className="w-5 h-5 resource-metal" />
              <span className="text-sm font-medium text-muted-foreground">Metal</span>
            </div>
            <p className="font-mono text-xl font-bold resource-metal">
              {formatNumber(loot.metal)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Gem className="w-5 h-5 resource-crystal" />
              <span className="text-sm font-medium text-muted-foreground">Crystal</span>
            </div>
            <p className="font-mono text-xl font-bold resource-crystal">
              {formatNumber(loot.crystal)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Droplets className="w-5 h-5 resource-deuterium" />
              <span className="text-sm font-medium text-muted-foreground">Deuterium</span>
            </div>
            <p className="font-mono text-xl font-bold resource-deuterium">
              {formatNumber(loot.deuterium)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Dark Matter</span>
            </div>
            <p className="font-mono text-xl font-bold text-secondary">
              {formatNumber(loot.darkMatter)}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-primary/30 text-center">
          <p className="text-sm text-muted-foreground mb-1">Celková hodnota surovin</p>
          <p className="font-display text-3xl font-bold text-primary glow-text">
            {formatNumber(loot.total)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
