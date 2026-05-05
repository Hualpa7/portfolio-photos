import { Service } from "@/data/services";
import { Check } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <article className="flex h-full flex-col rounded-sm border border-border bg-card p-7 hover-lift">
      <header className="flex items-baseline justify-between gap-4 border-b border-border pb-5">
        <h3 className="font-display text-2xl">{service.name}</h3>
        <p className="font-display text-2xl text-primary">{service.price}</p>
      </header>

      <p className="mt-5 text-sm text-muted-foreground">{service.description}</p>

      <ul className="mt-6 space-y-2 text-sm">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {service.conditions.length > 0 && (
        <footer className="mt-auto pt-6">
          <p className="eyebrow mb-2">Condiciones</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {service.conditions.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};

export default ServiceCard;
