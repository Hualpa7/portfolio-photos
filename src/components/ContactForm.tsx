import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { services } from "@/data/services";
import { Loader2, AlertCircle } from "lucide-react";

// Horarios disponibles (configurable)
const AVAILABLE_HOURS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const schema = z.object({
  nombre: z.string().trim().min(1, "Requerido").max(80),
  apellido: z.string().trim().min(1, "Requerido").max(80),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  tipo_servicio: z.string().trim().max(60).optional().or(z.literal("")),
  fecha: z.string().min(1, "Selecciona una fecha"),
  horario: z.string().min(1, "Selecciona un horario"),
  presupuesto: z.string().trim().max(60).optional().or(z.literal("")),
  mensaje: z.string().trim().min(1, "Cuéntanos un poco").max(2000),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  tipo_servicio: "",
  fecha: "",
  horario: "",
  presupuesto: "",
  mensaje: "",
};

const inputCls =
  "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";
const labelCls = "text-xs font-medium text-foreground/80";

const ContactForm = () => {
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookedHours, setBookedHours] = useState<string[]>([]);
  const [minDate, setMinDate] = useState("");

  // Establecer fecha mínima (hoy)
  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((s) => ({ ...s, [k]: v }));

  // Cargar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    if (!data.fecha) {
      setBookedHours([]);
      return;
    }

    const checkAvailability = async () => {
      setCheckingAvailability(true);
      try {
        const { data: bookings, error } = await supabase
          .from("contacts")
          .select("horario")
          .eq("fecha", data.fecha)
          .eq("status", "confirmed");

        if (error) throw error;

        const bookedHoursList = bookings.map((b) => b.horario).filter(Boolean);
        setBookedHours(bookedHoursList);
        
        // Limpiar horario si estaba seleccionado
        if (data.horario && bookedHoursList.includes(data.horario)) {
          set("horario", "");
          toast.info("El horario seleccionado ya no está disponible");
        }
      } catch (err) {
        console.error("Error checking availability:", err);
      } finally {
        setCheckingAvailability(false);
      }
    };

    checkAvailability();
  }, [data.fecha]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Revisa los campos marcados.");
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const d = parsed.data;
      console.log("📤 Llamando Edge Function con datos:", d);

      // Llamar a Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clever-service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            nombre: d.nombre,
            apellido: d.apellido,
            email: d.email,
            telefono: d.telefono || null,
            tipo_servicio: d.tipo_servicio || null,
            fecha: d.fecha,
            horario: d.horario,
            presupuesto: d.presupuesto || null,
            mensaje: d.mensaje,
          }),
        }
      );

      const result = await response.json();
      console.log("Respuesta Edge Function:", result);

      if (!response.ok) {
        throw new Error(result.error || "Error al procesar la reserva");
      }

      toast.success("¡Reserva confirmada! Te enviaremos un email de confirmación.");
      setData(initial);
      setBookedHours([]);
    } catch (err) {
      console.error("Error al reservar:", err);
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast.error(`No pudimos procesar tu reserva: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className={labelCls}>Nombre *</label>
        <input
          id="nombre"
          className={inputCls}
          value={data.nombre}
          onChange={(e) => set("nombre", e.target.value)}
          aria-invalid={!!errors.nombre}
          required
          disabled={loading}
        />
        {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="apellido" className={labelCls}>Apellido *</label>
        <input
          id="apellido"
          className={inputCls}
          value={data.apellido}
          onChange={(e) => set("apellido", e.target.value)}
          aria-invalid={!!errors.apellido}
          required
          disabled={loading}
        />
        {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input
          id="email"
          type="email"
          className={inputCls}
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email}
          required
          disabled={loading}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="telefono" className={labelCls}>Teléfono</label>
        <input
          id="telefono"
          type="tel"
          className={inputCls}
          value={data.telefono}
          onChange={(e) => set("telefono", e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tipo_servicio" className={labelCls}>Tipo de servicio</label>
        <select
          id="tipo_servicio"
          className={inputCls}
          value={data.tipo_servicio}
          onChange={(e) => set("tipo_servicio", e.target.value)}
          disabled={loading}
        >
          <option value="">Selecciona...</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fecha" className={labelCls}>Fecha *</label>
        <input
          id="fecha"
          type="date"
          className={inputCls}
          value={data.fecha}
          onChange={(e) => set("fecha", e.target.value)}
          min={minDate}
          aria-invalid={!!errors.fecha}
          disabled={loading}
        />
        {errors.fecha && <p className="text-xs text-destructive">{errors.fecha}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="horario" className={labelCls}>Horario *</label>
        <div className="flex items-center gap-2">
          <select
            id="horario"
            className={inputCls}
            value={data.horario}
            onChange={(e) => set("horario", e.target.value)}
            aria-invalid={!!errors.horario}
            disabled={loading || checkingAvailability || !data.fecha}
          >
            <option value="">
              {!data.fecha ? "Selecciona una fecha primero" : "Selecciona..."}
            </option>
            {AVAILABLE_HOURS.filter((hour) => !bookedHours.includes(hour)).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          {checkingAvailability && (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
        </div>
        {errors.horario && <p className="text-xs text-destructive">{errors.horario}</p>}
        {data.fecha && AVAILABLE_HOURS.filter((hour) => !bookedHours.includes(hour)).length === 0 && !checkingAvailability && (
          <p className="flex items-center gap-1 text-xs text-amber-600">
            <AlertCircle className="h-3 w-3" /> No hay horarios disponibles para esta fecha
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="presupuesto" className={labelCls}>Presupuesto aproximado</label>
        <input
          id="presupuesto"
          className={inputCls}
          placeholder="Ej. $200.000"
          value={data.presupuesto}
          onChange={(e) => set("presupuesto", e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="mensaje" className={labelCls}>Mensaje *</label>
        <textarea
          id="mensaje"
          rows={5}
          className={inputCls}
          value={data.mensaje}
          onChange={(e) => set("mensaje", e.target.value)}
          aria-invalid={!!errors.mensaje}
          required
          disabled={loading}
        />
        {errors.mensaje && <p className="text-xs text-destructive">{errors.mensaje}</p>}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Procesando reserva..." : "Confirmar reserva"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
