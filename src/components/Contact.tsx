import ContactForm from "./ContactForm";
import { Mail, Instagram, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  return (
    <section id="contacto" className="bg-surface-dark py-24 text-surface-dark-foreground md:py-32">
      <div className="container-editorial max-w-6xl">
        <div className="grid gap-16 md:gap-20 md:grid-cols-2 md:items-start">
          <ScrollReveal variant="fade" duration={1}>
            <div className="space-y-8">
              <div>
                <p className="eyebrow text-surface-dark-foreground/70 text-lg">Contacto</p>
                <h2 className="mt-4 font-display text-4xl md:text-5xl">
                  Hablemos de tu proyecto.
                </h2>
              </div>
              
              <p className="text-lg text-surface-dark-foreground/75 leading-relaxed max-w-sm">
                Cuéntame qué tienes en mente y te respondo en menos de 24 horas con una
                propuesta personalizada.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>hualpahualpa@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <a href="https://www.instagram.com/__.gulp.__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    @__.gulp.__
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Disponible para viajar</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-sm bg-background p-8 text-foreground md:p-12 shadow-lg">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
