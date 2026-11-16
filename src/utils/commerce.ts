import { PROMPT_PRESETS, type OfferPlan, type PromptPreset } from '../data/prodwareData';

export interface OrderFormInput {
  planId: OfferPlan['id'];
  fullName: string;
  companyName: string;
  email: string;
  vatOrTaxCode: string;
  selectedServices: string[];
  notes: string;
  acceptedTerms: boolean;
  monthsCount: number;
}

export interface ValidationErrors {
  fullName?: string;
  companyName?: string;
  email?: string;
  acceptedTerms?: string;
  selectedServices?: string;
}

export interface OrderTotalBreakdown {
  isFixedPrice: boolean;
  netEur: number;
  vatEur: number;
  grossEur: number;
  formattedNet: string;
  formattedGross: string;
}

export const ITALIAN_VAT_RATE = 0.22;

export function formatEur(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

export function calculateOrderTotals(
  plan: OfferPlan,
  monthsCount: number = 1
): OrderTotalBreakdown {
  if (plan.monthlyPriceEur === null) {
    return {
      isFixedPrice: false,
      netEur: 0,
      vatEur: 0,
      grossEur: 0,
      formattedNet: plan.priceLabel,
      formattedGross: plan.priceLabel,
    };
  }

  const clampedMonths = Math.max(1, Math.min(24, Math.floor(monthsCount || 1)));
  const netEur = Number((plan.monthlyPriceEur * clampedMonths).toFixed(2));
  const vatEur = Number((netEur * ITALIAN_VAT_RATE).toFixed(2));
  const grossEur = Number((netEur + vatEur).toFixed(2));

  return {
    isFixedPrice: true,
    netEur,
    vatEur,
    grossEur,
    formattedNet: formatEur(netEur),
    formattedGross: formatEur(grossEur),
  };
}

export function validateOrderForm(input: OrderFormInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = 'Inserisci nome e cognome del referente.';
  }

  if (input.companyName.trim().length < 2) {
    errors.companyName = 'Inserisci la ragione sociale o il nome dello studio.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(input.email.trim())) {
    errors.email = 'Inserisci un indirizzo email aziendale valido.';
  }

  if (input.planId === 'custom-b2b' && input.selectedServices.length === 0) {
    errors.selectedServices = 'Seleziona almeno un servizio da includere nella richiesta.';
  }

  if (!input.acceptedTerms) {
    errors.acceptedTerms = 'Conferma la presa visione dell’informativa privacy.';
  }

  return errors;
}

export function synthesizeBlueprintFromPrompt(rawPrompt: string): PromptPreset {
  const cleaned = rawPrompt.trim();
  if (!cleaned) {
    return PROMPT_PRESETS[0];
  }

  const lower = cleaned.toLowerCase();

  if (
    lower.includes('magazzin') ||
    lower.includes('scort') ||
    lower.includes('inventar') ||
    lower.includes('lotti')
  ) {
    return {
      ...PROMPT_PRESETS[0],
      prompt: cleaned,
    };
  }

  if (
    lower.includes('commess') ||
    lower.includes('ore') ||
    lower.includes('fattur') ||
    lower.includes('tecnic') ||
    lower.includes('cantiere')
  ) {
    return {
      ...PROMPT_PRESETS[1],
      prompt: cleaned,
    };
  }

  if (
    lower.includes('chat') ||
    lower.includes('assistente') ||
    lower.includes('pdf') ||
    lower.includes('document') ||
    lower.includes('listin') ||
    /\bia\b/.test(lower) ||
    lower.includes('intelligenza artificiale')
  ) {
    return {
      ...PROMPT_PRESETS[2],
      prompt: cleaned,
    };
  }

  const inferredEntities: string[] = ['Utente', 'Organizzazione'];
  if (lower.includes('client')) inferredEntities.push('Cliente');
  if (lower.includes('ordin') || lower.includes('vendit')) inferredEntities.push('Ordine');
  if (lower.includes('prenot')) inferredEntities.push('Prenotazione');
  if (lower.includes('progett')) inferredEntities.push('Progetto');
  if (inferredEntities.length < 4) {
    inferredEntities.push('Documento', 'Attività');
  }

  return {
    id: 'custom-generated',
    label: 'Architettura su misura',
    prompt: cleaned,
    architectureTitle: 'Applicativo Gestionale Su Misura',
    modules: [
      'Pannello operativo strutturato sulle regole descritte nel prompt',
      'Gestione anagrafiche, stati di avanzamento ed esportazione dati',
      'Controllo accessi multi-utente e registro storico delle modifiche',
    ],
    dataModel: inferredEntities.slice(0, 4),
    securityNote:
      'Codice generato pronto per hosting dedicato o riscatto integrale una tantum',
  };
}

export function generateOrderReference(planId: OfferPlan['id'], seedDate: Date = new Date()): string {
  const prefix =
    planId === 'prodintelligence-monthly'
      ? 'PW-PI'
      : planId === 'prodintelligence-buyout'
        ? 'PW-CODE'
        : 'PW-B2B';
  const year = seedDate.getFullYear();
  const numericTail = String(seedDate.getTime()).slice(-5);
  return `${prefix}-${year}-${numericTail}`;
}
