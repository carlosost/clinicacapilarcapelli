import { useState } from "react";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const units = [
  {
    id: "rj",
    city: "Rio de Janeiro",
    state: "RJ",
    badge: "Matriz",
    neighborhood: "Barra da Tijuca",
    address: "Av. das Américas, 4430 – Loja F",
    reference: "Barra Shopping",
    zip: "CEP 22640-102",
    cta: "Falar com a Barra no WhatsApp",
    href: "https://wa.me/5521981680834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20unidade%20da%20Barra",
  },
  {
    id: "sp",
    city: "São Paulo",
    state: "SP",
    badge: null,
    neighborhood: "Jardim Paulista",
    address: "Av. 9 de Julho, 3624 – Conjunto 81",
    reference: "Próximo à Av. Paulista",
    zip: "Jardim Paulista",
    cta: "Falar com Jardins no WhatsApp",
    href: "https://wa.me/5521981680834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20unidade%20de%20S%C3%A3o%20Paulo",
  },
  {
    id: "jf",
    city: "Juiz de Fora",
    state: "MG",
    badge: null,
    neighborhood: "Cascatinha / São Mateus",
    address: "Ladeira Alexandre Leonel, 221 – Loja 203",
    reference: "Região central nobre",
    zip: "Cascatinha",
    cta: "Falar com Juiz de Fora no WhatsApp",
    href: "https://wa.me/5521981680834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20unidade%20de%20Juiz%20de%20Fora",
  },
];

export function Unidades() {
  const { ref, isVisible } = useScrollReveal(0.12);
  const [activeId, setActiveId] = useState(units[0].id);
  const active = units.find((u) => u.id === activeId)!;

  return (
    <section id="unidades" className="bg-white py-20 sm:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* LEFT — Minimal Tab Menu */}
          <div className="flex flex-col">
            <span className="mb-3 text-xs font-semibold tracking-[0.2em] text-olive uppercase">
              Presença Nacional
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-graphite sm:text-4xl lg:text-[2.75rem]">
              Presença Estratégica
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-graphite-light">
              Três endereços selecionados para entregar a mesma experiência premium da Cappelli,
              onde quer que você esteja.
            </p>

            {/* Tabs: horizontal scroll on mobile, vertical on lg */}
            <ul className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scroll-smooth snap-x snap-mandatory lg:mx-0 lg:mt-10 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {units.map((u) => {
                const isActive = u.id === activeId;
                return (
                  <li key={u.id} className="shrink-0 snap-start lg:shrink lg:snap-align-none">
                    <button
                      type="button"
                      onClick={() => setActiveId(u.id)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full items-center gap-4 rounded-full border px-5 py-3 text-left transition-all duration-300 lg:rounded-none lg:border-0 lg:border-l-2 lg:py-5 lg:pl-6 lg:pr-3 ${
                        isActive
                          ? "border-olive bg-olive/[0.06] lg:bg-olive/[0.04]"
                          : "border-border/50 opacity-70 hover:opacity-100 hover:border-olive/40 lg:opacity-50"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-display text-sm font-semibold tracking-tight transition-colors lg:text-lg ${
                            isActive ? "text-graphite" : "text-graphite-light"
                          }`}
                        >
                          {u.city} - {u.state}
                        </p>
                        <p className="mt-0.5 hidden text-xs font-medium tracking-wide text-graphite-light lg:block">
                          {u.neighborhood}
                        </p>
                      </div>
                      <ArrowRight
                        className={`hidden h-4 w-4 shrink-0 transition-all duration-300 lg:block ${
                          isActive
                            ? "translate-x-0 text-olive opacity-100"
                            : "-translate-x-1 text-graphite-light opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — Dynamic Panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-olive-dark p-8 shadow-[0_20px_60px_-20px_rgba(30,58,43,0.4)] sm:p-12 lg:min-h-[480px]">
              {/* Decorative accent */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cream/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cream/[0.06] blur-3xl" />

              <div key={active.id} className="relative flex h-full flex-col animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/15 backdrop-blur-sm">
                    <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </div>
                  {active.badge && (
                    <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-gold uppercase">
                      {active.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-8 font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
                  {active.city}
                  <span className="text-gold">, {active.state}</span>
                </h3>
                <p className="mt-2 text-base font-medium text-gold-muted">{active.neighborhood}</p>

                {/* Divider */}
                <div className="my-8 h-px w-16 bg-gold/30" />

                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-gold/75 uppercase">
                      Endereço
                    </p>
                    <p className="mt-1.5 text-lg leading-relaxed text-cream/90">{active.address}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-gold/75 uppercase">
                      Referência
                    </p>
                    <p className="mt-1.5 text-base leading-relaxed text-cream/80">
                      {active.reference} · {active.zip}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex w-fit items-center justify-center gap-2.5 rounded-full border border-cream/40 bg-cream/10 px-7 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cream hover:bg-cream/20 active:scale-100 sm:mt-12"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                  {active.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
