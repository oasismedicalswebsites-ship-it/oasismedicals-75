import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lang: 'en' | 'yo') => {
    if (lang === currentLang) return;
    localStorage.setItem('preferredLanguage', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative z-50 flex items-center gap-1">
      <button
        onClick={() => changeLanguage('en')}
        className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-md transition-all duration-200 ${
          currentLang === 'en' 
            ? 'bg-primary text-primary-foreground font-semibold shadow-sm' 
            : 'bg-background/80 text-foreground hover:bg-primary/20 border border-border/50'
        }`}
        title="English"
      >
        <span role="img" aria-label="english" className="text-sm">🇬🇧</span>
        <span className="font-medium">EN</span>
      </button>
      <button
        onClick={() => changeLanguage('yo')}
        className={`flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-md transition-all duration-200 ${
          currentLang === 'yo' 
            ? 'bg-primary text-primary-foreground font-semibold shadow-sm' 
            : 'bg-background/80 text-foreground hover:bg-primary/20 border border-border/50'
        }`}
        title="Yoruba"
      >
        <span role="img" aria-label="yoruba" className="text-sm">🇳🇬</span>
        <span className="font-medium">YO</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
