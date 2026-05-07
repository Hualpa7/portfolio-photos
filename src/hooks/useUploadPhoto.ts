import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface UploadPhotoOptions {
  onProgress?: (progress: number) => void;
}

export const useUploadPhoto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPhoto = async (file: File, options?: UploadPhotoOptions): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      // Validar que sea imagen
      if (!file.type.startsWith("image/")) {
        throw new Error("Solo se permiten archivos de imagen");
      }

      // Validar tamaño (máx 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("La imagen no debe exceder 10MB");
      }

      // Crear nombre único
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const fileName = `${timestamp}-${random}-${file.name}`;

      // Subir a Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("portfolio-photos")
        .upload(`portfolio/${fileName}`, file, {
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from("portfolio-photos")
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al subir la foto";
      setError(message);
      console.error("Upload error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadPhoto, loading, error };
};
