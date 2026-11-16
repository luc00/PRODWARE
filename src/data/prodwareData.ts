export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  detailDesc: string;
  deliverables: string[];
  guarantee: string;
}

export interface OfferPlan {
  id: 'prodintelligence-monthly' | 'prodintelligence-buyout' | 'custom-b2b';
  name: string;
  billingType: 'monthly' | 'onetime' | 'custom';
  monthlyPriceEur: number | null;
  priceLabel: string;
  billingSublabel: string;
  summary: string;
  features: string[];
  ctaLabel: string;
}

export interface PromptPreset {
  id: string;
  label: string;
  prompt: string;
  architectureTitle: string;
  modules: string[];
  dataModel: string[];
  securityNote: string;
}

export interface MarketMetric {
  id: string;
  label: string;
  valuePercent: number;
  source: string;
  note: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
}

export interface RoadmapStep {
  period: string;
  title: string;
  description: string;
}

export const PRESENTATION_VIDEO_PATH =
  '/assets/aistudio/WhatsApp_Video_2026-11-15_at_13.04.27__1__3c163ccf.mp4';

export const LOGO_BACKGROUND_PATH =
  '/assets/aistudio/WhatsApp_Image_2026-11-16_at_15.21.28_83864d1d.jpeg';

export const PILLARS = [
  {
    number: '01',
    title: 'Innovazione',
    description:
      'Architetture moderne e modelli linguistici avanzati applicati ai processi aziendali reali, senza sovrastrutture superflue.',
  },
  {
    number: '02',
    title: 'Personalizzazione',
    description:
      'Ogni strumento viene modellato al millimetro sulle procedure interne dell’impresa, anziché forzare il team a cambiare metodo.',
  },
  {
    number: '03',
    title: 'Accessibilità Economica',
    description:
      'Tecnologia proprietaria accessibile a partire da 19,99 € al mese o con riscatto definitivo del codice sorgente.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'erp-custom',
    number: '01.',
    title: 'Software gestionali personalizzati',
    shortDesc: 'Creato esattamente sulle procedure interne della tua azienda.',
    detailDesc:
      'Invece di costringere la tua impresa ad adattarsi a software rigidi e standardizzati, progettiamo e sviluppiamo gestionali ERP su misura che rispecchiano i flussi operativi reali di produzione, magazzino, vendite e amministrazione.',
    deliverables: [
      'Analisi dei flussi operativi aziendali',
      'Interfacce essenziali orientate alla velocità d’uso',
      'Integrazione con contabilità e sistemi esistenti',
    ],
    guarantee: 'Codice modulare documentato e scalabile nel tempo',
  },
  {
    id: 'ai-chatbot-cloud',
    number: '02.',
    title: 'Chatbot IA e cloud dedicato',
    shortDesc: 'Intelligenza artificiale aziendale senza commistione di dati.',
    detailDesc:
      'Assistenti IA addestrati sulla documentazione interna dell’azienda e ospitati su infrastruttura cloud dedicata. I dati sensibili non vengono mai condivisi o mescolati con ambienti pubblici o di terze parti.',
    deliverables: [
      'Istanza cloud dedicata e isolata per singolo cliente',
      'Indicizzazione sicura di manuali, listini e procedure',
      'Controllo degli accessi e conformità legale integrata',
    ],
    guarantee: 'Isolamento completo dei dati sensibili aziendali',
  },
  {
    id: 'branding-identity',
    number: '03.',
    title: 'Realizzazione loghi e identità',
    shortDesc: 'Identità visiva coerente per aziende e nuovi prodotti.',
    detailDesc:
      'Progettazione di marchi, sistemi tipografici e linee guida visive pensate per durare. Costruiamo un linguaggio grafico riconoscibile, pulito e pronto per stampa, interfacce digitali e comunicazione B2B.',
    deliverables: [
      'Studio e disegno del marchio e logotipo vettoriale',
      'Sistema tipografico, palette e griglie editoriali',
      'Manuale d’uso per supporti digitali e cartacei',
    ],
    guarantee: 'Consegna di tutti i sorgenti vettoriali e diritti pieni',
  },
  {
    id: 'vpn-enterprise',
    number: '04.',
    title: 'Servizi VPN per imprese',
    shortDesc: 'Connessioni aziendali cifrate per lavorare in totale sicurezza.',
    detailDesc:
      'Reti private virtuali configurate su misura per collegare sedi, uffici remoti e collaboratori ai gestionali e agli archivi interni in sicurezza, riducendo la superficie di rischio operativo.',
    deliverables: [
      'Architettura VPN site-to-site e accesso remoto sicuro',
      'Gestione granulare di profili e dispositivi autorizzati',
      'Supporto tecnico e monitoraggio continuità operativa',
    ],
    guarantee: 'Traffico aziendale cifrato end-to-end',
  },
  {
    id: 'video-editing',
    number: '05.',
    title: 'Video editing multimediale',
    shortDesc: 'Montaggio professionale per presentare prodotti e processi.',
    detailDesc:
      'Post-produzione e montaggio video per lanci di prodotto, presentazioni corporate, formazione interna e contenuti istituzionali con ritmo narrativo e coerenza visiva.',
    deliverables: [
      'Montaggio narrativo, color correction e pulizia audio',
      'Titolazione grafica coerente con l’identità aziendale',
      'Formati ottimizzati per web, presentazioni ed eventi',
    ],
    guarantee: 'Master in alta definizione pronti per ogni canale',
  },
];

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'magazzino',
    label: 'Gestionale magazzino',
    prompt:
      'Voglio un gestionale per monitorare giacenze di magazzino, lotti in ingresso, ordini fornitori e avvisi automatici sotto scorta per 3 sedi.',
    architectureTitle: 'Gestionale Inventario Multi-Sede',
    modules: [
      'Anagrafica articoli, lotti e codici a barre',
      'Movimentazione carichi, scarichi e trasferimenti sede',
      'Soglie di riordino e generazione ordini fornitori',
    ],
    dataModel: ['Articolo', 'MovimentoMagazzino', 'Sede', 'OrdineFornitore'],
    securityNote: 'Autenticazione per ruolo sede e log immutabile movimenti',
  },
  {
    id: 'commesse',
    label: 'Tracciamento commesse',
    prompt:
      'Ci serve un portale interno per assegnare commesse ai tecnici, registrare le ore lavorate e generare il consuntivo per la fatturazione.',
    architectureTitle: 'Portale Commesse e Consuntivazione',
    modules: [
      'Pianificazione commesse e assegnazione operatori',
      'Registro giornaliero ore e materiali impiegati',
      'Esportazione consuntivo pronto per contabilità',
    ],
    dataModel: ['Commessa', 'Cliente', 'RegistrazioneOre', 'Consuntivo'],
    securityNote: 'Accesso separato tra direzione, amministrazione e operatori',
  },
  {
    id: 'assistenza',
    label: 'Assistente documentale',
    prompt:
      'Vogliamo un assistente interno su cloud dedicato che risponda ai nostri commerciali consultando listini PDF, condizioni di garanzia e tempi di consegna.',
    architectureTitle: 'Assistente IA su Cloud Dedicato',
    modules: [
      'Archivio indicizzato di listini, schede tecniche e contratti',
      'Motore conversazionale con citazione diretta della fonte',
      'Pannello amministrativo per aggiornare i documenti',
    ],
    dataModel: ['Documento', 'IndiceSemantico', 'SessioneChat', 'Utente'],
    securityNote: 'Istanza dedicata isolata senza addestramento su dati terzi',
  },
];

