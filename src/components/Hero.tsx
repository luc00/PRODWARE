import { ArrowRight, Play } from 'lucide-react';
import { PILLARS } from '../data/prodwareData';

interface HeroProps {
  onStartSubscription: () => void;
  onOpenVideo: () => void;
}

export function Hero({ onStartSubscription, onOpenVideo }: HeroProps) {
  return (
    <section id="inizio" className="scroll-mt-16 border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs sm:text-sm text-neutral-500 tracking-wide mb-6">
              Fondata nel 2026 <span aria-hidden="true">·</span> Soluzioni B2B e Piattaforma IA
            </p>

            <h1 className="font-editorial text-[clamp(2.65rem,5.2vw,4.75rem)] leading-[1.03] tracking-tight text-[#0A0A0A] text-balance">
              Technology that works for you.
            </h1>

            <p className="mt-7 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Diamo forma alle tue idee attraverso la tecnologia. Progettiamo software gestionali
              costruiti sulle procedure reali della tua impresa e mettiamo l’intelligenza artificiale
              alla portata di chiunque con ProdIntelligence.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartSubscription}
                className="inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
              >
                <span>Attiva ProdIntelligence — 19,99 €/mese</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#soluzioni"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[#0A0A0A] border border-neutral-300 hover:border-[#0A0A0A] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
              >
                Esplora i Servizi B2B
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-8 lg:pt-0 lg:pl-8">
            <p className="text-xs text-neutral-500 mb-3">In sintesi</p>
            <dl className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
                <dt className="text-sm text-neutral-600">ProdIntelligence</dt>
                <dd className="font-mono text-sm font-medium text-[#0A0A0A] tabular-nums">
                  19,99 € / mese
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
                <dt className="text-sm text-neutral-600">Codice sorgente</dt>
                <dd className="text-sm font-medium text-[#0A0A0A]">Riscatto una tantum</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
                <dt className="text-sm text-neutral-600">Cloud Chatbot IA</dt>
                <dd className="text-sm font-medium text-[#0A0A0A]">Dedicato al cliente</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={onOpenVideo}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A] hover:text-neutral-600 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="underline underline-offset-4 decoration-neutral-300 hover:decoration-[#0A0A0A]">
                Guarda il video di presentazione
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PILLARS.map((pillar) => (
            <div key={pillar.number} className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-neutral-400 tabular-nums">
                  {pillar.number}
                </span>
                <h2 className="text-base font-semibold text-[#0A0A0A] tracking-tight">
                  {pillar.title}
                </h2>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
