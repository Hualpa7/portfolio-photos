-- Tabla de contactos del formulario
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(40),
  tipo_servicio VARCHAR(60),
  fecha DATE,
  presupuesto VARCHAR(60),
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);

-- RLS para tabla de contactos
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Permitir que usuarios anónimos inserten contactos
CREATE POLICY "Allow anonymous insert" ON public.contacts
  FOR INSERT
  WITH CHECK (true);

-- Tabla de fotos del portafolio
CREATE TABLE public.portfolio_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  category VARCHAR(60),
  file_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para portfolio_photos
CREATE INDEX idx_portfolio_photos_category ON public.portfolio_photos(category);
CREATE INDEX idx_portfolio_photos_created_at ON public.portfolio_photos(created_at DESC);

-- RLS para portfolio_photos
ALTER TABLE public.portfolio_photos ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública de fotos
CREATE POLICY "Allow public read" ON public.portfolio_photos
  FOR SELECT
  USING (true);

-- Permitir inserción de fotos
CREATE POLICY "Allow insert photos" ON public.portfolio_photos
  FOR INSERT
  WITH CHECK (true);