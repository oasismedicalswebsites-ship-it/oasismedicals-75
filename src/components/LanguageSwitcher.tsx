import { useEffect, useState } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    __gt_initialized?: boolean;
    __gt_script_loading?: boolean;
  }
}

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');

  // Initialize Google Translate once and persist across navigation
  useEffect(() => {
    const init = () => {
      if (window.__gt_initialized) return;
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,yo',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
      window.__gt_initialized = true;
    };

    // Expose callback (idempotent)
    window.googleTranslateElementInit = init;

    // Load script only once
    const hasScript = !!document.querySelector('script[src*="translate_a/element.js"]');
    if (!hasScript && !window.__gt_script_loading) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      window.__gt_script_loading = true;
      document.body.appendChild(script);
    } else {
      init();
    }

    // Load saved language from localStorage
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLang(savedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    // Save to localStorage
    localStorage.setItem('preferredLanguage', lang);
    setCurrentLang(lang);

    // Retry logic to ensure Google Translate is fully loaded
    let attempts = 0;
    const maxAttempts = 30;

    const setTranslateCookie = (targetLang: string) => {
      try {
        const value = `/en/${targetLang}`;
        const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `googtrans=${value}; expires=${expires}; path=/`;
        document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=${window.location.hostname}`;
      } catch (e) {
        // no-op
      }
    };

    const tryChangeLanguage = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
        setTranslateCookie(lang);
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryChangeLanguage, 300);
        } else {
          setTranslateCookie(lang);
          setTimeout(tryChangeLanguage, 500);
        }
      }
    };

    tryChangeLanguage();
  };

  // Apply saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'en') {
      setTimeout(() => changeLanguage(savedLang), 300);
    }
  }, []);

  return (
    <>
      <div className="relative z-50 flex items-center space-x-2 text-sm md:text-base">
        <button
          onClick={() => changeLanguage('en')}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-300 hover:bg-primary/10 ${
            currentLang === 'en' ? 'bg-primary/20 font-semibold' : 'opacity-60'
          }`}
          title="English"
        >
          <span role="img" aria-label="english">🇬🇧</span>
          <span>EN</span>
        </button>
        <button
          onClick={() => changeLanguage('yo')}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-300 hover:bg-primary/10 ${
            currentLang === 'yo' ? 'bg-primary/20 font-semibold' : 'opacity-60'
          }`}
          title="Yoruba"
        >
          <span role="img" aria-label="yoruba">🇳🇬</span>
          <span>YO</span>
        </button>
      </div>

      {/* Hide Google Translate element completely */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }} />

      <style>{`
        .goog-logo-link,
        .goog-te-banner-frame,
        .goog-te-gadget {
          display: none !important;
        }

        body { top: 0 !important; }

        /* Hide all Google Translate UI elements */
        #google_translate_element,
        .goog-te-combo,
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
          visibility: hidden !important;
        }
      `}</style>
    </>
  );
};

export default LanguageSwitcher;
