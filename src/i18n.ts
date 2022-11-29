import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: !IS_PRODUCTION,
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  }, err => {
    // eslint-disable-next-line no-console
    if (!IS_PRODUCTION && err) console.error(err);
  });

export default i18n;
