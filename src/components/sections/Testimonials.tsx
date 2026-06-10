import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, BadgeCheck, MessageCircle } from "lucide-react";

import patient1 from "@/assets/patient-1.jpg";
import patient2 from "@/assets/patient-2.jpg";
import patient3 from "@/assets/patient-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Ricardo Almeida",
    role: "Empresário",
    image: patient1,
    text: "Após anos de insegurança, finalmente encontrei um time que entendeu minha necessidade. O resultado superou todas as expectativas. Hoje me olho no espelho e vejo o homem confiante que eu era.",
    rating: 5,
    verified: "Avaliação verificada via Google",
  },
  {
    id: 2,
    name: "Fernando Costa",
    role: "Executivo",
    image: patient2,
    text: "A abordagem médica da Clínica Cappelli é impecável. Cada detalhe do tratamento foi explicado com clareza e o acompanhamento pós-procedimento demonstrou o compromisso real com o paciente.",
    rating: 5,
    verified: "Avaliação verificada via Google",
  },
  {
    id: 3,
    name: "Gabriel Santos",
    role: "Advogado",
    image: patient3,
    text: "Minha esposa notou a diferença antes mesmo de eu contar. A naturalidade do resultado é o que mais me impressionou. Ninguém percebe que fiz transplante, apenas elogia meu cabelo.",
    rating: 5,
    verified: "Avaliação verificada via Google",
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-gold text-gold"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx: number) => {
    setActive((idx + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActive((prevIdx) => (prevIdx + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section id="depoimentos" className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
            Depoimentos
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-graphite sm:text-5xl">
            A voz de quem <span className="text-olive">confiou</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Histórias reais de transformação de pacientes que passaram pela Clínica Cappelli.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Fade masks on sides */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

          {/* Cards track */}
          <div className="relative mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-6">
              {testimonials.map((t, idx) => {
                const offset = idx - active;
                const isActive = idx === active;
                const isVisible = Math.abs(offset) <= 1;

                if (!isVisible) return null;

                return (
                  <div
                    key={t.id}
                    className={`
                      absolute inset-0 mx-auto w-full max-w-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${isActive ? "opacity-100 scale-100 translate-x-0 z-20" : ""}
                      ${offset === -1 ? "opacity-40 scale-90 -translate-x-[calc(100%+24px)] z-10" : ""}
                      ${offset === 1 ? "opacity-40 scale-90 translate-x-[calc(100%+24px)] z-10" : ""}
                    `}
                  >
                    <div className="rounded-2xl border border-border bg-white p-8 shadow-[0_8px_40px_-12px_rgba(30,58,43,0.12)] sm:p-10">
                      <StarRating count={t.rating} />

                      <p className="mt-5 font-display text-lg italic leading-relaxed text-graphite-light sm:text-xl">
                        “{t.text}”
                      </p>

                      <div className="mt-8 flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="h-14 w-14 rounded-full object-cover"
                            loading="lazy"
                            width={56}
                            height={56}
                          />
                          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-olive">
                            <BadgeCheck className="h-3.5 w-3.5 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-graphite">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                          <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-olive/80">
                            <BadgeCheck className="h-3 w-3" />
                            {t.verified}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Spacer to maintain height */}
              <div className="relative mx-auto w-full max-w-lg opacity-0">
                <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="mt-5 h-32 rounded bg-muted" />
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-muted" />
                      <div className="h-3 w-16 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-graphite transition-all duration-300 hover:border-olive/30 hover:bg-olive hover:text-white"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === active ? "w-8 bg-olive" : "w-2 bg-border hover:bg-olive/40"
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-graphite transition-all duration-300 hover:border-olive/30 hover:bg-olive hover:text-white"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
