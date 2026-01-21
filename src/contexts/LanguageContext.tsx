import { createContext, useContext, ReactNode } from 'react';
import { Language, Translations, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageProvider = ({ children, language, setLanguage }: LanguageProviderProps) => {
  const t = (key: keyof Translations): string => {
    return translations[language]?.[key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
