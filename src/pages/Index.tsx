import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkPreview from "@/components/WorkPreview";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import 'animate.css';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [hash]);

  return (
    <MainLayout>
      <Hero />
      <About />
      <WorkPreview />
      <Services />
      <Contact />
    </MainLayout>
  );
};

export default Index;
