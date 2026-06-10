import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";

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
      <section className="relative flex min-h-[100dvh] items-center bg-cream">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div className="pt-[72px] lg:pt-0">
              <span className="mb-4 inline-block rounded-full bg-olive/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-olive uppercase">
                Premium Hair Restoration
              </span>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-graphite sm:text-5xl lg:text-6xl">
                Recupere sua
                <br />
                <span className="text-olive">confiança capilar</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-graphite-light sm:text-lg">
                Tecnologia de ponta em transplante capilar, tricologia avançada e tratamentos
                personalizados. Resultados naturais que transformam vidas.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/agendar"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary/90 active:scale-100"
                >
                  Agendar Avaliação Grátis
                </a>
                <a
                  href="/tratamentos"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted active:scale-100"
                >
                  Conhecer Tratamentos
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div>
                  <p className="font-display text-2xl font-bold text-graphite">15+</p>
                  <p className="text-xs text-muted-foreground">Anos de experiência</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-display text-2xl font-bold text-graphite">8.500+</p>
                  <p className="text-xs text-muted-foreground">Procedimentos realizados</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-display text-2xl font-bold text-graphite">98%</p>
                  <p className="text-xs text-muted-foreground">Taxa de satisfação</p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="hidden lg:flex lg:justify-end">
              <div className="relative h-[500px] w-full max-w-[480px] overflow-hidden rounded-2xl bg-olive/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-olive/10 flex items-center justify-center">
                      <svg className="h-8 w-8 text-olive" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                      </svg>
                    </div>
                    <p className="font-display text-lg text-olive font-semibold">Imagem Hero</p>
                    <p className="text-sm text-muted-foreground">Consultório premium da clínica</p>
                  </div>
                </div>
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
    </div>
  );
}