export const OFFER_PLANS: OfferPlan[] = [
  {
    id: 'prodintelligence-monthly',
    name: 'ProdIntelligence',
    billingType: 'monthly',
    monthlyPriceEur: 19.99,
    priceLabel: '19,99 €',
    billingSublabel: 'al mese',
    summary:
      'Accesso diretto alla piattaforma IA che trasforma un prompt in italiano nell’architettura e nel codice del tuo software.',
    features: [
      'Generazione architettura e codice da prompt testuale',
      'Motori linguistici avanzati tra cui Claude di Anthropic',
      'Nessuna competenza di programmazione richiesta',
      'Iterazioni continue sul progetto senza vincoli annuali',
    ],
    ctaLabel: 'Attiva a 19,99 €/mese',
  },
  {
    id: 'prodintelligence-buyout',
    name: 'Codice Finale Una Tantum',
    billingType: 'onetime',
    monthlyPriceEur: null,
    priceLabel: 'Una tantum',
    billingSublabel: 'proprietà definitiva',
    summary:
      'Riscatta integralmente il codice sorgente finale generato per la tua azienda ed elimini ogni abbonamento ricorrente.',
    features: [
      'Trasferimento completo del codice sorgente finale',
      'Installazione autonoma su server o cloud aziendale',
      'Documentazione tecnica e consegna assistita dal team',
      'Zero canoni mensili obbligatori dopo l’acquisto',
    ],
    ctaLabel: 'Richiedi riscatto codice',
  },
  {
    id: 'custom-b2b',
    name: 'Soluzioni Integrate B2B',
    billingType: 'custom',
    monthlyPriceEur: null,
    priceLabel: 'Su misura',
    billingSublabel: 'progetto dedicato',
    summary:
      'Affidati direttamente al team ProdWare per gestionali ERP, Chatbot IA su cloud dedicato, VPN aziendali, branding e video.',
    features: [
      'Progettazione al millimetro sui processi aziendali',
      'Cloud dedicato per la protezione dei dati sensibili',
      'Copertura legale, privacy e conformità fin dal giorno zero',
      'Un solo interlocutore tecnico, creativo e amministrativo',
    ],
    ctaLabel: 'Configura commessa B2B',
  },
];

