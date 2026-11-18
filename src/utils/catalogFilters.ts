export type ProjectStage = 'CONCEPT' | 'IN DEVELOPMENT';
export type ProjectFilter = 'ALL' | ProjectStage;

export type CareerDiscipline =
  | 'All'
  | 'Propulsion & Systems'
  | 'Avionics & Software'
  | 'Spacecraft Structures'
  | 'AI & Orbital Data';

export interface FilterableProject {
  id: string;
  stage: ProjectStage;
}

export interface FilterableCareer {
  id: string;
  discipline: Exclude<CareerDiscipline, 'All'>;
}

export function filterProjects<T extends FilterableProject>(
  projects: readonly T[],
  stage: ProjectFilter,
): T[] {
  if (stage === 'ALL') {
    return [...projects];
  }
  return projects.filter((project) => project.stage === stage);
}

export function filterCareers<T extends FilterableCareer>(
  roles: readonly T[],
  discipline: CareerDiscipline,
): T[] {
  if (discipline === 'All') {
    return [...roles];
  }
  return roles.filter((role) => role.discipline === discipline);
}
