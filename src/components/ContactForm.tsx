import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { services } from "@/data/services";
import { Loader2 } from "lucide-react";

const schema = z.object({
  nombre: z.string().trim().min(1, "Requerido").max(80),
  apellido: z.string().trim().min(1, "Requerido").max(80),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  tipo_servicio: z.string().trim().max(60).optional().or(z.literal("")),
  fecha: z.string().optional().or(z.literal("")),
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
  presupuesto: "",
  mensaje: "",
};

const inputCls =
  "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";
const labelCls = "text-xs font-medium text-foreground/80";

const ContactForm = () => {
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((s) => ({ ...s, [k]: v }));

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
      const { error } = await supabase.from("contact_submissions").insert({
        nombre: d.nombre,
        apellido: d.apellido,
        email: d.email,
        mensaje: d.mensaje,
        telefono: d.telefono || null,
        tipo_servicio: d.tipo_servicio || null,
        fecha: d.fecha || null,
        presupuesto: d.presupuesto || null,
      });
      if (error) throw error;
      toast.success("¡Mensaje enviado! Te responderé muy pronto.");
      setData(initial);
    } catch (err) {
      console.error(err);
      toast.error("No pudimos enviar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nombre" className={labelCls}>Nombre *</label>
        <input id="nombre" className={inputCls} value={data.nombre}
          onChange={(e) => set("nombre", e.target.value)} aria-invalid={!!errors.nombre} required />
        {errors.nombre && <p className="text-xs text-destructive">{errors.nombre}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="apellido" className={labelCls}>Apellido *</label>
        <input id="apellido" className={inputCls} value={data.apellido}
          onChange={(e) => set("apellido", e.target.value)} aria-invalid={!!errors.apellido} required />
        {errors.apellido && <p className="text-xs text-destructive">{errors.apellido}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input id="email" type="email" className={inputCls} value={data.email}
          onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} required />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="telefono" className={labelCls}>Teléfono</label>
        <input id="telefono" type="tel" className={inputCls} value={data.telefono}
          onChange={(e) => set("telefono", e.target.value)} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tipo_servicio" className={labelCls}>Tipo de servicio</label>
        <select id="tipo_servicio" className={inputCls} value={data.tipo_servicio}
          onChange={(e) => set("tipo_servicio", e.target.value)}>
          <option value="">Selecciona...</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fecha" className={labelCls}>Fecha</label>
        <input id="fecha" type="date" className={inputCls} value={data.fecha}
          onChange={(e) => set("fecha", e.target.value)} />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="presupuesto" className={labelCls}>Presupuesto aproximado</label>
        <input id="presupuesto" className={inputCls} placeholder="Ej. $200.000"
          value={data.presupuesto} onChange={(e) => set("presupuesto", e.target.value)} />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="mensaje" className={labelCls}>Mensaje *</label>
        <textarea id="mensaje" rows={5} className={inputCls} value={data.mensaje}
          onChange={(e) => set("mensaje", e.target.value)} aria-invalid={!!errors.mensaje} required />
        {errors.mensaje && <p className="text-xs text-destructive">{errors.mensaje}</p>}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={loading}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
