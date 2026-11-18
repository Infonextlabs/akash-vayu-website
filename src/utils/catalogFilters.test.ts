import test from 'node:test';
import assert from 'node:assert/strict';
import { filterCareers, filterProjects } from './catalogFilters';

test('filterProjects returns all items for ALL and narrows by stage', () => {
  const sample = [
    { id: 'p1', stage: 'CONCEPT' as const },
    { id: 'p2', stage: 'IN DEVELOPMENT' as const },
    { id: 'p3', stage: 'CONCEPT' as const },
  ];

  assert.equal(filterProjects(sample, 'ALL').length, 3);
  assert.deepEqual(
    filterProjects(sample, 'CONCEPT').map((p) => p.id),
    ['p1', 'p3'],
  );
  assert.deepEqual(
    filterProjects(sample, 'IN DEVELOPMENT').map((p) => p.id),
    ['p2'],
  );
});

test('filterCareers returns all items for All and filters by discipline', () => {
  const sample = [
    { id: 'c1', discipline: 'Propulsion & Systems' as const },
    { id: 'c2', discipline: 'Avionics & Software' as const },
    { id: 'c3', discipline: 'AI & Orbital Data' as const },
  ];

  assert.equal(filterCareers(sample, 'All').length, 3);
  assert.deepEqual(
    filterCareers(sample, 'Avionics & Software').map((c) => c.id),
    ['c2'],
  );
});
