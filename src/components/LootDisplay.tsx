import { LootResult } from '@/types/ogame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Droplets, Hexagon, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LootDisplayProps {
  loot: LootResult;
}

const getLocale = (language: string): string => {
  switch (language) {
    case 'cs': return 'cs-CZ';
    case 'de': return 'de-DE';
    case 'en': return 'en-US';
    default: return 'en-US';
  }
};

const formatNumber = (num: number, locale: string): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toLocaleString(locale);
};

export const LootDisplay = ({ loot }: LootDisplayProps) => {
  const { t, language } = useLanguage();
  const locale = getLocale(language);
  
  return (
    <Card className="card-space border-primary/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <CardHeader className="relative text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-8 h-8 text-accent" />
          <CardTitle className="font-display text-2xl tracking-wider text-primary glow-text">
            {t('maxLoot')}
          </CardTitle>
          <Trophy className="w-8 h-8 text-accent" />
        </div>
        <p className="text-muted-foreground text-sm">{t('perExpedition')}</p>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Hexagon className="w-5 h-5 resource-metal" />
              <span className="text-sm font-medium text-muted-foreground">{t('metal')}</span>
            </div>
            <p className="font-mono text-xl font-bold resource-metal">
              {formatNumber(loot.metal, locale)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Gem className="w-5 h-5 resource-crystal" />
              <span className="text-sm font-medium text-muted-foreground">{t('crystal')}</span>
            </div>
            <p className="font-mono text-xl font-bold resource-crystal">
              {formatNumber(loot.crystal, locale)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Droplets className="w-5 h-5 resource-deuterium" />
              <span className="text-sm font-medium text-muted-foreground">{t('deuterium')}</span>
            </div>
            <p className="font-mono text-xl font-bold resource-deuterium">
              {formatNumber(loot.deuterium, locale)}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
