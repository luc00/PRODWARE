import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LOGO_BACKGROUND_PATH } from '../data/prodwareData';

interface NavbarProps {
  activeSection: string;
  onPrimaryAction: () => void;
}

const NAV_ITEMS = [
  { id: 'soluzioni', label: 'Soluzioni' },
  { id: 'prodintelligence', label: 'ProdIntelligence' },
  { id: 'prezzi', label: 'Prezzi' },
  { id: 'azienda', label: 'Azienda' },
];

export function Navbar({ activeSection, onPrimaryAction }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#inizio"
          aria-label="ProdWare — Torna all'inizio"
          className="inline-flex items-center shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
        >
          <img
            src={LOGO_BACKGROUND_PATH}
            alt="ProdWare"
            referrerPolicy="no-referrer"
            className="h-9 sm:h-10 w-auto object-contain grayscale brightness-[1.12] contrast-[1.35] mix-blend-multiply"
          />
        </a>

        <nav
          aria-label="Navigazione principale"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A] ${
                  isActive ? 'text-[#0A0A0A]' : 'text-neutral-500 hover:text-[#0A0A0A]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-px bg-[#0A0A0A] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-wide bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          >
            Attiva o Richiedi
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#0A0A0A] border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Menu mobile"
          className="md:hidden border-t border-neutral-200 bg-white px-5 py-5 space-y-1"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleLinkClick}
              className="flex items-center justify-between py-3 text-base font-medium text-[#0A0A0A] border-b border-neutral-100"
            >
              <span>{item.label}</span>
              <span className="text-xs text-neutral-400">Vai</span>
            </a>
          ))}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onPrimaryAction();
              }}
              className="w-full py-3 px-4 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Attiva o Richiedi
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
