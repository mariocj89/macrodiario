import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json'; // Crea archivos de traducción para diferentes idiomas
import esTranslation from './locales/es.json';


i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: 'en', // Idioma predeterminado
    fallbackLng: 'en', // Idioma de respaldo
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;