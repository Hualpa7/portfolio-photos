import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, Suspense, useCallback, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Category } from "@/data/categories";
import ImageModal from "./ImageModal";
import SkeletonLoader from "./SkeletonLoader";
import { preloadGallery } from "@/lib/imageOptimization";

interface CategoryPageProps {
  category: Category;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageStates, setImageStates] = useState<Record<string, boolean>>({});

  // Precarga las primeras 3 imágenes al montar el componente
  useEffect(() => {
    preloadGallery(category.gallery, 3);
  }, [category.gallery]);

  const handleImageLoad = useCallback((src: string) => {
    setImageStates((prev) => ({ ...prev, [src]: true }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Memoizar la lista de imágenes para evitar re-renders innecesarios
  const galleryImages = useMemo(() => category.gallery, [category.gallery]);

  return (
    <article>
      <header className="border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-editorial">
          <Link
            to="/#trabajos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 text-lg" /> Volver a trabajos
          </Link>
          <p className="eyebrow mt-8 text-lg">Trabajos</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">{category.title}</h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {category.longDescription}
          </p>
        </div>
      </header>

      <section className="container-editorial py-16 md:py-24">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {galleryImages.map((src, i) => (
            <motion.figure
              key={src}
              layoutId={`gallery-image-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className={`overflow-hidden rounded-sm bg-muted cursor-pointer group relative ${
                i % 5 === 0 ? "sm:col-span-2 sm:row-span-2 aspect-square" : "aspect-[4/5]"
              }`}
              onClick={() => setSelectedImage(src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedImage(src);
                }
              }}
            >
              {/* Skeleton mientras carga */}
              {!imageStates[src] && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Imagen con transición suave */}
              <motion.img
                src={src}
                alt={`${category.title} — imagen ${i + 1}`}
                loading="lazy"
                onLoad={() => handleImageLoad(src)}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageStates[src] ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                decoding="async"
              />

              {/* Overlay hint en hover */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={false}
              >
                <span className="text-white text-sm font-medium">Ver en grande</span>
              </motion.div>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Modal de imagen */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
        imageSrc={selectedImage || ""}
        imageAlt={`${category.title} - imagen expandida`}
      />
    </article>
  );
};

export default CategoryPage;
