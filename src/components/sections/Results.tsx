import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import beforeImg from "@/assets/before-fue.jpg";
import afterImg from "@/assets/after-fue.jpg";


type Case = {
  code: string;
  patient: string;
  gender: string;
  age: number;
  diagnosis: string;
  protocol: string;
  grafts?: string;
  duration: string;
  quote: string;
  initials: string;
  before: string;
  after: string;
};

const cases: Case[] = [
  {
    code: "Caso Clínico #01",
    patient: "Paciente M.S.",
    gender: "Masculino",
    age: 32,
    diagnosis: "Alopécia Androgenética Frontal",
    protocol: "Transplante FUE",
    grafts: "3.200 folículos",
    duration: "10 meses",
    quote: "Recuperei muito mais do que o cabelo — recuperei a confiança no espelho.",
    initials: "M.S.",
    before: beforeImg,
    after: afterImg,
  },
  {
    code: "Caso Clínico #02",
    patient: "Paciente A.R.",
    gender: "Feminino",
    age: 45,
    diagnosis: "Eflúvio Telógeno / Afinamento difuso",
    protocol: "Terapia Capilar Regenerativa — 6 sessões",
    duration: "6 meses",
    quote: "Os fios voltaram a ter vida. Hoje me sinto outra mulher.",
    initials: "A.R.",
    before: beforeImg,
    after: afterImg,
  },
  {
    code: "Caso Clínico #03",
    patient: "Paciente J.C.",
    gender: "Masculino",
    age: 40,
    diagnosis: "Calvície de Coroa — Grau IV (Norwood)",
    protocol: "Transplante DHI + Protocolo Clínico",
    grafts: "4.100 folículos",
    duration: "12 meses",
    quote: "O resultado superou todas as minhas expectativas, do início ao fim.",
    initials: "J.C.",
    before: beforeImg,
    after: afterImg,
  },
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
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
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-graphite shadow-[0_20px_60px_-20px_rgba(30,58,43,0.35)] lg:aspect-[16/9] [touch-action:pan-y]"
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        draggingRef.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
      onTouchMove={(e) => e.stopPropagation()}
    >

      <img
        src={after}
        alt="Depois do tratamento capilar"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        loading="lazy"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt="Antes do tratamento capilar"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>

      <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-graphite uppercase backdrop-blur">
        Antes
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold tracking-wider text-primary-foreground uppercase backdrop-blur">
        Depois
      </span>

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
  );
}

export function Results() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = cases.length;

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  };

  const current = cases[index];

  return (
    <section id="resultados" className="bg-cream pt-6 pb-10 lg:pt-8 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
            Resultados Reais
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-graphite sm:text-5xl">
            A diferença que a <span className="text-olive">ciência</span> faz
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Navegue entre casos reais e arraste o controle das imagens para comparar o antes e o depois.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-6">
          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Caso anterior"
            className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/80 text-graphite shadow-sm backdrop-blur transition-all hover:-translate-x-3 hover:border-olive hover:bg-white hover:text-olive md:flex lg:-translate-x-6 lg:hover:-translate-x-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo caso"
            className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-2 items-center justify-center rounded-full border border-border bg-white/80 text-graphite shadow-sm backdrop-blur transition-all hover:translate-x-3 hover:border-olive hover:bg-white hover:text-olive md:flex lg:translate-x-6 lg:hover:translate-x-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.code}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]"
              >
                <BeforeAfterSlider before={current.before} after={current.after} />

                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <span className="inline-flex items-center rounded-full bg-olive/10 px-3 py-1 text-xs font-semibold tracking-wider text-olive uppercase">
                    {current.code}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-graphite">
                    {current.patient}, {current.age} anos
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{current.gender}</p>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                      <dt className="text-muted-foreground">Diagnóstico</dt>
                      <dd className="text-right font-medium text-graphite">{current.diagnosis}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                      <dt className="text-muted-foreground">Protocolo</dt>
                      <dd className="text-right font-medium text-graphite">{current.protocol}</dd>
                    </div>
                    {current.grafts && (
                      <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                        <dt className="text-muted-foreground">Folículos implantados</dt>
                        <dd className="text-right font-medium text-graphite">{current.grafts}</dd>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">Resultado em</dt>
                      <dd className="text-right font-medium text-graphite">{current.duration}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 rounded-xl bg-cream p-5">
                    <p className="font-display text-sm italic leading-relaxed text-graphite-light">
                      “{current.quote}”
                    </p>
                    <p className="mt-3 text-xs font-semibold tracking-wider text-olive uppercase">
                      — {current.initials}, paciente
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile arrows + dots */}
          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Caso anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-graphite shadow-sm transition-colors hover:border-olive hover:text-olive md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              {cases.map((c, i) => (
                <button
                  key={c.code}
                  type="button"
                  aria-label={`Ir para ${c.code}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-olive" : "w-2 bg-border hover:bg-olive/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo caso"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-graphite shadow-sm transition-colors hover:border-olive hover:text-olive md:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
