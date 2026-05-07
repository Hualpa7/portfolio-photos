import { useState } from "react";
import { toast } from "sonner";
import { useUploadPhoto } from "@/hooks/useUploadPhoto";
import { Upload, Loader2 } from "lucide-react";

interface PhotoUploadProps {
  categorySlug: string;
  onPhotoUploaded?: (photoUrl: string) => void;
}

export const PhotoUpload = ({ categorySlug, onPhotoUploaded }: PhotoUploadProps) => {
  const { uploadPhoto, loading } = useUploadPhoto();
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file: File) => {
    const url = await uploadPhoto(file);
    if (url) {
      toast.success("Foto subida exitosamente");
      onPhotoUploaded?.(url);
    } else {
      toast.error("Error al subir la foto");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/20 hover:border-primary/50"
      } ${loading ? "opacity-50 pointer-events-none" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={loading}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />

      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Subiendo...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">Arrastra una foto aquí o haz click</p>
          <p className="text-xs text-muted-foreground">PNG, JPG (máx 10MB)</p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
