import type { DrugNameType } from '../../../types';

export const TYPE_LABELS: { [k in DrugNameType]: string } = {
  COMMON: 'Common',
  SUBSTITUTIVE: 'Substitutive',
  SYSTEMATIC: 'Systematic',
  BRAND: 'Brand',
};
