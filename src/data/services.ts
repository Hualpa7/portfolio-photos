export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
  conditions: string[];
}

export const services: Service[] = [
  {
    id: "bodas",
    name: "Bodas",
    price: "$450.000",
    description: "Cobertura integral del evento con entrega editada en alta resolución.",
    includes: ["Hasta 8 horas de cobertura", "Mínimo 400 fotos editadas", "Galería online privada"],
    conditions: ["Hora extra: $40.000", "Reserva con 30% de anticipo"],
  },
  {
    id: "cumpleanos",
    name: "Cumpleaños",
    price: "$100.000",
    description: "Cobertura completa de la celebración con entrega rápida.",
    includes: ["Mínimo 100 fotos editadas", "Hasta 2 horas de cobertura"],
    conditions: ["Hora extra: $30.000"],
  },
  {
    id: "deportiva",
    name: "Fotografía deportiva",
    price: "$120.000",
    description: "Cobertura de partidos, competiciones y entrenamientos.",
    includes: ["Mínimo 80 fotos editadas", "Equipo teleobjetivo incluido"],
    conditions: ["Hora extra: $35.000", "Traslados según ubicación"],
  },
  {
    id: "sesiones",
    name: "Sesiones",
    price: "$90.000",
    description: "Sesión personal, de pareja o familiar en estudio o exteriores.",
    includes: ["1 hora de sesión", "Mínimo 25 fotos editadas", "Asesoría de estilismo"],
    conditions: ["Cambios de vestuario incluidos"],
  },
  {
    id: "arte",
    name: "Arte",
    price: "Cotización",
    description: "Proyectos editoriales y artísticos a medida.",
    includes: ["Concepto creativo", "Producción y dirección de arte"],
    conditions: ["Cotización según alcance del proyecto"],
  },
];
