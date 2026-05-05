import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";

const Bodas = () => <MainLayout><CategoryPage category={getCategory("bodas")!} /></MainLayout>;
export default Bodas;
