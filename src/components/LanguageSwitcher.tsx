import { useEffect, useState } from 'react';

// Robust, single-load Google Translate + custom UI
// - Hides all Google UI
// - Programmatically switches language without page reload
// - Persists selection in localStorage
// - Responsive and z-index safe

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    __gt_initialized?: boolean;
    __gt_loading_promise?: Promise<void> | null;
  }
}

let translateInitPromise: Promise<void> | null = null;

function ensureGoogleTranslateLoaded(): Promise<void> {
  if (translateInitPromise) return translateInitPromise;

  translateInitPromise = new Promise<void>((resolve) => {
    const init = () => {
      try {
        if (window.__gt_initialized) return resolve();
        if (!window.google?.translate?.TranslateElement) return; // wait for script

        // Mount the element (kept off-screen via CSS below)
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
        resolve();
      } catch {
        // Fail silently but do not resolve yet
      }
    };

    // Expose callback for Google script
    window.googleTranslateElementInit = init;

    // If script already present, attempt init repeatedly until ready
    const existing = document.querySelector(
      'script[src*="translate_a/element.js"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      // Try repeatedly until google is ready
      const poll = () => {
        if (window.google?.translate?.TranslateElement) {
          init();
        } else {
          setTimeout(poll, 200);
        }
      };
      poll();
      return;
    }

    // Inject script once
    const script = document.createElement('script');
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Fallback polling just in case cb doesn't fire
    const poll = () => {
      if (window.google?.translate?.TranslateElement) {
        init();
      } else {
        setTimeout(poll, 200);
      }
    };
    poll();
  });

  return translateInitPromise;
}

function setTranslateCookie(lang: string) {
  try {
    const value = `/en/${lang}`;
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    // Path cookie generally suffices; some domains reject explicit domain attr
    document.cookie = `googtrans=${value}; expires=${expires}; path=/`;
  } catch {
    // no-op
  }
}

async function applyLanguage(lang: string) {
  setTranslateCookie(lang);

  // Ensure translate element exists
  await ensureGoogleTranslateLoaded();

  // Retry selecting the hidden dropdown
  let attempts = 0;
  const maxAttempts = 40;

  return new Promise<void>((resolve) => {
    const trySelect = () => {
      const select = document.querySelector('.goog-te-combo') as
        | HTMLSelectElement
        | null;

      if (select) {
        if (select.value !== lang) {
          select.value = lang;
        }
        // Dispatch both native and React-friendly events
        select.dispatchEvent(new Event('change'));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        resolve();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(trySelect, 200);
      } else {
        // As last resort, setting cookie still helps future renders
        resolve();
      }
    };
    trySelect();
  });
}

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');

  useEffect(() => {
    // Prepare translate silently
    ensureGoogleTranslateLoaded();

    const saved = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLang(saved);

    if (saved !== 'en') {
      // Apply saved language after init
      const doApply = async () => {
        await applyLanguage(saved);
      };
      // slight delay to ensure initial DOM is ready
      const t = setTimeout(doApply, 300);
      return () => clearTimeout(t);
    }
  }, []);

  const changeLanguage = async (lang: 'en' | 'yo') => {
    if (lang === currentLang) return;
    localStorage.setItem('preferredLanguage', lang);
    setCurrentLang(lang);
    await applyLanguage(lang);
  };

  return (
    <>
      <div className="relative z-50 flex items-center justify-end space-x-2 md:space-x-4">
        <button
          onClick={() => changeLanguage('en')}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-300 hover:bg-primary/10 ${
            currentLang === 'en' ? 'bg-primary/20 font-semibold' : 'opacity-70'
          }`}
          title="English"
        >
          <span role="img" aria-label="english">🇬🇧</span>
          <span>EN</span>
        </button>
        <button
          onClick={() => changeLanguage('yo')}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-300 hover:bg-primary/10 ${
            currentLang === 'yo' ? 'bg-primary/20 font-semibold' : 'opacity-70'
          }`}
          title="Yoruba"
        >
          <span role="img" aria-label="yoruba">🇳🇬</span>
          <span>YO</span>
        </button>
      </div>

      {/* Hidden container for Google Translate element (kept off-screen, not removed) */}
      <div id="google_translate_element" className="text-sm md:text-base relative z-50" />

      {/* Hard-hide Google UI to avoid toolbar/branding while keeping functionality */}
      <style>{`
        .goog-logo-link, .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        /* Keep the gadget and select in DOM but fully off-screen to allow programmatic control */
        #google_translate_element, .goog-te-gadget, .goog-te-combo, .skiptranslate {
          position: absolute !important;
          left: -9999px !important; top: -9999px !important;
          height: 0 !important; width: 0 !important; overflow: hidden !important;
          visibility: hidden !important;
        }
      `}</style>
    </>
  );
};

export default LanguageSwitcher;

