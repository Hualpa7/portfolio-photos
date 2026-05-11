import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { services } from "@/data/services";
import { Loader2, AlertCircle, Clock } from "lucide-react";

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
  nombre: "", apellido: "", email: "", telefono: "",
  tipo_servicio: "", fecha: "", horario: "", presupuesto: "", mensaje: "",
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
  const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
  const [minDate, setMinDate] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((s) => ({ ...s, [k]: v }));

  // ─── Disponibilidad por fecha ────────────────────────────────────────────────
  useEffect(() => {
    if (!data.fecha) {
      setBookedHours([]);
      setAvailabilityLoaded(false);
      return;
    }

    // Cancelar fetch anterior si el usuario cambia la fecha rápido
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const check = async () => {
      setCheckingAvailability(true);
      setAvailabilityLoaded(false);

      try {
        // Trae TODOS los registros del día que no estén cancelados
        const { data: bookings, error } = await supabase
          .from("contacts")
          .select("horario, status")
          .eq("fecha", data.fecha)
          .neq("status", "cancelled"); // excluir sólo cancelados

        if (error) throw error;

        const booked = bookings
          .map((b) => b.horario)
          .filter(Boolean) as string[];

        setBookedHours(booked);

        // Si el horario que tenía elegido quedó ocupado, lo limpia
        if (data.horario && booked.includes(data.horario)) {
          set("horario", "");
          toast.info("El horario seleccionado ya no está disponible para ese día.");
        }
      } catch (err: unknown) {
        if ((err as { name?: string }).name !== "AbortError") {
          console.error("Error checking availability:", err);
          toast.error("No pudimos verificar la disponibilidad. Intenta de nuevo.");
        }
      } finally {
        setCheckingAvailability(false);
        setAvailabilityLoaded(true);
      }
    };

    check();
  }, [data.fecha]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Submit ──────────────────────────────────────────────────────────────────
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
      toast.error("Revisá los campos marcados.");
      return;
    }

    // Verificación extra en frontend: horario aún libre
    if (bookedHours.includes(parsed.data.horario)) {
      toast.error("Ese horario ya fue reservado. Por favor elegí otro.");
      set("horario", "");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const d = parsed.data;

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

      // ── Extraer el cuerpo SIEMPRE antes de evaluar ok ──────────────────────
      let result: { success?: boolean; error?: string; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        // respuesta vacía o no-JSON
      }

      if (!response.ok) {
        // El mensaje de error viene del backend en result.error
        const backendMsg =
          result?.error ||
          `Error del servidor (${response.status} ${response.statusText})`;
        throw new Error(backendMsg);
      }

      toast.success("¡Solicitud enviada! Te confirmaremos en menos de 24 horas.");
      setData(initial);
      setBookedHours([]);
      setAvailabilityLoaded(false);

      // Refresca disponibilidad del día para reflejar la nueva reserva
      if (d.fecha) {
        setData((prev) => ({ ...prev, fecha: d.fecha }));
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error desconocido al procesar la reserva.";
      console.error("Error al reservar:", err);
      toast.error(message);

      // Si el error es de horario ocupado (409), limpia el campo
      if (message.toLowerCase().includes("horario") || message.includes("409")) {
        set("horario", "");
        // Refrescar disponibilidad
        setData((prev) => ({ ...prev, fecha: prev.fecha }));
      }
    } finally {
      setLoading(false);
    }
  };

  const freeHours = AVAILABLE_HOURS.filter((h) => !bookedHours.includes(h));
  const allBooked = availabilityLoaded && data.fecha && freeHours.length === 0;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className={labelCls}>Nombre *</label>
        <input id="nombre" className={inputCls} value={data.nombre}
          onChange={(e) => set("nombre", e.target.value)}
          aria-invalid={!!errors.nombre} disabled={loading} />
        {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
      </div>

      {/* Apellido */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="apellido" className={labelCls}>Apellido *</label>
        <input id="apellido" className={inputCls} value={data.apellido}
          onChange={(e) => set("apellido", e.target.value)}
          aria-invalid={!!errors.apellido} disabled={loading} />
        {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input id="email" type="email" className={inputCls} value={data.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email} disabled={loading} />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="telefono" className={labelCls}>Teléfono</label>
        <input id="telefono" type="tel" className={inputCls} value={data.telefono}
          onChange={(e) => set("telefono", e.target.value)} disabled={loading} />
      </div>

      {/* Tipo de servicio */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tipo_servicio" className={labelCls}>Tipo de servicio</label>
        <select id="tipo_servicio" className={inputCls} value={data.tipo_servicio}
          onChange={(e) => set("tipo_servicio", e.target.value)} disabled={loading}>
          <option value="">Selecciona...</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fecha" className={labelCls}>Fecha *</label>
        <input id="fecha" type="date" className={inputCls} value={data.fecha}
          onChange={(e) => set("fecha", e.target.value)}
          min={minDate} aria-invalid={!!errors.fecha} disabled={loading} />
        {errors.fecha && <p className="text-xs text-destructive">{errors.fecha}</p>}
      </div>

      {/* Horario — ocupa columna completa en mobile, mitad en sm */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="horario" className={labelCls}>Horario *</label>

        {!data.fecha ? (
          <p className="flex items-center gap-1.5 text-xs text-foreground/50 py-2.5">
            <Clock className="h-3.5 w-3.5" /> Seleccioná una fecha para ver los horarios disponibles
          </p>
        ) : checkingAvailability ? (
          <div className="flex items-center gap-2 py-2.5 text-xs text-foreground/60">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Verificando disponibilidad…
          </div>
        ) : allBooked ? (
          <p className="flex items-center gap-1.5 text-xs text-amber-600 py-2.5">
            <AlertCircle className="h-3.5 w-3.5" />
            No hay horarios disponibles para este día. Probá con otra fecha.
          </p>
        ) : (
          /* Grid de botones de horario — más visual que un select */
          <div className="grid grid-cols-4 gap-2">
            {AVAILABLE_HOURS.map((hour) => {
              const isBooked = bookedHours.includes(hour);
              const isSelected = data.horario === hour;
              return (
                <button
                  key={hour}
                  type="button"
                  disabled={isBooked || loading}
                  onClick={() => set("horario", hour)}
                  className={[
                    "rounded-sm border px-2 py-2 text-xs font-medium transition-all",
                    isBooked
                      ? "border-input bg-input/40 text-foreground/30 line-through cursor-not-allowed"
                      : isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-input bg-background text-foreground/80 hover:border-primary hover:text-primary",
                  ].join(" ")}
                >
                  {hour}
                </button>
              );
            })}
          </div>
        )}

        {errors.horario && <p className="text-xs text-destructive">{errors.horario}</p>}
      </div>

      {/* Presupuesto */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="presupuesto" className={labelCls}>Presupuesto aproximado</label>
        <input id="presupuesto" className={inputCls} placeholder="Ej. $200.000"
          value={data.presupuesto}
          onChange={(e) => set("presupuesto", e.target.value)} disabled={loading} />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="mensaje" className={labelCls}>Mensaje *</label>
        <textarea id="mensaje" rows={5} className={inputCls} value={data.mensaje}
          onChange={(e) => set("mensaje", e.target.value)}
          aria-invalid={!!errors.mensaje} disabled={loading} />
        {errors.mensaje && <p className="text-xs text-destructive">{errors.mensaje}</p>}
      </div>

      {/* Submit */}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading || !!allBooked}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Procesando reserva…" : "Confirmar reserva"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;