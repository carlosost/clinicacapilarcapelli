import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Treatments } from "@/components/sections/Treatments";
import { Unidades } from "@/components/sections/Unidades";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";



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

      <Hero />

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

      <div id="tratamentos"><Treatments /></div>
      <div id="resultados"><Results /></div>
      <div id="depoimentos"><Testimonials /></div>
      <div id="faq"><FAQ /></div>
      <Unidades />
      <ContactForm />
      <Footer />
    </div>
  );
}

