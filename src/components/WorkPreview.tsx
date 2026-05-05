import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";

const WorkPreview = () => {
  return (
    <section id="trabajos" className="bg-muted/40 py-24 md:py-32">
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Trabajos</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Categorías que cuento mejor.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Selecciona una categoría para ver galerías completas y detalles del proceso.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                to={c.path}
                className="group block hover-lift"
                aria-label={`Ver galería: ${c.title}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <img
                    src={c.cover}
                    alt={`Portada de la categoría ${c.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 text-surface-dark-foreground">
                    <h3 className="font-display text-2xl">{c.title}</h3>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkPreview;
