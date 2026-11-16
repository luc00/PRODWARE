import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { SERVICES, type ServiceItem } from '../data/prodwareData';

interface SolutionsSectionProps {
  onSelectServiceForQuote: (serviceId: string) => void;
}

export function SolutionsSection({ onSelectServiceForQuote }: SolutionsSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(SERVICES[0].id);

  const activeService: ServiceItem =
    SERVICES.find((service) => service.id === selectedId) ?? SERVICES[0];

  return (
    <section id="soluzioni" className="scroll-mt-16 bg-[#F7F7F5] border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="max-w-2xl mb-14">
          <p className="text-xs text-neutral-500 mb-3">Soluzioni Integrate B2B</p>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight text-[#0A0A0A] text-balance">
            Cinque aree operative, progettate al millimetro intorno alla tua impresa.
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Invece di imporre strumenti rigidi e standardizzati, costruiamo infrastrutture digitali,
            gestionali e identità visive su misura con piena protezione dei dati.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-neutral-300">
          <div
            role="tablist"
            aria-label="Catalogo servizi ProdWare"
            className="lg:col-span-5 divide-y divide-neutral-200 border-b lg:border-b-0 lg:border-r border-neutral-300"
          >
            {SERVICES.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(service.id)}
                  className={`w-full text-left py-5 px-4 sm:px-5 transition-colors duration-150 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0A0A0A] ${
                    isSelected
                      ? 'bg-[#0A0A0A] text-white'
                      : 'bg-transparent text-[#0A0A0A] hover:bg-neutral-200/60'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isSelected ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {service.number}
                      </span>
                      <span className="text-base font-medium tracking-tight">
                        {service.title}
                      </span>
                    </div>
                    <p
                      className={`mt-1.5 text-sm pl-7 ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-600'
                      }`}
                    >
                      {service.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            aria-label={activeService.title}
            className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-neutral-200">
                <span className="font-mono text-xs text-neutral-500 tabular-nums">
                  Servizio {activeService.number.replace('.', '')} / 05
                </span>
                <span className="text-xs text-neutral-500">{activeService.guarantee}</span>
              </div>

              <h3 className="mt-7 font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#0A0A0A]">
                {activeService.title}
              </h3>

              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                {activeService.detailDesc}
              </p>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <p className="text-xs font-medium text-neutral-500 mb-4">
                  Cosa include l’intervento
                </p>
                <ul className="space-y-3">
                  {activeService.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#0A0A0A]">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#0A0A0A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-neutral-500">
                Sviluppo dedicato con tutela legale e privacy inclusa.
              </p>
              <button
                type="button"
                onClick={() => onSelectServiceForQuote(activeService.id)}
                className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
              >
                <span>Richiedi questo servizio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
