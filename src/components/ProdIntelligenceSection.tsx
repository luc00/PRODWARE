import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { PROMPT_PRESETS, type PromptPreset } from '../data/prodwareData';
import { synthesizeBlueprintFromPrompt } from '../utils/commerce';

interface ProdIntelligenceSectionProps {
  onSelectMonthly: (promptSummary: string) => void;
  onSelectBuyout: (promptSummary: string) => void;
}

export function ProdIntelligenceSection({
  onSelectMonthly,
  onSelectBuyout,
}: ProdIntelligenceSectionProps) {
  const [promptInput, setPromptInput] = useState<string>(PROMPT_PRESETS[0].prompt);
  const [blueprint, setBlueprint] = useState<PromptPreset>(PROMPT_PRESETS[0]);

  const handlePresetClick = (preset: PromptPreset) => {
    setPromptInput(preset.prompt);
    setBlueprint(preset);
  };

  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();
    setBlueprint(synthesizeBlueprintFromPrompt(promptInput));
  };

  return (
    <section
      id="prodintelligence"
      className="scroll-mt-16 bg-[#0A0A0A] text-white border-b border-neutral-800"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs text-neutral-400 tracking-wide mb-3">
              Piattaforma Proprietaria Prompt-to-Software
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.08] tracking-tight text-white text-balance">
              ProdIntelligence trasforma una descrizione in italiano in software pronto.
            </h2>
            <p className="mt-5 text-base text-neutral-300 leading-relaxed tracking-[0.005em]">
              Alimentata da modelli linguistici avanzati tra cui Claude di Anthropic, progetta
              l’architettura e genera il codice applicativo partendo da un semplice prompt testuale.
              Pensata per chi non scrive una riga di codice.
            </p>

            <div className="mt-8 pt-8 border-t border-neutral-800 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-neutral-400">Accesso piattaforma</span>
                <span className="font-mono text-2xl font-medium text-white tabular-nums">
                  19,99 € <span className="text-xs text-neutral-400 font-sans">/ mese</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-neutral-400">Proprietà codice</span>
                <span className="text-sm text-white">Acquisto una tantum disponibile</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSelectMonthly(blueprint.architectureTitle)}
                className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium bg-white text-[#0A0A0A] hover:bg-neutral-200 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Abbonati a 19,99 €/mese</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectBuyout(blueprint.architectureTitle)}
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white border border-neutral-700 hover:border-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Acquisto codice una tantum
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 border border-neutral-800 bg-[#111111]">
            <div className="px-5 py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-300">
                Simulatore di progettazione da prompt
              </span>
              <div className="flex flex-wrap gap-2">
                {PROMPT_PRESETS.map((preset) => {
                  const isCurrent = blueprint.id === preset.id && promptInput === preset.prompt;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`px-3 py-1.5 text-xs transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border ${
                        isCurrent
                          ? 'bg-white text-[#0A0A0A] border-white font-medium'
                          : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleGenerate} className="p-5 sm:p-6 border-b border-neutral-800">
              <label
                htmlFor="prodintelligence-prompt"
                className="block text-xs text-neutral-400 mb-2"
              >
                Descrivi il software che vuoi realizzare
              </label>
              <textarea
                id="prodintelligence-prompt"
                rows={3}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Es. Gestionale per prenotazioni clienti, scadenze contratti e invio conferme..."
                className="w-full bg-[#0A0A0A] border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
              />
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">
                  Scrivi in italiano naturale o scegli un esempio qui sopra.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-white text-[#0A0A0A] hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Genera architettura
                </button>
              </div>
            </form>

            <div className="p-5 sm:p-6 space-y-6" data-testid="prodintelligence-blueprint">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-neutral-800">
                <div>
                  <p className="text-xs text-neutral-400">Architettura proposta</p>
                  <h3 className="mt-1 text-lg font-medium text-white">
                    {blueprint.architectureTitle}
                  </h3>
                </div>
                <span className="text-xs text-neutral-400">Pronta per generazione codice</span>
              </div>

              <div>
                <p className="text-xs text-neutral-400 mb-3">Moduli applicativi generati</p>
                <ul className="space-y-2.5">
                  {blueprint.modules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2.5 text-sm text-neutral-200">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
                <div>
                  <p className="text-xs text-neutral-400 mb-2">Entità dati principali</p>
                  <p className="font-mono text-xs text-neutral-200 leading-relaxed">
                    {blueprint.dataModel.join(' · ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-2">Sicurezza e consegna</p>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {blueprint.securityNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
