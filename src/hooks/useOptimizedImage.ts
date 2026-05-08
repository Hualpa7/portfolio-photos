import { useState, useEffect } from "react";

/**
 * Hook para optimizar imágenes de Supabase
 * Añade parámetros de optimización a la URL
 */
export const useOptimizedImage = (originalUrl: string, maxWidth: number = 1200) => {
  const [optimizedUrl, setOptimizedUrl] = useState(originalUrl);

  useEffect(() => {
    // Si es URL de Supabase Storage, añadir parámetros de optimización
    if (originalUrl.includes("supabase.co/storage")) {
      // Supabase soporta estos parámetros:
      // ?width=800&height=600&resize=contain
      const url = new URL(originalUrl);
      url.searchParams.set("width", maxWidth.toString());
      url.searchParams.set("height", "auto");
      url.searchParams.set("resize", "contain");
      setOptimizedUrl(url.toString());
    }
  }, [originalUrl, maxWidth]);

  return optimizedUrl;
};

export default useOptimizedImage;