export const MARKET_METRICS: MarketMetric[] = [
  {
    id: 'istat-erp',
    label: 'Imprese italiane con gestionali ERP',
    valuePercent: 56.0,
    source: 'Dati ISTAT 2025',
    note: 'Le aziende hanno già adottato strumenti gestionali di base.',
  },
  {
    id: 'istat-ai',
    label: 'Imprese italiane con Intelligenza Artificiale',
    valuePercent: 16.4,
    source: 'Dati ISTAT 2025',
    note: 'Ampio divario da colmare con soluzioni guidate e accessibili.',
  },
  {
    id: 'polimi-pmi',
    label: 'PMI con budget digitale in aumento',
    valuePercent: 52.0,
    source: 'Osservatorio Politecnico di Milano',
    note: 'Oltre una PMI su due ha incrementato la spesa per trasformazione digitale.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Daniele Cetina',
    role: 'CEO e Fondatore',
    focus: 'Guida strategica, visione industriale e rapporto con le imprese.',
  },
  {
    name: 'Lucas Quixada Pinheiro',
    role: 'Manager & Sviluppo Software',
    focus: 'Architettura tecnica, ingegneria applicativa e piattaforma ProdIntelligence.',
  },
  {
    name: 'Demetrio Toscano',
    role: 'Designer',
    focus: 'Design delle interfacce, identità visiva e usabilità dei gestionali.',
  },
  {
    name: 'Dott. Alessandro Caracciolo',
    role: 'Responsabile Giuridico',
    focus: 'Privacy, sicurezza legale, contrattualistica e conformità normativa.',
  },
  {
    name: 'Dott. Andrea Caracciolo',
    role: 'Amministrazione',
    focus: 'Gestione amministrativa, contabilità e sostenibilità finanziaria.',
  },
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    period: 'Mese 1',
    title: 'Lancio istituzionale e catalogo servizi',
    description:
      'Pubblicazione del sito web ufficiale e attivazione dell’offerta B2B su misura per le imprese.',
  },
  {
    period: 'Mese 3',
    title: 'Prime commesse personalizzate',
    description:
      'Chiusura e consegna dei primi software gestionali su misura pagati e costruzione delle referenze.',
  },
  {
    period: 'Mese 6',
    title: 'Lancio di ProdIntelligence',
    description:
      'Apertura al pubblico della piattaforma prompt-to-software a 19,99 €/mese con opzione di acquisto una tantum.',
  },
  {
    period: 'Mesi 10–12',
    title: 'Ottimizzazione margini e prodotti',
    description:
      'Consolidamento dell’infrastruttura, ottimizzazione dei costi operativi e scalabilità dell’ecosistema.',
  },
];
