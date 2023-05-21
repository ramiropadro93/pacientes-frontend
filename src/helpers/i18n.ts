import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "SalaComun": "Common Room",
            "TerapiaIntensiva": "Intensive Care",
            "DadoAlta": "Discharged",
        }
    },
    es: {
        translation: {
            "SalaComun": "Sala común",
            "TerapiaIntensiva": "Terapia intensiva",
            "DadoAlta": "Dado de alta",
        }
    }
};
i18n.use(initReactI18next)
    .init({
        resources,
        lng: "es",
        interpolation: {
            escapeValue: false 
        }
    });

export default i18n;