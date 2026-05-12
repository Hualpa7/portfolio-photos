import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";
import { useSeo } from "@/hooks/useSeo";

const Cumpleanos = () => {
  const category = getCategory("cumpleanos")!;
  useSeo({
    title: "Fotografía de Cumpleaños en Salta | Hualpa Gaston",
    description: "Cobertura profesional de cumpleaños en Salta capital. Momentos espontáneos, invitados y celebraciones. Sesiones desde $100.000 ARS.",
    ogImage: category.cover,
    ogType: "website",
    canonical: "https://portfolio-photos-ii4s.vercel.app/trabajos/cumpleanos",
  });
  return <MainLayout><CategoryPage category={category} /></MainLayout>;
};
export default Cumpleanos;
