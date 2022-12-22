import i18next from "i18next";
import en from "../locales/en/translations.json";

i18next.init({
  fallbackLng: "en",
  resources: {
    en: {
      translations: en,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
  returnObjects: true,
  debug: false,
  lng: "en",
  react: {
    useSuspense: false,
  },
  returnEmptyString: false,
});

i18next.languages = ["en"];

export default i18next;
