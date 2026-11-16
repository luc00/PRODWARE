import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { OFFER_PLANS, SERVICES, type OfferPlan } from '../data/prodwareData';
import {
  calculateOrderTotals,
  generateOrderReference,
  validateOrderForm,
  type ValidationErrors,
} from '../utils/commerce';

interface OrderDrawerProps {
  isOpen: boolean;
  initialPlanId: OfferPlan['id'];
  initialServiceIds: string[];
  initialNote: string;
  onClose: () => void;
}

interface ConfirmedOrder {
  reference: string;
  planName: string;
  companyName: string;
  email: string;
  totalLabel: string;
}

export function OrderDrawer({
  isOpen,
  initialPlanId,
  initialServiceIds,
  initialNote,
  onClose,
}: OrderDrawerProps) {
  const [planId, setPlanId] = useState<OfferPlan['id']>(initialPlanId);
  const [monthsCount, setMonthsCount] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(initialServiceIds);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [vatOrTaxCode, setVatOrTaxCode] = useState('');
  const [notes, setNotes] = useState(initialNote);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPlanId(initialPlanId);
      setSelectedServices(initialServiceIds);
      setNotes(initialNote);
      setErrors({});
      setConfirmed(null);
    }
  }, [isOpen, initialPlanId, initialServiceIds, initialNote]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePlan = OFFER_PLANS.find((p) => p.id === planId) ?? OFFER_PLANS[0];
  const totals = calculateOrderTotals(activePlan, monthsCount);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateOrderForm({
      planId,
      fullName,
      companyName,
      email,
      vatOrTaxCode,
      selectedServices,
      notes,
      acceptedTerms,
      monthsCount,
    });

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setConfirmed({
      reference: generateOrderReference(planId),
      planName: activePlan.name,
      companyName: companyName.trim(),
      email: email.trim(),
      totalLabel: totals.isFixedPrice
        ? `${totals.formattedNet} + IVA (${totals.formattedGross})`
        : activePlan.priceLabel,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
    >
      <div className="relative w-full max-w-xl bg-white h-full overflow-y-auto border-l border-neutral-300 flex flex-col justify-between">
        <div>
          <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-500">Ordine e Attivazione Diretta</p>
              <h2
                id="order-drawer-title"
                className="font-editorial text-2xl font-medium text-[#0A0A0A]"
              >
                {confirmed ? 'Riepilogo richiesta' : 'Configura la tua richiesta'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi pannello ordine"
              className="w-10 h-10 inline-flex items-center justify-center border border-neutral-200 text-[#0A0A0A] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmed ? (
            <div className="p-6 sm:p-8 space-y-6" data-testid="order-confirmation">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-xs text-neutral-500">
                  Riferimento {confirmed.reference}
                </p>
                <h3 className="mt-2 font-editorial text-3xl font-medium text-[#0A0A0A]">
                  Richiesta registrata correttamente
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Abbiamo inviato il riepilogo operativo per{' '}
                  <strong className="font-medium text-[#0A0A0A]">{confirmed.companyName}</strong>{' '}
                  all’indirizzo <strong className="font-medium text-[#0A0A0A]">{confirmed.email}</strong>.
                  Il team tecnico e legale ProdWare prenderà in carico l’attivazione entro 24 ore
                  lavorative.
                </p>
              </div>

              <dl className="border-t border-b border-neutral-200 py-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Formula scelta</dt>
                  <dd className="font-medium text-[#0A0A0A]">{confirmed.planName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Importo</dt>
                  <dd className="font-mono font-medium text-[#0A0A0A] tabular-nums">
                    {confirmed.totalLabel}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 px-5 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Torna al sito
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-7">
              <div>
                <p className="text-xs font-medium text-neutral-500 mb-3">
                  1. Seleziona formula o servizio
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {OFFER_PLANS.map((plan) => {
                    const active = plan.id === planId;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setPlanId(plan.id)}
                        className={`p-4 text-left border transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                          active
                            ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                            : 'border-neutral-300 bg-white text-[#0A0A0A] hover:border-[#0A0A0A]'
                        }`}
                      >
                        <div>
                          <span className="block text-sm font-medium">{plan.name}</span>
                          <span
                            className={`text-xs ${
                              active ? 'text-neutral-300' : 'text-neutral-500'
                            }`}
                          >
                            {plan.billingSublabel}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-medium tabular-nums shrink-0">
                          {plan.priceLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {planId === 'prodintelligence-monthly' && (
                <div className="border border-neutral-200 bg-[#F7F7F5] p-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor="months-select" className="text-sm font-medium text-[#0A0A0A]">
                      Durata iniziale abbonamento
                    </label>
                    <select
                      id="months-select"
                      value={monthsCount}
                      onChange={(e) => setMonthsCount(Number(e.target.value))}
                      className="border border-neutral-300 bg-white px-3 py-1.5 text-sm font-mono tabular-nums focus:outline-none focus:border-[#0A0A0A]"
                    >
                      <option value={1}>1 mese</option>
                      <option value={3}>3 mesi</option>
                      <option value={6}>6 mesi</option>
                      <option value={12}>12 mesi</option>
                    </select>
                  </div>
                  <div className="pt-3 border-t border-neutral-200 flex items-baseline justify-between text-xs text-neutral-600">
                    <span>Imponibile {totals.formattedNet} + IVA 22%</span>
                    <span className="font-mono text-sm font-medium text-[#0A0A0A] tabular-nums">
                      Totale {totals.formattedGross}
                    </span>
                  </div>
                </div>
              )}

              {planId === 'custom-b2b' && (
                <div>
                  <p className="text-xs font-medium text-neutral-500 mb-3">
                    Servizi integrati desiderati
                  </p>
                  <div className="space-y-2">
                    {SERVICES.map((service) => {
                      const checked = selectedServices.includes(service.id);
                      return (
                        <label
                          key={service.id}
                          className={`flex items-center justify-between gap-3 p-3 border cursor-pointer transition-colors ${
                            checked
                              ? 'border-[#0A0A0A] bg-neutral-50'
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleService(service.id)}
                              className="w-4 h-4 accent-[#0A0A0A]"
                            />
                            <span className="text-sm text-[#0A0A0A]">{service.title}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {errors.selectedServices && (
                    <p className="mt-2 text-xs text-red-700" role="alert">
                      {errors.selectedServices}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <p className="text-xs font-medium text-neutral-500">2. Dati aziendali e referente</p>

                <div>
                  <label htmlFor="order-fullname" className="block text-xs text-neutral-700 mb-1.5">
                    Nome e Cognome *
                  </label>
                  <input
                    id="order-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Es. Marco Bellini"
                    className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-700" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="order-company" className="block text-xs text-neutral-700 mb-1.5">
                    Ragione Sociale / Azienda *
                  </label>
                  <input
                    id="order-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Es. Officine Bellini S.r.l."
                    className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-700" role="alert">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="order-email" className="block text-xs text-neutral-700 mb-1.5">
                      Email aziendale *
                    </label>
                    <input
                      id="order-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@azienda.it"
                      className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-700" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-vat" className="block text-xs text-neutral-700 mb-1.5">
                      Partita IVA (opzionale)
                    </label>
                    <input
                      id="order-vat"
                      type="text"
                      value={vatOrTaxCode}
                      onChange={(e) => setVatOrTaxCode(e.target.value)}
                      placeholder="IT00000000000"
                      className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm font-mono text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="order-notes" className="block text-xs text-neutral-700 mb-1.5">
                    Note sul progetto o requisiti operativi
                  </label>
                  <textarea
                    id="order-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Descrivi brevemente processi, numero sedi o obiettivi..."
                    className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#0A0A0A]"
                  />
                  <span className="text-xs text-neutral-600 leading-relaxed">
                    Dichiaro di aver preso visione del trattamento dei dati ai sensi della normativa
                    vigente e autorizzo ProdWare a ricontattarmi per l’attivazione richiesta.
                  </span>
                </label>
                {errors.acceptedTerms && (
                  <p className="mt-1.5 text-xs text-red-700" role="alert">
                    {errors.acceptedTerms}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {planId === 'prodintelligence-monthly'
                    ? `Conferma attivazione — ${totals.formattedNet}/mese`
                    : 'Invia richiesta ufficiale'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
