import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/data/categories";

const Cumpleanos = () => <MainLayout><CategoryPage category={getCategory("cumpleanos")!} /></MainLayout>;
export default Cumpleanos;
