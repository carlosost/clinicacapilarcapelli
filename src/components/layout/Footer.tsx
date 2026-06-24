import { Instagram, MapPin, Clock, Phone, Mail } from "lucide-react";

const columns = [
  {
    title: "Tratamentos",
    links: [
      { label: "Transplante FUE", href: "#tratamentos" },
      { label: "Técnica DHI", href: "#tratamentos" },
      { label: "Terapia Capilar", href: "#tratamentos" },
      { label: "Barba e Sobrancelha", href: "#tratamentos" },
    ],
  },
  {
    title: "A Clínica",
    links: [
      { label: "Resultados", href: "#resultados" },
      { label: "Unidades", href: "#unidades" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Perguntas frequentes", href: "#jornada" },
      { label: "Contato", href: "#contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid gap-12 py-20 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-1">
              <span className="font-display text-2xl font-bold tracking-tight text-graphite">
                CAPPELLI
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                CLÍNICA CAPILAR
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-[1.7] text-graphite-light">
              Restauração capilar de alta performance conduzida por médicos
              certificados pela ISHRS. Tecnologia, ética e resultados
              imperceptíveis.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-2.5">
              <span className="flex h-2 w-2 rounded-full bg-olive" />
              <p className="text-xs font-medium text-graphite">
                Responsável Técnico:{" "}
                <span className="font-semibold">Dr. R. Cappelli — CRM/RJ 52.184</span>
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-sm font-semibold tracking-wide text-graphite">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-graphite-light transition-colors hover:text-olive"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold tracking-wide text-graphite">
              Visite-nos
            </h4>
            <ul className="mt-4 space-y-4 text-sm text-graphite-light">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <span className="leading-[1.65]">
                  Av. das Américas, 4.430 — Sala 301
                  <br />
                  Barra da Tijuca, Rio de Janeiro / RJ
                  <br />
                  CEP 22640-102
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <span className="leading-[1.65]">
                  Seg — Sex · 09h às 19h
                  <br />
                  Sábados · 09h às 13h
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <a
                  href="https://wa.me/5521981680834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-olive"
                >
                  +55 (21) 98168-0834
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <a
                  href="mailto:contato@clinicacappelli.com.br"
                  className="transition-colors hover:text-olive"
                >
                  contato@clinicacappelli.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-border py-8 sm:flex-row">
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
            Copyright © 2026 Clínica Cappelli. Todos os direitos reservados. Cappelli Transplante Ltda | CNPJ 45.279.669/0001-00.{" "}
            Termos de Uso
            <span className="mx-1.5 text-border">·</span>
            Políticas de Privacidade.{" "}
            Imagens e conteúdos estritamente informativos em conformidade com as normas do CFM.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/clinicacappelli/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-graphite-light transition-all duration-300 hover:-translate-y-0.5 hover:border-olive hover:text-olive"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
