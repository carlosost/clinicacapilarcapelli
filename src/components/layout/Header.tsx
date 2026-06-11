import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";


const navLinks = [
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Resultados", href: "#resultados" },
  { label: "A Clínica", href: "#depoimentos" },
  { label: "Unidades", href: "#unidades" },
  { label: "FAQ", href: "#faq" },
];


export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md border-b border-border shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-1">
            <span className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              CAPPELLI
            </span>
            <span className="mt-1 hidden text-[10px] font-sans font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:inline">
              CLÍNICA CAPILAR
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/5521981680834"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary/90 active:scale-100"
            >
              Agendar Avaliação
            </a>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-muted md:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-[2px] w-5 rounded-full bg-foreground transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] rounded-full bg-foreground transition-all duration-300 ${
                mobileOpen ? "w-0 opacity-0" : "w-5 opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-foreground transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 z-40 flex h-full w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Drawer Header */}
        <div className="flex h-[72px] items-center justify-between border-b border-border px-6">
          <span className="font-display text-lg font-bold tracking-tight">CAPPELLI</span>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-olive"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-border p-6">
          <a
            href="https://wa.me/5521981680834"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 active:scale-[0.98]"
          >
            Agendar Avaliação
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Avaliação gratuita na primeira visita
          </p>
        </div>

      </aside>
    </header>
  );
}
