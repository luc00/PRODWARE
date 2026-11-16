interface FooterProps {
  onOpenOrder: () => void;
  onOpenVideo: () => void;
}

export function Footer({ onOpenOrder, onOpenVideo }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-neutral-800">
          <div className="md:col-span-6 space-y-4">
            <span className="font-editorial text-3xl font-medium tracking-tight text-white block">
              ProdWare
            </span>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Technology that works for you. Software gestionali personalizzati, Chatbot IA su cloud
              dedicato, sicurezza VPN, identità visiva e piattaforma ProdIntelligence.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs text-neutral-500">Sezioni</p>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <a href="#soluzioni" className="hover:text-white transition-colors">
                  Soluzioni Integrate
                </a>
              </li>
              <li>
                <a href="#prodintelligence" className="hover:text-white transition-colors">
                  ProdIntelligence
                </a>
              </li>
              <li>
                <a href="#prezzi" className="hover:text-white transition-colors">
                  Prezzi e Licenze
                </a>
              </li>
              <li>
                <a href="#azienda" className="hover:text-white transition-colors">
                  Mercato, Roadmap e Team
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs text-neutral-500">Azioni Dirette</p>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button
                  type="button"
                  onClick={onOpenOrder}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Attiva ProdIntelligence (19,99 €/mese)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Video presentazione aziendale
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 ProdWare · Diamo forma alle tue idee attraverso la tecnologia.</p>
          <p>Daniele Cetina · Lucas Quixada Pinheiro · Demetrio Toscano · A. Caracciolo</p>
        </div>
      </div>
    </footer>
  );
}
