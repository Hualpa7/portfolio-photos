import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, memo, useCallback } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const ImageModal = memo(({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) => {
  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cerrar con tecla ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con blur - click para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={imageAlt}
          >
            {/* Imagen */}
            <motion.div
              layoutId="modal-image"
              className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={handleImageClick}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-contain rounded-sm shadow-2xl"
                loading="eager"
                decoding="async"
              />
            </motion.div>

            {/* Botón cerrar */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-sm bg-red-900 hover:bg-red-700 transition-colors z-10"
              aria-label="Cerrar modal (ESC)"
              title="Presiona ESC para cerrar"
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            {/* Información */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 md:p-8 text-white pointer-events-none"
            >
              <p className="text-sm md:text-base opacity-90">{imageAlt}</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ImageModal.displayName = "ImageModal";

export default ImageModal;
