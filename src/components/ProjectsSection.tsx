import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CONCEPTUAL_PROJECTS, type ConceptualProject } from '../data/akashVayuData';
import { filterProjects, type ProjectFilter } from '../utils/catalogFilters';

interface ProjectsSectionProps {
  onSelectProject: (project: ConceptualProject) => void;
}

const FILTER_OPTIONS: { label: string; value: ProjectFilter }[] = [
  { label: 'All Initiatives', value: 'ALL' },
  { label: 'Concept', value: 'CONCEPT' },
  { label: 'In Development', value: 'IN DEVELOPMENT' },
];

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [stageFilter, setStageFilter] = useState<ProjectFilter>('ALL');
  const visibleProjects = filterProjects(CONCEPTUAL_PROJECTS, stageFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 border-t border-black/10 bg-[#F7F7F7] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-black/12 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-[#0057FF] uppercase">
              04 · Innovation &amp; Projects · Concept Portfolio
            </p>
            <h2
              id="projects-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A0A0A] uppercase [text-wrap:balance] sm:text-4xl"
            >
              Conceptual Engineering Programs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              All initiatives listed below are conceptual studies or early software/bench
              prototypes. AKASH VAYU makes no claims of completed orbital launches or commercial
              deployments.
            </p>
          </div>

          {/* Sharp Architectural Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by development stage"
            className="flex flex-wrap max-w-full items-center gap-1 self-start border border-black/15 bg-white p-1"
          >
            {FILTER_OPTIONS.map((option) => {
              const active = stageFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStageFilter(option.value)}
                  aria-pressed={active}
                  className={`min-h-9 px-3.5 py-1.5 font-display text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0057FF] ${
                    active
                      ? 'bg-[#0A0A0A] text-white'
                      : 'text-[#231F20] hover:bg-black/5'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skyroot-inspired Technical Specification Grid */}
        <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              data-testid={`project-card-${project.id}`}
              className="flex flex-col justify-between bg-white p-6 transition-colors duration-200 hover:bg-[#FAFAFA] sm:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
                  <span className="font-semibold text-slate-500">{project.code}</span>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <span
                    className={
                      project.stage === 'IN DEVELOPMENT'
                        ? 'font-semibold text-[#0057FF]'
                        : 'font-semibold text-[#7C3AED]'
                    }
                  >
                    {project.stage}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <span className="text-slate-600">{project.domain}</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0A0A0A] uppercase">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.summary}</p>

                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-black/10 pt-5">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">
                        {metric.label}
                      </dt>
                      <dd className="mt-1 text-xs font-semibold text-[#0A0A0A]">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                <span className="font-mono-tech text-xs text-slate-500">
                  {project.targetOrbit}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  aria-label={`Inspect brief for ${project.title}`}
                  className="inline-flex min-h-10 items-center gap-1.5 font-display text-[11px] font-bold tracking-wider text-[#0057FF] uppercase transition-colors hover:text-[#0A0A0A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0057FF]"
                >
                  <span>Inspect Concept Brief</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
