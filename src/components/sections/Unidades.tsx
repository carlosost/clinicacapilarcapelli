import { MapPin, Phone, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const units = [
  {
    city: "Rio de Janeiro - RJ",
    badge: "Matriz",
    neighborhood: "Barra da Tijuca",
    address: "Av. das Américas, 4430 – Loja F (Barra Shopping) | CEP: 22640-102",
    cta: "Agendar na Barra",
    href: "https://wa.me/5521981680834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20unidade%20da%20Barra",
  },
  {
    city: "São Paulo - SP",
    badge: null,
    neighborhood: "Jardim Paulista",
    address: "Av. 9 de Julho, 3624 – Conjunto 81",
    cta: "Agendar nos Jardins",
    href: "https://wa.me/5521981680834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20unidade%20de%20S%C3%A3o%20Paulo",
  },
  {
    city: "Juiz de Fora - MG",
    badge: null,
    neighborhood: "Cascatinha / São Mateus",
    address: "Ladeira Alexandre Leonel, 221 – Loja 203",
    cta: "Agendar em JF",
    href: "https://wa.me/5521981680834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20unidade%20de%20Juiz%20de%20Fora",
  },
];

export function Unidades() {
  const { ref, isVisible } = useScrollReveal(0.12);

  return (
    <section id="unidades" className="bg-cream py-20 sm:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div
          className={`mb-14 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.2em] text-olive uppercase">
            Presença Nacional
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-graphite sm:text-4xl">
            Nossas Unidades
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-graphite-light">
            Atendimento de excelência em três cidades, com a mesma tecnologia e
            padrão Cappelli de restauração capilar.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit, i) => (
            <div
              key={unit.city}
              className={`group relative flex flex-col rounded-2xl border border-border/60 bg-white p-7 shadow-[0_8px_30px_-8px_rgba(30,58,43,0.08)] transition-all duration-700 ease-out hover:shadow-[0_16px_40px_-12px_rgba(30,58,43,0.14)] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              {/* Badge */}
              {unit.badge && (
                <span className="absolute right-5 top-5 rounded-full border border-olive/20 bg-olive/5 px-3 py-1 text-[10px] font-semibold tracking-wider text-olive uppercase">
                  {unit.badge}
                </span>
              )}

              {/* Icon & Title */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-olive/10">
                <MapPin className="h-5 w-5 text-olive" strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-xl font-bold tracking-tight text-graphite">
                {unit.city}
              </h3>
              <p className="mt-1 text-sm font-medium text-olive">
                {unit.neighborhood}
              </p>

              {/* Address */}
              <p className="mt-4 text-sm leading-relaxed text-graphite-light">
                {unit.address}
              </p>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-border/60" />

              {/* CTA */}
              <a
                href={unit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary/90 active:scale-100"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {unit.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
