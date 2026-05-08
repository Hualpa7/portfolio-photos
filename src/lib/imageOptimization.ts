/**
 * Utility para precarga estratégica de imágenes
 * Carga las primeras imágenes inmediatamente para mejor UX
 */

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Precarga las primeras N imágenes de una galería
 */
export const preloadGallery = async (images: string[], count: number = 3) => {
  const imagesToPreload = images.slice(0, count);
  try {
    await Promise.all(imagesToPreload.map(preloadImage));
  } catch (err) {
    console.warn("Error preloading images:", err);
  }
};

/**
 * Genera URL optimizada para Supabase
 */
export const getOptimizedSupabaseUrl = (
  url: string,
  width?: number,
  quality?: number
): string => {
  if (!url.includes("supabase.co/storage")) {
    return url;
  }

  const urlObj = new URL(url);
  if (width) urlObj.searchParams.set("width", width.toString());
  if (quality) urlObj.searchParams.set("quality", quality.toString());
  
  return urlObj.toString();
};
