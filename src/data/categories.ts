export type CategorySlug = "bodas" | "cumpleanos" | "deportiva" | "sesiones" | "arte";
import d1 from "../../public/d1.jpeg";
import d2 from "../../public/d2.jpeg";
import d3 from "../../public/d3.jpeg";

// Convertir enlaces de Google Drive "file/d/ID/view" a URL directa usable en <img>
const driveToDirect = (url: string) => {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!m) return url;
  return `https://drive.google.com/uc?export=view&id=${m[1]}`;
};

export interface Category {
  slug: CategorySlug;
  /** URL path used in the router (matches files in /trabajos/) */
  path: string;
  title: string;
  description: string;
  longDescription: string;
  cover: string;
  gallery: string[];
}

// Tasteful neutral placeholders from Unsplash (royalty-free).
// Swap freely with real client images later.
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    slug: "bodas",
    path: "/trabajos/bodas",
    title: "Bodas",
    description: "Historias de amor capturadas con sensibilidad y elegancia.",
    longDescription:
      "Documentamos cada momento de tu boda con un enfoque cinematográfico y discreto, desde los preparativos hasta la última pieza musical de la noche.",
    cover: `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/1000397786.jpg.webp`,
    gallery: [
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/1000392982.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/1000397786.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/1000398104.jpg.webp`,
    ],
  },
  {
    slug: "cumpleanos",
    path: "/trabajos/cumpleanos",
    title: "Cumpleaños",
    description: "Celebraciones llenas de color, gestos y emoción.",
    longDescription:
      "Cubrimos cumpleaños de todas las edades, priorizando momentos espontáneos y la complicidad entre invitados.",
    cover: `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/IMG_0436.webp`,
    gallery: [
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/B46A7947.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/B46A8042.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/B46A8136.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/B46A8160.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/B46A8177.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/IMG_0306.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/IMG_0436.webp`,
    ],
  },
  {
    slug: "deportiva",
    path: "/trabajos/deportiva",
    title: "Fotografía deportiva",
    description: "Movimiento, intensidad y precisión en cada disparo.",
    longDescription:
      "Capturamos la acción en su pico, con equipo especializado para cubrir competiciones, entrenamientos y retratos atléticos.",
    cover:       `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/IMG_8800-2.webp`,
    gallery: [
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000352507.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000356158.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000384101.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000384112.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000387539.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000387507.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000384681.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000384670.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/B46A1821.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/B46A1820.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/B46A2187.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/B46A5545.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/IMG_8800-2.webp`,
    ],
  },
  {
    slug: "sesiones",
    path: "/trabajos/sesiones",
    title: "Sesiones",
    description: "Retratos personales, familiares y editoriales.",
    longDescription:
      "Sesiones cuidadosamente dirigidas en estudio o en exteriores, con asesoría de estilismo y locaciones.",
    cover: `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000280060.jpg.webp`,
    gallery: [
      u("photo-1524504388940-b1c1722653e1"),
      u("photo-1488161628813-04466f872be2"),
      u("photo-1517841905240-472988babdf9"),
      u("photo-1502823403499-6ccfcf4fb453"),
      u("photo-1506794778202-cad84cf45f1d"),
      u("photo-1531746020798-e6953c6e8e04"),
    ],
  },
  {
    slug: "arte",
    path: "/trabajos/arte",
    title: "Arte",
    description: "Proyectos personales y exploraciones visuales.",
    longDescription:
      "Una colección de trabajos de autor donde la fotografía se convierte en lenguaje y experimentación.",
    cover: `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000265848.jpg.webp`,
    gallery: [
      u("photo-1502082553048-f009c37129b9"),
      u("photo-1500534314209-a25ddb2bd429"),
      u("photo-1470770841072-f978cf4d019e"),
      u("photo-1485470733090-0aae1788d5af"),
      u("photo-1418065460487-3e41a6c84dc5"),
      u("photo-1447752875215-b2761acb3c5d"),
    ],
  },
];

export const getCategory = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug);
