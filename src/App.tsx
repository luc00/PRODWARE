import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MarketAndRoadmapSection } from './components/MarketAndRoadmapSection';
import { Navbar } from './components/Navbar';
import { OrderDrawer } from './components/OrderDrawer';
import { PricingSection } from './components/PricingSection';
import { ProdIntelligenceSection } from './components/ProdIntelligenceSection';
import { SolutionsSection } from './components/SolutionsSection';
import { TeamSection } from './components/TeamSection';
import { VideoModal } from './components/VideoModal';
import type { OfferPlan } from './data/prodwareData';

const SECTION_IDS = ['inizio', 'soluzioni', 'prodintelligence', 'prezzi', 'azienda'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inizio');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerPlanId, setDrawerPlanId] = useState<OfferPlan['id']>('prodintelligence-monthly');
  const [drawerServices, setDrawerServices] = useState<string[]>([]);
  const [drawerNote, setDrawerNote] = useState<string>('');
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openOrderForPlan = (
    planId: OfferPlan['id'],
    services: string[] = [],
    note: string = ''
  ) => {
    setDrawerPlanId(planId);
    setDrawerServices(services);
    setDrawerNote(note);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <Navbar
        activeSection={activeSection}
        onPrimaryAction={() => openOrderForPlan('prodintelligence-monthly')}
      />

      <main className="flex-1">
        <Hero
          onStartSubscription={() => openOrderForPlan('prodintelligence-monthly')}
          onOpenVideo={() => setVideoOpen(true)}
        />

        <SolutionsSection
          onSelectServiceForQuote={(serviceId) => openOrderForPlan('custom-b2b', [serviceId])}
        />

        <ProdIntelligenceSection
          onSelectMonthly={(summary) =>
            openOrderForPlan('prodintelligence-monthly', [], `Progetto iniziale: ${summary}`)
          }
          onSelectBuyout={(summary) =>
            openOrderForPlan(
              'prodintelligence-buyout',
              [],
              `Richiesta riscatto codice una tantum per: ${summary}`
            )
          }
        />

        <PricingSection onSelectPlan={(planId) => openOrderForPlan(planId)} />

        <MarketAndRoadmapSection />

        <TeamSection />
      </main>

      <Footer
        onOpenOrder={() => openOrderForPlan('prodintelligence-monthly')}
        onOpenVideo={() => setVideoOpen(true)}
      />

      <OrderDrawer
        isOpen={drawerOpen}
        initialPlanId={drawerPlanId}
        initialServiceIds={drawerServices}
        initialNote={drawerNote}
        onClose={() => setDrawerOpen(false)}
      />

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}
