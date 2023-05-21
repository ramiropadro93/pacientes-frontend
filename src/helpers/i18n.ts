import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "SalaComun": "Common Room",
        }
    },
    es: {
        translation: {
            "SalaComun": "Sala Común",
        }
    }
};

i18n
    .use(initReactI18next) 
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;