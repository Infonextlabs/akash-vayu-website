import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from './contactValidation';

test('rejects empty required fields without bypassing validation', () => {
  const result = validateContactForm({
    fullName: '   ',
    email: '',
    organization: '',
    subject: '',
    message: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
  assert.equal(result.errors.organization, undefined);
});

test('rejects invalid email format and short messages', () => {
  const result = validateContactForm({
    fullName: 'Aarav Mehta',
    email: 'invalid-email@',
    organization: 'A',
    subject: 'Hi',
    message: 'Too short',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.fullName, undefined);
  assert.ok(result.errors.email);
  assert.ok(result.errors.organization);
  assert.ok(result.errors.subject);
  assert.ok(result.errors.message);
});

test('accepts valid complete inquiry and trims whitespace', () => {
  const result = validateContactForm({
    fullName: '  Dr. Kavita Rao  ',
    email: '  kavita@research-institute.org  ',
    organization: '  Space Optics Group  ',
    subject: '  Satellite Optical Bus Discussion  ',
    message: '  We would like to discuss conceptual payload tolerances and future collaboration.  ',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.sanitized.fullName, 'Dr. Kavita Rao');
  assert.equal(result.sanitized.email, 'kavita@research-institute.org');
});
