import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";
import { useSeo } from "@/hooks/useSeo";

const Deportiva = () => {
  const category = getCategory("deportiva")!;
  useSeo({
    title: "Fotografía Deportiva en Salta | Hualpa Gaston",
    description: "Fotografía deportiva en Salta: partidos, competiciones y entrenamientos. Equipo teleobjetivo incluido. Cobertura desde $40.000 ARS.",
    ogImage: category.cover,
    ogType: "website",
    canonical: "https://portfolio-photos-ii4s.vercel.app/trabajos/deportiva",
  });
  return <MainLayout><CategoryPage category={category} /></MainLayout>;
};
export default Deportiva;
