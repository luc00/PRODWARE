import { TEAM_MEMBERS } from '../data/prodwareData';

export function TeamSection() {
  return (
    <section className="bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs text-neutral-500 mb-3">Il Motore Umano</p>
            <h2 className="font-editorial text-3xl sm:text-4xl leading-[1.1] tracking-tight text-[#0A0A0A] text-balance">
              Competenze tecniche, design e tutela legale in un unico gruppo.
            </h2>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              Ogni progetto ProdWare nasce dall’integrazione diretta tra sviluppo software,
              progettazione delle interfacce, conformità normativa e controllo amministrativo.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-neutral-300 divide-y divide-neutral-200">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-4 font-medium text-base text-[#0A0A0A]">
                  {member.name}
                </div>
                <div className="sm:col-span-3 text-xs font-medium text-neutral-500">
                  {member.role}
                </div>
                <div className="sm:col-span-5 text-sm text-neutral-600 leading-relaxed">
                  {member.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
