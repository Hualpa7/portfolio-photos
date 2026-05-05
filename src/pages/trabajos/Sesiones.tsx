import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";

const Sesiones = () => <MainLayout><CategoryPage category={getCategory("sesiones")!} /></MainLayout>;
export default Sesiones;
