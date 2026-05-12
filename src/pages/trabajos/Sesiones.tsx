import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";
import { useSeo } from "@/hooks/useSeo";

const Sesiones = () => {
  const category = getCategory("sesiones")!;
  useSeo({
    title: "Sesiones Fotográficas en Salta | Retratos, Familia, Pareja | Hualpa Gaston",
    description: "Sesiones de retrato, familia y pareja en Salta capital. Personal, familiar y editorial. Sesión desde $30.000 ARS. Incluye editing profesional.",
    ogImage: category.cover,
    ogType: "website",
    canonical: "https://portfolio-photos-ii4s.vercel.app/trabajos/sesiones",
  });
  return <MainLayout><CategoryPage category={category} /></MainLayout>;
};
export default Sesiones;
