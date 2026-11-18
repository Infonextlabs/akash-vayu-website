import { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { HERO_IMAGE } from '../data/akashVayuData';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      aria-label="Hero"
      className="bg-[#F7F7F7] bg-sky-grid-light text-[#0A0A0A]"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-20">
        {/* Top Monumental Display Header — Skyroot-inspired bold stacked Orbitron presence */}
        <div className="max-w-5xl">
          <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-[#0057FF] uppercase">
            AKASH VAYU · Indian Space Technology Venture
          </p>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] text-[#0A0A0A] uppercase [text-wrap:balance] sm:text-6xl lg:text-[4.65rem] lg:leading-[1.0]">
            THE FUTURE IS BEYOND THE SKY.
          </h1>
        </div>

        {/* Subheading + Dual CTAs */}
        <div className="mt-8 flex flex-col justify-between gap-8 border-t border-black/12 pt-8 lg:flex-row lg:items-center">
          <p className="max-w-2xl text-base leading-relaxed text-[#231F20]/85 sm:text-lg">
            Engineering ideas, exploring possibilities, and building a vision for India&apos;s
            future in space technology.
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/vision"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/vision');
              }}
              className="inline-flex min-h-12 items-center gap-2.5 bg-[#0A0A0A] px-6 py-3 font-display text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#0057FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]"
            >
              <span>Explore Our Vision</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/about');
              }}
              className="inline-flex min-h-12 items-center gap-2 border border-black/20 bg-white px-6 py-3 font-display text-xs font-bold tracking-[0.12em] text-[#0A0A0A] uppercase transition-colors duration-200 hover:border-[#0A0A0A] hover:bg-black/5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]"
            >
              <Compass className="h-4 w-4 text-[#0057FF]" aria-hidden="true" />
              <span>Discover Our Mission</span>
            </a>
          </div>
        </div>

        {/* Cinematic Orbital Earth Frame */}
        <div className="relative mt-10 overflow-hidden border border-black/15 bg-[#05070D]">
          <div className="aspect-[16/9] max-h-[540px] w-full overflow-hidden">
            {!imageError ? (
              <img
                src={HERO_IMAGE}
                alt="Earth viewed from low Earth orbit at sunrise with a conceptual spacecraft in foreground"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(ellipse_at_bottom,_#0c2d57_0%,_#070b14_55%,_#05070d_100%)]" />
            )}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent"
          />

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs text-white/90 sm:bottom-6 sm:left-6 sm:right-6">
            <span>Beyond Earth. Beyond Imagination.</span>
            <span>Research &amp; Concept Engineering · Pre-Flight Stage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
