import { useState } from 'react';
import { ABOUT_PILLARS, FOUNDER_PROFILE } from '../data/akashVayuData';

export function AboutSection() {
  const [founderPhotoError, setFounderPhotoError] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 border-t border-black/10 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Skyroot-inspired large confident manifesto lead-in */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-[#0057FF] uppercase">
              01 · About AKASH VAYU
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0A0A0A] uppercase [text-wrap:balance] sm:text-4xl"
            >
              A New Vision for Space Innovation
            </h2>
            <div className="mt-8 border-t border-black/10 pt-6">
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">Origin</dt>
                  <dd className="mt-1 font-display text-lg font-bold text-[#0A0A0A]">India</dd>
                </div>
                <div>
                  <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">
                    Current Phase
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-[#0057FF]">
                    R&amp;D &amp; Concept Design
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xl font-medium leading-snug text-[#0A0A0A] sm:text-2xl lg:text-[1.75rem]">
              AKASH VAYU is an emerging Indian space-technology venture dedicated to exploring
              aerospace systems, satellite architectures, and scientific innovation for India&apos;s
              growing space economy.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              We operate with clarity and scientific honesty: every architecture, simulation, and
              research initiative presented here reflects active exploration and conceptual
              engineering—laying disciplined groundwork before hardware reaches the launchpad.
            </p>
          </div>
        </div>

        {/* 4 Strategic Pillars — Sharp Architectural Ledger */}
        <div className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_PILLARS.map((pillar) => (
            <article key={pillar.id} className="flex flex-col justify-between bg-[#F7F7F7] p-6">
              <div>
                <span className="font-mono-tech text-xs font-medium text-[#0057FF]">
                  {pillar.index}
                </span>
                <h3 className="mt-2.5 font-display text-base font-bold tracking-tight text-[#0A0A0A] uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">{pillar.statement}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Compact Founder & CEO Showcase */}
        <div className="mt-12 border border-black/10 bg-[#F7F7F7]">
          <div className="grid lg:grid-cols-12 lg:items-stretch">
            {/* Clean Framed Portrait */}
            <div className="flex items-center justify-center border-b border-black/10 bg-[#14171D] p-5 sm:p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div className="relative aspect-[4/5] w-full max-w-[220px] overflow-hidden border border-white/15 bg-[#0B101E]">
                {founderPhotoError ? (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <span className="font-display text-3xl font-extrabold tracking-widest text-white">
                      RO
                    </span>
                    <span className="mt-2 font-mono-tech text-[11px] tracking-wider text-sky-400 uppercase">
                      {FOUNDER_PROFILE.name}
                    </span>
                  </div>
                ) : (
                  <img
                    src={FOUNDER_PROFILE.photo}
                    alt={FOUNDER_PROFILE.photoAlt}
                    onError={() => setFounderPhotoError(true)}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-[50%_20%]"
                  />
                )}
              </div>
            </div>

            {/* Compact Founder Narrative & Leadership Specs */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-8">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-mono-tech text-[11px] font-medium tracking-[0.16em] text-[#0057FF] uppercase">
                      Leadership · Founder &amp; CEO
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] uppercase">
                      {FOUNDER_PROFILE.name}
                    </h3>
                  </div>
                  <span className="font-mono-tech text-[11px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                    {FOUNDER_PROFILE.organization}
                  </span>
                </div>

                <blockquote className="mt-4 border-t border-black/10 pt-4 text-base font-medium leading-snug text-[#0A0A0A] sm:text-lg">
                  &ldquo;{FOUNDER_PROFILE.quote}&rdquo;
                </blockquote>

                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {FOUNDER_PROFILE.bio[0]}
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-black/10 pt-4 sm:grid-cols-3">
                {FOUNDER_PROFILE.highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono-tech text-[10px] text-slate-500 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 font-display text-sm font-bold text-[#0A0A0A]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
