import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck, Clock, Lock } from "lucide-react";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(100),
  whatsapp: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .max(20)
    .regex(/^[0-9()+\-\s]+$/, "Apenas números e símbolos válidos"),
  unidade: z.enum(["rio", "sp", "jf"], {
    message: "Selecione uma unidade",
  }),
  incomodo: z.enum(["queda", "calvicie", "barba", "outros"], {
    message: "Selecione uma opção",
  }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function ContactForm() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", unidade: "", incomodo: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Errors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-primary text-primary-foreground md:h-screen md:snap-start md:flex md:flex-col md:justify-center"
    >
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-olive-light/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Pré-Agendamento
            </span>

            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Dê o primeiro passo
              <br />
              rumo à sua{" "}
              <span className="italic text-gold">melhor versão</span>.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-[1.75] text-white/80 sm:text-lg">
              Receba o contato de um de nossos especialistas em até 24 horas.
              Avaliação inicial gratuita, sigilosa e sem compromisso.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                { icon: ShieldCheck, text: "Atendimento médico ético e sigiloso (CFM)" },
                { icon: Clock, text: "Retorno em até 24 horas úteis" },
                { icon: Lock, text: "Seus dados protegidos pela LGPD" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <Icon className="h-4 w-4 text-gold" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] backdrop-blur-md sm:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                    <CheckCircle2 className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">
                    Solicitação recebida.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-white/75">
                    Um especialista da Clínica Cappelli entrará em contato pelo
                    seu WhatsApp em até 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <Field label="Nome completo" error={errors.nome}>
                    <input
                      type="text"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      maxLength={100}
                      placeholder="Como prefere ser chamado"
                      className="form-input"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="WhatsApp" error={errors.whatsapp}>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm({ ...form, whatsapp: e.target.value })
                      }
                      maxLength={20}
                      placeholder="(21) 99999-9999"
                      className="form-input"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field
                    label="Unidade mais próxima"
                    error={errors.unidade}
                  >
                    <select
                      value={form.unidade}
                      onChange={(e) =>
                        setForm({ ...form, unidade: e.target.value })
                      }
                      className="form-input appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23d4b483' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                      }}
                    >
                      <option value="" disabled>
                        Selecione a unidade
                      </option>
                      <option value="rio">Rio de Janeiro — Barra Shopping</option>
                      <option value="sp">São Paulo — Jardim Paulista</option>
                      <option value="jf">Juiz de Fora — Cascatinha</option>
                    </select>
                  </Field>

                  <Field
                    label="Qual o seu principal incômodo?"
                    error={errors.incomodo}
                  >
                    <select
                      value={form.incomodo}
                      onChange={(e) =>
                        setForm({ ...form, incomodo: e.target.value })
                      }
                      className="form-input appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23d4b483' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                      }}
                    >
                      <option value="" disabled>
                        Selecione uma opção
                      </option>
                      <option value="queda">Queda de cabelo</option>
                      <option value="calvicie">Calvície avançada</option>
                      <option value="barba">Falhas na barba</option>
                      <option value="outros">Outros</option>
                    </select>
                  </Field>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg border border-gold bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.45)] disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Solicitar Contato de um Especialista"
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-white/55">
                    Ao enviar, você concorda com nossa Política de Privacidade.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-gold">{error}</span>
      ) : null}
    </label>
  );
}
