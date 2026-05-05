import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Bodas from "./pages/trabajos/Bodas.tsx";
import Cumpleanos from "./pages/trabajos/Cumpleanos.tsx";
import Deportiva from "./pages/trabajos/Deportiva.tsx";
import Sesiones from "./pages/trabajos/Sesiones.tsx";
import Arte from "./pages/trabajos/Arte.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trabajos/bodas" element={<Bodas />} />
          <Route path="/trabajos/cumpleanos" element={<Cumpleanos />} />
          <Route path="/trabajos/deportiva" element={<Deportiva />} />
          <Route path="/trabajos/sesiones" element={<Sesiones />} />
          <Route path="/trabajos/arte" element={<Arte />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
