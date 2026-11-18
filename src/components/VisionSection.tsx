import { useState } from 'react';
import { ArrowRight, Orbit } from 'lucide-react';
import { ORBITAL_REGIMES, REAL_EARTH_UNIVERSE_IMAGE } from '../data/akashVayuData';

interface VisionSectionProps {
  onOpenGetOrbit: () => void;
}

export function VisionSection({ onOpenGetOrbit }: VisionSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(ORBITAL_REGIMES[0].id);
  const [imageError, setImageError] = useState(false);

  const activeRegime =
    ORBITAL_REGIMES.find((regime) => regime.id === selectedId) ?? ORBITAL_REGIMES[0];

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="scroll-mt-20 border-t border-black/10 bg-[#14171D] py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Real Earth-from-Space Photograph over India */}
          <div className="lg:col-span-6">
            <div className="relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden border border-white/15 bg-[#05070D]">
              {imageError ? (
                <div className="flex flex-1 items-center justify-center p-8 text-center">
                  <span className="font-mono-tech text-xs text-cyan-300 uppercase">
                    Earth Orbital Corridor · Indian Subcontinent
                  </span>
                </div>
              ) : (
                <img
                  src={REAL_EARTH_UNIVERSE_IMAGE}
                  alt="Real orbital view of planet Earth over the Indian subcontinent and surrounding oceans against deep space"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  className="h-full min-h-[320px] w-full flex-1 object-cover"
                />
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 bg-[#05070D]/95 px-4 py-3 font-mono-tech text-[11px] text-slate-300">
                <span>INDIA TO ORBIT · EARTH OBSERVATION PERSPECTIVE</span>
                <span className="text-cyan-300">
                  ALT {activeRegime.altitudeKm} · INC {activeRegime.inclinationDeg.toFixed(1)}°
                </span>
              </div>
            </div>
          </div>

          {/* Narrative, Orbital Presets & Get Orbit CTA */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-cyan-300 uppercase">
                03 · Our Vision
              </p>
              <h2
                id="vision-heading"
                className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white uppercase [text-wrap:balance] sm:text-4xl lg:text-5xl lg:leading-[1.06]"
              >
                FROM INDIA TO THE UNIVERSE.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                India&apos;s expanding space ecosystem offers a historic opportunity for homegrown
                researchers and engineers to design technologies with planetary reach. AKASH VAYU
                envisions contributing focused satellite, analytical, and propulsion concepts that
                serve environmental stewardship, scientific curiosity, and resilient orbital
                infrastructure.
              </p>

              {/* Regime Selector Controls */}
              <div className="mt-8">
                <span className="font-mono-tech text-xs text-slate-400 uppercase">
                  Conceptual Orbital Regimes
                </span>

                <div
                  className="mt-3 grid gap-2 sm:grid-cols-3"
                  role="group"
                  aria-label="Orbital regime presets"
                >
                  {ORBITAL_REGIMES.map((regime) => {
                    const isSelected = regime.id === activeRegime.id;
                    return (
                      <button
                        key={regime.id}
                        type="button"
                        onClick={() => setSelectedId(regime.id)}
                        aria-pressed={isSelected}
                        className={`flex flex-col items-start border p-3 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/15 text-white'
                            : 'border-white/15 bg-[#0B0E14] text-slate-300 hover:border-white/35 hover:text-white'
                        }`}
                      >
                        <span className="font-mono-tech text-[11px] text-cyan-300">
                          {regime.altitudeKm}
                        </span>
                        <span className="mt-1 text-xs font-semibold leading-snug">
                          {regime.orbitType}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Regime Technical Summary + Get Orbit Launch CTA */}
            <div className="mt-8 space-y-5">
              <div className="border-t border-white/15 bg-[#0B0E14] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                    {activeRegime.name}
                  </h3>
                  <span className="font-mono-tech text-xs text-cyan-300">
                    INC {activeRegime.inclinationDeg.toFixed(1)}° · ALT {activeRegime.altitudeKm}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {activeRegime.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border border-cyan-400/30 bg-[#0B0E14] p-4 sm:p-5">
                <div>
                  <p className="font-display text-sm font-bold tracking-wide text-white uppercase">
                    Plan Your Satellite &amp; Rocket Concept
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Open the interactive Universe planner to select satellite mass &amp; target
                    orbit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenGetOrbit}
                  className="inline-flex min-h-11 items-center gap-2.5 bg-cyan-400 px-6 py-3 font-display text-xs font-bold tracking-[0.14em] text-[#05070D] uppercase transition-colors duration-200 hover:bg-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  <Orbit className="h-4 w-4" aria-hidden="true" />
                  <span>Get Orbit</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
