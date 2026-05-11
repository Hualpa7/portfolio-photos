Portfolio de Fotografía — Landing Page

Una landing page moderna y responsive para mostrar mi trabajo fotográfico profesional, permitir reservas online y centralizar la gestión de contactos y sesiones.

El proyecto fue desarrollado utilizando tecnologías modernas como React, TypeScript y Supabase, con despliegue en Vercel.

🌐 Demo
Sitio web: [(prueba en VIVO)](https://portfolio-photos-ii4s.vercel.app/)

✨ Características principales
Diseño moderno y responsive
Portfolio fotográfico dinámico
Landing page optimizada para conversión
Animaciones suaves y transiciones
Sistema de reservas online
Integración con email
Confirmación y rechazo automático de reservas
Integración con Google Calendar
Gestión de imágenes desde Supabase Storage
Formularios validados
Navegación SPA rápida
Optimización SEO básica
Deploy automático con Vercel
🛠️ Tecnologías utilizadas
Frontend
React
TypeScript
Vite
Tailwind CSS
React Router DOM
Motion (Framer Motion)
Lucide Icons
Backend / Infraestructura
Supabase
Base de datos PostgreSQL
Edge Functions
Storage
Variables de entorno
Google Calendar API
Gmail API
Vercel
Desarrollo asistido
Lovable AI
📸 Funcionalidades
Portfolio visual

Galería optimizada para mostrar trabajos fotográficos con imágenes almacenadas en Supabase Storage.

Sistema de reservas

Los usuarios pueden:

Seleccionar fecha y horario
Elegir un servicio
Solicitar reservas online

Al confirmar una reserva:

Se actualiza automáticamente el estado en la base de datos
Se envía un email al cliente
Se crea un evento en Google Calendar
Confirmación desde email

Las reservas pueden ser:

Confirmadas
Rechazadas

directamente desde enlaces seguros enviados por correo.

📂 Estructura del proyecto
portfolio-photos/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── styles/
│
├── supabase/
│   ├── functions/
│   └── migrations/
│
├── package.json
├── tsconfig.json
└── vite.config.ts

⚙️ Instalación local
1. Clonar repositorio
git clone https://github.com/Hualpa7/portfolio-photos.git
2. Entrar al proyecto
cd portfolio-photos
3. Instalar dependencias
npm install
4. Configurar variables de entorno

Crear archivo .env:

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

ACTION_SECRET=
SITE_URL=

5. Ejecutar proyecto
npm run dev
🚀 Deploy

El proyecto está desplegado en:

Vercel

Cada push al branch principal genera un deploy automático.

🔐 Seguridad
Uso de variables de entorno
Validación de enlaces mediante secrets
Separación entre claves públicas y privadas
Edge Functions protegidas

