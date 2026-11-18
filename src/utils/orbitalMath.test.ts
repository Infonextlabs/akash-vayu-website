import test from 'node:test';
import assert from 'node:assert/strict';
import { computeOrbitalPoint, projectLatLonToGlobe } from './orbitalMath';

test('projectLatLonToGlobe places sub-observer point at center with z=1', () => {
  const point = projectLatLonToGlobe(0, 77.59, 77.59, 0, 200, 200, 100);
  assert.ok(Math.abs(point.x - 200) < 1e-6);
  assert.ok(Math.abs(point.y - 200) < 1e-6);
  assert.ok(Math.abs(point.z - 1) < 1e-6);
  assert.equal(point.visible, true);
});

test('projectLatLonToGlobe marks antipodal point as hidden behind hemisphere', () => {
  const point = projectLatLonToGlobe(0, 77.59 + 180, 77.59, 0, 200, 200, 100);
  assert.equal(point.visible, false);
  assert.ok(point.z < 0);
});

test('computeOrbitalPoint preserves constant orbital radius in 3D space', () => {
  const r = 140;
  const cx = 250;
  const cy = 250;
  const p = computeOrbitalPoint(Math.PI / 3, 53, 20, 78, 18, cx, cy, r);
  const dx = (p.x - cx) / r;
  const dy = (cy - p.y) / r;
  const dz = p.z;
  const magnitude = Math.sqrt(dx * dx + dy * dy + dz * dz);
  assert.ok(Math.abs(magnitude - 1) < 1e-6);
});
