import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLanguage from "./locales/en.json";
import ukLanguage from "./locales/uk.json";
const resources = {
  en: {
    translation: enLanguage,
  },
  uk: {
    translation: ukLanguage,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
    pluralSeparator: "_",
  },
});

export default i18n;
