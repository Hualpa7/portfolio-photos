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
    cover: `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/IMG_8800-2.webp`,
    gallery: [
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000352507.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000356158.jpg.webp`,
      `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000384101.jpg.webp`,
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/B46A6428.webp",
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
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000220738.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000221427.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000280057.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000411337.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000280060.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000280074.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000280302.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/B46A2502%20(1).webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/B46A4063.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/DSC06424.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/IMG_7407.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/DSCN0914.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/IMG_6917%20(1).webp",
    ],
  },
  {
    slug: "arte",
    path: "/trabajos/arte",
    title: "Arte",
    description: "Proyectos personales y exploraciones visuales.",
    longDescription:
      "Una colección de trabajos de autor donde la fotografía se convierte en lenguaje y experimentación.",
    cover: `https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000409471.jpg.webp`,
    gallery: [
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000259414.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000265848.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/B46A9167.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/DSC00104.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/DSC01284.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/IMG_1773.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000411273.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000286106.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000409471.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000409664.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/1000411199.jpg.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/IMG_1773.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/B46A8484.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/2.webp",
      "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/4.webp"
    ],
  },
];

export const getCategory = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug);
