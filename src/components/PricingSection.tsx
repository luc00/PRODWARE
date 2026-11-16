import { ArrowRight, Check } from 'lucide-react';
import { OFFER_PLANS, type OfferPlan } from '../data/prodwareData';

interface PricingSectionProps {
  onSelectPlan: (planId: OfferPlan['id']) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="prezzi" className="scroll-mt-16 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs text-neutral-500 mb-3">Accessibilità Economica</p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight text-[#0A0A0A] text-balance">
              Scegli la formula adatta al tuo progetto, senza barriere d’ingresso.
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-sm">
            Abbonamento mensile trasparente, riscatto una tantum del codice generato o sviluppo
            dedicato con il nostro team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-neutral-300 divide-y md:divide-y-0 md:divide-x divide-neutral-300">
          {OFFER_PLANS.map((plan) => {
            const isPrimary = plan.id === 'prodintelligence-monthly';
            return (
              <div
                key={plan.id}
                className={`p-7 sm:p-8 flex flex-col justify-between ${
                  isPrimary ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#0A0A0A]'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium tracking-tight">{plan.name}</h3>
                    <span
                      className={`text-xs ${
                        isPrimary ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {plan.billingSublabel}
                    </span>
                  </div>

                  <div
                    className={`mt-6 pb-6 border-b ${
                      isPrimary ? 'border-neutral-800' : 'border-neutral-200'
                    }`}
                  >
                    <div
                      className={`font-mono text-4xl font-medium tracking-tight tabular-nums ${
                        isPrimary ? 'text-white' : 'text-[#0A0A0A]'
                      }`}
                    >
                      {plan.priceLabel}
                    </div>
                  </div>

                  <p
                    className={`mt-6 text-sm leading-relaxed ${
                      isPrimary ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {plan.summary}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 text-sm ${
                          isPrimary ? 'text-neutral-200' : 'text-neutral-700'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isPrimary ? 'text-white' : 'text-[#0A0A0A]'
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`mt-10 pt-6 border-t ${
                    isPrimary ? 'border-neutral-800' : 'border-neutral-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isPrimary
                        ? 'bg-white text-[#0A0A0A] hover:bg-neutral-200 focus-visible:outline-white'
                        : 'bg-[#0A0A0A] text-white hover:bg-neutral-800 focus-visible:outline-[#0A0A0A]'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
