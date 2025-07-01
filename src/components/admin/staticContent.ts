import {
    AboutContent,
    ContactContent,
    GalleryItem,
    SEOContent,
} from "./admin.types";

export const aboutContentInitial: AboutContent = {
    title: "Über Uns",
    description:
        "Wir sind auf Premium-Lasergravuren spezialisiert und verwandeln gewöhnliche Produkte in außergewöhnliche Markenerlebnisse, die Ihr Publikum begeistern.",
    features: [
        {
            title: "Schnelle Skalierbarkeit",
            description:
                "Von Prototypen bis zur Massenproduktion – wir skalieren nach Ihren Anforderungen ohne Qualitätsverlust.",
        },
        {
            title: "Individuelle Lösungen",
            description:
                "Maßgeschneiderte Gravurlösungen für Ihre spezifischen Markenanforderungen und Produktspezifikationen.",
        },
        {
            title: "Emotionales Branding",
            description:
                "Wir schaffen bleibende Eindrücke, indem wir Ihre Marke auf emotionaler Ebene mit Ihren Kunden verbinden.",
        },
    ],
};
export const contactContentInitial: ContactContent = {
    title: "Kontakt Aufnehmen",
    description:
        "Bereit, Ihre Marke mit Premium-Lasergravuren auf ein neues Level zu bringen? Kontaktieren Sie uns für eine Beratung!",
    email: "lumixpert.de@gmail.com",
    phone: "+49 178 1638184",
    address: ["Schwalbenweg 19", "34212 Melsungen"],
    openingHours: {
        "Montag – Freitag": "9:00 – 18:00",
        Samstag: "10:00 – 16:00",
        Sonntag: "geschlossen",
    },
};
export const seoContentInitial: SEOContent = {
    title: "LumiXpert - Premium Lasergravur für außergewöhnliche Markenerlebnisse",
    description:
        "Präzise Lasergravuren auf Metall, Holz, Leder und Acryl. Wir verewigen die Energie Ihrer Marke mit hochwertigen Gravurlösungen für Unternehmen und Privatkunden.",
    keywords:
        "Lasergravur, Gravur, Metall, Holz, Leder, Acryl, Glas, Markierung, Personalisierung, Deutschland",
    ogImage: "/logo.png",
    canonicalUrl: "https://lumixpert.de",
    structuredData: {
        businessName: "LumiXpert",
        businessType: "LocalBusiness",
        telephone: "+49 178 1638184",
        email: "lumixpert.de@gmail.com",
        address: {
            street: "Schwalbenweg 19",
            city: "Melsungen",
            postalCode: "34212",
            country: "DE",
        },
        openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
    },
};
export const defaultItems: GalleryItem[] = [
    {
        id: 1,
        name: "Metall",
        image: "/metall.webp",
        description:
            "Hochwertige Gravuren auf Edelstahl, Aluminium und weiteren Metallen.",
        products: [],
    },
    {
        id: 2,
        name: "Holz",
        image: "/holz.jpg",
        description:
            "Präzise Gravuren auf nachhaltigem Holz für besondere Produkte.",
        products: [],
    },
    {
        id: 3,
        name: "Leder",
        image: "/leder.webp",
        description: "Stilvolle Gravuren auf Leder für exklusive Accessoires.",
        products: [],
    },
    {
        id: 4,
        name: "Acryl / Glas",
        image: "/glas.webp",
        description: "Klare Gravuren für moderne und elegante Designs.",
        products: [],
    },
];
