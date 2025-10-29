import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
    __gt_initialized?: boolean;
    __gt_script_loading?: boolean;
  }
}

const LanguageSwitcher = () => {
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
  }, []);

  const changeLang = (lang: string) => {
    // Retry logic to ensure Google Translate is fully loaded
    let attempts = 0;
    const maxAttempts = 30; // give more time for Google to inject the dropdown

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

        // Update active flag
        document.querySelectorAll('.flag').forEach((f) => f.classList.remove('active'));
        const flagElement = document.getElementById(`flag-${lang}`);
        if (flagElement) {
          flagElement.classList.add('active');
        }
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          // Retry after 300ms
          setTimeout(tryChangeLanguage, 300);
        } else {
          // As a fallback, set cookie and re-attempt initialization without full reload
          setTranslateCookie(lang);
          setTimeout(tryChangeLanguage, 500);
        }
      }
    };

    tryChangeLanguage();
  };

  // Apply saved language on mount without reloading
  useEffect(() => {
    try {
      const match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
      const cookieVal = match ? decodeURIComponent(match[1]) : '';
      const lang = cookieVal.split('/').pop();
      if (lang && lang !== 'en') {
        setTimeout(() => changeLang(lang), 300);
      }
    } catch {}
  }, []);

  return (
    <>
      <div className="flex items-center justify-end space-x-2 md:space-x-4 relative z-50">
        <img
          src="https://flagcdn.com/gb.svg"
          id="flag-en"
          className="flag active w-[22px] h-[16px] rounded-sm cursor-pointer opacity-60 transition-all duration-300 hover:opacity-100"
          title="English"
          onClick={() => changeLang('en')}
          alt="English"
        />
        <img
          src="https://flagcdn.com/ng.svg"
          id="flag-yo"
          className="flag w-[22px] h-[16px] rounded-sm cursor-pointer opacity-60 transition-all duration-300 hover:opacity-100"
          title="Yoruba"
          onClick={() => changeLang('yo')}
          alt="Yoruba"
        />
        {/* Keep Google Translate element mounted and layered above content */}
        <div id="google_translate_element" className="text-sm md:text-base relative z-50" />
      </div>

      <style>{`
        .flag.active {
          opacity: 1 !important;
          transform: scale(1.1);
          box-shadow: 0 0 4px rgba(4,176,168,0.4);
        }

        .goog-logo-link,
        .goog-te-banner-frame {
          display: none !important;
        }

        body { top: 0 !important; }

        /* Ensure dropdown and injected elements stay above overlays */
        #google_translate_element, .goog-te-gadget, .goog-te-combo {
          position: relative !important;
          z-index: 50 !important;
        }
      `}</style>
    </>
  );
};

export default LanguageSwitcher;
