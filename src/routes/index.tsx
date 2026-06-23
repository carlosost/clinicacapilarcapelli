import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Treatments } from "@/components/sections/Treatments";
import { Unidades } from "@/components/sections/Unidades";
import { Results } from "@/components/sections/Results";
import { JourneyFAQ } from "@/components/sections/JourneyFAQ";
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
    <div className="min-h-screen bg-graphite">
      <Header />

      <div className="md:h-screen md:w-full md:snap-start md:shrink-0 md:flex md:flex-col md:justify-center">
        <Hero />
      </div>
      <div id="resultados" className="md:h-screen md:w-full md:snap-start md:shrink-0 md:flex md:flex-col md:justify-center">
        <Results />
      </div>
      <div id="jornada" className="md:h-screen md:w-full md:snap-start md:shrink-0 md:flex md:flex-col md:justify-center md:overflow-hidden">
        <JourneyFAQ />
      </div>
      <div id="tratamentos" className="md:h-screen md:w-full md:snap-start md:shrink-0 md:flex md:flex-col md:justify-center md:overflow-hidden">
        <Treatments />
      </div>
      <div id="unidades" className="md:h-screen md:w-full md:snap-start md:shrink-0 md:flex md:flex-col md:justify-center">
        <Unidades />
      </div>
      <div className="md:h-screen md:w-full md:snap-start md:shrink-0 md:flex md:flex-col md:justify-center">
        <ContactForm />
      </div>
      <div className="md:snap-start">
        <Footer />
      </div>
    </div>
  );
}

