import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSwitcher = () => {
  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,yo',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const changeLang = (lang: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      
      // Update active flag
      document.querySelectorAll('.flag').forEach(f => f.classList.remove('active'));
      const flagElement = document.getElementById(`flag-${lang}`);
      if (flagElement) {
        flagElement.classList.add('active');
      }
    } else {
      console.error('Google Translate dropdown not found. Please wait for it to load.');
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 ml-4">
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
        <div id="google_translate_element" style={{ display: 'none' }}></div>
      </div>
      
      <style>{`
        .flag.active {
          opacity: 1 !important;
          transform: scale(1.1);
          box-shadow: 0 0 4px rgba(4,176,168,0.4);
        }
        
        .goog-logo-link, 
        .goog-te-gadget,
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }
        
        #google_translate_element {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default LanguageSwitcher;
