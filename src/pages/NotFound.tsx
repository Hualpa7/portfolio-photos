import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section id="notafound" className="relative min-h-screen py-24 md:py-32 overflow-hidden">
      {/* Fondo con imagen y overlay */}
      <div className="absolute inset-0">
        <img
          src="https://nxggkjariyyxjueminyb.supabase.co/storage/v1/object/public/portfolio-photos/arte/B46A8484.webp"
          alt="Fondo 404"
          className="h-full w-full object-cover animate-slow-zoom"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1920x1080/1a1a1a/1a1a1a';
          }}
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-fade-dark)]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl transform transition-all duration-500 hover:scale-105">
          {/* Tarjeta con fondo blanco y texto negro */}
          <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl p-8 md:p-12 text-center border border-gray-200/50">
            {/* Número 404 decorativo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-2xl" />
              </div>
              <h1 className="relative text-8xl md:text-9xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                404
              </h1>
            </div>

            {/* Mensaje de error */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-semibold text-gray-900">
                ¡Ups! Página no encontrada
              </p>
              <p className="text-gray-600 leading-relaxed">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
            </div>

            {/* Línea decorativa */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            {/* Botón de regreso */}
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-white font-medium transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            >
              <svg
                className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al Inicio
            </a>

            {/* Enlaces adicionales opcionales */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
              <a href="/#contacto" className="hover:text-primary transition-colors">
                Contacto
              </a>
              <span>•</span>
              <a href="/#servicios" className="hover:text-primary transition-colors">
                Servicios
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;