const About = () => {
  return (
    <section id="sobre-mi" className="py-24 md:py-32">
      <div className="container-editorial grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80"
            alt="Retrato del fotógrafo en su estudio"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow">Sobre mí</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Diez años contando historias con luz.
          </h2>
          <div className="mt-6 space-y-4 text-base text-muted-foreground md:text-lg">
            <p>
              Soy fotógrafo profesional con más de una década de experiencia documentando
              bodas, eventos y proyectos editoriales. Mi enfoque combina sensibilidad
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
              { k: "+10", v: "Años de experiencia" },
              { k: "+200", v: "Bodas documentadas" },
              { k: "+1.5K", v: "Sesiones realizadas" },
              { k: "5★", v: "Valoración media" },
            ].map((s) => (
              <li key={s.v} className="border-l-2 border-primary pl-4">
                <p className="font-display text-2xl">{s.k}</p>
                <p className="text-muted-foreground">{s.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
