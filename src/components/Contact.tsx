import ContactForm from "./ContactForm";
import { Mail, Instagram, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contacto" className="bg-surface-dark py-24 text-surface-dark-foreground md:py-32">
      <div className="container-editorial grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <p className="eyebrow text-surface-dark-foreground/70">Contacto</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Hablemos de tu proyecto.
          </h2>
          <p className="mt-4 text-surface-dark-foreground/75">
            Cuéntame qué tienes en mente y te respondo en menos de 24 horas con una
            propuesta personalizada.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              hola@estudiolumen.com
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-primary" />
              @estudiolumen
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              Disponible para viajar
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 rounded-sm bg-background p-6 text-foreground md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
