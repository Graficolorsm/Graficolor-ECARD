import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ContactRound,
  Gift,
  Instagram,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Paintbrush,
  Phone,
  Printer,
  Scissors,
  Send,
  Share2,
  Sparkles,
  Store,
  Wrench,
  Zap,
} from "lucide-react";

// ───── Types ─────

export type ECardService = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  href?: string;
};

export type ECardConfig = {
  businessName: string;
  legalName: string;
  activity: string;
  tagline: string;
  description: string;
  // Ubicación
  address: string;
  locationLabel: string;
  mapUrl: string;
  // Teléfono
  phone: string;
  phoneHref: string;
  whatsapp: string;
  // Emails
  email: string;
  emails: string[];
  // Links
  website: string;
  websiteLabel: string;
  instagram: string;
  googleReviews: string;
  portfolioUrl: string;
  // UI Texts
  editionLabel: string;
  heroCTALabel: string;
  heroWhatsappMessage: string;
  quoteMessage: string;
  vcfFilename: string;
  sectionTitles: {
    actions: string;
    services: string;
    contact: string;
  };
  portfolioBand: {
    eyebrow: string;
    headline: string;
    ctaLabel: string;
  };
  // Servicios
  services: ECardService[];
  // Assets
  assets: {
    logoDark: string;
    logoLight: string;
    favicon: string;
    portfolio: string;
  };
};

// ───── Configuración ─────

const BASE = import.meta.env.BASE_URL;
const whatsappNumber = "573008374808";

export const ecardConfig: ECardConfig = {
  businessName: "Graficolor",
  legalName: "Graficolor SM",
  activity: "Litografía y Diseño",
  tagline: "Imprimimos tus ideas.",
  description: "Diseño, impresión y soluciones que hacen visible tu marca.",

  // Ubicación
  address: "Cl. 31 #4-43, Comuna 1, Santa Marta, Magdalena, Colombia",
  locationLabel: "Santa Marta, Magdalena · Colombia",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Cl.+31+%234-43,+Comuna+1,+Santa+Marta,+Magdalena,+Colombia",

  // Teléfono
  phone: "+57 300 837 4808",
  phoneHref: "+573008374808",
  whatsapp: whatsappNumber,

  // Emails
  email: "comercial@graficolorsm.com",
  emails: [
    "comercial@graficolorsm.com",
    "info@graficolorsm.com",
    "diseno1@graficolorsm.com",
    "gerencia@graficolorsm.com",
  ],

  // Links
  website: "https://www.graficolorsm.com",
  websiteLabel: "graficolorsm.com",
  instagram: "https://www.instagram.com/graficolorsm",
  googleReviews: "https://g.page/r/Cfvm4eezzOmtEAI/review",
  portfolioUrl: `${BASE}portfolio.pdf`,

  // UI Texts
  editionLabel: "E-CARD / SM · 2026",
  heroCTALabel: "Escríbenos por WhatsApp",
  heroWhatsappMessage:
    "Hola, vengo de su E-Card y quisiera cotizar un trabajo.",
  quoteMessage: "Hola, vi su E-Card y quiero solicitar una cotización.",
  vcfFilename: "Graficolor.vcf",
  sectionTitles: {
    actions: "Conecta con nosotros",
    services: "Nuestros servicios",
    contact: "Contacto",
  },
  portfolioBand: {
    eyebrow: "Trabajo que habla por tu marca",
    headline: "Ideas que pasan\ndel concepto al papel.",
    ctaLabel: "Ver portafolio",
  },

  // 8 servicios oficiales
  services: [
    {
      id: "litografia-offset",
      name: "Litografía Offset",
      description:
        "Impresión offset de alta calidad para tirajes medianos y grandes con color preciso y consistente.",
      icon: Printer,
    },
    {
      id: "impresion-digital",
      name: "Impresión Digital",
      description:
        "Producción ágil para tirajes cortos con resultados profesionales y entrega rápida.",
      icon: Zap,
    },
    {
      id: "gran-formato",
      name: "Gran Formato",
      description:
        "Vallas, pendones, avisos y piezas de gran tamaño para máximo impacto visual.",
      icon: Layers,
    },
    {
      id: "corte-cnc",
      name: "Corte CNC",
      description:
        "Corte de precisión computarizado en acrílico, MDF, PVC y otros materiales rígidos.",
      icon: Boxes,
    },
    {
      id: "corte-laser",
      name: "Corte Láser",
      description:
        "Corte y grabado láser con acabados finos para piezas decorativas y señalética.",
      icon: Scissors,
    },
    {
      id: "diseno-grafico",
      name: "Diseño Gráfico",
      description:
        "Identidad visual, branding y piezas gráficas listas para comunicar tu marca.",
      icon: Paintbrush,
    },
    {
      id: "acabados",
      name: "Acabados",
      description:
        "Laminados, barnices, troquelados, repujados y acabados especiales que elevan cada pieza.",
      icon: Sparkles,
    },
    {
      id: "instalacion-publicitaria",
      name: "Instalación Publicitaria",
      description:
        "Montaje e instalación profesional de señalética, avisos y material publicitario.",
      icon: Wrench,
    },
  ],

  // Assets (rutas relativas al base)
  assets: {
    logoDark: `${BASE}logos/graficolor-logo-dark.png`,
    logoLight: `${BASE}logos/graficolor-logo-light.png`,
    favicon: `${BASE}favicon.png`,
    portfolio: `${BASE}portfolio.pdf`,
  },
};

// ───── Helpers ─────

export const actionIcons = {
  whatsapp: MessageCircle,
  call: Phone,
  email: Mail,
  website: Store,
  instagram: Instagram,
  location: MapPin,
  portfolio: Boxes,
  quote: Send,
  share: Share2,
  save: ContactRound,
  spark: Sparkles,
  reviews: Gift,
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${ecardConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}