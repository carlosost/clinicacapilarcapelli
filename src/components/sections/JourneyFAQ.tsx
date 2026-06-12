import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Stethoscope, Scissors, Activity, Sparkles, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Phase = {
  icon: typeof Stethoscope;
  time: string;
  title: string;
  description: string;
  faqs: { question: string; answer: string }[];
};

const phases: Phase[] = [
  {
    icon: Stethoscope,
    time: "Fase 1 — Dia 0",
    title: "Diagnóstico & Mapeamento Genético",
    description:
      "Avaliação tricológica completa com exame digital de alta resolução e análise dos fatores genéticos que influenciam a queda capilar.",
    faqs: [
      {
        question: "Qual o investimento médio da avaliação inicial?",
        answer:
          "A consulta tricológica é o primeiro passo e tem um valor acessível. O orçamento completo do tratamento é definido apenas após o mapeamento digital, pois depende da área, técnica e número de folículos. Trabalhamos com condições parceladas.",
      },
      {
        question: "Como funciona o exame digital de mapeamento?",
        answer:
          "Utilizamos tricoscopia digital com aumento de até 200x para mapear densidade folicular, miniaturização dos fios e padrão de calvície. O exame é indolor, não invasivo e gera um laudo visual usado para planejar todo o protocolo.",
      },
      {
        question: "Quanto tempo dura a consulta?",
        answer:
          "A avaliação completa leva entre 45 e 60 minutos, incluindo anamnese, exame digital, discussão do laudo e apresentação personalizada do protocolo recomendado.",
      },
    ],
  },
  {
    icon: Scissors,
    time: "Fase 2 — Mês 1",
    title: "O Dia do Procedimento (FUE)",
    description:
      "Transplante com extração folicular unitária de precisão, realizado em ambiente cirúrgico e com a equipe médica especializada.",
    faqs: [
      {
        question: "O procedimento dói? Como é a anestesia?",
        answer:
          "Utilizamos anestesia local com técnica de infiltração progressiva, o que torna o procedimento praticamente indolor. Há apenas uma leve sensação de pressão durante a extração e implantação dos folículos.",
      },
      {
        question: "Quanto tempo dura a cirurgia?",
        answer:
          "Em média de 6 a 8 horas, dependendo da quantidade de folículos a serem transplantados. Há pausas programadas para descanso, alimentação e conforto do paciente durante todo o dia.",
      },
      {
        question: "É necessário raspar a cabeça toda?",
        answer:
          "Não obrigatoriamente. Em técnicas como o DHI e protocolos de raspagem parcial, é possível preservar o cabelo da área frontal e superior, raspando apenas a área doadora — o que facilita o retorno discreto às atividades.",
      },
    ],
  },
  {
    icon: Activity,
    time: "Fase 3 — Semanas 1 a 4",
    title: "Pós-Procedimento & Recuperação",
    description:
      "Acompanhamento próximo nos primeiros dias, com protocolo regenerativo personalizado e orientações detalhadas para preservar os folículos implantados.",
    faqs: [
      {
        question: "Sentirei dor no pós-operatório?",
        answer:
          "O desconforto é leve e controlado com medicação simples prescrita pela equipe. Dura, em média, 48 horas. A maioria dos pacientes relata mais sensação de tensão e formigamento do que dor propriamente dita.",
      },
      {
        question: "Quando posso lavar o cabelo novamente?",
        answer:
          "A primeira lavagem é realizada na clínica, entre o 2º e 3º dia, com produtos específicos e técnica orientada. A partir daí, ensinamos como manter a higiene em casa sem comprometer os folículos.",
      },
      {
        question: "Em quanto tempo posso voltar ao trabalho?",
        answer:
          "A maioria dos pacientes retorna a atividades de escritório em 3 a 5 dias. Atividades físicas intensas devem ser retomadas apenas após 30 dias, conforme liberação médica.",
      },
    ],
  },
  {
    icon: Sparkles,
    time: "Fase 4 — Mês 9 a 12",
    title: "Evolução & Resultado Final",
    description:
      "Densidade total e naturalidade dos fios consolidados, com acompanhamento contínuo para garantir manutenção e longevidade do resultado.",
    faqs: [
      {
        question: "Os fios transplantados são permanentes?",
        answer:
          "Sim. Os folículos são retirados de uma área geneticamente resistente à DHT (hormônio causador da calvície) e mantêm essa característica em seu novo local — por isso o resultado é considerado definitivo.",
      },
      {
        question: "Como evoluem os resultados ao longo dos meses?",
        answer:
          "Entre o 3º e 4º mês começam a surgir os primeiros fios. Do 6º ao 9º mês há crescimento expressivo em densidade. O resultado final consolidado é observado entre o 9º e 12º mês.",
      },
      {
        question: "Preciso de tratamento de manutenção depois?",
        answer:
          "Recomendamos protocolos regenerativos periódicos (PRP, microagulhamento, terapia capilar) para preservar os fios nativos e potencializar o resultado do transplante ao longo dos anos.",
      },
    ],
  },
];

