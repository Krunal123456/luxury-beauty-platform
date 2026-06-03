"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "hi" | "mr";

type Translations = {
  [key in Language]: {
    heroTagline: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroDescription: string;
    heroBtnPrimary: string;
    heroBtnSecondary: string;
  };
};

const translations: Translations = {
  en: {
    heroTagline: "Luxury Bridal & Celebrity Artistry",
    heroTitlePrefix: "The Art of",
    heroTitleHighlight: "Perfection",
    heroDescription: "Experience Wardha's most exclusive makeup studio. Specializing in flawless HD and Airbrush bridal transformations that last 24 hours.",
    heroBtnPrimary: "Book Consultation",
    heroBtnSecondary: "View Portfolio",
  },
  hi: {
    heroTagline: "लग्जरी ब्राइडल और सेलिब्रिटी आर्टिस्ट्री",
    heroTitlePrefix: "कला की",
    heroTitleHighlight: "पूर्णता",
    heroDescription: "वर्धा के सबसे एक्सक्लूसिव मेकअप स्टूडियो का अनुभव लें। फ्लॉलेस एचडी और एयरब्रश ब्राइडल ट्रांसफॉर्मेशन में विशेषज्ञता जो 24 घंटे चलती है।",
    heroBtnPrimary: "परामर्श बुक करें",
    heroBtnSecondary: "पोर्टफोलियो देखें",
  },
  mr: {
    heroTagline: "लक्झरी ब्रायडल आणि सेलिब्रिटी आर्टिस्ट्री",
    heroTitlePrefix: "कलेची",
    heroTitleHighlight: "परिपूर्णता",
    heroDescription: "वर्ध्यातील सर्वात एक्सक्लुझिव्ह मेकअप स्टुडिओचा अनुभव घ्या. फ्लॉलेस एचडी आणि एअरब्रश ब्रायडल ट्रान्सफॉर्मेशनमध्ये तज्ञ, जे २४ तास टिकते.",
    heroBtnPrimary: "कन्सल्टेशन बुक करा",
    heroBtnSecondary: "पोर्टफोलिओ पहा",
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations["en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
