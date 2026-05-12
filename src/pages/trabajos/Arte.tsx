import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";
import { useSeo } from "@/hooks/useSeo";

const Arte = () => {
  const category = getCategory("arte")!;
  useSeo({
    title: "Fotografía de Arte y Proyectos Editoriales en Salta | Hualpa Gaston",
    description: "Proyectos de arte y fotografía editorial en Salta. Concepto creativo, dirección de arte y producción. Cotización a medida.",
    ogImage: category.cover,
    ogType: "website",
    canonical: "https://portfolio-photos-ii4s.vercel.app/trabajos/arte",
  });
  return <MainLayout><CategoryPage category={category} /></MainLayout>;
};
export default Arte;
