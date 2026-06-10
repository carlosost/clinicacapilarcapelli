import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "O transplante capilar dói?",
    answer:
      "O procedimento é realizado com anestesia local, tornando-o praticamente indolor. Alguns pacientes relatam uma leve sensação de pressão durante a extração e implantação dos folículos. No pós-operatório, há um desconforto leve que é facilmente controlado com medicamentos simples e dura, em média, 48 horas.",
  },
  {
    question: "Quanto tempo dura a recuperação?",
    answer:
      "A maioria dos pacientes retorna às atividades normais em 3 a 5 dias. Os microcrustásculos caem naturalmente entre os dias 7 e 10. O crescimento dos novos fios começa a ser visível entre os meses 3 e 4, com o resultado final consolidado aos 9 a 12 meses.",
  },
  {
    question: "Mulheres também podem fazer o tratamento?",
    answer:
      "Sim. A clínica oferece protocolos específicos para alopécia feminina, incluindo terapia regenerativa, PRP capilar e transplante em casos selecionados. A avaliação tricológica determina o melhor caminho para cada paciente.",
  },
  {
    question: "Qual a diferença entre FUE e DHI?",
    answer:
      "O FUE (Follicular Unit Extraction) extrai e implanta folículos em etapas separadas, ideal para grandes áreas. O DHI (Direct Hair Implantation) usa uma canula especial (Choi Pen) para extrair e implantar simultaneamente, oferecendo maior densidade e controle de ângulo — ideal para áreas visíveis como a linha frontal.",
  },
  {
    question: "O resultado é permanente?",
    answer:
      "Sim. Os folículos transplantados são retirados de uma área resistente à DHT (hormônio causador da calvície) e mantêm essa característica em seu novo local. Com o acompanhamento correto e o tratamento de manutenção indicado, o resultado se mantém ao longo dos anos.",
  },
  {
    question: "Qual o investimento médio do procedimento?",
    answer:
      "O valor é definido após a avaliação tricológica, pois depende da área a ser tratada, da técnica escolhida e do número de folículos necessários. Oferecemos condições de pagamento parcelado e um plano de acompanhamento que inclui sessões de terapia capilar integradas.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Left Column — Title + Support Card */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
              Tire suas dúvidas
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-graphite sm:text-5xl">
              Dúvidas Frequentes sobre os Procedimentos
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Separamos as respostas para as principais perguntas de quem está considerando o tratamento.
            </p>

            {/* Support Card */}
            <div className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/10">
                  <MessageCircle className="h-5 w-5 text-olive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-graphite">
                    Ainda tem dúvidas?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fale com um especialista
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                Conversar via WhatsApp
              </a>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Resposta em até 15 minutos em horário comercial
              </p>
            </div>
          </div>

          {/* Right Column — Accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-border/60"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-graphite hover:no-underline sm:text-lg [&[data-state=open]>svg]:rotate-180">
                    <span className="pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
