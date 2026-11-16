import { useState } from 'react';
import { MARKET_METRICS, ROADMAP_STEPS } from '../data/prodwareData';

export function MarketAndRoadmapSection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);
  const currentStep = ROADMAP_STEPS[activeStepIndex] ?? ROADMAP_STEPS[0];

  return (
    <section id="azienda" className="scroll-mt-16 bg-[#F7F7F5] border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs text-neutral-500 mb-3">Contesto di Mercato</p>
            <h2 className="font-editorial text-3xl sm:text-4xl leading-[1.1] tracking-tight text-[#0A0A0A] text-balance">
              Le imprese hanno già i gestionali, ma l’IA resta ancora ai blocchi di partenza.
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              I dati ISTAT 2025 e l’Osservatorio del Politecnico di Milano mostrano un divario
              netto: le PMI italiane stanno aumentando il budget per la trasformazione digitale e
              cercano soluzioni concrete e guidate.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 space-y-7">
            {MARKET_METRICS.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-[#0A0A0A]">{metric.label}</span>
                  <span className="font-mono text-lg font-medium text-[#0A0A0A] tabular-nums">
                    {metric.id === 'polimi-pmi'
                      ? '> 50%'
                      : `${metric.valuePercent.toFixed(1).replace('.', ',')}%`}
                  </span>
                </div>

                <div
                  className="w-full h-2.5 bg-neutral-100 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={metric.valuePercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={metric.label}
                >
                  <div
                    className="h-full bg-[#0A0A0A]"
                    style={{ width: `${metric.valuePercent}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                  <span>{metric.note}</span>
                  <span>{metric.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-16 border-t border-neutral-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs text-neutral-500 mb-2">Piano Operativo 12 Mesi</p>
              <h2 className="font-editorial text-3xl sm:text-4xl leading-[1.1] tracking-tight text-[#0A0A0A]">
                Roadmap strategica
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md">
              Un percorso progressivo che unisce ricavi immediati dai servizi B2B su misura e
              scalabilità della piattaforma ProdIntelligence.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Fasi della roadmap ProdWare"
            className="grid grid-cols-2 lg:grid-cols-4 border border-neutral-300 divide-y sm:divide-y-0 sm:divide-x divide-neutral-300 bg-white"
          >
            {ROADMAP_STEPS.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <button
                  key={step.period}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStepIndex(index)}
                  className={`p-5 sm:p-6 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0A0A0A] ${
                    isActive
                      ? 'bg-[#0A0A0A] text-white'
                      : 'bg-white text-[#0A0A0A] hover:bg-neutral-100'
                  }`}
                >
                  <span
                    className={`font-mono text-xs tabular-nums block ${
                      isActive ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {step.period}
                  </span>
                  <span className="mt-2 block text-base font-medium leading-snug">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-white border-x border-b border-neutral-300 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                {currentStep.period}
              </span>
              <h3 className="mt-1 text-lg font-medium text-[#0A0A0A]">{currentStep.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-600 max-w-2xl">
                {currentStep.description}
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-400 tabular-nums shrink-0">
              Fase 0{activeStepIndex + 1} / 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
