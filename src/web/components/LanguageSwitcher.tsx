import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'ru' : 'de');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 bg-sky-50 hover:bg-sky-100 rounded-full text-gray-700 transition-all border border-sky-200"
      title={language === 'de' ? 'Переключить на русский' : 'Auf Deutsch umschalten'}
    >
      <svg 
        viewBox="0 0 24 24" 
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Globe with speech bubble icon */}
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    </button>
  );
}
