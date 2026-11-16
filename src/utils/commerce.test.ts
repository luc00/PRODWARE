import test from 'node:test';
import assert from 'node:assert/strict';
import { OFFER_PLANS } from '../data/prodwareData';
import {
  calculateOrderTotals,
  formatEur,
  generateOrderReference,
  synthesizeBlueprintFromPrompt,
  validateOrderForm,
} from './commerce';

test('formatEur formats Euro values with Italian comma separator', () => {
  assert.equal(formatEur(19.99), '19,99 €');
  assert.equal(formatEur(24.39), '24,39 €');
});

test('calculateOrderTotals computes monthly subscription and VAT accurately', () => {
  const monthlyPlan = OFFER_PLANS.find((p) => p.id === 'prodintelligence-monthly')!;
  const oneMonth = calculateOrderTotals(monthlyPlan, 1);
  assert.equal(oneMonth.isFixedPrice, true);
  assert.equal(oneMonth.netEur, 19.99);
  assert.equal(oneMonth.vatEur, 4.4);
  assert.equal(oneMonth.grossEur, 24.39);
  assert.equal(oneMonth.formattedNet, '19,99 €');

  const threeMonths = calculateOrderTotals(monthlyPlan, 3);
  assert.equal(threeMonths.netEur, 59.97);
});

test('calculateOrderTotals handles custom/buyout plans without fabricating prices', () => {
  const buyoutPlan = OFFER_PLANS.find((p) => p.id === 'prodintelligence-buyout')!;
  const res = calculateOrderTotals(buyoutPlan, 1);
  assert.equal(res.isFixedPrice, false);
  assert.equal(res.formattedNet, 'Una tantum');
});

test('validateOrderForm rejects missing fields and accepts valid input', () => {
  const invalid = validateOrderForm({
    planId: 'custom-b2b',
    fullName: 'A',
    companyName: '',
    email: 'invalid-email',
    vatOrTaxCode: '',
    selectedServices: [],
    notes: '',
    acceptedTerms: false,
    monthsCount: 1,
  });

  assert.ok(invalid.fullName);
  assert.ok(invalid.companyName);
  assert.ok(invalid.email);
  assert.ok(invalid.selectedServices);
  assert.ok(invalid.acceptedTerms);

  const valid = validateOrderForm({
    planId: 'prodintelligence-monthly',
    fullName: 'Marco Bellini',
    companyName: 'Officine Bellini S.r.l.',
    email: 'm.bellini@officinebellini.it',
    vatOrTaxCode: 'IT12345678901',
    selectedServices: [],
    notes: '',
    acceptedTerms: true,
    monthsCount: 1,
  });

  assert.deepEqual(valid, {});
});

test('synthesizeBlueprintFromPrompt adapts architecture to prompt keywords', () => {
  const warehouse = synthesizeBlueprintFromPrompt('Gestione scorte e lotti di magazzino');
  assert.equal(warehouse.architectureTitle, 'Gestionale Inventario Multi-Sede');

  const custom = synthesizeBlueprintFromPrompt('Piattaforma prenotazioni clienti per studio medico');
  assert.equal(custom.architectureTitle, 'Applicativo Gestionale Su Misura');
  assert.ok(custom.dataModel.includes('Cliente'));
  assert.ok(custom.dataModel.includes('Prenotazione'));
});

test('generateOrderReference formats deterministic prefix per plan', () => {
  const ref = generateOrderReference('prodintelligence-monthly', new Date('2026-05-01T10:00:00Z'));
  assert.match(ref, /^PW-PI-2026-\d{5}$/);
});
