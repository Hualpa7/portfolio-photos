import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/data/categories";

interface CategoryPageProps {
  category: Category;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  return (
    <article>
      <header className="border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-editorial">
          <Link
            to="/#trabajos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a trabajos
          </Link>
          <p className="eyebrow mt-8">Trabajos</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">{category.title}</h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {category.longDescription}
          </p>
        </div>
      </header>

      <section className="container-editorial py-16 md:py-24">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {category.gallery.map((src, i) => (
            <figure
              key={src}
              className={`overflow-hidden rounded-sm bg-muted ${
                i % 5 === 0 ? "sm:col-span-2 sm:row-span-2 aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img
                src={src}
                alt={`${category.title} — imagen ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
};

export default CategoryPage;
