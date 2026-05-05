export type CategorySlug = "bodas" | "cumpleanos" | "deportiva" | "sesiones" | "arte";

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
    cover: u("photo-1519741497674-611481863552"),
    gallery: [
      u("photo-1519741497674-611481863552"),
      u("photo-1606800052052-a08af7148866"),
      u("photo-1511795409834-ef04bbd61622"),
      u("photo-1465495976277-4387d4b0b4c6"),
      u("photo-1519225421980-715cb0215aed"),
      u("photo-1525258946800-98cfd641d0de"),
      u("photo-1591604466107-ec97de577aff"),
      u("photo-1583939003579-730e3918a45a"),
    ],
  },
  {
    slug: "cumpleanos",
    path: "/trabajos/cumpleanos",
    title: "Cumpleaños",
    description: "Celebraciones llenas de color, gestos y emoción.",
    longDescription:
      "Cubrimos cumpleaños de todas las edades, priorizando momentos espontáneos y la complicidad entre invitados.",
    cover: u("photo-1530103862676-de8c9debad1d"),
    gallery: [
      u("photo-1530103862676-de8c9debad1d"),
      u("photo-1464349095431-e9a21285b5f3"),
      u("photo-1513151233558-d860c5398176"),
      u("photo-1576919228236-a097c32a5cd4"),
      u("photo-1527529482837-4698179dc6ce"),
      u("photo-1496024840928-4c417adf211d"),
    ],
  },
  {
    slug: "deportiva",
    path: "/trabajos/deportiva",
    title: "Fotografía deportiva",
    description: "Movimiento, intensidad y precisión en cada disparo.",
    longDescription:
      "Capturamos la acción en su pico, con equipo especializado para cubrir competiciones, entrenamientos y retratos atléticos.",
    cover: u("photo-1517649763962-0c623066013b"),
    gallery: [
      u("photo-1517649763962-0c623066013b"),
      u("photo-1461896836934-ffe607ba8211"),
      u("photo-1552674605-db6ffd4facb5"),
      u("photo-1530549387789-4c1017266635"),
      u("photo-1546519638-68e109498ffc"),
      u("photo-1574629810360-7efbbe195018"),
    ],
  },
  {
    slug: "sesiones",
    path: "/trabajos/sesiones",
    title: "Sesiones",
    description: "Retratos personales, familiares y editoriales.",
    longDescription:
      "Sesiones cuidadosamente dirigidas en estudio o en exteriores, con asesoría de estilismo y locaciones.",
    cover: u("photo-1524504388940-b1c1722653e1"),
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
    cover: u("photo-1502082553048-f009c37129b9"),
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
