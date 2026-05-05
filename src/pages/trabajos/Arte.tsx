import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";

const Arte = () => <MainLayout><CategoryPage category={getCategory("arte")!} /></MainLayout>;
export default Arte;
