import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";
import { useSeo } from "@/hooks/useSeo";

const Bodas = () => {
  const category = getCategory("bodas")!;
  useSeo({
    title: "Fotografía de Bodas en Salta | Hualpa Gaston",
    description: "Cobertura profesional de bodas en Salta capital y provincia. Bodas cinematográficas, discretas y emotivas. +5 años de experiencia. Reservá tu fecha.",
    ogImage: category.cover,
    ogType: "website",
    canonical: "https://portfolio-photos-ii4s.vercel.app/trabajos/bodas",
  });
  return <MainLayout><CategoryPage category={category} /></MainLayout>;
};
export default Bodas;
