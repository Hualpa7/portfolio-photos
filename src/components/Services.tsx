import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

const Services = () => {
  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container-editorial">
        <div className="max-w-2xl">
          <p className="eyebrow">Servicios</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Tarifas claras
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada paquete incluye edición profesional y entrega digital. ¿Necesitas algo
            distinto? Cotizamos a medida.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
