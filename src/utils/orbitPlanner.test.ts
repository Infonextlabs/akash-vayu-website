import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMissionPlan } from './orbitPlanner';

test('calculateMissionPlan selects Vayu-Light for small CubeSat payloads to Equatorial LEO', () => {
  const plan = calculateMissionPlan('cubesat', 15, 'eq-480');
  assert.equal(plan.rocket.id, 'vayu-light');
  assert.equal(plan.payloadKg, 15);
  assert.equal(plan.isWithinEnvelope, true);
  assert.ok(plan.orbitalVelocityKmS > 7.4 && plan.orbitalVelocityKmS < 7.8);
  assert.ok(plan.orbitalPeriodMin > 90 && plan.orbitalPeriodMin < 98);
});

test('calculateMissionPlan upsizes rocket class for heavier payloads or high-energy orbits', () => {
  const mediumPlan = calculateMissionPlan('smallsat', 180, 'sso-540');
  assert.equal(mediumPlan.rocket.id, 'vayu-core');

  const highEnergyPlan = calculateMissionPlan('constellation', 400, 'deep-2000');
  assert.equal(highEnergyPlan.rocket.id, 'vayu-heavy');
  assert.equal(highEnergyPlan.isWithinEnvelope, true);
  assert.ok(highEnergyPlan.orbitalPeriodMin > mediumPlan.orbitalPeriodMin);
});
