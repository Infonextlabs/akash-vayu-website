import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { TECHNOLOGY_FOCUS_AREAS, type TechFocusArea } from '../data/akashVayuData';

interface TechnologySectionProps {
  onSelectFocusArea: (area: TechFocusArea) => void;
}

export function TechnologySection({ onSelectFocusArea }: TechnologySectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="scroll-mt-16 border-t border-black/10 bg-[#F7F7F7] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-black/12 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-[#0057FF] uppercase">
              02 · Technology &amp; Research · Future Development Interests
            </p>
            <h2
              id="technology-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A0A0A] uppercase [text-wrap:balance] sm:text-4xl"
            >
              Core Scientific &amp; Engineering Focus Areas
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            The domains below represent AKASH VAYU&apos;s ongoing research focus areas and future
            development interests rather than completed commercial products.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGY_FOCUS_AREAS.map((area) => {
            const hasFailed = Boolean(failedImages[area.id]);
            return (
              <article
                key={area.id}
                className="group flex flex-col bg-white transition-colors duration-200 hover:bg-[#FAFAFA]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B101E]">
                  {!hasFailed ? (
                    <img
                      src={area.image}
                      alt={area.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [area.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#14171C] p-6 text-center">
                      <Layers className="h-8 w-8 text-cyan-400" aria-hidden="true" />
                      <span className="font-display text-sm font-semibold text-white">
                        {area.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 font-mono-tech text-[11px] text-slate-500">
                      <span className="font-semibold text-[#0057FF]">{area.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{area.subtitle}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-[#0A0A0A] uppercase">
                      {area.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {area.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="font-mono-tech text-[11px] text-slate-500">
                      {area.explorationHorizon}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectFocusArea(area)}
                      aria-label={`Explore ${area.title}`}
                      className="inline-flex min-h-10 items-center gap-1.5 bg-[#0A0A0A] px-4 py-1.5 font-display text-[11px] font-bold tracking-wider text-white uppercase transition-colors duration-200 hover:bg-[#0057FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
