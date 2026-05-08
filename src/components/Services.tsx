import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";
import ScrollReveal from "./ScrollReveal";

const Services = () => {
  return (
    <section id="servicios" className="relative py-24 md:py-32 overflow-hidden bg-surface-dark">
      {/* Fondo con imagen y movimiento */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=2000&q=80"
          alt="Fondo de fotografía profesional"
          className="h-full w-full object-cover animate-slow-zoom"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1920x1080/1a1a1a/1a1a1a';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/40 to-surface-dark/80" />
      </div>

      <div className="container-editorial relative z-10">
        <ScrollReveal variant="slideLeft" duration={1}>
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

        <ScrollReveal variant="slideUp" duration={1} exitVariant="fade">
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
