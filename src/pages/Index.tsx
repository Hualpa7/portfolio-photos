import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkPreview from "@/components/WorkPreview";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { useSeo } from "@/hooks/useSeo";
import 'animate.css';

const OG_IMAGE = "https://portfolio-photos-ii4s.vercel.app/og-image.jpg";

const Index = () => {
  const { hash } = useLocation();

  useSeo({
    title: "Fotógrafo Profesional en Salta | Bodas, Eventos, Deportes | Hualpa Gaston",
    description: "Fotógrafo profesional en Salta capital. Bodas, cumpleaños, fotografía deportiva, sesiones y arte. +5 años de experiencia. Reservá tu sesión.",
    ogImage: OG_IMAGE,
    ogType: "website",
    canonical: "https://portfolio-photos-ii4s.vercel.app/",
  });

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
