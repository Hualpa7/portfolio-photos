import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";

const Deportiva = () => <MainLayout><CategoryPage category={getCategory("deportiva")!} /></MainLayout>;
export default Deportiva;
