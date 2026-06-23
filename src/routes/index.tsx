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
      <Hero />
      <Results />
      <JourneyFAQ />
      <Treatments />
      <Unidades />
      <ContactForm />
      <Footer />
    </div>
  );
}

