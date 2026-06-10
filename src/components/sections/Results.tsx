import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical, Stethoscope, Scissors, Activity, Sparkles } from "lucide-react";
import beforeImg from "@/assets/before-fue.jpg";
import afterImg from "@/assets/after-fue.jpg";

const phases = [
  {
    icon: Stethoscope,
    title: "Consulta & Mapeamento",
    description: "Diagnóstico tricológico e análise genética personalizada.",
    time: "Dia 0",
  },
  {
    icon: Scissors,
    title: "Dia do Procedimento",
    description: "Transplante FUE com extração unitária de precisão.",
    time: "Mês 1",
  },
  {
    icon: Activity,
    title: "Acompanhamento 3 Meses",
    description: "Início do crescimento ativo e ajuste do protocolo regenerativo.",
    time: "Mês 3",
  },
  {
    icon: Sparkles,
    title: "Resultado Final",
    description: "Densidade total e naturalidade do fio consolidados.",
    time: "Mês 9",
  },
];

export function Results() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(x);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <section id="resultados" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
            Resultados Reais
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-graphite sm:text-5xl">
            A diferença que a <span className="text-olive">ciência</span> faz
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Arraste o controle abaixo para comparar o antes e o depois de um caso real conduzido pela nossa equipe médica.
          </p>
        </div>

        {/* Comparison + Case card */}
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Slider */}
          <div
            ref={containerRef}
            className="relative aspect-square w-full select-none overflow-hidden rounded-2xl bg-graphite shadow-[0_20px_60px_-20px_rgba(30,58,43,0.35)] lg:aspect-[4/3]"
            onMouseDown={(e) => {
              draggingRef.current = true;
              updateFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              draggingRef.current = true;
              updateFromClientX(e.touches[0].clientX);
            }}
          >
            {/* After (base) */}
            <img
              src={afterImg}
              alt="Depois do tratamento capilar"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="lazy"
              width={1024}
              height={1024}
            />
            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <img
                src={beforeImg}
                alt="Antes do tratamento capilar"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>

            {/* Labels */}
            <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-graphite uppercase backdrop-blur">
              Antes
            </span>
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold tracking-wider text-primary-foreground uppercase backdrop-blur">
              Depois
            </span>

            {/* Divider line + handle */}
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            />
            <button
              type="button"
              aria-label="Arrastar para comparar"
              className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-primary shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-110 active:scale-95"
              style={{ left: `${pos}%` }}
              onMouseDown={(e) => {
                e.stopPropagation();
                draggingRef.current = true;
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                draggingRef.current = true;
              }}
            >
              <GripVertical className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Case card */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-olive/10 px-3 py-1 text-xs font-semibold tracking-wider text-olive uppercase">
              Caso Clínico #214
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-graphite">
              Paciente M.S., 34 anos
            </h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                <dt className="text-muted-foreground">Diagnóstico</dt>
                <dd className="text-right font-medium text-graphite">Alopécia Androgenética</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                <dt className="text-muted-foreground">Tratamento</dt>
                <dd className="text-right font-medium text-graphite">
                  Transplante FUE <br />+ 4 sessões de Terapia Capilar
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                <dt className="text-muted-foreground">Folículos implantados</dt>
                <dd className="text-right font-medium text-graphite">3.200</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted-foreground">Resultado em</dt>
                <dd className="text-right font-medium text-graphite">9 meses</dd>
              </div>
            </dl>

            <div className="mt-8 rounded-xl bg-cream p-5">
              <p className="font-display text-sm italic leading-relaxed text-graphite-light">
                “Recuperei muito mais do que o cabelo — recuperei a minha
                confiança no espelho.”
              </p>
              <p className="mt-3 text-xs font-semibold tracking-wider text-olive uppercase">
                — M.S., paciente
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
              A Jornada do Paciente
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-graphite sm:text-4xl">
              Da consulta ao resultado final
            </h3>
          </div>

          <div className="relative mt-14">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
            <div className="grid gap-10 md:grid-cols-4 md:gap-6">
              {phases.map((phase, idx) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.title} className="group relative text-center">
                    {/* Dot / Icon */}
                    <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-olive/40 group-hover:bg-olive group-hover:shadow-[0_0_0_8px_rgba(30,58,43,0.08)]">
                      <Icon className="h-5 w-5 text-olive transition-colors duration-500 group-hover:text-white" />
                    </div>

                    <span className="mt-5 inline-block text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
                      {phase.time}
                    </span>
                    <h4 className="mt-2 font-display text-lg font-bold tracking-tight text-graphite transition-colors group-hover:text-olive">
                      {idx + 1}. {phase.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
