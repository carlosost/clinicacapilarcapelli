import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Treatments } from "@/components/sections/Treatments";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Play } from "lucide-react";
import heroImage from "@/assets/hero-clinic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clínica Cappelli — Tratamento Capilar Premium" },
      { name: "description", content: "Tratamentos capilares de alta performance com tecnologia de ponta. Recupere sua confiança com quem entende de cabelo." },
      { property: "og:title", content: "Clínica Cappelli — Tratamento Capilar Premium" },
      { property: "og:description", content: "Tratamentos capilares de alta performance com tecnologia de ponta." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-cream">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column — Text */}
            <div className="pt-[72px] lg:pt-0">
              {/* Badge */}
              <div className="hero-animate hero-animate-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-olive/20 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wider text-olive uppercase backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-olive" />
                  </span>
                  Referência em Restauração Capilar
                </span>
              </div>

              {/* Heading */}
              <h1 className="hero-animate hero-animate-2 mt-6 font-display text-4xl font-bold leading-[1.12] tracking-tight text-graphite sm:text-5xl lg:text-[3.25rem]">
                A arte e a ciência
                <br />
                por trás da{" "}
                <span className="text-olive">restauração</span>
                <br />
                do seu cabelo e da
                <br />
                sua <span className="text-olive">autoestima</span>.
              </h1>

              {/* Subtext */}
              <p className="hero-animate hero-animate-3 mt-6 max-w-xl text-base leading-[1.7] text-graphite-light sm:text-lg">
                Cada tratamento é meticulosamente personalizado e comandado por
                médicos especialistas certificados pelo ISHRS. Tecnologia de
                ponta, diagnóstico tricológico avançado e resultados que se
                confundem com a naturalidade.
              </p>

              {/* CTAs */}
              <div className="hero-animate hero-animate-4 mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/agendar"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_rgba(30,58,43,0.25)] transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-[0_8px_30px_rgba(30,58,43,0.35)] active:scale-100"
                >
                  Agendar Consulta
                </a>
                <a
                  href="/tratamentos"
                  className="group inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:shadow-sm active:scale-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-olive/10 transition-colors group-hover:bg-olive/20">
                    <Play className="h-3.5 w-3.5 fill-olive text-olive" />
                  </span>
                  Conheça nossa abordagem
                </a>
              </div>
            </div>

            {/* Right Column — Image */}
            <div className="hero-animate hero-animate-3 hidden lg:block">
              <div className="animate-float relative mx-auto w-full max-w-[520px]">
                <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(30,58,43,0.2)]">
                  <img
                    src={heroImage}
                    alt="Consulta médica especializada em restauração capilar na Clínica Cappelli"
                    className="h-[560px] w-full object-cover"
                    width={1024}
                    height={1024}
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-6 -left-6 rounded-xl border border-border/50 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/10">
                      <svg className="h-5 w-5 text-olive" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-graphite">Certificação ISHRS</p>
                      <p className="text-xs text-muted-foreground">Padrão internacional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Metrics Strip */}
          <div className="hero-animate hero-animate-6 mt-16 border-t border-border/60 pt-8 lg:mt-20">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <p className="font-display text-3xl font-bold tracking-tight text-graphite">+15</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Anos de Experiência</p>
              </div>
              <div className="flex flex-col items-center border-y border-border/60 py-6 text-center sm:border-x sm:border-y-0 sm:px-8 sm:py-0 sm:items-center">
                <p className="font-display text-3xl font-bold tracking-tight text-graphite">ISHRS</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Médicos Especialistas</p>
              </div>
              <div className="flex flex-col items-center text-center sm:items-end sm:text-right">
                <p className="font-display text-3xl font-bold tracking-tight text-graphite">+5.000</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Pacientes Satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Social Proof Strip */}
      <section className="border-y border-border bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Referência em tratamento capilar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale">
            {["Revista Saúde", "Estética In", "Medical Hair", "Tricologia BR", "Forbes Health"].map((name) => (
              <span key={name} className="font-display text-lg font-semibold text-foreground">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Treatments />
      <Results />
    </div>
  );
}
