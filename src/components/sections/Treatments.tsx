import { useState } from "react";
import { Scissors, Sprout, Microscope, Droplets, Zap, HeartPulse, ArrowRight, Clock, CalendarCheck, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

type Category = "cirurgicos" | "clinicos";

type Treatment = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string;
  recovery: string;
  duration: string;
  bullets: string[];
};

const data: Record<Category, Treatment[]> = {
  cirurgicos: [
    {
      id: "fue",
      title: "Transplante Capilar FUE",
      description: "Extração folicular unitária com precisão microcirúrgica e cicatrização imperceptível.",
      icon: Scissors,
      details: "A técnica FUE (Follicular Unit Extraction) consiste na extração individual de unidades foliculares da área doadora, com punchs de precisão entre 0,7 e 0,9 mm, e reimplante estratégico nas áreas receptoras respeitando ângulo, densidade e direção naturais do fio.",
      recovery: "5 a 7 dias",
      duration: "6 a 8 horas",
      bullets: ["Sem corte linear ou suturas", "Cicatrizes pontuais imperceptíveis", "Retorno rápido às atividades", "Resultado natural e permanente"],
    },
    {
      id: "dhi",
      title: "Implante Capilar DHI",
      description: "Implante direto com canetas Choi para maior densidade e zero perda de folículos.",
      icon: Sprout,
      details: "A técnica DHI (Direct Hair Implantation) utiliza canetas implantadoras Choi que permitem o implante imediato do folículo sem necessidade de abertura prévia de canais — preservando 100% da viabilidade folicular.",
      recovery: "3 a 5 dias",
      duration: "7 a 9 horas",
      bullets: ["Maior densidade por cm²", "Sem raspagem da área receptora", "Ideal para entradas e coroa", "Preservação máxima do folículo"],
    },
    {
      id: "barba",
      title: "Transplante de Barba e Sobrancelha",
      description: "Restauração de áreas faciais com desenho artístico e foliculogênese natural.",
      icon: Microscope,
      details: "Procedimento de altíssima precisão estética que respeita a anatomia facial, o ângulo de saída do pelo e a densidade natural de cada região, devolvendo simetria e expressão.",
      recovery: "5 a 7 dias",
      duration: "4 a 6 horas",
      bullets: ["Desenho personalizado", "Resultado natural e simétrico", "Preenchimento de falhas", "Permanente após estabilização"],
    },
  ],
  clinicos: [
    {
      id: "regen",
      title: "Terapia Capilar Regenerativa",
      description: "PRP, exossomos e fatores de crescimento para reativar folículos miniaturizados.",
      icon: Droplets,
      details: "Protocolo regenerativo que combina plasma rico em plaquetas, exossomos e fatores de crescimento bioativos para estimular a vascularização e reativar folículos em fase de miniaturização.",
      recovery: "Imediato",
      duration: "60 a 90 minutos",
      bullets: ["Sem afastamento social", "Estimula crescimento ativo", "Reduz queda em 70%", "Sessões mensais"],
    },
    {
      id: "antiafinamento",
      title: "Protocolo Antiafinamento",
      description: "Plano combinado de medicações, mesoterapia e laser de baixa potência (LLLT).",
      icon: Zap,
      details: "Abordagem multimodal personalizada conforme tricograma e exames hormonais, integrando terapias tópicas, sistêmicas e fotobiomodulação para reverter o afinamento progressivo.",
      recovery: "Imediato",
      duration: "45 minutos",
      bullets: ["Diagnóstico tricológico completo", "Protocolo individualizado", "Monitoramento contínuo", "Resultados em 90 dias"],
    },
    {
      id: "tricologia",
      title: "Tricologia Médica Avançada",
      description: "Diagnóstico clínico com microscopia digital e plano terapêutico baseado em evidências.",
      icon: HeartPulse,
      details: "Avaliação aprofundada do couro cabeludo com microscopia digital de alta resolução, análise hormonal, nutricional e genética para construção de um plano terapêutico baseado em evidências.",
      recovery: "Imediato",
      duration: "60 minutos",
      bullets: ["Microscopia digital HD", "Painel laboratorial completo", "Acompanhamento médico", "Plano de 6 a 12 meses"],
    },
  ],
};

export function Treatments() {
  const [tab, setTab] = useState<Category>("cirurgicos");
  const [selected, setSelected] = useState<Treatment | null>(null);

  return (
    <section id="tratamentos" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
            Tratamentos & Protocolos
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-graphite sm:text-5xl">
            Soluções clínicas e cirúrgicas <span className="text-olive">sob medida</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada protocolo é desenhado a partir de um diagnóstico tricológico aprofundado, garantindo o resultado mais natural e duradouro para o seu caso.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-cream p-1.5">
            {[
              { id: "cirurgicos" as const, label: "Procedimentos Cirúrgicos" },
              { id: "clinicos" as const, label: "Terapias Clínicas" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-7 ${
                  tab === t.id
                    ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(30,58,43,0.25)]"
                    : "text-graphite-light hover:text-graphite"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div key={tab} className="mt-14 grid animate-fade-in gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data[tab].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-cream p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:border-olive/30 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(30,58,43,0.25)]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-olive/5 via-transparent to-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white ring-1 ring-olive/10 transition-all duration-500 group-hover:ring-olive/30">
                  <Icon className="h-5 w-5 text-olive" />
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-graphite">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-olive">
                  Saber mais
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-xl [&>button]:hidden">
          {selected && (
            <div className="flex min-h-full flex-col">
              {/* Header */}
              <div className="relative bg-cream px-8 pb-10 pt-12">
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                  className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-graphite transition-all hover:bg-graphite hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white ring-1 ring-olive/20">
                  <selected.icon className="h-6 w-6 text-olive" />
                </div>
                <SheetHeader className="mt-6 space-y-2 text-left">
                  <SheetTitle className="font-display text-3xl font-bold leading-tight tracking-tight text-graphite">
                    {selected.title}
                  </SheetTitle>
                  <SheetDescription className="text-base leading-relaxed text-muted-foreground">
                    {selected.description}
                  </SheetDescription>
                </SheetHeader>
              </div>

              {/* Body */}
              <div className="flex-1 space-y-8 px-8 py-10">
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
                    Sobre o procedimento
                  </h4>
                  <p className="mt-3 text-sm leading-[1.75] text-graphite-light">
                    {selected.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border bg-cream p-5">
                    <div className="flex items-center gap-2 text-olive">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-semibold tracking-wider uppercase">Duração</span>
                    </div>
                    <p className="mt-2 font-display text-lg font-bold text-graphite">{selected.duration}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-cream p-5">
                    <div className="flex items-center gap-2 text-olive">
                      <CalendarCheck className="h-4 w-4" />
                      <span className="text-xs font-semibold tracking-wider uppercase">Recuperação</span>
                    </div>
                    <p className="mt-2 font-display text-lg font-bold text-graphite">{selected.recovery}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
                    Diferenciais
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {selected.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-graphite-light">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="sticky bottom-0 border-t border-border bg-white/95 px-8 py-5 backdrop-blur">
                <a
                  href="#contato"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_rgba(30,58,43,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_8px_30px_rgba(30,58,43,0.35)]"
                >
                  Agendar avaliação para este tratamento
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
