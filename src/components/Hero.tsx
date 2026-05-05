const Hero = () => {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
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

      <div className="container-editorial relative z-10 flex h-full flex-col items-start justify-end pb-24 text-surface-dark-foreground md:pb-32">
        <p className="eyebrow reveal text-surface-dark-foreground/80">
          Estudio Lumen — Fotografía profesional
        </p>
        <h1 className="reveal reveal-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]">
          Momentos que <em className="not-italic text-primary">permanecen</em>.
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base text-surface-dark-foreground/85 md:text-lg">
          Bodas, sesiones, deporte y proyectos de autor — fotografía con mirada propia
          y entrega impecable.
        </p>
        <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#trabajos"
            className="rounded-sm bg-surface-dark-foreground px-6 py-3 text-sm font-medium text-surface-dark transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Ver trabajos
          </a>
          <a
            href="#contacto"
            className="rounded-sm border border-surface-dark-foreground/70 px-6 py-3 text-sm font-medium text-surface-dark-foreground transition-colors hover:bg-surface-dark-foreground hover:text-surface-dark"
          >
            Reservar sesión
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
