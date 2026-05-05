import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setWorksOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className="font-display text-xl tracking-tight md:text-2xl"
          aria-label="Estudio Lumen — inicio"
        >
          Estudio<span className="text-primary">Lumen</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          <Link to="/#sobre-mi" className="text-sm hover:text-primary transition-colors">
            Sobre mí
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setWorksOpen(true)}
            onMouseLeave={() => setWorksOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
              aria-haspopup="menu"
              aria-expanded={worksOpen}
            >
              Trabajos
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {worksOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
              >
                <ul className="min-w-[200px] rounded-sm border border-border bg-popover p-2 shadow-[var(--shadow-card)]">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={c.path}
                        role="menuitem"
                        className="block rounded-sm px-3 py-2 text-sm text-popover-foreground hover:bg-muted"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/#servicios" className="text-sm hover:text-primary transition-colors">
            Servicios
          </Link>
          <Link
            to="/#contacto"
            className="rounded-sm border border-foreground/80 px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-border bg-background" aria-label="Móvil">
          <ul className="container-editorial flex flex-col py-4 text-sm">
            <li><Link to="/#sobre-mi" className="block py-3">Sobre mí</Link></li>
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-between py-3"
                onClick={() => setWorksOpen((s) => !s)}
                aria-expanded={worksOpen}
              >
                Trabajos
                <ChevronDown className={cn("h-4 w-4 transition-transform", worksOpen && "rotate-180")} />
              </button>
              {worksOpen && (
                <ul className="pb-2 pl-4">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link to={c.path} className="block py-2 text-muted-foreground">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link to="/#servicios" className="block py-3">Servicios</Link></li>
            <li><Link to="/#contacto" className="block py-3">Contacto</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
