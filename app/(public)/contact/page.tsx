import React from "react";
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const partnerOffices = [
  {
    title: "SystemPlus • San Marcos, Sucre",
    contact: "Gilberto Guerrero",
    phones: ["311 417 4048", "311 693 5117"],
    landline: "295 4410",
    email: "systempluscolombia@hotmail.com",
    highlight: "Aliado regional y soporte local",
  },
  {
    title: "Dirección Atlántico",
    contact: "Larry José Morales J.",
    phones: ["301 397 5504"],
    location: "Barranquilla, Atlántico",
    email: "informacion@edsoft.com",
    highlight: "Contacto comercial y académico",
  },
];

type ContactChannel = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  helper?: string;
};

const serviceChannels: ContactChannel[] = [
  {
    label: "Información general",
    value: "informacion@edsoft.com",
    href: "mailto:informacion@edsoft.com",
    icon: Mail,
  },
  {
    label: "Información EADU Atlántico",
    value: "informacion@eaduatlantico.com",
    href: "mailto:informacion@eaduatlantico.com",
    icon: Mail,
  },
  {
    label: "Soporte Edsoft",
    value: "soporte@edsoft.com",
    href: "mailto:soporte@edsoft.com",
    icon: MessageCircle,
  },
  {
    label: "Soporte EADU Atlántico",
    value: "soporte@eaduatlantico.com",
    href: "mailto:soporte@eaduatlantico.com",
    icon: MessageCircle,
  },
  {
    label: "Línea directa",
    value: "+57 311 417 4048",
    helper: "Lunes a viernes · 8:00 a.m. - 6:00 p.m.",
    href: "tel:+573114174048",
    icon: Phone,
  },
  {
    label: "Atención en Atlántico",
    value: "Barranquilla, Atlántico",
    helper: "Citas con Larry José Morales",
    href: "https://maps.google.com/?q=Barranquilla+Atlantico",
    icon: MapPin,
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/edsoft" },
  { label: "X / Twitter", href: "https://x.com/edsoft" },
  { label: "YouTube", href: "https://youtube.com/@edsoft" },
  { label: "LinkedIn", href: "https://linkedin.com/company/edsoft" },
];

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30";

function ContactPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#020617] px-6 py-16 text-center shadow-[0_25px_120px_rgba(2,6,23,0.6)] sm:px-12">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: "url('/assets/clientService@2x.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#041c3a] via-[#041c3a]/90 to-[#450051]" />
          <div className="absolute -top-32 left-[10%] h-64 w-64 rounded-full bg-[#00c2ff]/30 blur-[140px]" />
          <div className="absolute -bottom-24 right-[5%] h-72 w-72 rounded-full bg-[#ff4ecd]/30 blur-[180px]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm uppercase tracking-[0.3em] text-white/70">
              <Sparkles className="h-4 w-4" />
              Estamos aquí para ayudarte
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hablemos sobre tu institución
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              Agenda una conversación con nuestro equipo, recibe soporte inmediato o
              descubre cómo Edsoft potencia la gestión académica en tu región.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:informacion@edsoft.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#05152f] transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Escribir ahora
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:+573114174048"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
              >
                Llamar soporte
                <Phone className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          {partnerOffices.map((office) => (
            <article
              key={office.title}
              className="relative overflow-hidden rounded-3xl bg-white p-8 text-slate-900 shadow-lg ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-x-6 top-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5f27ff]">
                <Building2 className="h-4 w-4" />
                Oficina autorizada
              </div>
              <div className="pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {office.highlight}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                  {office.title}
                </h2>
                <p className="mt-2 text-base text-slate-600">{office.contact}</p>
                {office.location && (
                  <p className="mt-1 text-sm text-slate-500">{office.location}</p>
                )}
                <div className="mt-6 space-y-3 text-sm text-slate-600">
                  {office.phones.map((phoneNumber) => (
                    <div key={phoneNumber} className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#5f27ff]" />
                      <a href={`tel:+57${phoneNumber.replace(/\s/g, "")}`} className="hover:text-[#5f27ff]">
                        {phoneNumber}
                      </a>
                    </div>
                  ))}
                  {office.landline && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[#5f27ff]" />
                      <a href="tel:+5752954410" className="hover:text-[#5f27ff]">
                        {office.landline}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#5f27ff]" />
                    <a href={`mailto:${office.email}`} className="hover:text-[#5f27ff]">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_15px_60px_rgba(5,12,30,0.45)] backdrop-blur">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              <Send className="h-5 w-5" />
              Escríbenos directamente
            </div>
            <h3 className="mt-4 text-3xl font-semibold">Cuéntanos sobre tu proyecto</h3>
            <p className="mt-2 text-sm text-white/70">
              Diligencia el formulario y uno de nuestros expertos te responderá en menos de 24 horas hábiles.
            </p>

            <form
              className="mt-8 space-y-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-white/80">
                  Nombre completo
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre"
                    required
                    className={fieldClassName}
                  />
                </label>
                <label className="text-sm font-medium text-white/80">
                  Correo electrónico
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@institucion.edu.co"
                    required
                    className={fieldClassName}
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-white/80">
                  Teléfono o WhatsApp
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Ej: +57 301 234 5678"
                    className={fieldClassName}
                  />
                </label>
                <label className="text-sm font-medium text-white/80">
                  Tema de interés
                  <input
                    type="text"
                    name="topic"
                    placeholder="Implementación, soporte, demo..."
                    className={fieldClassName}
                  />
                </label>
              </div>
              <label className="text-sm font-medium text-white/80">
                Mensaje
                <textarea
                  name="message"
                  placeholder="¿Cómo podemos ayudarte?"
                  rows={4}
                  className={`${fieldClassName} resize-none`}
                />
              </label>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/60">
                  Al enviar tus datos aceptas ser contactado para fines comerciales y de soporte.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#05152f] transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Enviar mensaje
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </article>

          <aside className="rounded-3xl border border-white/10 bg-[#020817] p-8 shadow-[0_20px_80px_rgba(2,6,23,0.65)]">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              <MessageCircle className="h-5 w-5" />
              Canales directos
            </div>
            <h3 className="mt-4 text-3xl font-semibold">Soporte y acompañamiento</h3>
            <p className="mt-2 text-sm text-white/60">
              Elige el canal que prefieras. Respondemos muy rápido, sin importar la ciudad en la que te encuentres.
            </p>

            <ul className="mt-6 space-y-4">
              {serviceChannels.map(({ label, value, href, icon: Icon, helper }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-base text-white/80">{value}</p>
                      {helper && <p className="text-xs text-white/60">{helper}</p>}
                    </span>
                    <ArrowUpRight className="ml-auto mt-1 h-5 w-5 text-white/60 transition group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Síguenos en redes
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
                  >
                    {label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default ContactPage;
