import { useEffect, useRef } from "react";
import { Play } from "lucide-react";

/**
 * Hero — "Flow da Renovação"
 * Camada 1: canvas com partículas douradas/cremes em fluxo orgânico assimétrico.
 * Camada 2: tipografia serifada centralizada com overlay sutil para legibilidade.
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      life: number;
      maxLife: number;
      hue: "gold" | "cream";
      baseAlpha: number;
    };

    const palette = {
      gold: [
        "rgba(201, 162, 92, ALPHA)",
        "rgba(224, 191, 124, ALPHA)",
        "rgba(180, 140, 70, ALPHA)",
      ],
      cream: [
        "rgba(248, 244, 235, ALPHA)",
        "rgba(255, 252, 245, ALPHA)",
        "rgba(232, 224, 208, ALPHA)",
      ],
    };

    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Densidade adaptativa
    const targetCount = () => {
      const area = width * height;
      const base = Math.round(area / 4200);
      return Math.max(140, Math.min(prefersReduced ? 90 : 380, base));
    };

    const spawn = (initial = false): Particle => {
      // Origem fortemente deslocada para a direita-baixo (abraça o texto)
      const originX = width * (0.62 + Math.random() * 0.35);
      const originY = height * (0.55 + Math.random() * 0.45);
      const spread = Math.min(width, height) * 0.3;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * spread;
      const x = initial
        ? Math.random() * width
        : originX + Math.cos(angle) * radius;
      const y = initial
        ? Math.random() * height
        : originY + Math.sin(angle) * radius * 0.7;

      const hue: Particle["hue"] = Math.random() > 0.45 ? "gold" : "cream";
      const r = Math.random() * 1.4 + 0.3;
      const maxLife = 280 + Math.random() * 420;
      return {
        x,
        y,
        vx: (Math.random() - 0.3) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
        r,
        life: initial ? Math.random() * maxLife : 0,
        maxLife,
        hue,
        baseAlpha: 0.2 + Math.random() * 0.5,
      };
    };

    const seed = () => {
      particles.length = 0;
      const n = targetCount();
      for (let i = 0; i < n; i++) particles.push(spawn(true));
    };

    resize();
    seed();

    // Campo de fluxo ondulado (sem dependência externa)
    let t = 0;
    const flow = (x: number, y: number) => {
      const nx = x / width;
      const ny = y / height;
      const a =
        Math.sin(nx * 3.1 + t * 0.6) * 0.8 +
        Math.cos(ny * 2.4 - t * 0.4) * 0.6 +
        Math.sin((nx + ny) * 4.0 + t * 0.3) * 0.4;
      return a * Math.PI; // ângulo
    };

    let raf = 0;
    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(48, now - lastTime) / 16.67; // ~60fps base
      lastTime = now;
      const speed = speedRef.current;

      t += 0.0025 * dt * speed;

      // Trilho luminoso — limpa com leve desvanecimento para criar rastros
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = flow(p.x, p.y);
        const force = 0.35 * speed;
        p.vx += Math.cos(angle) * force * 0.04 * dt;
        p.vy += Math.sin(angle) * force * 0.04 * dt;
        // Bias suave para a direita (assimetria do fluxo)
        p.vx += 0.012 * speed * dt;

        // Amortecimento
        p.vx *= 0.965;
        p.vy *= 0.965;

        p.x += p.vx * dt * (0.9 + speed * 0.4);
        p.y += p.vy * dt * (0.9 + speed * 0.4);
        p.life += dt;

        // Reciclagem
        const out =
          p.x < -20 ||
          p.x > width + 20 ||
          p.y < -20 ||
          p.y > height + 20 ||
          p.life > p.maxLife;
        if (out) {
          particles[i] = spawn(false);
          continue;
        }

        // Alpha em curva (fade in/out)
        const lifeRatio = p.life / p.maxLife;
        const fade =
          lifeRatio < 0.15
            ? lifeRatio / 0.15
            : lifeRatio > 0.8
              ? Math.max(0, 1 - (lifeRatio - 0.8) / 0.2)
              : 1;

        // Máscara de legibilidade — atenua partículas na zona de texto
        // (faixa horizontal central onde título/subtítulo vivem)
        const nx = p.x / width;
        const ny = p.y / height;
        const textCenterY = 0.5;
        const textBandY = Math.max(0, 1 - Math.abs(ny - textCenterY) / 0.32);
        const textBandX = Math.max(0, 1 - Math.abs(nx - 0.5) / 0.45);
        const textMask = textBandX * textBandY; // 0..1 dentro da zona de texto
        const readability = 1 - textMask * 0.78;

        const alpha = p.baseAlpha * fade * readability;

        const colors = palette[p.hue];
        const color = colors[i % colors.length].replace(
          "ALPHA",
          alpha.toFixed(3),
        );

        // Glow
        ctx.beginPath();
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        glow.addColorStop(0, color);
        glow.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
        ctx.fillStyle = glow;
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-graphite"
    >
      {/* Camada 1 — Canvas animado */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Overlay 1 — gradiente vertical de contraste sobre o canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(26,26,26,0.85)_0%,rgba(26,26,26,0.55)_38%,rgba(26,26,26,0.35)_62%,rgba(26,26,26,0.7)_100%)]"
      />

      {/* Overlay 2 — vinheta radial à esquerda, abrindo espaço de leitura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_30%_45%,rgba(20,30,25,0.55)_0%,rgba(20,30,25,0.25)_45%,transparent_75%)]"
      />

      {/* Overlay 3 — fade para a próxima seção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-graphite"
      />


      {/* Camada 2 — Conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-28 lg:px-8">
        <div className="hero-animate hero-animate-1 mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-graphite/40 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Referência em Restauração Capilar
          </span>
        </div>

        <h1 className="hero-animate hero-animate-2 mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl">
          A arte e a <span className="italic text-gold">ciência</span> por trás
          <br className="hidden sm:block" /> da restauração do seu cabelo
          <br className="hidden sm:block" /> e da sua{" "}
          <span className="italic text-gold">autoestima</span>.
        </h1>

        <p className="hero-animate hero-animate-3 mx-auto mt-7 max-w-2xl text-base leading-[1.7] text-cream/80 sm:text-lg">
          Tratamentos meticulosamente personalizados, conduzidos por médicos
          certificados pelo ISHRS. Tecnologia FUE de ponta, diagnóstico
          tricológico avançado e resultados que se confundem com a naturalidade.
        </p>

        <div className="hero-animate hero-animate-4 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-graphite shadow-[0_10px_40px_-10px_rgba(201,162,92,0.6)] transition-all duration-300 hover:scale-105 hover:bg-gold/90 hover:shadow-[0_18px_60px_-10px_rgba(201,162,92,0.8)] active:scale-100"
          >
            Agendar Consulta
          </a>
          <a
            href="#tratamentos"
            className="group inline-flex items-center gap-2.5 rounded-full border border-cream/30 bg-cream/5 px-6 py-4 text-sm font-semibold text-cream backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cream/60 hover:bg-cream/10 active:scale-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/15 transition-colors group-hover:bg-cream/25">
              <Play className="h-3 w-3 fill-cream text-cream" />
            </span>
            Conheça nossa abordagem
          </a>
        </div>

        {/* Metrics strip */}
        <div className="hero-animate hero-animate-6 mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4 border-t border-cream/15 pt-8">
          {[
            { v: "+15", l: "Anos de Experiência" },
            { v: "ISHRS", l: "Médicos Certificados" },
            { v: "+5.000", l: "Pacientes Satisfeitos" },
          ].map((m) => (
            <div key={m.l} className="text-center">
              <p className="font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">
                {m.v}
              </p>
              <p className="mt-1 text-[11px] font-medium tracking-wide text-cream/55 sm:text-xs">
                {m.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
