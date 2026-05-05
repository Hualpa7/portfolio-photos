import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container-editorial grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-xl">
            Estudio<span className="text-primary">Lumen</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Fotografía profesional con sensibilidad editorial y cobertura integral.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Trabajos</p>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={c.path} className="text-muted-foreground hover:text-foreground">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Navegar</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/#sobre-mi" className="text-muted-foreground hover:text-foreground">Sobre mí</Link></li>
            <li><Link to="/#servicios" className="text-muted-foreground hover:text-foreground">Servicios</Link></li>
            <li><Link to="/#contacto" className="text-muted-foreground hover:text-foreground">Contacto</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-editorial mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Estudio Lumen. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
