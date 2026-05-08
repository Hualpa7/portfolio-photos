import { motion } from "motion/react"
import ScrollReveal from "./ScrollReveal";

const About = () => {
  return (
    <section id="sobre-mi" className="py-24 md:py-32">
      <div className="container-editorial grid gap-12 md:grid-cols-2 md:gap-16">
        <ScrollReveal 
          variant="scale" 
          duration={1} 
          exitVariant="slideDown" 
          once={false}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80"
              alt="Retrato del fotógrafo en su estudio"
              className="h-full w-full object-cover animate-slow-zoom "
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal 
          variant="slideDown" 
          delay={0.2} 
          exitVariant="fade"
          once={false}
        >
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-lg">Sobre mí</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Cinco años contando historias con luz.
            </h2>
            <div className="mt-6 space-y-4 text-base text-muted-foreground md:text-lg">
              <p>
                Soy fotógrafo profesional con más de cinco años de experiencia documentando
                bodas, cumpleaños, eventos y foto deportiva. Mi enfoque combina sensibilidad
                documental con dirección cuidada, buscando imágenes que perduren.
              </p>
              <p>
                Trabajo en distintas disciplinas: bodas, cumpleaños, fotografía deportiva,
                sesiones de retrato y proyectos de arte. Cada encargo se aborda como una
                colaboración personal.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                { k: "+5", v: "Años de experiencia" },
                { k: "+50", v: "Eventos realizados" },
                { k: "+30", v: "Sesiones realizadas" },
                { k: "5★", v: "Valoración media" },
              ].map((s, index) => (
                <ScrollReveal 
                  key={s.v} 
                  variant="slideUp"
                  delay={0.3 + index * 0.1}
                  once={false}
                >
                  <li className="border-l-2 border-primary pl-4">
                    <p className="font-display text-2xl">{s.k}</p>
                    <p className="text-muted-foreground">{s.v}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
