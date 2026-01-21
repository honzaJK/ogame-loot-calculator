import { Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="relative z-10 py-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Rocket className="w-10 h-10 text-primary" />
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider glow-text text-primary">
          {t('headerTitle')}
        </h1>
        <Rocket className="w-10 h-10 text-primary transform scale-x-[-1]" />
      </div>
      <p className="text-muted-foreground text-lg">
        {t('headerSubtitle')}
      </p>
    </header>
  );
};