export function JourneyFAQ() {
  const [active, setActive] = useState(0);
  const current = phases[active];

  return (
    <motion.section id="jornada" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
            A Jornada Resolutiva
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-graphite sm:text-5xl">
            Da consulta ao <span className="text-olive">resultado final</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Navegue pelas fases do tratamento e explore as dúvidas mais comuns de cada etapa.
          </p>
        </div>

        {/* Desktop: Split Screen */}
        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-[1fr_1.3fr]">
          {/* Left — Vertical Timeline (selector) */}
          <div className="relative">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-border" aria-hidden />
            <ul className="space-y-2">
              {phases.map((phase, idx) => {
                const Icon = phase.icon;
                const isActive = idx === active;
                return (
                  <li key={phase.title}>
                    <button
                      type="button"
                      onClick={() => setActive(idx)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-white shadow-[0_10px_30px_-15px_rgba(30,58,43,0.25)]"
                          : "hover:bg-white/60"
                      }`}
                    >
                      <span
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isActive
                            ? "border-olive/40 bg-olive text-white shadow-[0_0_0_8px_rgba(30,58,43,0.08)]"
                            : "border-border bg-white text-olive group-hover:border-olive/40"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1 pt-1">
                        <span
                          className={`block text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                            isActive ? "text-gold" : "text-muted-foreground"
                          }`}
                        >
                          {phase.time}
                        </span>
                        <span
                          className={`mt-1 block font-display text-lg font-bold tracking-tight transition-colors ${
                            isActive ? "text-olive" : "text-graphite group-hover:text-olive"
                          }`}
                        >
                          {phase.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — Contextual FAQ panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-border bg-white p-8 shadow-sm lg:p-10"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
                  {current.time}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-graphite sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {current.description}
                </p>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-olive" />
                    <span className="text-xs font-semibold tracking-[0.2em] text-olive uppercase">
                      Dúvidas desta fase
                    </span>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {current.faqs.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`item-${idx}`}
                        className="border-b border-border/60"
                      >
                        <AccordionTrigger className="py-4 text-left text-sm font-semibold text-graphite hover:no-underline sm:text-base">
                          <span className="pr-4">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: vertical accordion flow */}
        <div className="mt-12 lg:hidden">
          <Accordion
            type="single"
            collapsible
            defaultValue="phase-0"
            className="w-full space-y-3"
          >
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <AccordionItem
                  key={phase.title}
                  value={`phase-${idx}`}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                >
                  <AccordionTrigger className="px-5 py-5 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-cream text-olive">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-semibold tracking-[0.18em] text-gold uppercase">
                          {phase.time}
                        </span>
                        <span className="mt-1 block font-display text-base font-bold tracking-tight text-graphite">
                          {phase.title}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {phase.description}
                    </p>

                    <div className="mt-5 border-t border-border/60 pt-4">
                      <div className="mb-3 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-olive" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-olive uppercase">
                          Dúvidas desta fase
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        {phase.faqs.map((faq, fIdx) => (
                          <AccordionItem
                            key={fIdx}
                            value={`mini-${idx}-${fIdx}`}
                            className="border-b border-border/60 last:border-b-0"
                          >
                            <AccordionTrigger className="py-3 text-left text-sm font-semibold text-graphite hover:no-underline">
                              <span className="pr-3">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-3">
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </motion.section>
  );
}
