import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CAREER_OPPORTUNITIES, type CareerOpportunity } from '../data/akashVayuData';
import { filterCareers, type CareerDiscipline } from '../utils/catalogFilters';

interface CareersSectionProps {
  onSelectRole: (role: CareerOpportunity) => void;
}

const DISCIPLINES: CareerDiscipline[] = [
  'All',
  'Propulsion & Systems',
  'Avionics & Software',
  'Spacecraft Structures',
  'AI & Orbital Data',
];

export function CareersSection({ onSelectRole }: CareersSectionProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<CareerDiscipline>('All');
  const roles = filterCareers(CAREER_OPPORTUNITIES, selectedDiscipline);

  return (
    <section
      id="careers"
      aria-labelledby="careers-heading"
      className="scroll-mt-16 border-t border-black/10 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-[#0057FF] uppercase">
              05 · Careers at AKASH VAYU · Talent Interest
            </p>
            <h2
              id="careers-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A0A0A] uppercase [text-wrap:balance] sm:text-4xl"
            >
              Join the Mission Beyond the Sky
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            We are building our foundational engineering roster in India across propulsion modeling,
            flight software, spacecraft structures, and orbital AI. Explore open interest areas
            below.
          </p>
        </div>

        {/* Discipline Filter Tabs */}
        <div
          role="group"
          aria-label="Filter career opportunities by discipline"
          className="mt-8 flex flex-wrap gap-2"
        >
          {DISCIPLINES.map((discipline) => {
            const active = selectedDiscipline === discipline;
            return (
              <button
                key={discipline}
                type="button"
                onClick={() => setSelectedDiscipline(discipline)}
                aria-pressed={active}
                className={`min-h-9 border px-3.5 py-1.5 font-display text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0057FF] ${
                  active
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                    : 'border-black/15 bg-[#F7F7F7] text-[#231F20] hover:border-[#0A0A0A]'
                }`}
              >
                {discipline}
              </button>
            );
          })}
        </div>

        {/* Skyroot-inspired Horizontal Architectural Ledger for Roles */}
        <div className="mt-10 border-y border-black/15 divide-y divide-black/10">
          {roles.map((role) => (
            <article
              key={role.id}
              className="group grid gap-4 py-8 transition-colors duration-200 hover:bg-[#F7F7F7]/80 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-4"
            >
              <div className="lg:col-span-3">
                <p className="font-mono-tech text-xs font-semibold text-[#0057FF]">
                  {role.code} · {role.discipline}
                </p>
                <p className="mt-1.5 font-mono-tech text-[11px] text-slate-500">
                  {role.location}
                </p>
              </div>

              <div className="lg:col-span-7">
                <h3 className="font-display text-lg font-bold leading-snug text-[#0A0A0A] transition-colors group-hover:text-[#0057FF] sm:text-xl">
                  {role.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{role.summary}</p>
              </div>

              <div className="flex lg:col-span-2 lg:justify-end">
                <button
                  type="button"
                  onClick={() => onSelectRole(role)}
                  aria-label={`View role: ${role.title}`}
                  className="inline-flex min-h-10 items-center gap-2 border border-black/20 bg-white px-4 py-2 font-display text-[11px] font-bold tracking-wider text-[#0A0A0A] uppercase transition-colors hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0057FF]"
                >
                  <span>View Role</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
