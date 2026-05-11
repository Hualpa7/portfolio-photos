import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";
import ScrollReveal from "./ScrollReveal";

const Services = () => {
  return (
    <section id="servicios" className="relative py-24 md:py-32 overflow-hidden ">
      {/* Fondo con imagen y movimiento */}
        <ScrollReveal variant="fade" duration={0.5} once>
        <div className="absolute inset-0 ">
          <img
            src="https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/B46A9145.webp"
            alt="Fondo de fotografía profesional"
            className="h-full w-full object-cover animate-slow-zoom"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/1920x1080/1a1a1a/1a1a1a';
            }}
          />
          <div className="absolute inset-0 bg-[image:var(--gradient-fade-dark)]" />
          <div className="absolute inset-0 bg-surface-dark/30" />
        </div>
        </ScrollReveal>

          <div className="container-editorial relative z-10">
            <ScrollReveal variant="slideLeft" duration={1} once>
              <div className="max-w-2xl">
                <p className="eyebrow text-surface-dark-foreground/80 text-lg">Servicios</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl text-surface-dark-foreground">
                  Tarifas claras
                </h2>
                <p className="mt-4 text-lg text-surface-dark-foreground/75 leading-relaxed">
                  Cada paquete incluye edición profesional y entrega digital. ¿Necesitas algo
                  distinto? Cotizamos a medida.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" duration={1} exitVariant="fade" once>
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
        );
};

        export default Services;
