import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import ScrollReveal from "./ScrollReveal";


const CAROUSEL_PHOTOS = [
  {
    src: "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/B46A2405.webp",
    alt: "Boda en jardín",
    label: "Bodas",
  },
  {
    src: "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/sesiones/1000280078.jpg.webp",
    alt: "Sesión editorial",
    label: "Sesiones",
  },
  {
    src: "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/deportes/1000384681.jpg.webp",
    alt: "Fotografía deportiva",
    label: "Deporte",
  },
  {
    src: "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/cumpleanios/B46A8136.webp",
    alt: "cumpleanios",
    label: "Cumpleaños",
  },
  {
    src: "https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/B46A9167.webp",
    alt: "arte",
    label: "Arte",
  },
];

// Rotaciones fijas por índice para el efecto "foto física"
const ROTATIONS = [-3.5, 2.1, -1.8, 3.2, -2.5];

const PhotoCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      const next = ((index % CAROUSEL_PHOTOS.length) + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length;
      setDirection(next > current ? 1 : -1);
      setPrev(current);
      setCurrent(next);
      emblaApi.scrollTo(next);
    },
    [emblaApi, current]
  );

  // Auto-avance cada 3.5s
  useEffect(() => {
    const id = setInterval(() => {
      scrollTo(current + 1);
    }, 3500);
    return () => clearInterval(id);
  }, [current, scrollTo]);

  // Sync con Embla al arrastrar
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      const idx = emblaApi.selectedScrollSnap();
      setDirection(idx > current ? 1 : -1);
      setPrev(current);
      setCurrent(idx);
    });
  }, [emblaApi, current]);

  const photo = CAROUSEL_PHOTOS[current];
  const rotation = ROTATIONS[current % ROTATIONS.length];

  // Variantes: entra como foto lanzada desde el costado con rotación
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 180 : -180,
      y: -30,
      rotate: dir > 0 ? 12 : -12,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      y: 0,
      rotate: rotation,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 22,
        mass: 0.9,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      y: 40,
      rotate: dir > 0 ? -8 : 8,
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 select-none">
      {/* Pila de fotos detrás (decorativas) */}
      <div className="relative w-[220px] h-[290px] md:w-[260px] md:h-[340px]">
        {/* Sombra de profundidad */}
        <div
          className="absolute inset-0 rounded-sm bg-black/40 blur-xl"
          style={{ transform: "translate(8px, 12px) rotate(2deg)" }}
        />

        {/* Fotos apiladas atrás */}
        {[-2, -1].map((offset) => {
          const idx = ((current + offset + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length);
          const rot = ROTATIONS[idx % ROTATIONS.length] * 0.6 + offset * 3;
          return (
            <div
              key={idx}
              className="absolute inset-0 rounded-sm overflow-hidden bg-white p-2 pb-8"
              style={{
                transform: `rotate(${rot}deg) translate(${offset * 6}px, ${offset * 4}px)`,
                zIndex: offset + 2,
                boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
                opacity: 0.55 + Math.abs(offset) * 0.15,
              }}
            >
              <img
                src={CAROUSEL_PHOTOS[idx].src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}

        {/* Foto principal animada */}
        <div className="absolute inset-0" style={{ zIndex: 10 }} ref={emblaRef}>
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 rounded-sm overflow-hidden bg-white p-2 pb-8 cursor-grab active:cursor-grabbing"
              style={{
                boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)",
                willChange: "transform",
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) scrollTo(current + 1);
                else if (info.offset.x > 50) scrollTo(current - 1);
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover pointer-events-none"
              />
              {/* Etiqueta estilo polaroid */}
              <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center">
                <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-500">
                  {photo.label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Puntos de navegación */}
      <div className="flex gap-2 relative z-20">
        {CAROUSEL_PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>

      {/* Flechas */}
      <div className="flex gap-3 relative z-20">
        <button
          onClick={() => scrollTo(current - 1)}
          className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all"
        >
          ←
        </button>
        <button
          onClick={() => scrollTo(current + 1)}
          className="rounded-full border border-white/20 bg-white/10 backdrop-blur-sm p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all"
        >
          →
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden animate__fadeIn">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=2000&q=80"
          alt="Fotografía editorial en blanco y negro de una pareja"
          className="h-full w-full object-cover animate-slow-zoom"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-fade-dark)]" />
        <div className="absolute inset-0 bg-surface-dark/30" />
      </div>

      <div className="container-editorial relative z-10 flex h-full flex-col md:flex-row md:items-end md:justify-between pb-24 text-surface-dark-foreground md:pb-32">
        {/* Columna izquierda — texto */}
        <div className="flex flex-col items-start justify-end h-full md:h-auto md:max-w-[55%]">
          <ScrollReveal variant="scale" duration={1} once>
            <p className="eyebrow reveal text-surface-dark-foreground/80 w-full text-xl">
              Hualpa Gaston — Fotografía profesional
            </p>
          </ScrollReveal>
          <ScrollReveal variant="slideRight" duration={1} once>
            <h1 className="reveal reveal-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]">
              Momentos que <em className="not-italic text-primary">permanecen</em>
            </h1>
          </ScrollReveal>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base text-surface-dark-foreground/85 md:text-lg">
            Bodas, sesiones, deporte y proyectos de autor — fotografía con mirada propia
            y entrega impecable.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-6">
            <motion.a
              whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              transition={{ duration: 0.5 }}
              href="#trabajos"
              className="rounded-sm bg-surface-dark-foreground px-6 py-3 text-sm font-medium text-surface-dark transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ver trabajos
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              transition={{ duration: 0.5 }}
              href="#contacto"
              className="rounded-sm border border-surface-dark-foreground/70 px-6 py-3 text-sm font-medium text-surface-dark-foreground transition-colors hover:bg-surface-dark-foreground hover:text-surface-dark"
            >
              Reservar sesión
            </motion.a>
          </div>
        </div>

        {/* Columna derecha — carrusel de fotos físicas */}
        <div className="hidden md:flex md:items-end md:justify-end md:pb-4 md:pl-8">
          <ScrollReveal variant="fade" duration={1.2} once>
            <PhotoCarousel />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;